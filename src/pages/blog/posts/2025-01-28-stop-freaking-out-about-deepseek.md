---
layout: ../../../layouts/BlogLayout.astro
title: Stop Freaking Out About DeepSeek
pubDate: 2025-01-28
description: Everyone is freaking out about DeepSeek. The model is not the real thing to be worried about!
og_image: /images/deepseek/deepseek.png
---

The recent buzz around DeepSeek has been palpable, sending shockwaves through tech circles and media alike. While it’s a wake-up call for those who’ve been buying into the narratives perpetuated by American venture capitalists, it’s hardly surprising to those of us who’ve been building and observing AI technology over the past decade. Here’s why this moment was inevitable and what it tells us about the current state of AI innovation.

## Innovation Is Often a Second-Mover’s Game

It’s a well-documented phenomenon: one organization pours vast resources into solving a hard problem, only for a smaller, nimbler entity to refine and improve upon those efforts. This [second-mover advantage](https://en.wikipedia.org/wiki/First-mover_advantage) is practically the first lesson in any innovation course. DeepSeek’s success is simply another example of this dynamic at play. They’ve built upon foundational work by others and delivered something more efficient, more optimized, and&mdash;crucially&mdash;faster.

## I'm More Worried About Talent

Continued progress in AI requires two key ingredients: large investments in capital and a sustained focus on cultivating human talent. But here’s the distinction:

* The American Approach: The U.S. strategy emphasizes dominating hardware infrastructure by restricting GPU exports and investing heavily in datacenters, alongside fostering talent pipelines.

* The Chinese Approach: With limited access to the latest hardware due to geopolitical tensions, China has leaned heavily into developing human capital. While their investments in datacenters are significant, the real emphasis has been on nurturing talent through rigorous education systems.

This brings me to a critical point: scaling hardware alone has its limits. Resources are finite, environmental impact matters, and [perpetual growth isn’t sustainable](https://en.wikipedia.org/wiki/Factfulness). China’s long-term bet on talent&mdash;through many mandatory systems courses in their universities&mdash;positions them uniquely. In contrast, American universities have increasingly deprioritized these fundamental courses. Yet, many of AI’s recent breakthroughs, such as FlashAttention and automatic mixed precision, stem from advances in systems-level thinking. If this trend continues, the talent gap could widen significantly in China’s favor.

DeepSeek’s success is also attributed to their unique approach to engineering. While U.S. companies often default to scaling up with more GPUs&mdash;even if their models poorly utilize hardware&mdash;DeepSeek was incentivized to optimize for efficiency. They developed new training schemes, software, and procedures to maximize performance on less advanced hardware, showcasing the power of ingenuity over brute force.

## The Open-Source Nature of DeepSeek De-Risks It

One of the more controversial aspects of DeepSeek is its hosted service model, which stores user-uploaded materials on servers operated in the PRC. Critics are quick to call out the risks, but let’s not forget that this is no different from how companies like OpenAI and Anthropic operate. The difference? DeepSeek’s terms are stated in plain, blunt language. It’s a refreshing&mdash;if unusual&mdash;dose of honesty.

However, here’s the real game-changer: DeepSeek is open source. Unlike proprietary platforms, you’re not beholden to their infrastructure. You can host and run the technology independently if you choose. This transparency offers a counterweight to concerns about data sovereignty.

## Censorship and Authoritarianism

DeepSeek, like many Chinese LLMs, has been trained to censor topics the PRC deems sensitive, such as the Tiananmen Square massacre. This is problematic and highlights the broader issue of AI being used for influence operations. If widely adopted in its current form, it could serve as a vehicle for subtle censorship and opinion manipulation on a global scale. However, the fact that DeepSeek is open source means it’s only a matter of time before an “uncensored” version emerges. This would allow the technology to be realigned with values that prioritize freedom of speech and open inquiry.

## Breaking the AI Scaling Myth

DeepSeek has also burst a significant bubble: the myth that scaling AI models is solely about adding more GPUs and burning more electricity. Many leading models have embarrassingly poor model FLOPS utilization (MFUs). For example, Llama can [operate at around 30% MFU](https://github.com/pytorch/torchtitan/blob/main/docs/performance.md) (though many optimizations for this now exist). DeepSeek’s achievement lies in better utilizing existing hardware, proving that efficiency&mdash;not just brute force&mdash;can yield superior results in less time.

## Silicon Valley vs. China

The arrival of DeepSeek’s models doesn’t fundamentally shift the AI race dynamics between the U.S. and China. Any perceived moat between American and Chinese capabilities was always more perception than reality. The rapid diffusion of software technologies makes it inevitable that China would replicate American AI successes. Future breakthroughs will depend on deep investments in both hardware and talent. Both nations have advantages, but the degree to which these advantages translate into dominance remains uncertain. Whoever innovates first will likely see their advancements quickly mirrored by the other side.

## The Impact of U.S. Chip Export Restrictions

This requires a nuanced take, as context is critical. I covered this extensively in my paper, "[Whack-a-Chip: The Futility of Hardware-Centric Export Controls](https://arxiv.org/abs/2411.14425)." The effects of hardware limitations take time to materialize. Since modern GPUs are not yet fully utilized, it will be a while before their true potential is reached. If the U.S. is committed to pursuing hardware export controls, its chip export policies must be revisited to address several key points:

1. The specific workloads America seeks to restrict must be clearly defined. For example, the U.S. has stated it wants to prevent the proliferation of weaponized AI—but what constitutes an AI weapon? A precise definition is necessary.

2. Export controls should be tied to continuous software-hardware benchmarks that accurately reflect the frontier of capabilities for these critical workloads. Such benchmarks do not currently exist.

## Keep Innovating

The tech world’s collective freakout over DeepSeek’s rise is misplaced. This cycle, where one entity creates something groundbreaking, and another builds a cheaper, faster alternative, is entirely normal. It’s how innovation works. The only thing to fear is complacency. **If your only move is to gatekeep, you’ve already lost.**

Innovation thrives on open competition and true creativity. DeepSeek is just another chapter in the ever-evolving story of AI development. It’s a reminder that progress has always ultimately been about who can do more with less. **Necessity is the mother of invention.** The future belongs to those who can innovate **and** best protect their technical advantages.