import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export  function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/robot.glb')
  const { actions } = useAnimations(animations, group)
  React.useEffect(() => {
    actions["Armature.013Action"].play()
  }, [actions])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature013" position={[-1, 1.58, 0.17]} rotation={[-1.99, -1.08, -1.88]} scale={0.15}>
          <group name="Bone" position={[-2.9, -2.64, -8.33]} rotation={[-1.46, -1.06, -1.84]}>
            <group name="piston" position={[-0.29, 0.51, -0.04]} rotation={[0, 0, 1.66]}>
              <group name="Sphere014" position={[-0.09, -0.6, 0]} rotation={[0, 0, -1.66]}>
                <mesh name="Sphere010_1" geometry={nodes.Sphere010_1.geometry} material={materials['chrome.010']} />
                <mesh name="Sphere010_2" geometry={nodes.Sphere010_2.geometry} material={materials['plastic.008']} />
              </group>
            </group>
            <group name="piston002" position={[-0.29, 0.62, -0.04]} rotation={[0, 0, 1.32]}>
              <group name="Sphere016" position={[0, 0, 0.02]} rotation={[-0.06, -0.03, -3.14]} scale={[0.79, 1.02, 0.79]}>
                <mesh name="Sphere015_1" geometry={nodes.Sphere015_1.geometry} material={materials['chrome.010']} />
                <mesh name="Sphere015_2" geometry={nodes.Sphere015_2.geometry} material={materials['plastic.008']} />
              </group>
            </group>
            <group name="piston004" position={[0.28, 0.48, -0.01]} rotation={[0, 0, -1.67]}>
              <group name="Sphere009" position={[0.09, -0.61, 0]} rotation={[-3.14, 0, -1.66]} scale={-1}>
                <mesh name="Sphere013_1" geometry={nodes.Sphere013_1.geometry} material={materials['chrome.010']} />
                <mesh name="Sphere013_2" geometry={nodes.Sphere013_2.geometry} material={materials['plastic.008']} />
              </group>
            </group>
            <group name="piston006" position={[0.27, 0.58, -0.01]} rotation={[0, 0, -1.31]}>
              <group name="Sphere011" position={[-0.01, 0.05, 0.02]} rotation={[3.14, 0, -1.31]} scale={-1}>
                <mesh name="Sphere016_1" geometry={nodes.Sphere016_1.geometry} material={materials['chrome.010']} />
                <mesh name="Sphere016_2" geometry={nodes.Sphere016_2.geometry} material={materials['plastic.008']} />
              </group>
            </group>
            <group name="Bone007" position={[-0.5, -0.08, -0.27]} rotation={[0.43, -0.32, -3.08]}>
              <group name="Bone008" position={[0, 0.64, 0]} rotation={[0, 0, -0.44]}>
                <group name="Plane113" position={[0.39, -0.91, 0.27]} rotation={[0, 0, -0.84]}>
                  <mesh name="Plane113_1" geometry={nodes.Plane113_1.geometry} material={materials['plastic.008']} />
                  <mesh name="Plane113_2" geometry={nodes.Plane113_2.geometry} material={materials['body.013']} />
                </group>
              </group>
              <group name="Cylinder275" position={[-0.89, 0.22, 0.27]} rotation={[0, 0, -2.38]}>
                <mesh name="Cylinder275_1" geometry={nodes.Cylinder275_1.geometry} material={materials['body.013']} />
                <mesh name="Cylinder275_2" geometry={nodes.Cylinder275_2.geometry} material={materials['plastic.008']} />
                <mesh name="Cylinder275_3" geometry={nodes.Cylinder275_3.geometry} material={materials['logo.001']} />
              </group>
            </group>
            <group name="Bone009" position={[-0.5, -0.08, 0.28]} rotation={[0.48, 1, 2.71]}>
              <group name="Bone010" position={[0, 0.64, 0]} rotation={[0, 0, -0.29]}>
                <group name="Plane115" position={[0.39, -0.91, -0.28]} rotation={[0, 0, -0.84]}>
                  <mesh name="Plane115_1" geometry={nodes.Plane115_1.geometry} material={materials['plastic.008']} />
                  <mesh name="Plane115_2" geometry={nodes.Plane115_2.geometry} material={materials['body.013']} />
                </group>
              </group>
              <group name="Cylinder276" position={[-0.89, 0.22, -0.28]} rotation={[0, 0, -2.38]}>
                <mesh name="Cylinder276_1" geometry={nodes.Cylinder276_1.geometry} material={materials['body.013']} />
                <mesh name="Cylinder276_2" geometry={nodes.Cylinder276_2.geometry} material={materials['plastic.008']} />
                <mesh name="Cylinder276_3" geometry={nodes.Cylinder276_3.geometry} material={materials['logo.001']} />
              </group>
            </group>
            <group name="Bone011" position={[0.49, -0.08, -0.27]} rotation={[1.13, -0.62, 2.57]}>
              <group name="Bone012" position={[0, 0.64, 0]} rotation={[0, 0, 1.55]} />
            </group>
            <group name="Bone013" position={[0.49, -0.08, 0.28]} rotation={[0.43, -1.09, 2.97]}>
              <group name="Bone014" position={[0, 0.64, 0]} rotation={[0, 0, 0.65]}>
                <group name="Plane111" position={[-0.39, -0.9, -0.28]} rotation={[Math.PI, 0, -0.84]} scale={-1}>
                  <mesh name="Plane111_1" geometry={nodes.Plane111_1.geometry} material={materials['plastic.008']} />
                  <mesh name="Plane111_2" geometry={nodes.Plane111_2.geometry} material={materials['body.013']} />
                </group>
              </group>
              <group name="Cylinder274" position={[0.89, 0.23, -0.28]} rotation={[-Math.PI, 0, -2.38]} scale={-1}>
                <mesh name="Cylinder274_1" geometry={nodes.Cylinder274_1.geometry} material={materials['body.013']} />
                <mesh name="Cylinder274_2" geometry={nodes.Cylinder274_2.geometry} material={materials['plastic.008']} />
                <mesh name="Cylinder274_3" geometry={nodes.Cylinder274_3.geometry} material={materials['logo.001']} />
              </group>
            </group>
            <group name="Bone001" position={[-0.9, 0.43, -0.04]} rotation={[0, 0.01, -0.15]}>
              <group name="Bone002" position={[0.22, 0.23, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                <group name="Bone003" position={[0, 0.23, -0.01]}>
                  <group name="Cube052" position={[0.97, -0.23, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh name="Cube050_1" geometry={nodes.Cube050_1.geometry} material={materials['chrome.010']} />
                    <mesh name="Cube050_2" geometry={nodes.Cube050_2.geometry} material={materials['fire.005']} />
                    <mesh name="Cube050_3" geometry={nodes.Cube050_3.geometry} material={materials['plastic.008']} />
                  </group>
                </group>
                <mesh name="Cube051" geometry={nodes.Cube051.geometry} material={materials['plastic.008']} position={[0.97, 0.13, 0.18]} rotation={[-Math.PI / 2, 0, 0]} />
              </group>
              <group name="piston001" position={[0, 0.03, 0]} rotation={[1.57, 0.24, -1.56]}>
                <group name="Sphere013" position={[0, 1.18, 0.09]} rotation={[-3.13, -1.57, -1.65]}>
                  <mesh name="Sphere011_1" geometry={nodes.Sphere011_1.geometry} material={materials['plastic.008']} />
                  <mesh name="Sphere011_2" geometry={nodes.Sphere011_2.geometry} material={materials['chrome.010']} />
                </group>
              </group>
              <group name="piston003" position={[0.02, 0.33, 0.01]} rotation={[1.57, -0.11, -1.56]}>
                <group name="Sphere015" position={[0, 1.2, -0.02]} rotation={[3.01, -1.57, -1.44]}>
                  <mesh name="Sphere009_1" geometry={nodes.Sphere009_1.geometry} material={materials['plastic.008']} />
                  <mesh name="Sphere009_2" geometry={nodes.Sphere009_2.geometry} material={materials['chrome.010']} />
                </group>
              </group>
              <group name="Sphere017" position={[0.02, 0.23, -0.15]} rotation={[Math.PI / 2, 0.15, 0]}>
                <mesh name="Sphere018" geometry={nodes.Sphere018.geometry} material={materials['body.013']} />
                <mesh name="Sphere018_1" geometry={nodes.Sphere018_1.geometry} material={materials['logo.001']} />
              </group>
            </group>
            <group name="Bone004" position={[0.84, 0.4, -0.01]}>
              <group name="Bone005" position={[-0.22, 0.23, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                <group name="Bone006" position={[0, 0.24, -0.01]}>
                  <group name="Cube050" position={[-0.98, -0.23, 0.18]} rotation={[Math.PI / 2, 0, 0]} scale={-1}>
                    <mesh name="Cube048" geometry={nodes.Cube048.geometry} material={materials['chrome.010']} />
                    <mesh name="Cube048_1" geometry={nodes.Cube048_1.geometry} material={materials['fire.005']} />
                    <mesh name="Cube048_2" geometry={nodes.Cube048_2.geometry} material={materials['plastic.008']} />
                  </group>
                </group>
                <mesh name="Cube049" geometry={nodes.Cube049.geometry} material={materials['plastic.008']} position={[-0.98, 0.13, 0.18]} rotation={[Math.PI / 2, 0, 0]} scale={-1} />
              </group>
              <group name="piston005" position={[0, 0.03, 0]} rotation={[-1.57, 0.1, 1.57]}>
                <group name="Sphere010" position={[0.01, 1.19, -0.09]} rotation={[0.02, 1.57, -1.68]} scale={-1}>
                  <mesh name="Sphere014_1" geometry={nodes.Sphere014_1.geometry} material={materials['plastic.008']} />
                  <mesh name="Sphere014_2" geometry={nodes.Sphere014_2.geometry} material={materials['chrome.010']} />
                </group>
              </group>
              <group name="piston007" position={[-0.02, 0.33, 0.01]} rotation={[-1.57, -0.27, 1.57]}>
                <group name="Sphere008" position={[0.01, 0.1, 0]} rotation={[-2.58, 1.57, 1.27]} scale={-1}>
                  <mesh name="Sphere012_1" geometry={nodes.Sphere012_1.geometry} material={materials['plastic.008']} />
                  <mesh name="Sphere012_2" geometry={nodes.Sphere012_2.geometry} material={materials['chrome.010']} />
                </group>
              </group>
            </group>
            <group name="Bone015" position={[0, 0.46, 0.89]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh name="Sphere019" geometry={nodes.Sphere019.geometry} material={materials.lense} position={[0, 0.04, 0]} />
            </group>
            <group name="Sphere012" position={[-0.07, 0.13, 0.68]} rotation={[0.05, -0.03, 0.03]} scale={[0.93, 1, 1]}>
              <mesh name="Sphere017_1" geometry={nodes.Sphere017_1.geometry} material={materials['metal.013']} />
              <mesh name="Sphere017_2" geometry={nodes.Sphere017_2.geometry} material={materials['body.013']} />
            </group>
            <group name="Sphere020" position={[0, 0.46, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh name="Sphere021" geometry={nodes.Sphere021.geometry} material={materials['metal.013']} />
              <mesh name="Sphere021_1" geometry={nodes.Sphere021_1.geometry} material={materials['body.013']} />
              <mesh name="Sphere021_2" geometry={nodes.Sphere021_2.geometry} material={materials['plastic.008']} />
              <mesh name="Sphere021_3" geometry={nodes.Sphere021_3.geometry} material={materials['logo.001']} />
              <mesh name="Sphere021_4" geometry={nodes.Sphere021_4.geometry} material={materials['fire.005']} />
              <mesh name="Sphere021_5" geometry={nodes.Sphere021_5.geometry} material={materials['chrome.010']} />
              <mesh name="Sphere021_6" geometry={nodes.Sphere021_6.geometry} material={materials['glass.011']} />
            </group>
          </group>
          <group name="LEG" position={[-2.61, -4.01, -9.64]} rotation={[-2.82, -1.06, 0.21]}>
            <group name="KNEE" position={[-0.76, 0.94, 0]} rotation={[0, 0, 0.05]} />
            <group name="Plane112" position={[-1.7, 0.86, 0.27]} rotation={[0, 0, -3.09]}>
              <mesh name="Plane112_1" geometry={nodes.Plane112_1.geometry} material={materials['body.013']} />
              <mesh name="Plane112_2" geometry={nodes.Plane112_2.geometry} material={materials['logo.001']} />
              <mesh name="Plane112_3" geometry={nodes.Plane112_3.geometry} material={materials['plastic.008']} />
              <mesh name="Plane112_4" geometry={nodes.Plane112_4.geometry} material={materials['chrome.010']} />
            </group>
          </group>
          <group name="LEG001" position={[-3.84, -3.4, -9.8]} rotation={[-2.92, 1, -0.39]}>
            <group name="KNEE001" position={[-0.76, 0.94, 0]} rotation={[0, 0, 0.05]} />
            <group name="Plane114" position={[-1.7, 0.86, -0.28]} rotation={[0, 0, -3.09]}>
              <mesh name="Plane114_1" geometry={nodes.Plane114_1.geometry} material={materials['body.013']} />
              <mesh name="Plane114_2" geometry={nodes.Plane114_2.geometry} material={materials['logo.001']} />
              <mesh name="Plane114_3" geometry={nodes.Plane114_3.geometry} material={materials['plastic.008']} />
              <mesh name="Plane114_4" geometry={nodes.Plane114_4.geometry} material={materials['chrome.010']} />
            </group>
          </group>
          <group name="LEG002" position={[-2.41, -4.1, -7.86]} rotation={[-2.31, -0.93, -0.82]}>
            <group name="KNEE002" position={[0.76, 0.94, 0]} rotation={[0, 0, -0.05]} />
          </group>
          <group name="LEG003" position={[-3.66, -4.13, -8.29]} rotation={[-2.68, -0.17, 0.27]}>
            <group name="KNEE003" position={[0.76, 0.94, 0]} rotation={[0, 0, -0.05]} />
            <group name="Plane110" position={[1.69, 0.86, -0.28]} rotation={[Math.PI, 0, -3.09]} scale={-1}>
              <mesh name="Plane110_1" geometry={nodes.Plane110_1.geometry} material={materials['body.013']} />
              <mesh name="Plane110_2" geometry={nodes.Plane110_2.geometry} material={materials['logo.001']} />
              <mesh name="Plane110_3" geometry={nodes.Plane110_3.geometry} material={materials['plastic.008']} />
              <mesh name="Plane110_4" geometry={nodes.Plane110_4.geometry} material={materials['chrome.010']} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/robot.glb')
