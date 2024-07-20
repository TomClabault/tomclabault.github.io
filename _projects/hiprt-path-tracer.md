---
layout: page
title: HIPRT-Path-Tracer
description: HIPRT & Orochi Monte Carlo Path Tracer
img: assets/img/hiprt-path-tracer.jpg
importance: 1
category: Free Time
related_publications: false
---

<h2 id="features">Overview</h2>

Physically based Monte Carlo path tracer written with the [HIPRT](https://gpuopen.com/hiprt/) and [Orochi](https://gpuopen.com/orochi/) libraries.

HIPRT is AMD's equivalent to [OptiX](https://developer.nvidia.com/rtx/ray-tracing/optix). It allows the use of the ray tracing accelerators of RDNA2+
AMD GPUs and can run on NVIDIA devices as well (although it wouldn't take advatange of RT cores) as it is not AMD specific. 

The Orochi library allows the loading of HIP and CUDA libraries at runtime meaning that the application doesn't have to be recompiled to be used on a GPU from a different vendor (unlike HIP which would require a recompilation + linking).

<h2 id="features">Features</h2>

- Disney BSDF (Diffuse, fake subsurface, metallic, roughness, anisotropy + anisotropy rotation, clearcoat, sheen, glass, volumetric Beer-Lambert absorption, ...) [\[Burley, 2015\]](https://blog.selfshadow.com/publications/s2015-shading-course/#course_content)
	- For experimentation purposes, the BRDF diffuse lobe can be switched for either:
		- The original "Disney diffuse" presented in [\[Burley, 2012\]](https://disneyanimation.com/publications/physically-based-shading-at-disney/)
		- A lambertian distribution
		- The Oren Nayar microfacet diffuse model.
- Texture support for all the parameters of the BSDF
- BSDF Multiple Importance Sampling for Direct lighting
- Resampled Importance Sampling (RIS) + Weighted Reservoir Sampling (WRS) for many light sampling [\[Talbot, 2005\]](https://www.researchgate.net/publication/220852928_Importance_Resampling_for_Global_Illumination) + [\[M. T. Chao, 1982\]](https://www.jstor.org/stable/2336002)
- HDR Environment map + Multiple Importance Sampling using
	- CDF-inversion binary search
- Emissive geometry light sampling
- Nested dielectrics support 
	- Automatic handling as presented in [\[Ray Tracing Gems, 2019\]](https://www.realtimerendering.com/raytracinggems/rtg/index.html)
	- Handling with priorities as proposed in [\[Simple Nested Dielectrics in Ray Traced Images, Schmidt, 2002\]](https://www.researchgate.net/publication/247523037_Simple_Nested_Dielectrics_in_Ray_Traced_Images)
- Per-pixel adaptive sampling
- Normal mapping
- Interactive ImGui interface + interactive first-person camera
	- Asynchronous interface to guarantee smooth UI interactions even with heavy path tracing kernels
- Different frame-buffer visualisation (visualize the adaptive sampling map, the denoiser normals / albedo, ...)
- Use of the [\[ASSIMP\]](https://github.com/assimp/assimp) library to support [many](https://github.com/assimp/assimp/blob/master/doc/Fileformats.md) scene file formats.
- Optimized application startup time with:
	- Multithreaded texture loading
	- Asynchronous path tracing kernel compilation
	- Shader cache to avoid recompiling kernels unecessarily
- Intel [Open Image Denoise](https://github.com/RenderKit/oidn) + Normals & Albedo AOV support

<h2 id="features">Gallery</h2>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hippt-mclaren.jpg" title="McLaren P1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hippt-contemporary-bedroom.jpg" title="Contemporary Bedroom" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hippt-blender-4.1-splash.jpg" title="Blender 4.1 Splash" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hippt-dragon-glass.jpg" title="Glass Dragon" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hippt-dragon-indirect.jpg" title="Dragon Indirect Only" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<h2 id="features">Live YouTube Showcases</h2>

<h3 id="Material_Editor_Demo">Material Editor</h3>
<iframe width="560" height="315" src="https://www.youtube.com/embed/LOVBwOoLVVQ?si=jrfRRjCnZuZ9mklo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<h3 id="OIDN_AOVs">OIDN AOVs Quality Comparison</h3>
<iframe width="560" height="315" src="https://www.youtube.com/embed/GnCi7K2w9go?si=MXP85c2vL1cLcVXI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<h2 id="features">Related Blog Posts</h2>

<i class="fa-solid fa-tag fa-sm"></i> <a href="{{ site.baseurl }}/blog/category/hiprt-path-tracer/">hiprt-path-tracer</a>

<h2 id="features">Github</h2>
This project is open-source on Github: [HIPRT-Path-Tracer](https://github.com/TomClabault/HIPRT-Path-Tracer)
