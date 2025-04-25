import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function disposeObject(object: THREE.Group | THREE.Object3D) {
  if (!object) return;
  const geometries = new Map<string, THREE.BufferGeometry>();
  const materials = new Map<string, THREE.Material>();
  const textures = new Map<string, THREE.Texture>();
  object.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.isMesh) {
      const geometry = mesh.geometry as THREE.BufferGeometry;
      if (geometry) {
        geometries.set(geometry.uuid, geometry);
      }
      const material = mesh.material as any;
      if (material) {
        materials.set(material.uuid, material);
        for (const key in material) {
          const texture = material[key];
          if (texture && texture.isTexture) {
            textures.set(texture.uuid, texture);
          }
        }
      }
    }
  });
  for (const entry of textures) {
    entry[1].dispose();
  }
  for (const entry of materials) {
    entry[1].dispose();
  }
  for (const entry of geometries) {
    entry[1].dispose();
  }
}

export function useThree() {
  function initThree(canvasMountId: string) {
    const canvas = document.getElementById(canvasMountId)! as HTMLCanvasElement;
    // const camera = new PerspectiveCamera(75, 200 / 200, 0.1, 1000);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 6000);
    camera.position.set(0, -2, 20);
    // camera.position.set(1, 0, 600 + document.body.getBoundingClientRect().top * 0.1);
    camera.lookAt(0, 0, 0);
    const scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0x050505, 2000, 3500);
    const light1 = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light1.position.set( 1, 1, 1 );
    scene.add( light1 );

    const light2 = new THREE.DirectionalLight( 0xff2638, 10 );
    light2.position.set( 0, - 1, 0 );
    scene.add( light2 );
    // const pointLight = new THREE.PointLight(0xffffff);
    // pointLight.position.set(3, 3, 5)
    // const ambientLight = new THREE.AmbientLight(0xffffff);
    // scene.add(pointLight, ambientLight)
    // // const spotLight = new SpotLight('white', 0.2);
    // // spotLight.position.set(0.1, -1, 3);
    // scene.add(spotLight);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    // renderer.outputColorSpace = THREE.SRGBColorSpace;

    // const controls = new OrbitControls( camera, renderer.domElement );
    return { scene, camera, renderer };
  }
  function cleanUpThree(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
    disposeObject(scene);
    renderer.dispose();
  }
  return {
    initThree,
    cleanUpThree,
  };
}