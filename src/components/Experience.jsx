// Experience.jsx — pass ref through
import Model from "./Model.jsx"
const Experience = ({ clipName = null, scrollProgressRef }) => {
  return (
    <group position={[15, -1, -28]}>
      <Model clipName={clipName} scrollProgressRef={scrollProgressRef} />
    </group>
  )
}
export default Experience