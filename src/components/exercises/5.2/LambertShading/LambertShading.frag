precision mediump float;
precision mediump int;

uniform vec3 lightPositions[4];
uniform vec3 lightColors[4];
uniform int lightCount;
uniform vec3 surfaceColor;

varying vec3 vPosition;
varying vec4 vColor;
varying vec3 vNormal;

#define maxLights 10

void main()	{

    vec3 normal = normalize(vNormal);
    vec3 color = surfaceColor;

    for(int i = 0; i < maxLights; i++) {
        if(i > lightCount) break;
        vec3 lightPosition = normalize(lightPositions[i]);
        vec3 lightColor = lightColors[i];
        float l = clamp(dot(normal, lightPosition), 0.0, 1.0);
        color = mix(color, lightColor, l);
    }


    gl_FragColor = vec4( color, 1.0 );

}