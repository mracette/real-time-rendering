precision mediump float;
precision mediump int;

uniform vec3 lightDirection;

varying vec3 vPosition;
varying vec4 vColor;
varying vec3 vNormal;

#define cool vec3(0.0, 0.0, 0.55)
#define warm vec3(0.3, 0.3, 0.0)

void main()	{

    vec3 lightDirection = normalize(lightDirection);
    vec3 normal = normalize(vNormal);

    float t = (dot(normal, lightDirection) + 1.0) / 2.0;

    vec3 color = mix(warm, cool, t);

    gl_FragColor = vec4( color, 1.0 );

}