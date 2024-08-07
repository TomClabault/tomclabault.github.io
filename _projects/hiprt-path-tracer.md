---
layout: page
title: HIPRT-Path-Tracer
description: HIPRT & Orochi Monte Carlo Path Tracer
img: assets/img/HIPRT-Path-Tracer/hiprt-path-tracer.jpg
importance: 1
category: Free Time
related_publications: false
images:
  compare: true
  slider: true
---

<hr/>
<h2 id="features">Overview</h2>

Physically based Monte Carlo path tracer written with the [HIPRT](https://gpuopen.com/hiprt/) and [Orochi](https://gpuopen.com/orochi/) libraries.

HIPRT is AMD's equivalent to [OptiX](https://developer.nvidia.com/rtx/ray-tracing/optix). It allows the use of the ray tracing accelerators of RDNA2+
AMD GPUs and can run on NVIDIA devices as well (although it wouldn't take advatange of RT cores) as it is not AMD specific. 

The Orochi library allows the loading of HIP and CUDA libraries at runtime meaning that the application doesn't have to be recompiled to be used on a GPU from a different vendor (unlike HIP which would require a recompilation + linking).

<hr/>
<h2 id="features">Features</h2>

#### BSDFs
- Disney BSDF (Diffuse, fake subsurface, metallic, roughness, anisotropy + anisotropy rotation, clearcoat, sheen, glass, volumetric Beer-Lambert absorption, ...) [\[Burley, 2015\]](https://blog.selfshadow.com/publications/s2015-shading-course/#course_content)
- Cook Torrance BRDF (metallic & roughness)
- Oren Nayar diffuse model
- Specular dielectrics

#### Sampling
- Light sampling (emissive geometry):
	- Uniform light sampling for direct lighting
	- Resampled Importance Sampling (RIS) [\[Talbot, 2005\]](https://www.researchgate.net/publication/220852928_Importance_Resampling_for_Global_Illumination)+ Weighted Reservoir Sampling (WRS) for many light sampling  + [\[M. T. Chao, 1982\]](https://www.jstor.org/stable/2336002)
	- HDR Environment map + Multiple Importance Sampling using
		- CDF-inversion binary search
	
- BSDF sampling:
	- Importance sampling
	- Multiple importance sampling
	- Smith GGX Sampling:
		- Visible Normal Distribution Function (VNDF) [\[Heitz, 2018\]](https://jcgt.org/published/0007/04/01/)
		- Spherical caps VNDF Sampling [\[Dupuy, Benyoub, 2023\]](https://arxiv.org/abs/2306.05044)
		
#### Other rendering features:
- Texture support for all the parameters of the BSDF
- Normal mapping
- Nested dielectrics support 
	- Automatic handling as presented in [\[Ray Tracing Gems, 2019\]](https://www.realtimerendering.com/raytracinggems/rtg/index.html)
	- Handling with priorities as proposed in [\[Simple Nested Dielectrics in Ray Traced Images, Schmidt, 2002\]](https://www.researchgate.net/publication/247523037_Simple_Nested_Dielectrics_in_Ray_Traced_Images)
- Per-pixel adaptive sampling
- Intel [Open Image Denoise](https://github.com/RenderKit/oidn) + Normals & Albedo AOV support

#### UI
- Interactive ImGui interface
	- Asynchronous interface to guarantee smooth UI interactions even with heavy path tracing kernels
- Interactive first-person camera
- Different frame-buffer visualization (visualize the adaptive sampling map, the denoiser normals / albedo, ...)

#### Other features
- Use of the [\[ASSIMP\]](https://github.com/assimp/assimp) library to support [many](https://github.com/assimp/assimp/blob/master/doc/Fileformats.md) scene file formats.
- Optimized application startup time with:
	- Multithreaded texture loading
	- Asynchronous path tracing kernel compilation
	- Shader cache to avoid recompiling kernels unnecessarily

<hr/>
<h2 id="features">Gallery</h2>

<swiper-container keyboard="true" navigation="true" pagination="true" pagination-clickable="true" pagination-dynamic-bullets="true" rewind="true">
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/mclaren.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/contemporary-bedroom.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/blender-4.1-splash.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/dragon-glass.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/bzd-measure-seven.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/suzanne-caustics.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/dragon-indirect.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
</swiper-container>

<hr/>
<h2 class="mt-4" id="features">Live YouTube Showcases</h2>

<div class="row">
    <div class="col-sm-12 col-md-6 text-center">
        <h4 id="Material_Editor_Demo">Material Editor</h4>
		<iframe class="center" style="aspect-ratio:16/9; width:100%;" src="https://www.youtube.com/embed/LOVBwOoLVVQ?si=jrfRRjCnZuZ9mklo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="col-sm-12 col-md-6 text-center">
        <h4 id="OIDN_AOVs_Quality">OIDN AOVs Quality</h4>
        <iframe class="center" style="aspect-ratio:16/9; width:100%;" src="https://www.youtube.com/embed/GnCi7K2w9go?si=MXP85c2vL1cLcVXI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
</div>

<hr/>
<h2 class="mt-4" id="Related_blog_posts">Related Blog Posts</h2>

<i class="fa-solid fa-tag fa-sm"></i> <a href="{{ site.baseurl }}/blog/category/hiprt-path-tracer/">hiprt-path-tracer</a>

<hr/>
<h2 class="mt-4" id="Github">Github</h2>
This project is open-source on Github: [HIPRT-Path-Tracer](https://github.com/TomClabault/HIPRT-Path-Tracer)
