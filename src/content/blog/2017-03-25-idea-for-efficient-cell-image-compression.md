---
title: Idea for Efficient Cell Image Compression
pubDate: 2017-03-25
description: Just throwing this out there to the world. Surely there must be a way to compress gigapixel cell imagery!
og_image: /images/gc/compression-1.jpg
---

## Premise

Pathology and histology slide images are taken with extremely high resolution cameras, resulting in:
1. High cost of storage
1. Bandwidth issues while transporting images

It is important to note that these images often rely on **lossless** compression, because any artifacting will result in a lowered ability for the doctor to give accurate results.

<p align="center">
	<img src="/images/gc/compression-1.jpg" />
</p>
<p align="center">
	Example of a cell image.
</p>

## Proposed Solution
In most regions of the body, neigboring cells looks alike to the cells bordering it. I propose the following solution to compress the images:
1. Segment the image into distinct cells.
1. Take a dot product of the matrix of cells with itself (A<sup>T</sup>A) to figure out which cells are most similar to other cells. I call these "reference cells".
1. Store a set of deltas for all other cells in terms of rotations, translation, and transformations.
1. Apply further compression using any standard algorithm to the deltas themselves.

<p align="center">
	<img src="/images/gc/compression-2.jpg" />
</p>
<p align="center">
	Example of "reference" cells.
</p>

A set of deltas in a binary format would be better than a large amount of pixels and allow for better compression.

I attempted to do something along these lines on GitHub [here](https://github.com/RitwikGupta/CellPack), but had to stop development due to time constraints. Hopefully I can continue this down the line!
