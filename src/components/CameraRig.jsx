// CameraRig.jsx
import { useEffect, useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3 } from "three"
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

export default function CameraRig({ path, look, scrollEnd, scrollProgressRef }) {
  const { camera } = useThree()
  const lookPoints = look?.length > 0 ? look : path
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
  })

  return null
}

export const cameraConfig = {
  path: [
    [0, -0.3, 8],
    [0, -0.3, -12],
    [0, -0.3, -15],
  
  ],
  look: [
    [0, 2, -50],
    [0, 0, -100],
    [15, 0, -100],
  ],
  scrollEnd: "+=3000",
}