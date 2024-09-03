import { useGLTF } from "@react-three/drei"
import word2D from '/gltfModels/world_2d/world_2d.gltf'

const Map2D = ({ ...props }) => {
  const gltf = useGLTF(word2D);
  const scene = gltf.scene;

  return (
    <mesh {...props}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Map2D