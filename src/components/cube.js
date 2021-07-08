import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

class Cube {
    constructor({ sizes, camera, scene, args }) {
        this.sizes = sizes;
        this.camera = camera;
        this.scene = scene;

        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.currentIntersect = null;

        this.geometry = new THREE.BoxGeometry(...args);
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color('#FFF') }
            }
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        this.addEventListeners();
    }

    handleMouseMove(event) {
        this.mouse.x = event.clientX / this.sizes.width * 2 - 1;
        this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
    }

    addEventListeners() {
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    render(elapsedTime) {
        // Animate Cube
        this.mesh.rotation.x = elapsedTime;
        this.mesh.rotation.y = elapsedTime;
        this.material.uniforms.uTime.value = elapsedTime;

        // Animate Intersections
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.mesh);
        if (intersects.length) {
            if (!this.currentIntersect) {
                const tween = new TWEEN.Tween(intersects[0].object.scale)
                tween.to({ x: 1.2, y: 1.2, z: 1.2 }, 300);
                tween.easing(TWEEN.Easing.Back.InOut);
                tween.start();
            }
            this.currentIntersect = intersects[0];
        } else {
            if (this.currentIntersect) {
                const tween = new TWEEN.Tween(this.currentIntersect.object.scale)
                tween.to({ x: 1, y: 1, z: 1 }, 300);
                tween.easing(TWEEN.Easing.Back.InOut);
                tween.start();
            }
            this.currentIntersect = null;
        }

        // Update Tween
        TWEEN.update();
    }
}

export default Cube;
