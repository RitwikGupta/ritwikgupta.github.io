---
title: "Exploring Deep Learning: Theory and Practice"
pubDate: 2017-10-05
description: A lecture I gave at the CMU Data Science Club that introduced undergraduates to deep learning.
og_image: /images/ml/neural-network.png
---

This is a page for my talk given at the [CMU Data Science Club](https://www.facebook.com/CMUDataScienceClub/) at Doherty A302 on October 5th, 2017.

## Data
Grab all the data from the Kaggle Diabetic Retinopathy challenge [here](https://www.kaggle.com/c/diabetic-retinopathy-detection/data). Note that this is a large dataset, and if you're downloading this on CMU-SECURE, you will go over your daily bandwidth limit.

## Prerequisites
* Python 3.5.X

## Setup
1. Open your terminal/command prompt.
1. Verify Python 3.5.X is installed by running `python -V` (or `python3 -V` for systems where Python is alt-installed).
1. Create a folder to run the project in.
1. Install `virtualenv` using `pip install virtualenv`.
1. Install and activate your virtual environment.
    1. Install: `virtualenv venv`
    1. Activate:
        * Linux/Mac: `. venv/bin/activate`
        * Windows: `venv\Scripts\active`
        * (you'll now have a running virtual environment. Execute `deactivate` at any time to leave the venv.)
1. Install the following packages via `pip` (By running `pip install package-name`):
    * ipython[all]
    * numpy
    * tensorflow (or tensorflow-gpu, if you have a supported GPU)
    * keras
1. Launch your iPython Notebook using `jupyter notebook --no-browser` (on Python 2.7.X, this is `ipython notebook --no-browser`).
1. Go to the URL printed on the terminal and paste it in your browser, if your browser wasn't already automatically launched.

## Notebook
If you're on mobile, view the notebook [here](/files/drclassification.html).
<iframe src="/files/drclassification.html" width="100%" height="400px"></iframe>

## Slides
These slides are for reference. A recording of the talk should exist with the CMU Data Science Club.
If you're on mobile, view the slides [here](/files/CMU_DSC_Deep_Learning.pdf).
<object data="/files/CMU_DSC_Deep_Learning.pdf" type="application/pdf" width="100%" height="400px">
  <p>It appears you don't have a PDF plugin for this browser.</p>
</object>
