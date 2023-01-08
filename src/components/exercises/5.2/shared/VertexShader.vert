precision mediump float;
precision mediump int;

varying vec3 vPosition;
varying vec4 vColor;
varying vec3 vNormal;

void main()	{

    vPosition = position;
    vNormal = normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}