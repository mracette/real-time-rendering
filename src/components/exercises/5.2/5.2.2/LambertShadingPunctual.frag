precision mediump float;
precision mediump int;

uniform vec3 lightPositions[4];
uniform vec3 lightColors[4];
uniform int lightCount;
uniform vec3 surfaceColor;

varying vec3 vPosition;
varying vec4 vColor;
varying vec3 vNormal;

// GLSL needs a fixed array size
#define maxLights 10

// Avoids division by zero in the attenuation calculation
#define epsilon 0.0001

// Minimum radius of the light source
#define rMin 0.0001

// Light intensity at a set distance
#define r0 1.0

void main()	{

    vec3 normal = normalize( vNormal );
    vec3 color = surfaceColor;

    for(int i = 0; i < maxLights; i++) {
        if(i > lightCount) break;
        vec3 positionTolightPosition = lightPositions[i] - vPosition;
        float r = length(lightPositions[i] - vPosition);
        vec3 lightPosition = positionTolightPosition / r;

        // Unreal approach
        float attenuation = pow((r0 / (r + epsilon)), 2.0);

        // CryEngine and Frostbite approach
        // float attenuation = pow(r0 / max(r, rMin), 2.0);

        vec3 lightColor = attenuation * lightColors[i];
        float l = clamp(dot(normal, lightPosition), 0.0, 1.0);
        color = mix(color, lightColor, l);
    }

    gl_FragColor = vec4( color, 1.0 );

}