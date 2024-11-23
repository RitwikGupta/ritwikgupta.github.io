---
layout: ../../../layouts/BlogLayout.astro
title: The Department of Defense is Prioritizing Open Source Software. Here's How Open Source Projects Can Benefit.
pubDate: 2022-02-07
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
og_image: /images/dod-oss/og.png
---

On January 26, 2022, the new Chief Information Officer (CIO) of the U.S. Department of Defense (DoD), John B. Sherman, released a memo to the entire Department titled ["Software Development and Open Source Software"](https://dodcio.defense.gov/Portals/0/Documents/Library/SoftwareDev-OpenSource.pdf). In this memo, the CIO addresses two primary concerns: 1) using open source software (OSS) introduces supply chain risks for DoD software programs, and 2) sharing DoD code via open source channels without proper checks enables potential leaks of proprietary DoD information to adversaries. In laying out how these two concerns should be addressed properly, the CIO categorizes OSS into a unique position, one which can be utilized by OSS foundations and project maintainers to gain funding for their essential contributions.

## Open Source Software in the DoD
The U.S. DoD, much like other large organizations, is a user of OSS in almost every part of its software toolchain. From [Firefox](https://www.mozilla.org/en-US/firefox/) to access the internet, [Kubernetes](https://kubernetes.io/) to orchestrate containers on internal data centers and the public cloud, [`curl`](https://curl.se/) to make HTTP requests, [PyTorch](https://pytorch.org/) to create and run machine learning models, the examples of OSS in use across the DoD are endless. In addition to being a first-party user of these software and toolchains, the DoD also uses OSS daily as components of third-party software acquired from contractors.

Beyond just being being a consumer of OSS, the DoD is also a producer of OSS, such as the utilities used by the [DARPA Cyber Grand Challenge](https://github.com/CyberGrandChallenge), [machine learning models](https://github.com/DIUx-xView) created for the [Defense Innovation Unit's xView series of prize challenges](https://xview.us/), and even the DoD's OSS [`code.mil` website itself](https://github.com/Code-dot-mil/code.mil). Taking into account repositories open sourced on DoD contracts, the organization contributes a large amount of software into the public domain.

## Lack of OSS Funding
Even though the DoD uses and creates a lot of open source software, it rarely funds OSS initiatives itself. Besides rare examples such as DARPA [funding](https://www.fpds.gov/common/jsp/LaunchWebPage.jsp?command=execute&requestid=137104125&version=1.5) the [Open Source Robotics Foundation](https://www.openrobotics.org/) for support and development on their programs, money from the DoD does not flow to support the further development of critical open source technologies. In my opinion, there are two reasons for this:

1. OSS projects do not fit within the traditional acquisitions framework, therefore making it difficult for the DoD to give contracts to projects with no responsible entity.
2. More opinionated, but with no money on the line, the DoD has no incentive to pay for services it is otherwise receiving for free. In my experience, government programs take free things for granted, whereas commercial products, even if terrible, get much more care and interest.

## An Opportunity for Funding

In the CIO's memo, OSS software is elevated to the forefront of software acquisitions.

> The Department must follow an "Adopt, Buy, Create" approach to software,
**preferentially adopting existing government or OSS solutions before buying proprietary offerings**, and only **creating new non-commercial software when no off-the-shelf solutions are adequate**. 

This is incredible news in itself. DoD program managers (PMs) must now evaluate the landscape and verify that no existing OSS solution solves their problem before launching a new program that could potentially waste taxpayers dollars. What about in instances where the OSS solution does not 100% fit the needs of the PM's program? In this case, a contractual mechanism must be put into place to acquire, develop, and maintain this new development. To this end, the CIO states that

> OSS meets the definition of "commercial computer software" and therefore, **shall be given equal consideration with proprietary commercial offerings**, in accordance with [Section 2377 of Title 10, U.S.C.](https://www.law.cornell.edu/uscode/text/10/2377)...

By ensuring that OSS solutions are considered commercial software, it follows that DoD PMs should include OSS as legitimate competitors against commercial offerings. With acquisitions mechanisms such as the [Other Transaction Authority (OTA)](https://acqnotes.com/acqnote/careerfields/other-transaction-authority-ota) that impose softer requirements than traditional [FAR-based](https://www.acquisition.gov/far/part-16) methods being leveraged by DoD innovation organizations such as the [Defense Innovation Unit](https://www.diu.mil/) and various [Combatant Commands](https://www.defense.gov/About/combatant-commands/), OSS foundations can be in competition for much-needed funding from the DoD directly.

By cutting out the middleman who re-package OSS solutions and sell them to the DoD, OSS foundations can fully realize the monetary investment currently indirectly being made to their technologies.

## How to Get DoD Funding

Of course, even with this memo, there will be a lot of reticence within the DoD to award contracts to faceless OSS projects. Here is my guidance on how to make sure that your project has a chance of being considered for DoD funding.

1. If you have a large project that is getting significant usage, incorporate a 501(c)(3) organization which will officially manage the project. Funding for the effort will live in this 501(c)(3) and will require proper governance structures. As a large project, you probably have some governance already in place. While the DoD strongly prefers companies to be U.S.-based for contracts, this is not an entirely excluding factor. If a slide deck is too much effort, at the least include a `FUNDING.md` in your project's code base so more technically savvy PMs can build a justification using your own words.
2. Create a minimal slide deck with your project's core offering. With an overhead as low as 5-10 slides, this will capture what your project does, and how it can be applicable in broader settings. When reviewing capabilities, DoD PMs will better be able to conceptualize how your project fits into their program.
3. Leverage agencies which wield the OTA and apply judiciously to their calls for proposals. Organizations like the Defense Innovation Unit regularly post solicitations for programs which have a strong software component, and a slide deck is all you need to be considered.

## The Ethical Considerations of Working with the DoD
There is debate about our responsibility as software engineers when it comes to the ethical use of the software we create. Receiving DoD funding directly may raise flags when it comes to the development of your OSS project.

Pragmatically, however, the DoD is already using your software. In its current state, third-parties with no consideration for the proper use of your software are packaging it up and selling it with no say from the project maintainers. By directly accepting DoD funding and being a first-party provider of technology, you can ensure that the DoD is using your software in a fair and responsible manner.

With the DoD adopting [principles](https://www.defense.gov/News/Releases/Release/Article/2091996/dod-adopts-ethical-principles-for-artificial-intelligence/) and [guidelines](https://www.diu.mil/responsible-ai-guidelines) for the ethical use of complicated AI software toolchains, there is support internally to ensure that software is used responsibly. By participating in this process first-hand, you can help the DoD set a framework for similar technology uses in the future.

## Closing

This memo is extremely young and actual implementation of this memo remains yet to be seen. However, the future of OSS within the DoD is bright, and maximizing this wave to benefit the community at large is in the interest of everyone who depends on OSS around the world.

*Edit: There is discussion about this post on [Hacker News](https://news.ycombinator.com/item?id=30247420). I encourage people to engage; there are many things I have not thought about that could go a long way into creating a framework for DoD funding of OSS projects.*