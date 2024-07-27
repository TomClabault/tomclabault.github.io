---
layout: page
title: OptiX 7 - Owl Path-Tracer
description: C++, NVIDIA OptiX7 (Owl), OpenGL Path Tracing Rendering Engine
img: assets/img/rt_optix.jpeg
importance: 3
category: Free Time
related_publications: false
---

<hr/>
<h2 id="features">Overview</h2>

Path tracing rendering engine (Monte Carlo integration) written with the [Owl](https://github.com/owl-project/owl) library, a wrapper around [OptiX](https://developer.nvidia.com/rtx/ray-tracing/optix) 7 which NVIDIA's general (not reserved to rendering) ray tracing framework that can make use of the ray tracing hardware accelerators of NVIDIA GeForce RTX™ GPUs.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/rt_optix.jpeg" title="OptiX Path Tracer" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<hr/>
<h2 id="features">Features</h2>

- Direct lighting
- Indirect lighting
- Cook Torrance BRDF
- Diffuse textures
- Smooth normals
- ImGui Integration
- Integration of NVIDIA's OptiX™ AI-Accelerated Denoiser

<hr/>
<h2 id="features">Github</h2>

This project is open-source on Github: [OptiX 7 Path-Tracer](https://github.com/TomClabault/Owl-OptiX-7)
