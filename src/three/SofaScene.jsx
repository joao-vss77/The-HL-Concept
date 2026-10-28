import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF } from '@react-three/drei'
import { SOFA_MODEL_URL } from '../config.js'
import { stage, clamp01, prefersReducedMotion } from '../lib/stage.js'

const { damp, lerp, smoothstep } = THREE.MathUtils

/* ------------------------------------------------------------------
   Sujeira procedural no tecido + frente de limpeza controlada por scroll.
   A máscara usa a luminância do mapa difuso: o tecido é claro e a
   madeira é escura, então só o estofado recebe a sujeira.
------------------------------------------------------------------- */
function patchDirt(material, uniforms) {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vObj;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvObj = position;')
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
        varying vec3 vObj;
        uniform float uClean;
        uniform float uDirt;
        float gBand;
        float h3(vec3 p) { p = fract(p * .3183099 + .1); p *= 17.; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
        float n3(vec3 x) {
          vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3. - 2. * f);
          return mix(mix(mix(h3(i), h3(i + vec3(1,0,0)), f.x), mix(h3(i + vec3(0,1,0)), h3(i + vec3(1,1,0)), f.x), f.y),
                     mix(mix(h3(i + vec3(0,0,1)), h3(i + vec3(1,0,1)), f.x), mix(h3(i + vec3(0,1,1)), h3(i + vec3(1,1,1)), f.x), f.y), f.z);
        }
        float fbm(vec3 p) { float a = .5, s = 0.; for (int i = 0; i < 4; i++) { s += a * n3(p); p *= 2.03; a *= .5; } return s; }`
      )
      .replace(
        '#include <map_fragment>',
        /* glsl */ `#include <map_fragment>
        {
          float lum = dot(diffuseColor.rgb, vec3(.299, .587, .114));
          float fabric = smoothstep(.05, .16, lum); // luminância em espaço linear
          float xn = (vObj.x + .8) / 1.62;
          float edge = xn + (fbm(vObj * 5.) - .5) * .09;
          float dirtySide = smoothstep(uClean - .025, uClean + .025, edge);
          float stains = smoothstep(.4, .62, fbm(vObj * 3.4 + 4.));
          float grime = fbm(vObj * 22.);
          float seat = smoothstep(.62, .28, vObj.y);
          float dirt = fabric * uDirt * dirtySide * clamp(.5 + .35 * seat + .8 * stains, 0., 1.);
          vec3 dull = diffuseColor.rgb * vec3(.76, .66, .52) * (.78 + .36 * grime);
          vec3 spot = diffuseColor.rgb * vec3(.46, .36, .24);
          diffuseColor.rgb = mix(diffuseColor.rgb, mix(dull, spot, stains), dirt);
          gBand = fabric * (1. - smoothstep(0., .06, abs(edge - uClean))) * step(.001, uClean) * step(uClean, 1.07);
          diffuseColor.rgb *= 1. - gBand * .16;
        }`
      )
      .replace(
        '#include <roughnessmap_fragment>',
        '#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, .4, gBand * .7);'
      )
  }
  material.customProgramCacheKey = () => 'hl-dirt'
  material.needsUpdate = true
}

function Sofa({ onReady, reduced }) {
  const { scene } = useGLTF(SOFA_MODEL_URL)
  const outer = useRef()
  const inner = useRef()
  const intro = useRef(reduced ? 1 : 0)
  const uniforms = useMemo(() => ({ uClean: { value: 0 }, uDirt: { value: 0.9 } }), [])

  const model = useMemo(() => {
    const root = scene.clone(true)
    root.traverse((o) => {
      if (!o.isMesh) return
      const src = o.material
      const mat = new THREE.MeshPhysicalMaterial({
        map: src.map,
        normalMap: src.normalMap,
        normalScale: src.normalScale.clone(),
        roughnessMap: src.roughnessMap,
        metalnessMap: src.metalnessMap,
        aoMap: src.roughnessMap, // textura ARM: canal R = oclusão
        aoMapIntensity: 0.85,
        roughness: src.roughness,
        metalness: src.metalness,
        side: src.side,
        sheen: 0.35,
        sheenRoughness: 0.75,
        sheenColor: new THREE.Color('#dfe9f5'),
        envMapIntensity: 0.9,
      })
      patchDirt(mat, uniforms)
      o.material = mat
      o.castShadow = true
    })
    // centraliza no eixo X/Z, apoiado no chão
    const box = new THREE.Box3().setFromObject(root)
    const c = box.getCenter(new THREE.Vector3())
    root.position.set(-c.x, -box.min.y, -c.z)
    return root
  }, [scene, uniforms])

  useEffect(() => {
    onReady?.()
  }, [onReady])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const { width } = state.viewport
    const mobile = state.size.width < 760
    const d = Math.min(dt, 0.05)

    intro.current = Math.min(1, intro.current + d / 1.8)
    const e = 1 - Math.pow(1 - intro.current, 3)

    // herói -> demonstração: o sofá atravessa para o outro lado da composição
    const k = smoothstep(stage.hero, 0.12, 0.8)
    const heroX = mobile ? 0 : Math.min(width * 0.2, 0.95)
    const storyX = mobile ? 0 : -Math.min(width * 0.17, 0.8)
    const baseY = mobile ? lerp(1.02, 0.5, k) : 0
    const scale = (mobile ? Math.min(1, width / 2.05) : lerp(1.08, 0.92, k)) * lerp(0.86, 1, e)

    const sway = reduced ? 0 : Math.sin(t * 0.16) * 0.16
    const rotY = lerp(-0.5 + sway, 0.22 + sway * 0.4, k) + stage.pointer.x * 0.14
    const rotX = stage.pointer.y * 0.04
    const float = reduced ? 0 : Math.sin(t * 0.7) * 0.022

    const o = outer.current
    o.position.x = damp(o.position.x, lerp(heroX, storyX, k), 3.2, d)
    o.position.y = damp(o.position.y, baseY - (1 - e) * 0.25, 4, d)
    o.scale.setScalar(damp(o.scale.x, scale, 4, d))

    const i = inner.current
    i.rotation.y = damp(i.rotation.y, rotY, 2.4, d)
    i.rotation.x = damp(i.rotation.x, rotX, 2.4, d)
    i.position.y = 0.06 + float

    // a frente de limpeza percorre o sofá durante as etapas do meio
    const clean = clamp01((stage.story - 0.18) / 0.62) * 1.08
    uniforms.uClean.value = damp(uniforms.uClean.value, clean, 6, d)

    // câmera: deriva lenta + paralaxe do ponteiro + leve aproximação na demonstração
    const cam = state.camera
    const camZ = (mobile ? 5.4 : 4.3) - k * 0.35
    cam.position.x = damp(cam.position.x, (reduced ? 0 : Math.sin(t * 0.09) * 0.12) + stage.pointer.x * 0.18, 2, d)
    cam.position.y = damp(cam.position.y, 0.95 + stage.pointer.y * 0.1 - k * 0.12, 2, d)
    cam.position.z = damp(cam.position.z, camZ, 2, d)
    cam.lookAt(0, 0.38, 0)
  })

  return (
    <group ref={outer} scale={0.9}>
      <group ref={inner}>
        <primitive object={model} />
      </group>
      <FloorShadow follow={inner} />
    </group>
  )
}

// Sombra de estúdio: duas camadas suaves (ambiente + contato) que seguem a
// rotação do sofá e clareiam quando ele sobe na flutuação.
function shadowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(0,0,0,1)')
  grd.addColorStop(0.45, 'rgba(0,0,0,0.55)')
  grd.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function FloorShadow({ follow }) {
  const group = useRef()
  const soft = useRef()
  const tight = useRef()
  const map = useMemo(shadowTexture, [])

  useFrame(() => {
    const f = follow.current
    if (!f) return
    group.current.rotation.y = f.rotation.y
    const lift = Math.max(0, f.position.y - 0.04) * 6
    soft.current.material.opacity = 0.42 - lift * 0.06
    tight.current.material.opacity = 0.5 - lift * 0.12
  })

  return (
    <group ref={group} position={[0, 0.002, 0]}>
      <mesh ref={soft} rotation-x={-Math.PI / 2} scale={[2.5, 1.25, 1]} renderOrder={-1}>
        <planeGeometry />
        <meshBasicMaterial map={map} color="#0a1522" transparent depthWrite={false} />
      </mesh>
      <mesh ref={tight} rotation-x={-Math.PI / 2} position-y={0.001} scale={[1.75, 0.6, 1]} renderOrder={-1}>
        <planeGeometry />
        <meshBasicMaterial map={map} color="#0a1522" transparent depthWrite={false} />
      </mesh>
    </group>
  )
}

const mobile = () => typeof window !== 'undefined' && window.innerWidth < 760

function Lights({ theme }) {
  const dark = theme === 'dark'
  return (
    <>
      <ambientLight intensity={dark ? 0.25 : 0.85} />
      <directionalLight position={[-3, 4, 3]} intensity={dark ? 1.6 : 2.6} color="#fff6ec" />
      <directionalLight position={[2.5, 3, 4]} intensity={dark ? 0 : 0.9} color="#ffffff" />
      <directionalLight position={[3, 2, -3]} intensity={dark ? 2.2 : 1.1} color="#3aa7ff" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={dark ? 1.4 : 2.2} position={[0, 4, 2]} scale={[6, 2, 1]} rotation-x={Math.PI / 2.4} />
        <Lightformer form="rect" intensity={dark ? 0.8 : 1.2} position={[-4, 1.5, 1]} scale={[2, 3, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" color="#8fd3ff" intensity={dark ? 1.6 : 0.8} position={[4, 1, -2]} scale={[2, 3, 1]} rotation-y={-Math.PI / 2} />
      </Environment>
    </>
  )
}

export default function SofaScene({ theme, active, onReady }) {
  const reduced = prefersReducedMotion()
  return (
    <Canvas
      className="stage__gl"
      frameloop={active ? 'always' : 'never'}
      dpr={[1, mobile() ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 30, position: [0, 0.95, 4.6], near: 0.1, far: 30 }}
    >
      <Lights theme={theme} />
      <Sofa onReady={onReady} reduced={reduced} />
    </Canvas>
  )
}

useGLTF.preload(SOFA_MODEL_URL)
