<template>
  <!-- <div class="skew-container"> -->
      <!-- v-bind:height="height"
      v-bind:width="width" -->
    <canvas
      class="backface"
      id="backface"
      ref="backface"
    ></canvas>
  <!-- </div> -->
</template>

<script setup lang="ts">
import * as THREE from 'three';
// import { OutlineEffect } from 'three//OutlineEffect.js';
// import { OutlineEffect } from '@/composables/THREEOutlineEffect';
import { useThree } from '@/composables/useThree';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let _scene: THREE.Scene;
let _camera: THREE.PerspectiveCamera;
let _renderer: THREE.WebGLRenderer;
let _renderLoopId: number;
// let _effect: OutlineEffect;
let _torus: THREE.Mesh;
let _from_top: number;
const { initThree, cleanUpThree } = useThree();

let backface = computed(() => document.getElementById('backface') as HTMLCanvasElement);
// onUnmounted(() => {
//   window.removeEventListener("resize", onResize);
//   cancelAnimationFrame(current_animation);
// });
let mesh: THREE.Mesh;
function animate() {
  const time = Date.now() * 0.0001;

  // mesh.rotation.x = time * 0.25;
  // mesh.rotation.y = time * 0.5;
}
function renderLoop() {
  // will keep running for every frame since
  // we keep recreate a new requestAnimationFrame at the end of the function.
  // _controls.update();
  _renderer.render(_scene, _camera);
  animate();
  _renderLoopId = requestAnimationFrame(renderLoop);
}
function setupScene() {
  //initialize
  const { scene, camera, renderer } = initThree('backface');
  _scene = scene;
  _camera = camera;
  _renderer = renderer;

  // _effect = new OutlineEffect(renderer);

  const triangles = 100000;

  const geometry = new THREE.BufferGeometry();

  const positions = [];
  const normals = [];
  const colors = [];

  const color = new THREE.Color();

  const n = 1000, n2 = n / 2;	// triangles spread in the cube
  const d = 12, d2 = d / 2;	// individual triangle size

  const pA = new THREE.Vector3();
  const pB = new THREE.Vector3();
  const pC = new THREE.Vector3();

  const cb = new THREE.Vector3();
  const ab = new THREE.Vector3();

  for ( let i = 0; i < triangles; i ++ ) {

    // positions

    const something = (i / triangles) * 100;
    const inverted = triangles - i;
    const other = (something / 100) * n;
    // const x = Math.random() * n - n2;
    let y = Math.random() * n - n2;
    const ned = n - (y);
    const ned2 = ned / 2;
    const x = Math.random() * ned - ned2;
    // const y = Math.random() * (n2 * something);
    // const y = Math.max(0, Math.min(n, other));
    // console.log(y);
    // const y = Math.random() * n - n2) * something;


    const z = Math.random() * ned - ned2;

    const ax = x + Math.random() * d - d2;
    const ay = y + Math.random() * d - d2;
    const az = z + Math.random() * d - d2;

    const bx = x + Math.random() * d - d2;
    const by = y + Math.random() * d - d2;
    const bz = z + Math.random() * d - d2;

    const cx = x + Math.random() * d - d2;
    const cy = y + Math.random() * d - d2;
    const cz = z + Math.random() * d - d2;

    positions.push( ax, ay, az );
    positions.push( bx, by, bz );
    positions.push( cx, cy, cz );

    // flat face normals

    pA.set( ax, ay, az );
    pB.set( bx, by, bz );
    pC.set( cx, cy, cz );

    cb.subVectors( pC, pB );
    ab.subVectors( pA, pB );
    cb.cross( ab );

    cb.normalize();

    const nx = cb.x;
    const ny = cb.y;
    const nz = cb.z;

    normals.push( nx, ny, nz );
    normals.push( nx, ny, nz );
    normals.push( nx, ny, nz );

    // colors

    const vx = ( x / n ) + 0.5;
    const vy = ( y / n ) + 0.5;
    const vz = ( z / n ) + 0.5;

    color.setRGB( vx, vy, vz );

    const alpha = Math.random();

    colors.push( color.r, color.g, color.b, alpha );
    colors.push( color.r, color.g, color.b, alpha );
    colors.push( color.r, color.g, color.b, alpha );

  }
  function disposeArray() {

    this.array = null;

  }

  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ).onUpload( disposeArray ) );
  geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ).onUpload( disposeArray ) );
  geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 4 ).onUpload( disposeArray ) );

  geometry.computeBoundingSphere();
  const material = new THREE.MeshPhongMaterial( {
    color: 0xd5d5d5, specular: 0xffffff, shininess: 250,
    side: THREE.DoubleSide, vertexColors: true, transparent: true
  } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  // start the renderLoop
  _renderLoopId = requestAnimationFrame(renderLoop);
}

const onResize = () => {
  _camera.aspect = window.innerWidth / window.innerHeight;
  _camera.updateProjectionMatrix();

  _renderer.setSize( window.innerWidth, window.innerHeight );
};

const onScroll = () => {
  const t = document.body.getBoundingClientRect().top;
  _camera.position.y = 0 + t * 0.1;
  // _camera.position.z = 700 - t * 0.1;
  // _camera.setFocalLength(Math.min(t * -0.01, 32));
  // console.log(_camera.position.y);
}
onMounted(() => {
  if (backface.value) {
    setupScene();
  }
  nextTick(() => {
    window.addEventListener("resize", onResize);
    document.body.onscroll = onScroll
  })
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
  cancelAnimationFrame(_renderLoopId);
  cleanUpThree(_scene, _renderer);
});
</script>

<style lang="scss" scoped>
.skew-container {
  height: 90svh;
  width: 100vw;
  max-width: 100%;
  // max-height: 180vw;
  // min-height: 700px;
  position: absolute;
  overflow: hidden;
  transform: skewY(-3deg);
  min-width: var(--min-width);
  // background: var(--background-accent);
  transform-origin: top left;
  // top: -5rem;
}
.backface {
  transform-origin: top left;
  height: 100svh;
  width: 100vw;
  // max-height: 180vw;
  // min-height: 700px;
  // max-width: 100%;
  position: relative;
  transform: skew(0, 3deg);
  min-width: var(--min-width);
  // opacity: 0.7;
}

.backface {
  position: fixed;
  transform: unset;
  z-index: -999999999999999999999999999999999999999;
}
</style>

<style lang="scss">
// .dark {
//   .backface {
//     filter: brightness(50%);
//   }
// }
</style>