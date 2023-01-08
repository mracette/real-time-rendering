precision mediump float;
precision mediump int;

uniform vec3 lightDirection;

varying vec3 vNormal;

#define cool vec3(0.0, 0.0, 0.55)
#define warm vec3(0.3, 0.3, 0.0)
#define highlight vec3(1.0, 1.0, 1.0)

void main()	{

    vec3 cameraPosition = normalize(cameraPosition);
    vec3 lightDirection = normalize(lightDirection);
    vec3 normal = normalize(vNormal);
    vec3 lightReflection = normalize(reflect(-lightDirection, normal));

    float t = (dot(normal, lightDirection) + 1.0) / 2.0;
    float s = clamp(100.0 * dot(lightReflection, cameraPosition) - 97.0, 0.0, 1.0);

    vec3 color = mix(mix(cool, warm, t), highlight, s);

    gl_FragColor = vec4( color, 1.0 );

}