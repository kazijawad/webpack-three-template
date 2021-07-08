import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';

import Cube from './cube';

class Stage {
    constructor({ debug } = { debug: false }) {
        this.debug = debug;
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.canvas = document.querySelector('#stage');

        this.clock = new THREE.Clock();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.currentIntersect = null;
        this.objects = [];

        this.createScene();
        this.createRenderer();
        this.createCamera();
        this.createObjects();

        if (this.debug) {
            this.createControls();
        }

        this.addEventListeners();

        this.render();
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor('#161616', 1);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.set(0, 0, -4);
        this.camera.lookAt(new THREE.Vector3());
        this.scene.add(this.camera);
    }

    createObjects() {
        this.cube = new Cube({
            scene: this.scene,
            dimensions: [1, 1, 1]
        });

        this.objects.push(this.cube);
    }

    createControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.update();
    }

    handleResize() {
        // Update Dimensions
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;

        // Update Camera
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        // Update Renderer
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    handleMouseMove(event) {
        this.mouse.x = event.clientX / this.sizes.width * 2 - 1;
        this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
    }

    addEventListeners() {
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    render() {
        const elapsedTime = this.clock.getElapsedTime();

        // Update Test Cube
        this.objects.forEach((object) => {
            if (object.render) {
                object.render(elapsedTime);
            }
        })

        // Update Raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObject(this.cube.mesh);
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

        // Update Controls
        if (this.debug) {
            this.controls.update();
        }

        // Update Render
        this.renderer.render(this.scene, this.camera);

        // Call Next Frame
        window.requestAnimationFrame(this.render.bind(this));
    }
}

export default Stage;
