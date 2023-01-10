#pragma glslify: noise = require(glsl-noise/classic/2d)

varying vec3 vPosition;

#define origin vec3(0.0, 0.0, 0.0)
#define baseColor vec3(1.0, 1.0, 1.0)

const float frequency = 55.0;

void main()	{

  float r = length(vPosition - origin);
  float brightness = step(1.2, r) * clamp(0.5, 0.8, noise(vec2(r * frequency, 0.0)));

  gl_FragColor = vec4(baseColor, 0.5 * smoothstep(0.0, 0.3, brightness));

}