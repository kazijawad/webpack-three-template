varying vec2 vUv;

uniform vec3 color;
uniform float time;

void main() {
    gl_FragColor = vec4(vec3(vUv.x + sin(time), vUv.x, vUv.y + cos(time)) * color, 1.0);
}
