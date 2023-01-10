#pragma glslify: noise = require(glsl-noise/classic/2d)

varying vec3 vPosition;
varying vec3 vNormal;

uniform mat4 modelMatrix;

#define origin vec3(0.0, 0.0, 0.0)
#define baseColor vec3(1.0, 1.0, 1.0)
#define up vec3(0.0, 1.0, 0.0)

const float frequency = 3.5;

void main()	{

  vec3 modelPosition = modelMatrix[3].xyz;

  vec3 normal = normalize(vNormal);
  float upness = dot(normal, up);
  

  float distanceFromCenter = distance(vPosition.y, origin.y) * dot(vNormal, vec3(0.0, 1.0, 0.0));
  float brightness = noise(vec2(upness * frequency, 0.));
  brightness = brightness * noise(vec2(upness * frequency * 50., 0.));

  gl_FragColor = vec4(baseColor, mix(1.0, smoothstep(0.0, 0.3, brightness), .7));

}