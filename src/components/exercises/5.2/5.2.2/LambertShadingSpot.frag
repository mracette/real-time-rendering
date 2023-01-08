precision mediump float;
precision mediump int;

uniform vec3 lightPositions[4];
uniform vec3 lightColors[4];
uniform int lightCount;
uniform vec3 surfaceColor;

varying vec3 vPosition;
varying vec3 vNormal;

#define PI 3.14159

// GLSL needs a fixed array size
#define maxLights 10

// Avoids division by zero in the attenuation calculation
#define epsilon 0.0001

// Minimum radius of the light source
#define rMin 0.0001

// Light intensity at a set distance
#define r0 1.0

// Distance after which the light intensity is zero
#define rMax 3.0

// Penumbral angle
const float thetaP = PI / 6.0;

// Umbra angle
const float thetaU = PI / 5.0;

void main()	{

    vec3 normal = normalize( vNormal );
    vec3 color = surfaceColor;

    for(int i = 0; i < maxLights; i++) {
        if(i > lightCount) break;
        vec3 positionTolightPosition = lightPositions[i] - vPosition;
        float r = length(lightPositions[i] - vPosition);
        vec3 lightPosition = positionTolightPosition / r;

        // Distance attenuation
        float distanceFactor = pow((r0 / (r + epsilon)), 2.0);

        // Angular attenuation (spotlight)
        float thetaS = dot(normal, lightPosition);
        float positionalFactor = (thetaS - cos(thetaU)) / (cos(thetaP) - cos(thetaU));

        // Window attenuation (performance optimization)
        float windowFactor = pow(max(1.0 - pow((r / rMax), 4.0), 0.0), 2.0);

        vec3 lightColor = distanceFactor * windowFactor * positionalFactor * lightColors[i];
        float l = clamp(dot(normal, lightPosition), 0.0, 1.0);
        color = mix(color, lightColor, l);
    }

    gl_FragColor = vec4( color, 1.0 );

}