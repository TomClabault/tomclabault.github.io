---
layout: page
title: OpenGL Rasterization
description: OpenGL Realtime Rasterization Engine
img: assets/img/TP_OpenGL.jpg
importance: 2
category: Academic
related_publications: false
---

Real-time rendering engine written in C++ and OpenGL 4.3.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/TP_OpenGL.jpg" title="OpenGL Realtime" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<h2 id="features">Features</h2>

Implemented features:
- ImGui integration
- Frustum culling
- Shadow mapping (Percentage closer filtering)
- Microfacet BRDF : Metallic and roughness
- Textures : Diffuse, mettalic, roughness, normals (normal mapping)
- Normal mapping (left with, right without)
- Irradiance Mapping (precomputation of the diffuse irradiance component from an environment map)
- Skyspheres & skyboxes support
- HDR tone mapping (gamma et exposition)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/roughness.jpg" title="Roughess" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Visual impact of varying material roughness
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/normal_mapping.jpg" title="Normal mapping" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Normal mapping increases the perceived level of details at equal level of geometry details
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/irradiance_map.jpg" title="Irradiance Map" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Pre-integrated environment map for realtime time use with rough surfaces
</div>

<h2 id="features">Github</h2>

This project is open-source on Github: [OpenGL Real-time](https://github.com/TomClabault/M2-synthese)
