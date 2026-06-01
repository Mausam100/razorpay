// CameraRig.jsx
import { useEffect, useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3, Quaternion, Euler } from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const easeInOutCubic = (t) => {
  t = Math.max(0, Math.min(1, t))
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const getPositionAtProgress = (waypoints, t) => {
  const easedT = easeInOutCubic(t)
  const segment = easedT * (waypoints.length - 1)
  const segmentIndex = Math.floor(segment)
  const segmentProgress = segment - segmentIndex
  const i1 = Math.max(0, Math.min(segmentIndex, waypoints.length - 2))
  const i2 = Math.min(i1 + 1, waypoints.length - 1)
  const p1 = waypoints[i1]
  const p2 = waypoints[i2]
  return new Vector3(
    p1[0] + (p2[0] - p1[0]) * segmentProgress,
    p1[1] + (p2[1] - p1[1]) * segmentProgress,
    p1[2] + (p2[2] - p1[2]) * segmentProgress
  )
}

const getQuaternionAtProgress = (waypoints, t) => {
  const easedT = easeInOutCubic(t)
  const segment = easedT * (waypoints.length - 1)
  const segmentIndex = Math.floor(segment)
  const segmentProgress = segment - segmentIndex
  const i1 = Math.max(0, Math.min(segmentIndex, waypoints.length - 2))
  const i2 = Math.min(i1 + 1, waypoints.length - 1)
  const r1 = waypoints[i1]
  const r2 = waypoints[i2]
  const x = r1[0] + (r2[0] - r1[0]) * segmentProgress
  const y = r1[1] + (r2[1] - r1[1]) * segmentProgress
  const z = r1[2] + (r2[2] - r1[2]) * segmentProgress
  const e = new Euler(x, y, z)
  const q = new Quaternion()
  q.setFromEuler(e)
  return q
}

const toRadiansIfNeeded = (vals) => {
  if (!Array.isArray(vals) || vals.length === 0) return vals
  // detect degrees if values are large (> 6 radians ~ 343 deg)
  const sample = vals[0]
  if (!Array.isArray(sample)) return vals
  const large = sample.some((v) => Math.abs(v) > 6)
  if (!large) return vals
  return vals.map(([x, y, z]) => [x * (Math.PI / 180), y * (Math.PI / 180), z * (Math.PI / 180)])
}

export default function CameraRig({ path, look, rotation, scrollEnd, scrollProgressRef }) {
  const { camera } = useThree()
  const lookPoints = look?.length > 0 ? look : path
  // fallback to local cameraConfig.rotation if caller didn't pass `rotation`
  const fallbackRotation = typeof cameraConfig !== "undefined" && cameraConfig.rotation ? cameraConfig.rotation : null
  const rotationPoints = toRadiansIfNeeded(rotation?.length > 0 ? rotation : fallbackRotation)
  const lookTargetRef = useRef(new Vector3(...(look?.[0] ?? path?.[0] ?? [0, 0, 0])))

  useEffect(() => {
    // ✅ declare trigger inside useEffect so cleanup can access it
    const trigger = ScrollTrigger.create({
      trigger: "#canvas-pin",
      start: "top top",
      end: scrollEnd,
      scrub: 0.5,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        scrollProgressRef.current = Math.max(0, Math.min(self.progress, 1))
      },
    })

    // ✅ trigger is in scope here — same block
    return () => {
      trigger.kill()
    }
  }, [scrollEnd, scrollProgressRef])

  useFrame(() => {
    if (!path || path.length < 2) return
    const progress = scrollProgressRef.current
    const cameraPos = getPositionAtProgress(path, progress)
    const targetLook = getPositionAtProgress(lookPoints, Math.min(progress + 0.03, 1))
    camera.position.lerp(cameraPos, 0.1)
    lookTargetRef.current.lerp(targetLook, 0.1)
    camera.lookAt(lookTargetRef.current)
    if (rotationPoints && rotationPoints.length > 1) {
      const targetQuat = getQuaternionAtProgress(rotationPoints, progress)
      camera.quaternion.slerp(targetQuat, 0.1)
    }
  })

  return null
}

export const cameraConfig = {
  path: [
    [0.8, -0.97, 3.29],
    [2, -0.97, -0],
    [2.5, -0.97, -2],
    [3, -0.97, -2],
    [3, 1, -2],
    [3, 1, -2],
    [3, 2, -7],
    [3, 4, -8],
    [3, 5, -9],
    [3, 7, -10],
    [3, 9, -12],
    [3, 10, -13],
    [3, 10, -15],
    [3, 10, -16],
    [3, 10, -17],
    [3, 13, -25],
    [3, 13, -25],
    
  
  ],
  look: [
    [1.4, -0.2, 0],
    [1.5, 50, -100],
    [1.6, 40, -100],
    [1.8, 30, -100],
    [2, 50, -100],
    [2, 50, -100],
    
  ],
  rotation: [
    [-0, 0, 2],
    [0, 0.3, 0],
    [0, 0.5, 0],
  ],
  scrollEnd: "+=5000",
}