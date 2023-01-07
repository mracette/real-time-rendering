precision mediump float;
precision mediump int;

uniform mat4 modelViewMatrix;                                                                                                                                                                                                  
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

attribute vec3 position;
attribute vec4 color;
attribute vec3 normal;

varying vec3 vPosition;
varying vec4 vColor;
varying vec3 vNormal;

void main()	{

    vPosition = position;
    vNormal = normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}