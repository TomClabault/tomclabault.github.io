---
layout: page
title: Software Ray Tracer / Rasterizer
description: C++, QT6 Software (CPU) Whitted Ray Tracer & Rasterizer
img: assets/img/sphere_rose.jpeg
importance: 2
category: Academic
related_publications: false
---

CPU ray-tracer + rasterizer entirely done in C++ and Qt6 for the interface.

<hr/>
<h2 id="features">Features</h2>

- Qt6 C++ Interface
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/RT_M1_Interface1.jpg" title="Interface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    C++ QT6 Interface
</div>

- Ray tracing rendering
- Rasterization rendering
- Hybrid rendering (rasterization of the visibility + ray tracing for the shading)
- Clip-space clipping algorithm
- Hard shadows (shadow rays)
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hard_shadows.jpg" title="Interface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Ray-traced hard shadows
</div>

- Octree based BVH + 7 planes bounding volumes
- Rough reflexions (random ray cast around the normal)
- Normal mapping
- Diffuse texture, roughness map, ambient occlusion mapping
- Parallax occlusion mapping
- Skyspheres support
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/sphere_rose.jpeg" title="Interface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Showcase of implemented normal mapping, parallax occlusion mapping, rough reflexions & skysphere support. The mesh of the sphere is perfectly flat (analytic sphere). The perceived geometry is only due to the parallax mapping algorithm.
</div>

- Skyboxes support
- Super Sampling Anti Aliasing (SSAA)
- AVX2 Screen Space Ambient Occlusion (SSAO) implementation
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ssao.jpg" title="Interface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Showcase of the SIMD AVX2 Screen Space Ambient Occlusion (SSAO) implementation
</div>

- Hair modeling
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hair.jpg" title="Interface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Hair modeling (ad-hoc method, following a simulated falling particle)
</div>

<hr/>
<h2 id="features">Github</h2>

This project is open-source on Github: [Software Ray Tracer & Rasterizer](https://github.com/TomClabault/RayTracerCPP)
