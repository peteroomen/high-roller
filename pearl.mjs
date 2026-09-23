import { Color } from 'three';

// Contrasting resin colours, chosen per face value. The original colour still
// occupies most of the body; these are broad ribbons, not a replacement palette.
export const PEARL_ACCENTS = ['#edbd78', '#76bbae', '#81cbd0', '#c4a7df', '#85cdc3', '#a3b8ed'];

export function applyPearlSwirl(material, body, n) {
  const uniforms = {
    hrPearlBase: { value: new Color(body) },
    hrPearlAccent: { value: new Color(PEARL_ACCENTS[n - 1] ?? '#9dcfc7') },
    hrPearlStrength: { value: 1 },
    hrPearlSeed: { value: n * .73 },
    hrPearlTime: { value: 0 },
  };
  material.userData.pearlUniforms = uniforms;
  material.customProgramCacheKey = () => 'high-roller-resin-swirl-v2';
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = `varying vec3 hrPearlPosition;
varying vec3 hrPearlTilt;
${shader.vertexShader}`.replace('#include <begin_vertex>', `#include <begin_vertex>
hrPearlPosition = position;
// Pose adds a reactive shift on top of the continuously flowing resin.
hrPearlTilt = vec3(normalize(modelViewMatrix[0].xyz).z, normalize(modelViewMatrix[1].xyz).z, normalize(modelViewMatrix[0].xyz).y);`);
    shader.fragmentShader = `varying vec3 hrPearlPosition;
varying vec3 hrPearlTilt;
uniform vec3 hrPearlBase;
uniform vec3 hrPearlAccent;
uniform float hrPearlStrength;
uniform float hrPearlSeed;
uniform float hrPearlTime;
${shader.fragmentShader}`.replace('#include <map_fragment>', `#include <map_fragment>
vec3 resinPoint = hrPearlPosition * 3.6;
float resinShift = dot(hrPearlTilt, vec3(2.8, -2.4, 3.2));
vec2 resinUV = resinPoint.xy + resinPoint.z * vec2(.43, -.31);
// Twist the coordinates, then advect the ribbons through the turning field.
float resinTurn = hrPearlTime * .32 + .8 * sin(length(resinUV) * 1.4 - hrPearlTime * .44);
resinUV = mat2(cos(resinTurn), -sin(resinTurn), sin(resinTurn), cos(resinTurn)) * resinUV;
float resinWarp = sin(resinUV.y * 2.2 + hrPearlSeed + resinShift + hrPearlTime * .38)
  + .38 * sin(resinUV.x * 2.7 - resinUV.y + resinShift * .65 - hrPearlTime * .29);
float resinWave = .5 + .5 * sin(resinUV.x * 2.1 + resinUV.y * .85 + resinWarp * 1.7 + hrPearlSeed);
float resinRibbon = smoothstep(.38, .88, resinWave);
vec3 resinColour = mix(hrPearlBase, hrPearlAccent, resinRibbon * .78 * hrPearlStrength);
// A narrow satin crest gives the broad coloured ribbon a pearly highlight.
float resinCrest = exp(-pow((resinWave - .78) * 12.0, 2.0));
resinColour = mix(resinColour, vec3(1.0, .97, .91), resinCrest * .22 * hrPearlStrength);
// The map contains only the ink. Its alpha keeps pips and the red scrawl intact.
diffuseColor.rgb = mix(resinColour, sampledDiffuseColor.rgb, sampledDiffuseColor.a);
diffuseColor.a = opacity;`);
  };
}
