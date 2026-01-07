import { useGLTF } from "@react-three/drei";
import word3D from '/gltf-models/world_3d/world_3d.gltf';

const Map3D = ({ ...props }) => {
  const gltf = useGLTF(word3D);

  return (
    <mesh {...props}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}

export default Map3D