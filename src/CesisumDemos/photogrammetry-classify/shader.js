import { CustomShader, LightingModel, UniformType } from 'cesium'

const NOTHING_SELECTED = 12

//获知 fsInput 里有什么、值大概是多少的方法：

// 查结构：FragmentInput 是 Cesium 的内置结构，主要字段有 featureIds（最多 4 个 featureId_n）、attributes.positionEC、attributes.normalEC、attributes.tangentEC、attributes.bitangentEC、attributes.texCoord_0/_1，以及材质/光照相关的插值值。详见 Cesium CustomShader 文档的 FragmentInput 表。

// 用“颜色探针”看值：写一个最简 shader，把某个分量映射到颜色。通过拾取或截图取色，就能估出当前 fragment 的 featureId
// const int NOTHING_SELECTED = 12;
// void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
//   float id = float(fsInput.featureIds.featureId_0);
//   material.diffuse = vec3(fract(id / 50.0), 0.0, 0.0); // 红色通道编码 id
//   material.alpha = 1.0;
//   }

// 若场景显示渐变，说明 texcoord 存在且范围 0-1。
// 高/低位拆分：若整数过大，可用 float(id) / 255.0 分别写入 RGB，或 fract/floor 组合编码。

// CPU 侧确认：在 JS 里 console.log(tile.content) / content.getFeature(0) 看有哪些 featureIds 集合，确认 featureId_0 是否存在；拾取结果 scene.pick 也能打印 featureId。
// 若要精准对照，先用拾取 scene.pick 打印某个 featureId，再用颜色探针对同一个对象，看颜色与编码是否一致，即可验证数据流。

const emptyFragmentShader = `
const int NOTHING_SELECTED = 12;
void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
   int id = fsInput.featureIds.featureId_0;
    if(uSelectedFeature == NOTHING_SELECTED) {
      material.diffuse = vec3(1.0, 1.0, 1.0);
      return;
    };
    if (id != uSelectedFeature) {
      material.diffuse = vec3(0.0, 0.0, 1.0); // 蓝色通道编码 id
    } 
    else {
      material.diffuse = vec3(fract(float(id) / 50.0), 0.0, 0.0); // 红色通道编码 id
      material.alpha = 1.0;
    }
  }
`

// todo
const pbrFragmentShader = `
const int INDIVIDUAL = 0;
const int CORPORATION = 1;
const int PARTNERSHIP = 2;
const int CONDO = 3;
const int NYSTATE = 4;
const int HOISING = 5;
const int DEPENETRY = 6;
const int NYCHOUSING = 7;
const int DEPADMINI = 8;
const int NYCHEALTH = 9;
const int OTHERGOVERN = 10;
const int OTHER = 11;

void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
  int featureId = fsInput.featureIds.featureId_0;

  if (featureId == INDIVIDUAL) {
    material.specular = vec3(0.98, 0.9, 0.59);
    material.roughness = 0.1;
  } else if (featureId == NYSTATE || featureId == NYCHOUSING || featureId == NYCHEALTH) {
    material.specular = vec3(0.91, 0.92, 0.92);
    material.roughness = 0.5;
  } else if (featureId == DEPENETRY || featureId == DEPADMINI) {
    material.emissive = vec3(1.0, 0.3, 0.0);
    material.alpha = 0.5;
  } else if (featureId == OTHERGOVERN || featureId == OTHER) {
    material.diffuse = mix(material.diffuse, vec3(1.0), 0.8);
    material.roughness = 0.9;
  } else {
    material.diffuse += 0.05;
    material.roughness = 0.9;
  }
}
`

const goldenFragmentShader = `
const int NOTHING_SELECTED = 12;

void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
  int featureId = fsInput.featureIds.featureId_0;

  // Early out if nothing is selected or this fragment isn’t the selected feature
  if (!(uSelectedFeature < NOTHING_SELECTED && featureId == uSelectedFeature)) {
    return;
  }

  // Base metal tint
  vec3 gold = vec3(1.0, 0.85, 0.57);
  material.specular = gold;
  material.roughness = 0.08;

  // Rim light to make silhouettes pop
  vec3 normalEC = normalize(fsInput.attributes.normalEC);
  vec3 viewDir = normalize(-fsInput.attributes.positionEC);
  float rim = pow(1.0 - max(dot(normalEC, viewDir), 0.0), 2.5);

  // Soft pulse over time (requires uTime uniform in seconds)
  float pulse = 0.5 + 0.5 * sin(uTime * 2.5);
  float glow = rim * (0.35 + 0.35 * pulse);

  material.emissive += gold * glow;
}
`

const multipleFragmentShader = `
const int IDS0_WINDOW = 0;
const int IDS1_FACADE = 2;
const int IDS1_ROOF = 3;
precision mediump float;
const vec3 PURPLE = vec3(0.5, 0.0, 1.0);
const vec3 YELLOW = vec3(1.0, 1.0, 0.0);
const vec3 NO_TINT = vec3(1.0);

void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
  int featureId0 = fsInput.featureIds.featureId_0; // fine features
  int featureId1 = fsInput.featureIds.featureId_1; // coarse features

  // use both feature ID sets to determine where the features are
  float isWindow = float(featureId0 == IDS0_WINDOW);
  float isFacade = float(featureId1 == IDS1_FACADE);
  float isRoof = float(featureId1 == IDS1_ROOF);

  // Tint the roof windows yellow and facade windows purple
  vec3 tint = NO_TINT;
  tint = mix(tint, YELLOW, isWindow * isRoof);
  tint = mix(tint, PURPLE, isWindow * isFacade);
  material.diffuse *= tint;
}
`

// Dummy shader that sets the UNLIT lighting mode. For use with the classification style

const unlitShader = new CustomShader({
  uniforms: {
    uSelectedFeature: {
      type: UniformType.INT,
      value: NOTHING_SELECTED,
    },
  },
  lightingModel: LightingModel.UNLIT,
  fragmentShaderText: emptyFragmentShader,
})

const pbrShader = new CustomShader({
  lightingModel: LightingModel.PBR,
  fragmentShaderText: pbrFragmentShader,
})

const goldenShader = new CustomShader({
  uniforms: {
    uSelectedFeature: {
      type: UniformType.INT,
      value: NOTHING_SELECTED,
    },
    uTime: {
      type: UniformType.FLOAT,
      value: 0,
    },
  },
  lightingModel: LightingModel.PBR,
  fragmentShaderText: goldenFragmentShader,
})

const multipleFeatureShader = new CustomShader({
  uniforms: {
    uSelectedFeature: {
      type: UniformType.FLOAT,
      value: NOTHING_SELECTED,
    },
  },
  lightingModel: LightingModel.UNLIT,
  fragmentShaderText: multipleFragmentShader,
})

export {  unlitShader,
  pbrShader,
  goldenShader,
  multipleFeatureShader,
  NOTHING_SELECTED,
}
