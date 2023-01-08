#pragma glslify: noise = require(glsl-noise/simplex/2d)

precision mediump float;
precision mediump int;

void main()	{

  float brightness = noise(gl_FragCoord.xy);

  gl_FragColor = vec4(vec3(brightness), 1.);

}