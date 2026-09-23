import { Color, Euler, Matrix4, Vector3 } from 'three';

// A stylised reflection sweep supplements real metallic lighting. It is driven
// by the mesh pose, so idle shakes, scoring shakes and rolls all share it.
export function applyGoldGlint(material, body, glint = '#ffe5a0') {
  const rest = new Matrix4().makeRotationFromEuler(new Euler(.1, -.13, 0)).elements;
  material.customProgramCacheKey = () => 'high-roller-gold-glint-v1';
  material.onBeforeCompile = shader => {
    shader.uniforms.hrGoldBase = { value: new Color(body) };
    shader.uniforms.hrGoldGlint = { value: new Color(glint) };
    shader.uniforms.hrGoldRest = { value: new Vector3(rest[2], rest[6], rest[1]) };
    shader.vertexShader = `varying vec3 hrGoldPosition;
varying vec3 hrGoldTilt;
${shader.vertexShader}`.replace('#include <begin_vertex>', `#include <begin_vertex>
hrGoldPosition = position;
hrGoldTilt = vec3(normalize(modelViewMatrix[0].xyz).z, normalize(modelViewMatrix[1].xyz).z, normalize(modelViewMatrix[0].xyz).y);`);
    shader.fragmentShader = `varying vec3 hrGoldPosition;
varying vec3 hrGoldTilt;
uniform vec3 hrGoldBase;
uniform vec3 hrGoldGlint;
uniform vec3 hrGoldRest;
${shader.fragmentShader}`.replace('#include <map_fragment>', `#include <map_fragment>
diffuseColor.rgb = mix(hrGoldBase, sampledDiffuseColor.rgb, sampledDiffuseColor.a);
diffuseColor.a = opacity;`).replace('#include <opaque_fragment>', `
vec3 goldRock = hrGoldTilt - hrGoldRest;
float goldActivity = smoothstep(.008, .055, length(goldRock));
float goldSweep = hrGoldPosition.x + hrGoldPosition.y * .38 + hrGoldPosition.z * .13
  - goldRock.z * 12.0 - goldRock.y * 3.0;
float goldGlint = exp(-pow(goldSweep / .065, 2.0))
  + .24 * exp(-pow(goldSweep / .21, 2.0));
outgoingLight += hrGoldGlint * goldGlint * goldActivity * 1.65 * (1.0 - sampledDiffuseColor.a);
#include <opaque_fragment>`);
  };
}
