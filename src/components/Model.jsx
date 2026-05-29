"use client"
import { useRef, useEffect, useMemo } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ clipName = null, scrollProgressRef, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Sprint.glb')
  const { actions, mixer } = useAnimations(animations, group)

  const actionListRef = useRef([])
  const durationRef = useRef(0)
  const smoothRef = useRef(0)
  const lastTimeRef = useRef(-1)

  useEffect(() => {
    if (!mixer || !actions || !animations?.length) return

    const root = group.current
    if (!root) return

    const activeActions = clipName
      ? [actions[clipName]].filter(Boolean)
      : Object.values(actions).filter(Boolean)

    actionListRef.current = activeActions

    const maxDuration = activeActions.reduce(
      (max, action) => Math.max(max, action.getClip()?.duration || 0),
      0,
    )
    durationRef.current = maxDuration || animations.reduce((max, clip) => Math.max(max, clip.duration || 0), 0)

    activeActions.forEach((action) => {
      action.reset()
      action.play()
      action.enabled = true
      action.paused = true
      action.setEffectiveWeight?.(1)
    })

    return () => {
      activeActions.forEach((action) => {
        try {
          action.stop()
        } catch (error) {}
      })
      try {
        mixer.stopAllAction()
      } catch (error) {}
      if (root) {
        try {
          mixer.uncacheRoot(root)
        } catch (error) {}
      }
    }
  }, [actions, animations, clipName, mixer])

  useFrame(() => {
    if (!mixer || !actionListRef.current.length) return
    const duration = durationRef.current
    if (!duration) return

    const progress = scrollProgressRef?.current ?? 0

    smoothRef.current += (progress - smoothRef.current) * 0.1

    const time = Math.max(0, Math.min(smoothRef.current * duration, duration - 0.001))
    if (Math.abs(lastTimeRef.current - time) < 1e-4) return
    lastTimeRef.current = time

    actionListRef.current.forEach((action) => {
      try {
        action.time = time
      } catch (innerError) {}
    })
    mixer.update(0)
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="vaseCTRL001"
          position={[-21.742, -6.304, 10.622]}
          rotation={[0, 0.966, 0]}
        >
          <mesh
            name="Curve001"
            castShadow
            receiveShadow
            geometry={nodes.Curve001.geometry}
            material={materials.EmissionDarkBlue}
            position={[0.063, -3.712, 1.236]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={56.513}
          />
          <mesh
            name="Curve006"
            castShadow
            receiveShadow
            geometry={nodes.Curve006.geometry}
            material={materials.EmissionLightGrey}
            position={[0.063, -3.712, 1.236]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={56.513}
          />
          <mesh
            name="Curve007"
            castShadow
            receiveShadow
            geometry={nodes.Curve007.geometry}
            material={materials.TunnelBack}
            position={[0.047, 0.842, 1.077]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={56.513}
          />
          <group
            name="Empty003"
            position={[-0.1, -0.51, 0.405]}
            rotation={[2.781, -0.062, 3.045]}
            scale={3.773}
          >
            <mesh
              name="Vase002"
              castShadow
              receiveShadow
              geometry={nodes.Vase002.geometry}
              material={materials.Vase}
              position={[0.002, 0.034, -0.017]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={0.401}
            />
          </group>
          <mesh
            name="Text"
            castShadow
            receiveShadow
            geometry={nodes.Text.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-2.367, 3.462, 1.256]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={1.106}
          />
          <mesh
            name="Text005"
            castShadow
            receiveShadow
            geometry={nodes.Text005.geometry}
            material={materials.EmissionWhite}
            position={[0.063, -3.712, 1.383]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.659}
          />
        </group>
        <group
          name="SpeedLines001"
          position={[-11.29, 4.965, -0.643]}
          scale={[20.511, 31.994, 149.736]}
        >
          <mesh
            name="Plane146"
            castShadow
            receiveShadow
            geometry={nodes.Plane146.geometry}
            material={materials.EmissionWhite}
            position={[-0.652, 0.517, -6.237]}
            scale={[0.006, 0.009, 0.266]}
          />
          <mesh
            name="Plane243"
            castShadow
            receiveShadow
            geometry={nodes.Plane243.geometry}
            material={materials.EmissionWhite}
            position={[-0.46, 0.663, -6.237]}
            scale={[0.006, 0.009, 0.191]}
          />
          <mesh
            name="Plane245"
            castShadow
            receiveShadow
            geometry={nodes.Plane245.geometry}
            material={materials.EmissionWhite}
            position={[0.472, -0.203, -6.237]}
            scale={[0.006, 0.009, 0.106]}
          />
          <mesh
            name="Plane246"
            castShadow
            receiveShadow
            geometry={nodes.Plane246.geometry}
            material={materials.EmissionWhite}
            position={[-0.699, -0.796, -6.237]}
            scale={[0.006, 0.009, 0.134]}
          />
          <mesh
            name="Plane247"
            castShadow
            receiveShadow
            geometry={nodes.Plane247.geometry}
            material={materials.EmissionWhite}
            position={[-0.734, 0.165, -6.237]}
            scale={[0.006, 0.009, 0.287]}
          />
          <mesh
            name="Plane248"
            castShadow
            receiveShadow
            geometry={nodes.Plane248.geometry}
            material={materials.EmissionWhite}
            position={[0.945, 0.534, -6.237]}
            scale={[0.006, 0.009, 0.298]}
          />
          <mesh
            name="Plane250"
            castShadow
            receiveShadow
            geometry={nodes.Plane250.geometry}
            material={materials.EmissionWhite}
            position={[0.856, 0.545, -6.237]}
            scale={[0.006, 0.009, 0.205]}
          />
          <mesh
            name="Plane251"
            castShadow
            receiveShadow
            geometry={nodes.Plane251.geometry}
            material={materials.EmissionWhite}
            position={[-0.253, -0.752, -6.237]}
            scale={[0.006, 0.009, 0.125]}
          />
          <mesh
            name="Plane252"
            castShadow
            receiveShadow
            geometry={nodes.Plane252.geometry}
            material={materials.EmissionWhite}
            position={[-0.387, 0.657, -6.237]}
            scale={[0.006, 0.009, 0.286]}
          />
          <mesh
            name="Plane253"
            castShadow
            receiveShadow
            geometry={nodes.Plane253.geometry}
            material={materials.EmissionWhite}
            position={[0.654, -0.196, -6.237]}
            scale={[0.006, 0.009, 0.141]}
          />
          <mesh
            name="Plane254"
            castShadow
            receiveShadow
            geometry={nodes.Plane254.geometry}
            material={materials.EmissionWhite}
            position={[0.241, 0.021, -6.237]}
            scale={[0.006, 0.009, 0.292]}
          />
          <mesh
            name="Plane256"
            castShadow
            receiveShadow
            geometry={nodes.Plane256.geometry}
            material={materials.EmissionWhite}
            position={[-0.155, 0.014, -6.237]}
            scale={[0.006, 0.009, 0.14]}
          />
          <mesh
            name="Plane258"
            castShadow
            receiveShadow
            geometry={nodes.Plane258.geometry}
            material={materials.EmissionWhite}
            position={[0.434, -0.127, -6.237]}
            scale={[0.006, 0.009, 0.262]}
          />
          <mesh
            name="Plane262"
            castShadow
            receiveShadow
            geometry={nodes.Plane262.geometry}
            material={materials.EmissionWhite}
            position={[-1.001, -0.104, -6.237]}
            scale={[0.006, 0.009, 0.185]}
          />
          <mesh
            name="Plane263"
            castShadow
            receiveShadow
            geometry={nodes.Plane263.geometry}
            material={materials.EmissionWhite}
            position={[0.349, -0.91, -6.237]}
            scale={[0.006, 0.009, 0.238]}
          />
          <mesh
            name="Plane264"
            castShadow
            receiveShadow
            geometry={nodes.Plane264.geometry}
            material={materials.EmissionWhite}
            position={[-0.099, -0.353, -6.237]}
            scale={[0.006, 0.009, 0.272]}
          />
          <mesh
            name="Plane265"
            castShadow
            receiveShadow
            geometry={nodes.Plane265.geometry}
            material={materials.EmissionWhite}
            position={[-0.468, 0.287, -6.237]}
            scale={[0.006, 0.009, 0.227]}
          />
          <mesh
            name="Plane270"
            castShadow
            receiveShadow
            geometry={nodes.Plane270.geometry}
            material={materials.EmissionWhite}
            position={[-0.42, 0.309, -6.237]}
            scale={[0.006, 0.009, 0.185]}
          />
          <mesh
            name="Plane271"
            castShadow
            receiveShadow
            geometry={nodes.Plane271.geometry}
            material={materials.EmissionWhite}
            position={[0.283, 0.434, -6.237]}
            scale={[0.006, 0.009, 0.157]}
          />
          <mesh
            name="Plane273"
            castShadow
            receiveShadow
            geometry={nodes.Plane273.geometry}
            material={materials.EmissionWhite}
            position={[-0.315, 0.539, -6.237]}
            scale={[0.006, 0.009, 0.167]}
          />
          <mesh
            name="Plane278"
            castShadow
            receiveShadow
            geometry={nodes.Plane278.geometry}
            material={materials.EmissionWhite}
            position={[-0.199, -0.001, -6.237]}
            scale={[0.006, 0.009, 0.158]}
          />
          <mesh
            name="Plane280"
            castShadow
            receiveShadow
            geometry={nodes.Plane280.geometry}
            material={materials.EmissionWhite}
            position={[0.435, -0.261, -6.237]}
            scale={[0.006, 0.009, 0.315]}
          />
          <mesh
            name="Plane281"
            castShadow
            receiveShadow
            geometry={nodes.Plane281.geometry}
            material={materials.EmissionWhite}
            position={[0.346, -0.682, -6.237]}
            scale={[0.006, 0.009, 0.23]}
          />
          <mesh
            name="Plane282"
            castShadow
            receiveShadow
            geometry={nodes.Plane282.geometry}
            material={materials.EmissionWhite}
            position={[0.965, 0.145, -6.237]}
            scale={[0.006, 0.009, 0.287]}
          />
          <mesh
            name="Plane283"
            castShadow
            receiveShadow
            geometry={nodes.Plane283.geometry}
            material={materials.EmissionWhite}
            position={[-1.039, -0.087, -6.237]}
            scale={[0.006, 0.009, 0.169]}
          />
          <mesh
            name="Plane286"
            castShadow
            receiveShadow
            geometry={nodes.Plane286.geometry}
            material={materials.EmissionWhite}
            position={[-0.929, -0.088, -6.237]}
            scale={[0.006, 0.009, 0.302]}
          />
          <mesh
            name="Plane287"
            castShadow
            receiveShadow
            geometry={nodes.Plane287.geometry}
            material={materials.EmissionWhite}
            position={[-0.58, -0.285, -6.237]}
            scale={[0.006, 0.009, 0.118]}
          />
          <mesh
            name="Plane289"
            castShadow
            receiveShadow
            geometry={nodes.Plane289.geometry}
            material={materials.EmissionWhite}
            position={[-0.655, -0.049, -6.237]}
            scale={[0.006, 0.009, 0.225]}
          />
          <mesh
            name="Plane291"
            castShadow
            receiveShadow
            geometry={nodes.Plane291.geometry}
            material={materials.EmissionWhite}
            position={[0.493, 0.238, -6.237]}
            scale={[0.006, 0.009, 0.184]}
          />
          <mesh
            name="Plane292"
            castShadow
            receiveShadow
            geometry={nodes.Plane292.geometry}
            material={materials.EmissionWhite}
            position={[-0.205, -0.825, -6.237]}
            scale={[0.006, 0.009, 0.164]}
          />
          <mesh
            name="Plane293"
            castShadow
            receiveShadow
            geometry={nodes.Plane293.geometry}
            material={materials.EmissionWhite}
            position={[0.894, -0.791, -6.237]}
            scale={[0.006, 0.009, 0.165]}
          />
          <mesh
            name="Plane294"
            castShadow
            receiveShadow
            geometry={nodes.Plane294.geometry}
            material={materials.EmissionWhite}
            position={[-0.343, -0.18, -6.237]}
            scale={[0.006, 0.009, 0.141]}
          />
          <mesh
            name="Plane295"
            castShadow
            receiveShadow
            geometry={nodes.Plane295.geometry}
            material={materials.EmissionWhite}
            position={[-0.412, 0.461, -6.237]}
            scale={[0.006, 0.009, 0.174]}
          />
          <mesh
            name="Plane296"
            castShadow
            receiveShadow
            geometry={nodes.Plane296.geometry}
            material={materials.EmissionWhite}
            position={[-0.447, 0.121, -6.237]}
            scale={[0.006, 0.009, 0.247]}
          />
          <mesh
            name="Plane297"
            castShadow
            receiveShadow
            geometry={nodes.Plane297.geometry}
            material={materials.EmissionWhite}
            position={[-0.994, -0.735, -6.237]}
            scale={[0.006, 0.009, 0.18]}
          />
          <mesh
            name="Plane298"
            castShadow
            receiveShadow
            geometry={nodes.Plane298.geometry}
            material={materials.EmissionWhite}
            position={[-0.564, -0.89, -6.237]}
            scale={[0.006, 0.009, 0.237]}
          />
          <mesh
            name="Plane299"
            castShadow
            receiveShadow
            geometry={nodes.Plane299.geometry}
            material={materials.EmissionWhite}
            position={[1.001, -0.912, -6.237]}
            scale={[0.006, 0.009, 0.199]}
          />
          <mesh
            name="Plane300"
            castShadow
            receiveShadow
            geometry={nodes.Plane300.geometry}
            material={materials.EmissionWhite}
            position={[0.901, 0.142, -6.237]}
            scale={[0.006, 0.009, 0.249]}
          />
          <mesh
            name="Plane301"
            castShadow
            receiveShadow
            geometry={nodes.Plane301.geometry}
            material={materials.EmissionWhite}
            position={[-0.458, -0.113, -6.237]}
            scale={[0.006, 0.009, 0.256]}
          />
          <mesh
            name="Plane302"
            castShadow
            receiveShadow
            geometry={nodes.Plane302.geometry}
            material={materials.EmissionWhite}
            position={[0.165, -0.383, -6.237]}
            scale={[0.006, 0.009, 0.221]}
          />
          <mesh
            name="Plane303"
            castShadow
            receiveShadow
            geometry={nodes.Plane303.geometry}
            material={materials.EmissionWhite}
            position={[-0.25, 0.832, -6.237]}
            scale={[0.006, 0.009, 0.162]}
          />
          <mesh
            name="Plane304"
            castShadow
            receiveShadow
            geometry={nodes.Plane304.geometry}
            material={materials.EmissionWhite}
            position={[-0.932, -0.117, -6.237]}
            scale={[0.006, 0.009, 0.211]}
          />
          <mesh
            name="Plane305"
            castShadow
            receiveShadow
            geometry={nodes.Plane305.geometry}
            material={materials.EmissionWhite}
            position={[0.174, -0.65, -6.237]}
            scale={[0.006, 0.009, 0.217]}
          />
          <mesh
            name="Plane306"
            castShadow
            receiveShadow
            geometry={nodes.Plane306.geometry}
            material={materials.EmissionWhite}
            position={[-0.027, -0.619, -6.237]}
            scale={[0.006, 0.009, 0.194]}
          />
          <mesh
            name="Plane307"
            castShadow
            receiveShadow
            geometry={nodes.Plane307.geometry}
            material={materials.EmissionWhite}
            position={[0.781, 0.723, -6.237]}
            scale={[0.006, 0.009, 0.149]}
          />
          <mesh
            name="Plane308"
            castShadow
            receiveShadow
            geometry={nodes.Plane308.geometry}
            material={materials.EmissionWhite}
            position={[0.325, 0.58, -6.237]}
            scale={[0.006, 0.009, 0.149]}
          />
          <mesh
            name="Plane309"
            castShadow
            receiveShadow
            geometry={nodes.Plane309.geometry}
            material={materials.EmissionWhite}
            position={[-0.899, 0.35, -6.237]}
            scale={[0.006, 0.009, 0.209]}
          />
          <mesh
            name="Plane310"
            castShadow
            receiveShadow
            geometry={nodes.Plane310.geometry}
            material={materials.EmissionWhite}
            position={[-0.975, 0.448, -6.237]}
            scale={[0.006, 0.009, 0.19]}
          />
          <mesh
            name="Plane311"
            castShadow
            receiveShadow
            geometry={nodes.Plane311.geometry}
            material={materials.EmissionWhite}
            position={[0.746, 0.469, -6.237]}
            scale={[0.006, 0.009, 0.292]}
          />
          <mesh
            name="Plane312"
            castShadow
            receiveShadow
            geometry={nodes.Plane312.geometry}
            material={materials.EmissionWhite}
            position={[0.691, 0.752, -6.237]}
            scale={[0.006, 0.009, 0.106]}
          />
          <mesh
            name="Plane313"
            castShadow
            receiveShadow
            geometry={nodes.Plane313.geometry}
            material={materials.EmissionWhite}
            position={[0.538, -0.118, -6.237]}
            scale={[0.006, 0.009, 0.293]}
          />
          <mesh
            name="Plane314"
            castShadow
            receiveShadow
            geometry={nodes.Plane314.geometry}
            material={materials.EmissionWhite}
            position={[0.935, -0.634, -6.237]}
            scale={[0.006, 0.009, 0.321]}
          />
          <mesh
            name="Plane315"
            castShadow
            receiveShadow
            geometry={nodes.Plane315.geometry}
            material={materials.EmissionWhite}
            position={[-0.185, 0.047, -6.237]}
            scale={[0.006, 0.009, 0.109]}
          />
          <mesh
            name="Plane316"
            castShadow
            receiveShadow
            geometry={nodes.Plane316.geometry}
            material={materials.EmissionWhite}
            position={[-0.974, -0.06, -6.237]}
            scale={[0.006, 0.009, 0.142]}
          />
          <mesh
            name="Plane317"
            castShadow
            receiveShadow
            geometry={nodes.Plane317.geometry}
            material={materials.EmissionWhite}
            position={[1.015, -0.215, -6.237]}
            scale={[0.006, 0.009, 0.276]}
          />
          <mesh
            name="Plane318"
            castShadow
            receiveShadow
            geometry={nodes.Plane318.geometry}
            material={materials.EmissionWhite}
            position={[-0.446, -0.647, -6.237]}
            scale={[0.006, 0.009, 0.178]}
          />
          <mesh
            name="Plane319"
            castShadow
            receiveShadow
            geometry={nodes.Plane319.geometry}
            material={materials.EmissionWhite}
            position={[-0.414, -0.74, -6.237]}
            scale={[0.006, 0.009, 0.206]}
          />
          <mesh
            name="Plane320"
            castShadow
            receiveShadow
            geometry={nodes.Plane320.geometry}
            material={materials.EmissionWhite}
            position={[0.053, 1.425, -6.237]}
            scale={[0.006, 0.009, 0.123]}
          />
          <mesh
            name="Plane321"
            castShadow
            receiveShadow
            geometry={nodes.Plane321.geometry}
            material={materials.EmissionWhite}
            position={[0.704, 0.122, -6.237]}
            scale={[0.006, 0.009, 0.306]}
          />
          <mesh
            name="Plane322"
            castShadow
            receiveShadow
            geometry={nodes.Plane322.geometry}
            material={materials.EmissionWhite}
            position={[-0.103, -0.531, -6.237]}
            scale={[0.006, 0.009, 0.287]}
          />
          <mesh
            name="Plane323"
            castShadow
            receiveShadow
            geometry={nodes.Plane323.geometry}
            material={materials.EmissionWhite}
            position={[-0.182, -0.425, -6.237]}
            scale={[0.006, 0.009, 0.233]}
          />
          <mesh
            name="Plane324"
            castShadow
            receiveShadow
            geometry={nodes.Plane324.geometry}
            material={materials.EmissionWhite}
            position={[0.575, 0.673, -6.237]}
            scale={[0.006, 0.009, 0.313]}
          />
          <mesh
            name="Plane325"
            castShadow
            receiveShadow
            geometry={nodes.Plane325.geometry}
            material={materials.EmissionWhite}
            position={[0.959, -0.041, -6.237]}
            scale={[0.006, 0.009, 0.115]}
          />
          <mesh
            name="Plane326"
            castShadow
            receiveShadow
            geometry={nodes.Plane326.geometry}
            material={materials.EmissionWhite}
            position={[-0.397, 0.788, -6.237]}
            scale={[0.006, 0.009, 0.12]}
          />
          <mesh
            name="Plane327"
            castShadow
            receiveShadow
            geometry={nodes.Plane327.geometry}
            material={materials.EmissionWhite}
            position={[-0.409, 0.591, -6.237]}
            scale={[0.006, 0.009, 0.21]}
          />
          <mesh
            name="Plane328"
            castShadow
            receiveShadow
            geometry={nodes.Plane328.geometry}
            material={materials.EmissionWhite}
            position={[-0.298, -0.282, -6.237]}
            scale={[0.006, 0.009, 0.109]}
          />
          <mesh
            name="Plane329"
            castShadow
            receiveShadow
            geometry={nodes.Plane329.geometry}
            material={materials.EmissionWhite}
            position={[-0.13, -0.817, -6.237]}
            scale={[0.006, 0.009, 0.141]}
          />
          <mesh
            name="Plane330"
            castShadow
            receiveShadow
            geometry={nodes.Plane330.geometry}
            material={materials.EmissionWhite}
            position={[0.424, -0.787, -6.237]}
            scale={[0.006, 0.009, 0.227]}
          />
          <mesh
            name="Plane331"
            castShadow
            receiveShadow
            geometry={nodes.Plane331.geometry}
            material={materials.EmissionWhite}
            position={[0.85, 0.801, -6.237]}
            scale={[0.006, 0.009, 0.247]}
          />
          <mesh
            name="Plane332"
            castShadow
            receiveShadow
            geometry={nodes.Plane332.geometry}
            material={materials.EmissionWhite}
            position={[0.43, -0.501, -6.237]}
            scale={[0.006, 0.009, 0.207]}
          />
          <mesh
            name="Plane333"
            castShadow
            receiveShadow
            geometry={nodes.Plane333.geometry}
            material={materials.EmissionWhite}
            position={[0.719, 0.097, -6.237]}
            scale={[0.006, 0.009, 0.236]}
          />
          <mesh
            name="Plane334"
            castShadow
            receiveShadow
            geometry={nodes.Plane334.geometry}
            material={materials.EmissionWhite}
            position={[-0.971, 0.274, -6.237]}
            scale={[0.006, 0.009, 0.174]}
          />
          <mesh
            name="Plane335"
            castShadow
            receiveShadow
            geometry={nodes.Plane335.geometry}
            material={materials.EmissionWhite}
            position={[0.053, -0.295, -6.237]}
            scale={[0.006, 0.009, 0.172]}
          />
          <mesh
            name="Plane336"
            castShadow
            receiveShadow
            geometry={nodes.Plane336.geometry}
            material={materials.EmissionWhite}
            position={[-0.721, 0.045, -6.237]}
            scale={[0.006, 0.009, 0.278]}
          />
          <mesh
            name="Plane337"
            castShadow
            receiveShadow
            geometry={nodes.Plane337.geometry}
            material={materials.EmissionWhite}
            position={[0.602, -0.732, -6.237]}
            scale={[0.006, 0.009, 0.204]}
          />
          <mesh
            name="Plane338"
            castShadow
            receiveShadow
            geometry={nodes.Plane338.geometry}
            material={materials.EmissionWhite}
            position={[-0.175, 0.769, -6.237]}
            scale={[0.006, 0.009, 0.259]}
          />
          <mesh
            name="Plane339"
            castShadow
            receiveShadow
            geometry={nodes.Plane339.geometry}
            material={materials.EmissionWhite}
            position={[-0.043, -0.338, -6.237]}
            scale={[0.006, 0.009, 0.289]}
          />
          <mesh
            name="Plane340"
            castShadow
            receiveShadow
            geometry={nodes.Plane340.geometry}
            material={materials.EmissionWhite}
            position={[-0.656, 0.175, -6.237]}
            scale={[0.006, 0.009, 0.256]}
          />
          <mesh
            name="Plane341"
            castShadow
            receiveShadow
            geometry={nodes.Plane341.geometry}
            material={materials.EmissionWhite}
            position={[-0.333, -0.797, -6.237]}
            scale={[0.006, 0.009, 0.263]}
          />
          <mesh
            name="Plane342"
            castShadow
            receiveShadow
            geometry={nodes.Plane342.geometry}
            material={materials.EmissionWhite}
            position={[0.403, 0.709, -6.237]}
            scale={[0.006, 0.009, 0.13]}
          />
          <mesh
            name="Plane343"
            castShadow
            receiveShadow
            geometry={nodes.Plane343.geometry}
            material={materials.EmissionWhite}
            position={[0, -0.458, -6.237]}
            scale={[0.006, 0.009, 0.284]}
          />
          <mesh
            name="Plane344"
            castShadow
            receiveShadow
            geometry={nodes.Plane344.geometry}
            material={materials.EmissionWhite}
            position={[0.134, -0.674, -6.237]}
            scale={[0.006, 0.009, 0.322]}
          />
          <mesh
            name="Plane345"
            castShadow
            receiveShadow
            geometry={nodes.Plane345.geometry}
            material={materials.EmissionWhite}
            position={[-0.304, 0.463, -6.237]}
            scale={[0.006, 0.009, 0.282]}
          />
          <mesh
            name="Plane346"
            castShadow
            receiveShadow
            geometry={nodes.Plane346.geometry}
            material={materials.EmissionWhite}
            position={[-0.229, 0.677, -6.237]}
            scale={[0.006, 0.009, 0.269]}
          />
          <mesh
            name="Plane347"
            castShadow
            receiveShadow
            geometry={nodes.Plane347.geometry}
            material={materials.EmissionWhite}
            position={[-0.14, 0.705, -6.237]}
            scale={[0.006, 0.009, 0.239]}
          />
          <mesh
            name="Plane348"
            castShadow
            receiveShadow
            geometry={nodes.Plane348.geometry}
            material={materials.EmissionWhite}
            position={[0.598, 0.651, -6.237]}
            scale={[0.006, 0.009, 0.205]}
          />
          <mesh
            name="Plane349"
            castShadow
            receiveShadow
            geometry={nodes.Plane349.geometry}
            material={materials.EmissionWhite}
            position={[-0.289, -0.33, -6.237]}
            scale={[0.006, 0.009, 0.305]}
          />
          <mesh
            name="Plane350"
            castShadow
            receiveShadow
            geometry={nodes.Plane350.geometry}
            material={materials.EmissionWhite}
            position={[0.72, -0.223, -6.237]}
            scale={[0.006, 0.009, 0.123]}
          />
          <mesh
            name="Plane351"
            castShadow
            receiveShadow
            geometry={nodes.Plane351.geometry}
            material={materials.EmissionWhite}
            position={[-0.402, -0.218, -6.237]}
            scale={[0.006, 0.009, 0.259]}
          />
          <mesh
            name="Plane352"
            castShadow
            receiveShadow
            geometry={nodes.Plane352.geometry}
            material={materials.EmissionWhite}
            position={[1.004, 0.305, -6.237]}
            scale={[0.006, 0.009, 0.259]}
          />
          <mesh
            name="Plane353"
            castShadow
            receiveShadow
            geometry={nodes.Plane353.geometry}
            material={materials.EmissionWhite}
            position={[0.1, 0.89, -6.237]}
            scale={[0.006, 0.009, 0.222]}
          />
          <mesh
            name="Plane354"
            castShadow
            receiveShadow
            geometry={nodes.Plane354.geometry}
            material={materials.EmissionWhite}
            position={[-0.09, -0.752, -6.237]}
            scale={[0.006, 0.009, 0.126]}
          />
          <mesh
            name="Plane355"
            castShadow
            receiveShadow
            geometry={nodes.Plane355.geometry}
            material={materials.EmissionWhite}
            position={[-0.314, 0.419, -6.237]}
            scale={[0.006, 0.009, 0.193]}
          />
          <mesh
            name="Plane356"
            castShadow
            receiveShadow
            geometry={nodes.Plane356.geometry}
            material={materials.EmissionWhite}
            position={[0.211, -0.82, -6.237]}
            scale={[0.006, 0.009, 0.143]}
          />
          <mesh
            name="Plane357"
            castShadow
            receiveShadow
            geometry={nodes.Plane357.geometry}
            material={materials.EmissionWhite}
            position={[-0.091, -0.894, -6.237]}
            scale={[0.006, 0.009, 0.183]}
          />
          <mesh
            name="Plane358"
            castShadow
            receiveShadow
            geometry={nodes.Plane358.geometry}
            material={materials.EmissionWhite}
            position={[0.727, -0.129, -6.237]}
            scale={[0.006, 0.009, 0.168]}
          />
          <mesh
            name="Plane359"
            castShadow
            receiveShadow
            geometry={nodes.Plane359.geometry}
            material={materials.EmissionWhite}
            position={[-0.378, -0.702, -6.237]}
            scale={[0.006, 0.009, 0.281]}
          />
          <mesh
            name="Plane360"
            castShadow
            receiveShadow
            geometry={nodes.Plane360.geometry}
            material={materials.EmissionWhite}
            position={[0.044, -0.394, -6.237]}
            scale={[0.006, 0.009, 0.305]}
          />
          <mesh
            name="Plane361"
            castShadow
            receiveShadow
            geometry={nodes.Plane361.geometry}
            material={materials.EmissionWhite}
            position={[-0.24, -0.772, -6.237]}
            scale={[0.006, 0.009, 0.159]}
          />
          <mesh
            name="Plane362"
            castShadow
            receiveShadow
            geometry={nodes.Plane362.geometry}
            material={materials.EmissionWhite}
            position={[-0.102, -0.347, -6.237]}
            scale={[0.006, 0.009, 0.161]}
          />
          <mesh
            name="Plane363"
            castShadow
            receiveShadow
            geometry={nodes.Plane363.geometry}
            material={materials.EmissionWhite}
            position={[-0.333, 0.276, -6.212]}
            scale={[0.006, 0.009, 0.298]}
          />
          <mesh
            name="Plane364"
            castShadow
            receiveShadow
            geometry={nodes.Plane364.geometry}
            material={materials.EmissionWhite}
            position={[0.435, 0.649, -6.212]}
            scale={[0.006, 0.009, 0.31]}
          />
          <mesh
            name="Plane365"
            castShadow
            receiveShadow
            geometry={nodes.Plane365.geometry}
            material={materials.EmissionWhite}
            position={[-0.846, -0.368, -6.164]}
            scale={[0.006, 0.009, 0.117]}
          />
          <mesh
            name="Plane366"
            castShadow
            receiveShadow
            geometry={nodes.Plane366.geometry}
            material={materials.EmissionWhite}
            position={[1.029, -0.601, -6.059]}
            scale={[0.006, 0.009, 0.142]}
          />
          <mesh
            name="Plane367"
            castShadow
            receiveShadow
            geometry={nodes.Plane367.geometry}
            material={materials.EmissionWhite}
            position={[1.051, -0.037, -5.858]}
            scale={[0.006, 0.009, 0.24]}
          />
          <mesh
            name="Plane368"
            castShadow
            receiveShadow
            geometry={nodes.Plane368.geometry}
            material={materials.EmissionWhite}
            position={[0.813, 0.401, -5.858]}
            scale={[0.006, 0.009, 0.32]}
          />
          <mesh
            name="Plane369"
            castShadow
            receiveShadow
            geometry={nodes.Plane369.geometry}
            material={materials.EmissionWhite}
            position={[0.182, -0.574, -5.707]}
            scale={[0.006, 0.009, 0.142]}
          />
          <mesh
            name="Plane370"
            castShadow
            receiveShadow
            geometry={nodes.Plane370.geometry}
            material={materials.EmissionWhite}
            position={[-0.45, 0.234, -5.493]}
            scale={[0.006, 0.009, 0.207]}
          />
          <mesh
            name="Plane371"
            castShadow
            receiveShadow
            geometry={nodes.Plane371.geometry}
            material={materials.EmissionWhite}
            position={[0.428, 0.661, -5.235]}
            scale={[0.006, 0.009, 0.32]}
          />
          <mesh
            name="Plane372"
            castShadow
            receiveShadow
            geometry={nodes.Plane372.geometry}
            material={materials.EmissionWhite}
            position={[-0.514, 0.377, -5.235]}
            scale={[0.006, 0.009, 0.13]}
          />
          <mesh
            name="Plane373"
            castShadow
            receiveShadow
            geometry={nodes.Plane373.geometry}
            material={materials.EmissionWhite}
            position={[0.646, 0.855, -5.048]}
            scale={[0.006, 0.009, 0.183]}
          />
          <mesh
            name="Plane374"
            castShadow
            receiveShadow
            geometry={nodes.Plane374.geometry}
            material={materials.EmissionWhite}
            position={[-0.832, 0.877, -4.819]}
            scale={[0.006, 0.009, 0.263]}
          />
          <mesh
            name="Plane375"
            castShadow
            receiveShadow
            geometry={nodes.Plane375.geometry}
            material={materials.EmissionWhite}
            position={[0.493, 0.628, -4.46]}
            scale={[0.006, 0.009, 0.214]}
          />
          <mesh
            name="Plane376"
            castShadow
            receiveShadow
            geometry={nodes.Plane376.geometry}
            material={materials.EmissionWhite}
            position={[-1.05, -0.806, -4.46]}
            scale={[0.006, 0.009, 0.104]}
          />
          <mesh
            name="Plane377"
            castShadow
            receiveShadow
            geometry={nodes.Plane377.geometry}
            material={materials.EmissionWhite}
            position={[0.834, 0.433, -4.154]}
            scale={[0.006, 0.009, 0.203]}
          />
          <mesh
            name="Plane378"
            castShadow
            receiveShadow
            geometry={nodes.Plane378.geometry}
            material={materials.EmissionWhite}
            position={[-1.002, 0.89, -3.797]}
            scale={[0.006, 0.009, 0.211]}
          />
          <mesh
            name="Plane379"
            castShadow
            receiveShadow
            geometry={nodes.Plane379.geometry}
            material={materials.EmissionWhite}
            position={[0.705, 0.468, -3.428]}
            scale={[0.006, 0.009, 0.14]}
          />
          <mesh
            name="Plane380"
            castShadow
            receiveShadow
            geometry={nodes.Plane380.geometry}
            material={materials.EmissionWhite}
            position={[0.811, -0.058, -3.428]}
            scale={[0.006, 0.009, 0.19]}
          />
          <mesh
            name="Plane384"
            castShadow
            receiveShadow
            geometry={nodes.Plane384.geometry}
            material={materials.EmissionWhite}
            position={[3.311, -1.162, -0.853]}
            scale={[0.112, 0.165, 0.106]}
          />
          <mesh
            name="Plane385"
            castShadow
            receiveShadow
            geometry={nodes.Plane385.geometry}
            material={materials.EmissionWhite}
            position={[-4.38, 1.19, -0.843]}
            scale={[0.112, 0.165, 0.287]}
          />
          <mesh
            name="Plane386"
            castShadow
            receiveShadow
            geometry={nodes.Plane386.geometry}
            material={materials.EmissionWhite}
            position={[4.473, -1.117, -0.796]}
            scale={[0.112, 0.165, 0.141]}
          />
          <mesh
            name="Plane387"
            castShadow
            receiveShadow
            geometry={nodes.Plane387.geometry}
            material={materials.EmissionWhite}
            position={[-0.329, -2.117, -0.739]}
            scale={[0.112, 0.165, 0.272]}
          />
          <mesh
            name="Plane388"
            castShadow
            receiveShadow
            geometry={nodes.Plane388.geometry}
            material={materials.EmissionWhite}
            position={[-2.38, 2.106, -0.709]}
            scale={[0.112, 0.165, 0.185]}
          />
          <mesh
            name="Plane389"
            castShadow
            receiveShadow
            geometry={nodes.Plane389.geometry}
            material={materials.EmissionWhite}
            position={[-1.708, 3.571, -0.69]}
            scale={[0.112, 0.165, 0.167]}
          />
          <mesh
            name="Plane390"
            castShadow
            receiveShadow
            geometry={nodes.Plane390.geometry}
            material={materials.EmissionWhite}
            position={[-0.966, 0.13, -0.675]}
            scale={[0.112, 0.165, 0.158]}
          />
          <mesh
            name="Plane391"
            castShadow
            receiveShadow
            geometry={nodes.Plane391.geometry}
            material={materials.EmissionWhite}
            position={[3.08, -1.529, -0.632]}
            scale={[0.112, 0.165, 0.315]}
          />
          <mesh
            name="Plane392"
            castShadow
            receiveShadow
            geometry={nodes.Plane392.geometry}
            material={materials.EmissionWhite}
            position={[-3.401, -1.685, -0.53]}
            scale={[0.112, 0.165, 0.118]}
          />
          <mesh
            name="Plane393"
            castShadow
            receiveShadow
            geometry={nodes.Plane393.geometry}
            material={materials.EmissionWhite}
            position={[-3.877, -0.179, -0.502]}
            scale={[0.112, 0.165, 0.225]}
          />
          <mesh
            name="Plane394"
            castShadow
            receiveShadow
            geometry={nodes.Plane394.geometry}
            material={materials.EmissionWhite}
            position={[3.446, 1.652, -0.5]}
            scale={[0.112, 0.165, 0.184]}
          />
          <mesh
            name="Plane395"
            castShadow
            receiveShadow
            geometry={nodes.Plane395.geometry}
            material={materials.EmissionWhite}
            position={[-1.003, -5.13, -0.469]}
            scale={[0.112, 0.165, 0.164]}
          />
          <mesh
            name="Plane396"
            castShadow
            receiveShadow
            geometry={nodes.Plane396.geometry}
            material={materials.EmissionWhite}
            position={[-2.324, 3.075, -0.361]}
            scale={[0.112, 0.165, 0.174]}
          />
          <mesh
            name="Plane397"
            castShadow
            receiveShadow
            geometry={nodes.Plane397.geometry}
            material={materials.EmissionWhite}
            position={[-6.038, -4.556, -0.307]}
            scale={[0.112, 0.165, 0.18]}
          />
          <mesh
            name="Plane398"
            castShadow
            receiveShadow
            geometry={nodes.Plane398.geometry}
            material={materials.EmissionWhite}
            position={[-3.299, -5.545, -0.273]}
            scale={[0.112, 0.165, 0.237]}
          />
          <mesh
            name="Plane399"
            castShadow
            receiveShadow
            geometry={nodes.Plane399.geometry}
            material={materials.EmissionWhite}
            position={[6.687, -5.685, -0.204]}
            scale={[0.112, 0.165, 0.199]}
          />
          <mesh
            name="Plane400"
            castShadow
            receiveShadow
            geometry={nodes.Plane400.geometry}
            material={materials.EmissionWhite}
            position={[6.053, 1.042, -0.204]}
            scale={[0.112, 0.165, 0.249]}
          />
          <mesh
            name="Plane401"
            castShadow
            receiveShadow
            geometry={nodes.Plane401.geometry}
            material={materials.EmissionWhite}
            position={[1.356, -2.307, -0.115]}
            scale={[0.112, 0.165, 0.221]}
          />
          <mesh
            name="Plane402"
            castShadow
            receiveShadow
            geometry={nodes.Plane402.geometry}
            material={materials.EmissionWhite}
            position={[5.283, 4.746, 0.063]}
            scale={[0.112, 0.165, 0.149]}
          />
          <mesh
            name="Plane403"
            castShadow
            receiveShadow
            geometry={nodes.Plane403.geometry}
            material={materials.EmissionWhite}
            position={[2.378, 3.838, 0.063]}
            scale={[0.112, 0.165, 0.149]}
          />
          <mesh
            name="Plane404"
            castShadow
            receiveShadow
            geometry={nodes.Plane404.geometry}
            material={materials.EmissionWhite}
            position={[5.062, 3.126, 0.172]}
            scale={[0.112, 0.165, 0.292]}
          />
          <mesh
            name="Plane405"
            castShadow
            receiveShadow
            geometry={nodes.Plane405.geometry}
            material={materials.EmissionWhite}
            position={[3.733, -0.618, 0.194]}
            scale={[0.112, 0.165, 0.293]}
          />
        </group>
        <mesh
          name="Ray001"
          castShadow
          receiveShadow
          geometry={nodes.Ray001.geometry}
          material={materials.Ray}
          position={[-34.166, -16.118, -2.928]}
          rotation={[Math.PI / 2, 0, -0.966]}
          scale={[8.66, 9.944, 9.944]}
        />
        <mesh
          name="Railing_R001"
          castShadow
          receiveShadow
          geometry={nodes.Railing_R001.geometry}
          material={materials.Railing}
          position={[-6.432, 0.244, 29.2]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={0.483}
        />
        <mesh
          name="Railing_L001"
          castShadow
          receiveShadow
          geometry={nodes.Railing_L001.geometry}
          material={materials.Railing}
          position={[-16.774, 0.244, 29.2]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={0.483}
        />
        <mesh
          name="Railing001"
          castShadow
          receiveShadow
          geometry={nodes.Railing001.geometry}
          material={materials.CellShader}
          position={[-16.774, 0.244, 29.2]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={0.483}
        />
        <group
          name="MainSkeleton001"
          position={[-14.22, -0.009, 31.068]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={0.01}
        >
          <group
            name="Empty004"
            position={[-17.537, -79.267, -4.252]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={-5.872}
          >
            <PerspectiveCamera
              name="DutchCamera001"
              makeDefault={false}
              far={1000}
              near={0.01}
              fov={71.75}
              position={[1.715, 0.622, 11.066]}
              rotation={[0.42, 0.183, 0.305]}
              scale={-17.45}
            />
          </group>
          <skinnedMesh
            name="Hands001"
            geometry={nodes.Hands001.geometry}
            material={materials.Hands}
            skeleton={nodes.Hands001.skeleton}
          />
          <skinnedMesh
            name="Hoodie001"
            geometry={nodes.Hoodie001.geometry}
            material={materials.Hoodie}
            skeleton={nodes.Hoodie001.skeleton}
          />
          <skinnedMesh
            name="Label_L001"
            geometry={nodes.Label_L001.geometry}
            material={materials.BlueTag}
            skeleton={nodes.Label_L001.skeleton}
          />
          <group name="Label_R001">
            <skinnedMesh
              name="Object_1004"
              geometry={nodes.Object_1004.geometry}
              material={materials.BlueTag}
              skeleton={nodes.Object_1004.skeleton}
            />
            <skinnedMesh
              name="Object_1004_1"
              geometry={nodes.Object_1004_1.geometry}
              material={materials.EmissionLESSWhite}
              skeleton={nodes.Object_1004_1.skeleton}
            />
            <skinnedMesh
              name="Object_1004_2"
              geometry={nodes.Object_1004_2.geometry}
              material={materials["EmissionText.001"]}
              skeleton={nodes.Object_1004_2.skeleton}
            />
          </group>
          <skinnedMesh
            name="Label_R002"
            geometry={nodes.Label_R002.geometry}
            material={materials.EmissionMidtone}
            skeleton={nodes.Label_R002.skeleton}
          />
          <skinnedMesh
            name="Pants001"
            geometry={nodes.Pants001.geometry}
            material={materials.Pants}
            skeleton={nodes.Pants001.skeleton}
          />
          <skinnedMesh
            name="ShoeL_Body001"
            geometry={nodes.ShoeL_Body001.geometry}
            material={materials.ShoeL_Body}
            skeleton={nodes.ShoeL_Body001.skeleton}
          />
          <skinnedMesh
            name="ShoeL_Sole003"
            geometry={nodes.ShoeL_Sole003.geometry}
            material={materials["ShoeL_Sole.001"]}
            skeleton={nodes.ShoeL_Sole003.skeleton}
          />
          <skinnedMesh
            name="ShoeR001"
            geometry={nodes.ShoeR001.geometry}
            material={materials.ShoeR}
            skeleton={nodes.ShoeR001.skeleton}
          />
          <skinnedMesh
            name="ShoeR_Sole2001"
            geometry={nodes.ShoeR_Sole2001.geometry}
            material={materials.ShoeR_Sole}
            skeleton={nodes.ShoeR_Sole2001.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
        <mesh
          name="Ground001"
          castShadow
          receiveShadow
          geometry={nodes.Ground001.geometry}
          material={materials.Ground}
          position={[-14.184, -0.012, 16.985]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <group
          name="Empty002"
          position={[-6.06, -1.749, 14.137]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[-5.549, -0.358, -1.712]}
        >
          <group
            name="Curve074"
            position={[0, 0.094, 0]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[-2.492, -34.583, -7.239]}
          >
            <mesh
              name="Curve072"
              castShadow
              receiveShadow
              geometry={nodes.Curve072.geometry}
              material={materials.Gradient2}
            />
            <mesh
              name="Curve072_1"
              castShadow
              receiveShadow
              geometry={nodes.Curve072_1.geometry}
              material={materials.EmissionLESSWhite}
            />
          </group>
          <mesh
            name="Curve075"
            castShadow
            receiveShadow
            geometry={nodes.Curve075.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.923, -0.535, 0.714]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[-2.492, -34.583, -7.239]}
          />
          <mesh
            name="Curve076"
            castShadow
            receiveShadow
            geometry={nodes.Curve076.geometry}
            material={materials.MainBlue}
            position={[-0.923, -0.715, 0.714]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[-2.492, -34.583, -7.239]}
          />
          <mesh
            name="Curve077"
            castShadow
            receiveShadow
            geometry={nodes.Curve077.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.463, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve078"
            castShadow
            receiveShadow
            geometry={nodes.Curve078.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.09, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve079"
            castShadow
            receiveShadow
            geometry={nodes.Curve079.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.187, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve080"
            castShadow
            receiveShadow
            geometry={nodes.Curve080.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.367, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve081"
            castShadow
            receiveShadow
            geometry={nodes.Curve081.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.408, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve082"
            castShadow
            receiveShadow
            geometry={nodes.Curve082.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.146, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve083"
            castShadow
            receiveShadow
            geometry={nodes.Curve083.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.131, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve084"
            castShadow
            receiveShadow
            geometry={nodes.Curve084.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.422, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve085"
            castShadow
            receiveShadow
            geometry={nodes.Curve085.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.643, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve086"
            castShadow
            receiveShadow
            geometry={nodes.Curve086.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.243, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve087"
            castShadow
            receiveShadow
            geometry={nodes.Curve087.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.31, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve088"
            castShadow
            receiveShadow
            geometry={nodes.Curve088.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.034, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve089"
            castShadow
            receiveShadow
            geometry={nodes.Curve089.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.587, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve090"
            castShadow
            receiveShadow
            geometry={nodes.Curve090.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.808, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve091"
            castShadow
            receiveShadow
            geometry={nodes.Curve091.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.38, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve092"
            castShadow
            receiveShadow
            geometry={nodes.Curve092.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.173, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve093"
            castShadow
            receiveShadow
            geometry={nodes.Curve093.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.103, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve094"
            castShadow
            receiveShadow
            geometry={nodes.Curve094.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.45, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve095"
            castShadow
            receiveShadow
            geometry={nodes.Curve095.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.671, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve096"
            castShadow
            receiveShadow
            geometry={nodes.Curve096.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.271, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve097"
            castShadow
            receiveShadow
            geometry={nodes.Curve097.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.283, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve098"
            castShadow
            receiveShadow
            geometry={nodes.Curve098.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.006, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve099"
            castShadow
            receiveShadow
            geometry={nodes.Curve099.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.559, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve100"
            castShadow
            receiveShadow
            geometry={nodes.Curve100.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.78, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve101"
            castShadow
            receiveShadow
            geometry={nodes.Curve101.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.352, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve102"
            castShadow
            receiveShadow
            geometry={nodes.Curve102.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.201, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve103"
            castShadow
            receiveShadow
            geometry={nodes.Curve103.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.076, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve104"
            castShadow
            receiveShadow
            geometry={nodes.Curve104.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.478, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve105"
            castShadow
            receiveShadow
            geometry={nodes.Curve105.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.699, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve106"
            castShadow
            receiveShadow
            geometry={nodes.Curve106.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.299, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve107"
            castShadow
            receiveShadow
            geometry={nodes.Curve107.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.255, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve108"
            castShadow
            receiveShadow
            geometry={nodes.Curve108.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.022, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve109"
            castShadow
            receiveShadow
            geometry={nodes.Curve109.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.531, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve110"
            castShadow
            receiveShadow
            geometry={nodes.Curve110.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.753, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve111"
            castShadow
            receiveShadow
            geometry={nodes.Curve111.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.325, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve112"
            castShadow
            receiveShadow
            geometry={nodes.Curve112.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.228, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve113"
            castShadow
            receiveShadow
            geometry={nodes.Curve113.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.049, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve114"
            castShadow
            receiveShadow
            geometry={nodes.Curve114.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.505, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve115"
            castShadow
            receiveShadow
            geometry={nodes.Curve115.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.726, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve116"
            castShadow
            receiveShadow
            geometry={nodes.Curve116.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.436, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve117"
            castShadow
            receiveShadow
            geometry={nodes.Curve117.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.118, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve118"
            castShadow
            receiveShadow
            geometry={nodes.Curve118.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.159, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve119"
            castShadow
            receiveShadow
            geometry={nodes.Curve119.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.394, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve120"
            castShadow
            receiveShadow
            geometry={nodes.Curve120.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.215, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve121"
            castShadow
            receiveShadow
            geometry={nodes.Curve121.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.338, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve122"
            castShadow
            receiveShadow
            geometry={nodes.Curve122.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.061, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve123"
            castShadow
            receiveShadow
            geometry={nodes.Curve123.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.615, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
          <mesh
            name="Curve124"
            castShadow
            receiveShadow
            geometry={nodes.Curve124.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.836, -0.431, 0]}
            scale={[-4.011, -51.297, 0]}
          />
        </group>
        <group
          name="Empty"
          position={[-5.005, -3.708, 20.859]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[2.764, 0.348, 5.853]}
        >
          <group
            name="Curve"
            position={[0.002, -0.258, 0.116]}
            scale={[9.78, 99.402, 5.911]}
          >
            <mesh
              name="Curve_1"
              castShadow
              receiveShadow
              geometry={nodes.Curve_1.geometry}
              material={materials.TunnelBack}
            />
            <mesh
              name="Curve_2"
              castShadow
              receiveShadow
              geometry={nodes.Curve_2.geometry}
              material={materials.EmissionLESSWhite}
            />
          </group>
          <mesh
            name="Curve002"
            castShadow
            receiveShadow
            geometry={nodes.Curve002.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.073, 0, -0.582]}
            scale={[9.78, 99.402, 5.911]}
          />
          <mesh
            name="Curve003"
            castShadow
            receiveShadow
            geometry={nodes.Curve003.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.255, 0, -0.76]}
            scale={[9.78, 99.402, 5.911]}
          />
          <mesh
            name="Curve011"
            castShadow
            receiveShadow
            geometry={nodes.Curve011.geometry}
            material={materials.LightBlue}
            position={[-0.695, -0.258, 0.765]}
            scale={0}
          />
          <mesh
            name="Curve012"
            castShadow
            receiveShadow
            geometry={nodes.Curve012.geometry}
            material={materials.LightBlue}
            position={[-0.695, -0.258, 0.767]}
            scale={0}
          />
          <mesh
            name="Curve013"
            castShadow
            receiveShadow
            geometry={nodes.Curve013.geometry}
            material={materials.LightBlue}
            position={[0.722, -0.258, 0.763]}
            scale={0}
          />
          <mesh
            name="Curve014"
            castShadow
            receiveShadow
            geometry={nodes.Curve014.geometry}
            material={materials.LightBlue}
            position={[-0.695, -0.258, 0.759]}
            scale={0}
          />
          <mesh
            name="Curve015"
            castShadow
            receiveShadow
            geometry={nodes.Curve015.geometry}
            material={materials.LightBlue}
            position={[0.722, -0.258, 0.759]}
            scale={0}
          />
          <mesh
            name="Curve016"
            castShadow
            receiveShadow
            geometry={nodes.Curve016.geometry}
            material={materials.LightBlue}
            position={[-0.695, -0.258, 0.755]}
            scale={0}
          />
          <mesh
            name="Curve017"
            castShadow
            receiveShadow
            geometry={nodes.Curve017.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.004, -0.258, 0.76]}
            scale={[9.78, 99.402, 5.911]}
          >
            <mesh
              name="Text002"
              castShadow
              receiveShadow
              geometry={nodes.Text002.geometry}
              material={materials.TunnelBack}
              position={[-0.06, 0.003, 0.004]}
              scale={[0.015, 0.012, 0.012]}
            />
          </mesh>
          <mesh
            name="Curve018"
            castShadow
            receiveShadow
            geometry={nodes.Curve018.geometry}
            material={materials.EmissionLESSWhite}
            position={[0.594, 0, 0.761]}
            scale={[11.693, 99.402, 5.911]}
          />
          <group name="Curve067" position={[0, 0.299, 0.118]} scale={0}>
            <mesh
              name="Curve005_1"
              castShadow
              receiveShadow
              geometry={nodes.Curve005_1.geometry}
              material={materials.Gradient1}
            />
            <mesh
              name="Curve005_2"
              castShadow
              receiveShadow
              geometry={nodes.Curve005_2.geometry}
              material={materials.EmissionLESSWhite}
            />
            <group name="Curve070" position={[-64, -32, 0]} scale={0}>
              <mesh
                name="Curve004_2"
                castShadow
                receiveShadow
                geometry={nodes.Curve004_2.geometry}
                material={materials.EmissionSomewhatWhite}
              />
              <mesh
                name="Curve004_3"
                castShadow
                receiveShadow
                geometry={nodes.Curve004_3.geometry}
                material={materials.EmissionLESSWhite}
              />
            </group>
          </group>
          <mesh
            name="Curve068"
            castShadow
            receiveShadow
            geometry={nodes.Curve068.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.578, 0.13, 0.761]}
            scale={[11.213, 99.402, 5.911]}
          />
          <mesh
            name="Curve069"
            castShadow
            receiveShadow
            geometry={nodes.Curve069.geometry}
            material={materials.MainBlue}
            position={[0.528, -0.093, -0.759]}
            scale={[9.78, 99.402, 5.911]}
          />
          <mesh
            name="Text001"
            castShadow
            receiveShadow
            geometry={nodes.Text001.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.008, 0, 0.379]}
            scale={0}
          />
        </group>
        <mesh
          name="darktexture"
          castShadow
          receiveShadow
          geometry={nodes.darktexture.geometry}
          material={materials.darktexture}
          position={[-6.05, -6.965, 17.409]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[3.548, 3.17, 3.17]}
        >
          <mesh
            name="Confirm"
            castShadow
            receiveShadow
            geometry={nodes.Confirm.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.363, -0.013, 1.881]}
            scale={0}
          >
            <mesh
              name="Cube001"
              castShadow
              receiveShadow
              geometry={nodes.Cube001.geometry}
              material={materials.TunnelBack}
              scale={0}
            >
              <mesh
                name="Cylinder001"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder001.geometry}
                material={materials.EmissionSomewhatWhite}
                position={[-64, -256, 0]}
                scale={0}
              />
            </mesh>
          </mesh>
          <mesh
            name="Done"
            castShadow
            receiveShadow
            geometry={nodes.Done.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.359, -0.013, 2.123]}
            scale={0}
          >
            <mesh
              name="Cube003"
              castShadow
              receiveShadow
              geometry={nodes.Cube003.geometry}
              material={materials.TunnelBack}
              position={[-64, 0, -128]}
              scale={0}
            >
              <mesh
                name="Cylinder002"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder002.geometry}
                material={materials.EmissionSomewhatWhite}
                scale={0}
              />
            </mesh>
          </mesh>
          <mesh
            name="Speak"
            castShadow
            receiveShadow
            geometry={nodes.Speak.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.368, -0.013, -0.282]}
            rotation={[0, 0, -Math.PI]}
            scale={0.191}
          >
            <mesh
              name="Cube"
              castShadow
              receiveShadow
              geometry={nodes.Cube.geometry}
              material={materials.TunnelBack}
              position={[3.568, 0.045, -0.296]}
              rotation={[0, -Math.PI / 4, Math.PI / 2]}
              scale={0.053}
            >
              <mesh
                name="Cylinder"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder.geometry}
                material={materials.EmissionSomewhatWhite}
                position={[-0.612, 0.034, -0.171]}
                rotation={[2.356, 0, Math.PI / 2]}
                scale={[4.474, 0.233, 4.474]}
              />
            </mesh>
          </mesh>
        </mesh>
        <mesh
          name="Curve127"
          castShadow
          receiveShadow
          geometry={nodes.Curve127.geometry}
          material={materials.EmissionSomewhatWhite}
          position={[-11.245, 12.856, 7.236]}
          rotation={[1.873, 0, 0]}
          scale={15.174}
        />
        <mesh
          name="Curve126"
          castShadow
          receiveShadow
          geometry={nodes.Curve126.geometry}
          material={materials.EmissionSomewhatWhite}
          position={[-11.245, 12.856, 7.236]}
          rotation={[1.873, 0, 0]}
          scale={15.174}
        />
        <group
          name="checkoutCTRL001"
          position={[-22.462, -3.388, 19.929]}
          rotation={[0, 0.966, 0]}
          scale={[1.151, 1.347, 1.347]}
        >
          <group
            name="Coin001"
            position={[0, 0.544, -0.006]}
            rotation={[1.929, -0.194, 1.008]}
            scale={1.478}
          >
            <mesh
              name="Cylinder001_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder001_1.geometry}
              material={materials.Coin}
            />
            <mesh
              name="Cylinder001_2"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder001_2.geometry}
              material={materials.CoinSide}
            />
            <mesh
              name="$_Svg001"
              castShadow
              receiveShadow
              geometry={nodes.$_Svg001.geometry}
              material={materials.Dollar}
              position={[0, 0.074, 0]}
              scale={0}
            />
            <mesh
              name="£_svg001"
              castShadow
              receiveShadow
              geometry={nodes["£_svg001"].geometry}
              material={materials.Pound}
              position={[-0.042, -0.135, -0.138]}
              rotation={[-0.013, 0.614, -3.132]}
              scale={[94.378, 99.941, 89.649]}
            />
            <mesh
              name="¥_svg001"
              castShadow
              receiveShadow
              geometry={nodes["¥_svg001"].geometry}
              material={materials.Yen}
              position={[0.051, -0.047, 0.047]}
              scale={0}
            />
            <mesh
              name="€_svg001"
              castShadow
              receiveShadow
              geometry={nodes["€_svg001"].geometry}
              material={materials.Euro}
              position={[-0.019, 0.083, -0.04]}
              scale={0}
            />
          </group>
          <mesh
            name="Curve004"
            castShadow
            receiveShadow
            geometry={nodes.Curve004.geometry}
            material={materials.TunnelBack}
            position={[0, 0.296, -0.006]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={36.649}
          />
          <mesh
            name="GlobalCheckout001"
            castShadow
            receiveShadow
            geometry={nodes.GlobalCheckout001.geometry}
            material={materials.GlobalCheckout}
            position={[0, -1.666, 0.013]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>
        <group name="BézierCurve002" />
        <mesh
          name="BillboardInt003"
          castShadow
          receiveShadow
          geometry={nodes.BillboardInt003.geometry}
          material={materials.TunnelBack}
          position={[-11.217, 29.239, -28.505]}
          rotation={[-Math.PI, 0.004, -Math.PI]}
          scale={0.398}
        />
        <mesh
          name="BillboardInt002"
          castShadow
          receiveShadow
          geometry={nodes.BillboardInt002.geometry}
          material={materials.Tunnel}
          position={[-11.363, 14.504, 7.409]}
          rotation={[-Math.PI, 0.004, -Math.PI]}
          scale={0.398}
        >
          <mesh
            name="Billboard001"
            castShadow
            receiveShadow
            geometry={nodes.Billboard001.geometry}
            material={materials.Billboard}
            position={[-0.003, -36.426, -0.885]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            scale={2.51}
          />
        </mesh>
        <mesh
          name="BillboardInt001"
          castShadow
          receiveShadow
          geometry={nodes.BillboardInt001.geometry}
          material={materials.TunnelBack}
          position={[-11.363, 14.504, 7.409]}
          rotation={[-Math.PI, 0.004, -Math.PI]}
          scale={0.398}
        />
        <group
          name="BagArmature001"
          position={[-14.013, 0.828, 31.02]}
          rotation={[-0.444, -0.165, -3.117]}
          scale={0.182}
        >
          <skinnedMesh
            name="Shopping_Bag001"
            geometry={nodes.Shopping_Bag001.geometry}
            material={materials.Bag}
            skeleton={nodes.Shopping_Bag001.skeleton}
          />
          <primitive object={nodes.Bone} />
        </group>
        <mesh
          name="AdSpends001"
          castShadow
          receiveShadow
          geometry={nodes.AdSpends001.geometry}
          material={materials.AdSpends}
          position={[-2.14, -4.793, 9.713]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[5.382, 5.984, 5.984]}
        >
          <mesh
            name="Cube005"
            castShadow
            receiveShadow
            geometry={nodes.Cube005.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.28, 0.024, 0.391]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            scale={[0.018, 0.035, 0.081]}
          />
          <mesh
            name="Cube006"
            castShadow
            receiveShadow
            geometry={nodes.Cube006.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[-0.12, 0.024, 0.391]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            scale={[0.018, 0.05, 0.081]}
          />
          <mesh
            name="Cube007"
            castShadow
            receiveShadow
            geometry={nodes.Cube007.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.182, 0.024, 0.391]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            scale={[0.018, 0.19, 0.081]}
          />
          <mesh
            name="Cube008"
            castShadow
            receiveShadow
            geometry={nodes.Cube008.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.332, 0.024, 0.391]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            scale={[0.018, 0.435, 0.081]}
          />
          <mesh
            name="Cube009"
            castShadow
            receiveShadow
            geometry={nodes.Cube009.geometry}
            material={materials.EmissionSomewhatWhite}
            position={[0.03, 0.024, 0.391]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            scale={[0.018, 0.081, 0.081]}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/Sprint.glb");
