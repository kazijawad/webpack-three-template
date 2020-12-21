import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./index.css";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const dimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Renderer
const canvas = document.querySelector("#stage");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(dimensions.width, dimensions.height);
renderer.setClearColor("#161616", 1);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
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
        color: {
            value: new THREE.Color("#fff"),
        },
        time: {
            value: 0,
        },
    },
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener("resize", () => {
    // Update Dimensions
    dimensions.width = window.innerWidth;
    dimensions.height = window.innerHeight;

    // Update Camera
    camera.aspect = dimensions.width / dimensions.height;
    camera.updateProjectionMatrix();

    // Update Renderer
    renderer.setSize(dimensions.width, dimensions.height);
});

function render() {
    cube.rotation.y += 0.01;
    material.uniforms.time.value += 0.01;

    controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(render)
}

render();
