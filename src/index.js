import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './index.css';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector('#stage');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, -4);
camera.lookAt(new THREE.Vector3());
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.update();

// Test Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#FFF') }
    }
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#161616', 1);

// Resize Handler
function handleResize() {
    // Update Dimensions
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener('resize', handleResize);

// Animation Handler
const clock = new THREE.Clock();

function render() {
    const elapsedTime = clock.getElapsedTime();

    // Update Test Cube
    cube.rotation.x = elapsedTime;
    cube.rotation.y = elapsedTime;
    material.uniforms.uTime.value = elapsedTime;

    // Update Controls
    controls.update();

    // Update Render
    renderer.render(scene, camera);

    // Call Next Frame
    window.requestAnimationFrame(render);
}

render();
