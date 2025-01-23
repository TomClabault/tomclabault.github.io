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

#### Layered Principled BSDF:
- Coat Microfacet GGX Layer + Anisotropy, Anisotropy Rotation, Medium Absorption & Thickness
- On-the-fly Monte Carlo integration for energy compensation of interlayer clearcoat multiple scattering
- SGGX Volumetric Sheen Lobe LTC Fit [\[Zeltner, Burley, Chiang, 2022\]](https://tizianzeltner.com/projects/Zeltner2022Practical/)
- Specular Microfacet GGX Layer
- Oren-Nayar Diffuse BRDF Lobe
- Metallic Microfacet GGX Layer + Anisotropy & Anisotropy Rotation + Double Roughness [\[Kulla & Conty, 2017\]](https://blog.selfshadow.com/publications/s2017-shading-course/imageworks/s2017_pbs_imageworks_slides_v2.pdf)
- Specular transmission BTDF + Beer Lambert Volumetric Absorption: [\[Burley, 2015\]](https://blog.selfshadow.com/publications/s2015-shading-course/#course_content)
- Diffuse lambertian BTDF
- Spectral dispersion using Cauchy's equation
- Multiple-scattering energy compensation for conductors (double metal layer), dielectrics (transmission layer) and glossy-diffuse (specular + diffuse layer) materials [\[Turquin, 2019\]](https://blog.selfshadow.com/publications/turquin/ms_comp_final.pdf)
- Thin-film interference over dielectrics and conductors [\[Belcour, Barla, 2017\]](https://belcour.github.io/blog/research/publication/2017/05/01/brdf-thin-film.html)
- Thin-walled model
	
<div class="col-sm mt-3 mt-md-0">
		{% include figure.liquid path="assets/img/HIPRT-Path-Tracer/LayeredBSDF.png" class="img-fluid rounded" zoomable=true %}
</div>

<div class="col-sm mt-3 mt-md-0">
		{% include figure.liquid path="assets/img/HIPRT-Path-Tracer/metallic-energy.png" class="img-fluid rounded" zoomable=true %}
</div>

<div class="col-sm mt-3 mt-md-0">
		{% include figure.liquid path="assets/img/HIPRT-Path-Tracer/glass-energy.png" class="img-fluid rounded" zoomable=true %}
</div>

<div class="col-sm mt-3 mt-md-0">
		{% include figure.liquid path="assets/img/HIPRT-Path-Tracer/specular-diffuse-energy.png" class="img-fluid rounded" zoomable=true %}
</div>

#### Sampling
- Light sampling:
	- Uniform light sampling for direct lighting estimation + MIS
	- Resampled Importance Sampling (RIS) [\[Talbot et al., 2005\]](https://www.researchgate.net/publication/220852928_Importance_Resampling_for_Global_Illumination)+ Weighted Reservoir Sampling (WRS) for many light sampling  + [\[M. T. Chao, 1982\]](https://www.jstor.org/stable/2336002)
	- ReSTIR DI [\[Bitterli et al., 2020\]](https://research.nvidia.com/labs/rtr/publication/bitterli2020spatiotemporal/)
		- Supports envmap sampling
		- Many bias correction weighting schemes for experimentations (1/M, 1/Z, MIS-like, Generalized Balance Heuristic, Pairwise MIS [\[Bitterli, 2022\]](https://digitalcommons.dartmouth.edu/dissertations/77/), Pairwise MIS with defensive formulation [\[Lin et al., 2022\]](https://research.nvidia.com/publication/2022-07_generalized-resampled-importance-sampling-foundations-restir))
		- Fused Spatiotemporal Reuse [\[Wyman, Panteleev, 2021\]](https://research.nvidia.com/publication/2021-07_rearchitecting-spatiotemporal-resampling-production)
		- Light Presampling [\[Wyman, Panteleev, 2021\]](https://research.nvidia.com/publication/2021-07_rearchitecting-spatiotemporal-resampling-production)
	- HDR Environment map + Multiple Importance Sampling using
		- CDF-inversion & binary search
		- Alias Table (Vose's O(N) construction [\[Vose, 1991\]](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=f65bcde1fcf82e05388b31de80cba10bf65acc07))
	
- BSDF sampling:
	- MIS
	- Smith GGX Sampling:
		- Visible Normal Distribution Function (VNDF) [\[Heitz, 2018\]](https://jcgt.org/published/0007/04/01/)
		- Spherical caps VNDF Sampling [\[Dupuy, Benyoub, 2023\]](https://arxiv.org/abs/2306.05044)
		
#### Other rendering features:
- G-MoN - Adaptive median of means for unbiased firefly removal [\[Buisine et al., 2021\]](https://hal.science/hal-03201630v2)
- Texture support for all the parameters of the BSDF
- Texture alpha transparency support
- Stochastic material opacity support
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
- Different frame-buffer visualization (visualize the adaptive sampling heatmap, the denoiser normals / albedo, ...)

#### Other features
- Use of the [\[ASSIMP\]](https://github.com/assimp/assimp) library to support [many](https://github.com/assimp/assimp/blob/master/doc/Fileformats.md) scene file formats.
- Multithreaded scene parsing/texture loading/shader compiling/BVH building/envmap processing/... for faster application startup times
- Background-asynchronous path tracing kernels pre-compilation
- Shader cache to avoid recompiling kernels unnecessarily

<hr/>
<h2 id="features">Gallery</h2>

<swiper-container keyboard="true" navigation="true" pagination="true" pagination-clickable="true" pagination-dynamic-bullets="true" rewind="true">
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/DispersionDiamonds.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/Bistro.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/mclaren.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/contemporary-bedroom.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/blender-4.1-splash.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/dragon-glass.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/thin-film-iri-thumbnail.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/bzd-measure-seven.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/LuxCoreBalls.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/suzanne-caustics.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/pbrt-dragon-indirect-v2.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/HIPRT-Path-Tracer/RIS.ReSTIR.Comparison.jpg" class="img-fluid rounded z-depth-1" %}</swiper-slide>
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
	<div class="col-sm-12 col-md-6 text-center">
        <h4 id="ReSTIR DI vs. RIS vs. MIS">ReSTIR DI vs. RIS vs. MIS</h4>
		<iframe class="center" style="aspect-ratio:16/9; width:100%;" src="https://www.youtube.com/embed/R6nkhSDoJ4U?si=OCvf2hc7jxEO1fv6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
	<div class="col-sm-12 col-md-6 text-center">
        <h4 id="Homogeneous Volumetric Absorption">Homogeneous Volumetric Absorption</h4>
		<iframe class="center" style="aspect-ratio:16/9; width:100%;" src="https://www.youtube.com/embed/A3ZPbhAQjhE?si=2AVLkI0Vu7LJ1LDp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
	<div class="col-sm-12 col-md-6 text-center">
        <h4 id="ReSTIR DI Envmap">ReSTIR DI & Dynamic Envmap</h4>
		<iframe class="center" style="aspect-ratio:16/9; width:100%;" src="https://www.youtube.com/embed/y2BEFJcdIWo?si=Bz_v-tFVPMQKiUG-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
	<div class="col-sm-12 col-md-6 text-center">
        <h4 id="SGGX Sheen LTC Fit">SGGX Volumetric Sheen Lobe LTC Fit</h4>
		<iframe  class="center" style="aspect-ratio:16/9; width:100%;" src="https://www.youtube.com/embed/xnSF1nkIrKo?si=FbsLpusAc-7Ze5RQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
	<div class="col-sm-12 col-md-6 text-center">
        <h4 id="">Conductors/Dielectrics Multiple Scattering Energy Compensation</h4>
		<iframe class="center" style="aspect-ratio:16/9; width:100%;" src="https://www.youtube.com/embed/wYJC0j_cidI?si=Rn5SKdgFA2BbnCT4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
	<div class="col-sm-12 col-md-6 text-center">
        <h4 id="">Thin-film Iridescence Render [Belcour, Barla, 2017]</h4>
		<iframe class="center" style="aspect-ratio:16/9; width:100%;" src="https://www.youtube.com/embed/rGwkacGbd3g?si=sJA8pvamH1Wcfd5e" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
	<div class="col-sm-12 col-md-6 text-center">
        <h4 id="">Spectral dispersion in glass</h4>
		<iframe class="center" style="aspect-ratio:16/9; width:100%;" src="https://www.youtube.com/embed/mhHZSwu7Cp0?si=0JUP2vbnt5JXt3ty" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
</div>

<hr/>
<h2 class="mt-4" id="Related_blog_posts">Related Blog Posts</h2>

<i class="fa-solid fa-tag fa-sm"></i> <a href="{{ site.baseurl }}/blog/category/hiprt-path-tracer/">hiprt-path-tracer</a>

<hr/>
<h2 class="mt-4" id="Github">Github</h2>
This project is open-source on Github: [HIPRT-Path-Tracer](https://github.com/TomClabault/HIPRT-Path-Tracer)
