---
layout: page
title: Canny Edge Detection Filter
description: Canny Edge Detection Filter written in C with NVIDIA CUDA
img: assets/img/canny_edge.jpg
importance: 4
category: Free Time
related_publications: false
---

<h2 id="features">Overview</h2>

Personnal project made with CUDA in pure C that implements the Canny edge detection filter. 

Steps of the detection:
1. Gaussian blur pass to reduce high frequencies in the image (reduces the risk of false positive edge detections due to the noise in the image)
2. Sobel filter to detect edges (gradients)
3. Apply a threshold to eliminate edges (gradients) that are too weak
4. Double thresholding: separates "weak" from "strong" edges according to 2 thresholds given at execution.
5. Hysteresis to keep only significant edges : "strong" edges or "weak" edges connected to a strong edge (8-connexity)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/canny_edge.jpg" title="canny-edge-detection" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Image source: <a href="https://en.wikipedia.org/wiki/Canny_edge_detector#">wikipedia</a>
</div>

<h2 id="features">Github</h2>

This project is open-source on Github: [CUDA Canny Edge Detection](https://github.com/TomClabault/CUDAProgramming)
