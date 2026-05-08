---
title: Gemini image generation model name requires ListModels discovery
date: 2026-05-08
category: logic-errors
module: image-pipeline
problem_type: integration
component: scripts
tags: [gemini-api, nano-banana, image-generation, model-names]
symptoms:
  - API returns 404 "model not found" when using documented model names
  - gemini-2.0-flash-exp and gemini-3.1-flash-image-preview both fail
---

## Problem

The Nano Banana 2 documentation and blog posts reference model names like `gemini-3.1-flash-image-preview` and `gemini-2.0-flash-exp`, but these return 404 errors from the Gemini API's `generateContent` endpoint.

## Root Cause

Google's image generation model names change frequently between preview releases. Documentation and blog posts reference names that may have been renamed or deprecated by the time you use them.

## Solution

Call `ListModels` first to discover available image generation models:

```
GET https://generativelanguage.googleapis.com/v1beta/models?key={API_KEY}
```

Filter results for models with "image" in the name. As of May 2026, `gemini-2.5-flash-image` is the working model that supports `generateContent` with `responseModalities: ["IMAGE"]`.

## Key Takeaway

Never hardcode Gemini model names from documentation — always verify against `ListModels` first. Model names are ephemeral in preview APIs.
