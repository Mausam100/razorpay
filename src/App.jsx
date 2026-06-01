// App.jsx
import { Canvas } from "@react-three/fiber"
import { useRef } from "react"
import Experience from "./components/Experience.jsx"
import CameraRig, { cameraConfig } from "./components/CameraRig.jsx"

function App() {
  // ONE ref created here, passed to BOTH components
  const scrollProgressRef = useRef(0)

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <div id="canvas-pin" style={{ width: "100%", height: "100dvh" }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 55 }}
          style={{ width: "100%", height: "100%", display: "block" }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={["#2a3cfd"]} />

          {/* same ref → CameraRig writes to it */}
          <CameraRig
            path={cameraConfig.path}
            look={cameraConfig.look}
            scrollEnd={cameraConfig.scrollEnd}
            scrollProgressRef={scrollProgressRef}
          />

          {/* same ref → Model reads from it */}
          <Experience scrollProgressRef={scrollProgressRef} />
        </Canvas>
      </div>
    </div>
  )
}

export default App