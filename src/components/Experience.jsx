// Experience.jsx — pass ref through
import Model from "./Model.jsx"
import { Line } from '@react-three/drei'
import { cameraConfig } from './CameraRig.jsx'
const Experience = ({ clipName = null, scrollProgressRef }) => {
  const points = cameraConfig?.path ?? []
  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <group position={[15, -1, -28]} rotation={[0, 0, 0]}>
        <Model clipName={clipName} scrollProgressRef={scrollProgressRef} />
      </group>
      {/* {points.length > 1 && (
        <Line points={points} color="#ff2b2b" lineWidth={4} dashed={false} />
      )} */}
    </group>
  )
}
export default Experience