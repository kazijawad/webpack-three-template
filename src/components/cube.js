import * as THREE from 'three';

import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

class Cube {
    constructor({ scene, dimensions }) {
        this.scene = scene;

        this.geometry = new THREE.BoxGeometry(...dimensions);

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
    }

    render(elapsedTime) {
        this.mesh.rotation.x = elapsedTime;
        this.mesh.rotation.y = elapsedTime;
        this.material.uniforms.uTime.value = elapsedTime;
    }
}

export default Cube;
