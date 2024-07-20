---
layout: page
title: Geometric Modeling
description: C++, QT6, Geometric Modeling (SDF, Bezier surfaces, mesh deformations)
img: assets/img/SDF_to_the_right
importance: 3
category: Academic
related_publications: false
---

This project implements the representation of implicit surfaces using SDFs  and their meshing using a marching cube algorithm. Some boolean operators are also defined on the SDFs (union, smooth union, intersection, difference, ...).
Signed distance functions are very powerful tools (cf. [Inigo Quilez' Shadertoy profile](https://www.shadertoy.com/user/iq)).
This project also implements revolution surfaces, generation of a mesh from a Bezier surface description and mesh local deformations.

<h2 id="features">Features</h2>

- Signed distance functions
- Boolean operators on SDFs (union, smooth union, intersection, difference, ...)
- Ray marching algorithm for meshing an SDF
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SDF_to_the_right.jpg" title="SDF" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

- Meshing of a Bezier surface with arbitrary precision
- Local deformation of a mesh
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Bezier.jpg" title="Bezier surface" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

- Revolution surfaces using a Bezier curve as the revolution profile
- Mesh twisting operator
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/twist.jpg" title="Twist deformation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


<h2 id="features">Github</h2>

This project is open-source on Github: [Geometric Modeling](https://github.com/TomClabault/M2_modeling)
