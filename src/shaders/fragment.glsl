varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor;

void main() {
    gl_FragColor = vec4(vec3(vUv.x + sin(uTime), vUv.x, vUv.y + cos(uTime)) * uColor, 1.0);
}
