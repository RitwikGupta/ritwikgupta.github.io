interface Author {
    name: string;
    isPrimary?: boolean;
}

interface Link {
    url: string;
    display: string;
}

interface Pub {
    title: string;
    authors: Author[];
    links: Link[];
    excerpt: string;
    date: string;
    award?: string;
    venue?: string;
    imgSrc?: string;
}

export const publications: Pub[] = [
    {
        title: "Tinted Frames: Question Framing Blinds Vision-Language Models",
        authors: [
            { name: "Wan-Cyuan Fan" },
            { name: "Jiayun Luo" },
            { name: "Declan Kutscher" },
            { name: "Leonid Sigal" },
            { name: "Ritwik Gupta" },
        ],
        venue: "arXiv preprint",
        links: [
            {
                url: "https://davidhalladay.github.io/tinted_frames_demo/",
                display: "website",
            },
            {
                url: "https://arxiv.org/abs/2603.19203",
                display: "paper",
            },
            {
                url: "https://github.com/davidhalladay/Tinted-Frames",
                display: "github",
            },
        ],
        excerpt:
            "Vision-language models selectively vary how much they use an image based on question framing, even when the same visual reasoning is required. We analyze this behavior and introduce a lightweight prompt-tuning method that improves visual grounding and performance across framings.",
        date: "2026-03-19",
        imgSrc: "/images/thumbnails/tinted-frames.gif",
    },
    {
        title: "TCBench: A Benchmark for Tropical Cyclone Track and Intensity Forecasting at the Global Scale",
        authors: [
            { name: "Milton Gomez" },
            { name: "Marie McGraw" },
            { name: "Saranya Ganesh S." },
            { name: "Frederick Iat-Hin Tam" },
            { name: "Ilia Azizi" },
            { name: "Samuel Darmon" },
            { name: "Monika Feldmann" },
            { name: "Stella Bourdin" },
            { name: "Louis Poulain-Auzéau" },
            { name: "Suzana J. Camargo" },
            { name: "Jonathan Lin" },
            { name: "Dan Chavas" },
            { name: "Chia-Ying Lee" },
            { name: "Ritwik Gupta" },
            { name: "Andrea Jenney" },
            { name: "Tom Beucler" },
        ],
        venue: "arXiv preprint",
        links: [
            {
                url: "https://arxiv.org/abs/2601.23268",
                display: "paper",
            },
            {
                url: "https://github.com/tcbench/TCBench",
                display: "github",
            }
        ],
        excerpt:
            "TCBench is a benchmark for evaluating global, short to medium-range (1-5 days) forecasts of tropical cyclone track and intensity. It builds on the IBTrACS observational dataset and includes state-of-the-art dynamical and neural weather models. Designed for accessibility, TCBench helps AI practitioners tackle domain-relevant TC challenges.",
        date: "2026-01-30",
        imgSrc: "/images/thumbnails/tcbench.png"
    },
    {
        title: "The LLM Mirage: Economic Interests and the Subversion of Weaponization Controls",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Andrew W. Reddie" },
        ],
        venue: "ACM Conference on Fairness, Accountability, and Transparency (FAccT) 2026",
        links: [
            {
                url: "https://doi.org/10.1145/3805689.3806538",
                display: "paper",
            },
        ],
        excerpt:
            "U.S. AI security policy is increasingly shaped by an LLM Mirage, the belief that national security risks scale in proportion to the compute used to train frontier language models. That premise fails in two ways: it miscalibrates strategy because adversaries can obtain weaponizable capabilities with task-specific systems, and it destabilizes regulation because compute thresholds are easily renegotiated as domestic priorities shift.",
        date: "2026-01-08",
        imgSrc: "/images/thumbnails/llm-mirage.png",
    },
    {
        title: "Crowdsourcing the Frontier: Advancing Hybrid Physics-ML Climate Simulation via a $50,000 Kaggle Competition",
        authors: [
            { name: "Jerry Lin" },
            { name: "Zeyuan Hu" },
            { name: "Tom Beucler" },
            { name: "Katherine Frields" },
            { name: "Hannah Christensen" },
            { name: "Walter Hannah" },
            { name: "Helge Heuer" },
            { name: "Peter Ukkonnen" },
            { name: "Laura A. Mansfield" },
            { name: "Tian Zheng" },
            { name: "Liran Peng" },
            { name: "Ritwik Gupta" },
            { name: "Pierre Gentine" },
            { name: "Yusef Al-Naher" },
            { name: "Mingjiang Duan" },
            { name: "Kyo Hattori" },
            { name: "Weiliang Ji" },
            { name: "Chunhan Li" },
            { name: "Kippei Matsuda" },
            { name: "Naoki Murakami" },
            { name: "Shlomo Ron" },
            { name: "Marec Serlin" },
            { name: "Hongjian Song" },
            { name: "Yuma Tanabe" },
            { name: "Daisuke Yamamoto" },
            { name: "Jianyao Zhou" },
            { name: "Mike Pritchard" },
        ],
        venue: "Journal of Advances in Modeling Earth Systems",
        links: [
            {
                url: "https://doi.org/10.1029/2025MS005643",
                display: "paper",
            },
            {
                url: "https://github.com/leap-stc/climsim-kaggle-edition",
                display: "github",
            },
        ],
        excerpt: "Online stability in the low-resolution, real-geography setting is reproducibly achievable across diverse architectures, and offline and online zonal mean biases are near-identical across architectures.",
        date: "2025-11-26",
        imgSrc: "/images/thumbnails/crowdsourcing.png",
    },
    {
        title: "REOrdering Patches Improves Vision Models",
        authors: [
            { name: "Declan Kutscher" },
            { name: "David M. Chan" },
            { name: "Yutong Bai" },
            { name: "Trevor Darrell" },
            { name: "Ritwik Gupta" },
        ],
        venue: "Neural Information Processing Systems (NeurIPS) 2025",
        links: [
            {
                url: "https://d3tk.github.io/REOrder/",
                display: "website",
            },
            {
                url: "https://arxiv.org/abs/2505.23751",
                display: "paper",
            },
            {
                url: "https://github.com/d3tk/REOrder",
                display: "github",
            },
        ],
        excerpt: "We show that long sequence models are sensitive to the order of patches provided to them, affecting performance by as much as 13%. We propose REOrder, an information-theoretic and RL-based approach to learning an optimal patch ordering to improve performance.",
        date: "2025-05-29",
        imgSrc: "/images/thumbnails/reorder.gif",
    },
    {
        title: "LISAT: Language-Instructed Segmentation Assistant for Satellite Imagery",
        authors: [
            { name: "Jerome Quenum" },
            { name: "Wen-Han Hsieh" },
            { name: "Tsung-Han Wu" },
            { name: "Ritwik Gupta" },
            { name: "Trevor Darrell" },
            { name: "David M. Chan" },
        ],
        venue: "Neural Information Processing Systems (NeurIPS) 2025",
        links: [
            {
                url: "https://lisat-bair.github.io/LISAt/",
                display: "website",
            },
            {
                url: "https://arxiv.org/abs/2505.02829",
                display: "paper",
            }
        ],
        excerpt: "LISAT reduces the rate of hallucinations for grounded segmentation tasks in VLMs for remote sensing imagery.",
        date: "2025-05-05",
        imgSrc: "/images/thumbnails/lisat.jpg"
    },
    {
        title: "Enough Coin Flips Can Make LLMs Act Bayesian",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Rodolfo Corona" },
            { name: "Jiaxin Ge" },
            { name: "Eric Wang" },
            { name: "Dan Klein" },
            { name: "Trevor Darrell" },
            { name: "David M. Chan" },
        ],
        venue: "Association for Computational Linguistics (ACL) 2025",
        links: [
            {
                url: "https://ai-climate.berkeley.edu/llm-coin-flips/",
                display: "website",
            },
            {
                url: "https://aclanthology.org/2025.acl-long.377/",
                display: "paper",
            },
            {
                url: "https://github.com/rcorona/llm-coin-flips",
                display: "github",
            }
        ],
        excerpt:
            "Can LLMs accurately represent probabilities? We find in this work, no! By using biased coin flips as a simple but powerful exemplar, we show that in-context learning can be used to induce semi-accurate probability simulation in LLMs.",
        date: "2025-03-06",
        imgSrc: "/images/thumbnails/coinflips.jpg",
    },
    {
        title: "The Hawley Act Threatens AI Innovation",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Andrew Reddie" },
        ],
        venue: "Lawfare",
        links: [
            {
                url: "https://www.lawfaremedia.org/article/the-hawley-act-threatens-ai-innovation",
                display: "paper",
            },
        ],
        excerpt:
            "Senator Hawley's new bill seeks to cut U.S. AI ties with China but risks stifling innovation and hurting U.S. technical dominance instead.",
        date: "2025-02-10",
        imgSrc: "/images/thumbnails/hawley.jpg",
    },
    {
        title: "ClimSim-Online: A Large Multi-Scale Dataset and Framework for Hybrid Physics-ML Climate Emulation",
        authors: [
            { name: "Sungduk Yu" },
            { name: "Zeyuan Hu" },
            { name: "Akshay Subramaniam" },
            { name: "Walter Hannah" },
            { name: "Liran Peng" },
            { name: "Jerry Lin" },
            { name: "Mohamed Aziz Bhouri" },
            { name: "Ritwik Gupta" },
            { name: "Björn Lütjens" },
            { name: "Justus C Will" },
            { name: "Gunnar Behrens" },
            { name: "Julius JM Busecke" },
            { name: "Nora Loose" },
            { name: "Charles I Stern" },
            { name: "Tom Beucler" },
            { name: "Bryce Harrop" },
            { name: "Helge Heuer" },
            { name: "Benjamin R Hillman" },
            { name: "Andrea Jenney" },
            { name: "Nana Liu" },
            { name: "Alistair White" },
            { name: "Tian Zheng" },
            { name: "Zhiming Kuang" },
            { name: "Fiaz Ahmed" },
            { name: "Elizabeth Barnes" },
            { name: "Noah D Brenowitz" },
            { name: "Christopher Bretherton" },
            { name: "Veronika Eyring" },
            { name: "Savannah Ferretti" },
            { name: "Nicholas Lutsko" },
            { name: "Pierre Gentine" },
            { name: "Stephan Mandt" },
            { name: "J David Neelin" },
            { name: "Rose Yu" },
            { name: "Laure Zanna" },
            { name: "Nathan M Urban" },
            { name: "Janni Yuval" },
            { name: "Ryan Abernathey" },
            { name: "Pierre Baldi" },
            { name: "Wayne Chuang" },
            { name: "Yu Huang" },
            { name: "Fernando Iglesias-Suarez" },
            { name: "Sanket Jantre" },
            { name: "Po-Lun Ma" },
            { name: "Sara Shamekh" },
            { name: "Guang Zhang" },
            { name: "Michael Pritchard" },
        ],
        venue: "Journal of Machine Learning Research (JMLR) 26 (2025) 1-85",
        links: [
            {
                url: "https://www.jmlr.org/papers/v26/24-1014.html",
                display: "paper",
            },
        ],
        excerpt:
            "We introduce a significant new contribution to ClimSim, which provides a cross-platform, containerized pipeline to integrate ML models into operational climate simulators for hybrid testing.",
        date: "2025",
        imgSrc: "/images/thumbnails/climsimonline.png",
    },
    {
        title: "Whack-a-Chip: The Futility of Hardware-Centric Export Controls",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Leah Walker" },
            { name: "Andrew W. Reddie" },
        ],
        venue: "arXiv preprint",
        links: [
            {
                url: "https://arxiv.org/abs/2411.14425",
                display: "paper",
            },
        ],
        excerpt:
            "We give the first, public evidence as to how leading PRC AI labs are effectively circumventing U.S. semiconductor export controls through better software. We question the basis and efficacy of the current export control regime.",
        date: "2024-11-21",
        imgSrc: "/images/thumbnails/whackachip.jpg",
    },
    {
        title: "Data-Centric AI Governance: Addressing the Limitations of Model-Focused Policies",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Leah Walker" },
            { name: "Rodolfo Corona" },
            { name: "Stephanie Fu" },
            { name: "Suzanne Petryk" },
            { name: "Janet Napolitano" },
            { name: "Trevor Darrell" },
            { name: "Andrew W Reddie" },
        ],
        venue: "arXiv preprint",
        links: [
            {
                url: "https://arxiv.org/abs/2409.17216",
                display: "paper",
            },
        ],
        excerpt:
            "We demonstrate that American AI policy is focused on top-level metrics such as FLOPs and parameter counts, which ignore small models that are capable of malign use.",
        date: "2024-09-25",
        imgSrc: "/images/thumbnails/datacentric.png",
    },
    {
        title: "Visual Haystacks: A Vision-Centric Needle-in-a-Haystack Benchmark",
        authors: [
            { name: "Tsung-Han Wu" },
            { name: "Giscard Biamby" },
            { name: "Jerome Quenum" },
            { name: "Ritwik Gupta" },
            { name: "Joseph E Gonzalez" },
            { name: "Trevor Darrell" },
            { name: "David M Chan" },
        ],
        venue: "International Conference on Learning Representations (ICLR) 2025",
        links: [
            {
                url: "https://visual-haystacks.github.io/",
                display: "website",
            },
            {
                url: "https://proceedings.iclr.cc/paper_files/paper/2025/hash/a264726ebd222124514a32bf0143b83d-Abstract-Conference.html",
                display: "paper",
            },
            {
                url: "https://github.com/visual-haystacks/vhs_benchmark",
                display: "github",
            }
        ],
        excerpt:
            "We evaluate the capabilities of Large Multimodal Models (LMMs) in visual retrieval and reasoning tasks involving diverse and unrelated image sets.",
        date: "2024-07-18",
        imgSrc: "/images/thumbnails/visualhaystacks.png",
    },
    {
        title: "Open-Source Assessments of AI Capabilities: The Proliferation of AI Analysis Tools, Replicating Competitor Models, and the Zhousidun Dataset",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Leah Walker" },
            { name: "Eli Glickman" },
            { name: "Raine Koizumi" },
            { name: "Sarthak Bhatnagar" },
            { name: "Andrew W. Reddie" },
        ],
        venue: "BRSL Tech Report",
        links: [
            {
                url: "https://arxiv.org/abs/2405.12167",
                display: "paper",
            },
            {
                url: "https://github.com/BerkeleyRisk/Zhousidun/",
                display: "github",
            },
        ],
        excerpt:
            "China is training machine learning models to target American and Allied navel vessels, but how well do they work? In this paper, we train a state-of-the-art machine learning model on a leaked Chinese dataset that labels Aegis combat system components on military vessels. We propose a new methodology for open source assessment of adversary AI capabilities.",
        date: "2024-05-20",
        imgSrc: "/images/thumbnails/zhousidun.png"
    },
    {
        title: "xT: Nested Tokenization for Larger Context in Large Images",
        authors: [
            { name: "Ritwik Gupta", isPrimary: true },
            { name: "Shufan Li", isPrimary: true },
            { name: "Tyler Zhu", isPrimary: true },
            { name: "Jitendra Malik" },
            { name: "Trevor Darrell" },
            { name: "Karttikeya Mangalam" },
        ],
        venue: "International Conference on Machine Learning (ICML) 2024",
        links: [
            {
                url: "http://ai-climate.berkeley.edu/xt-website/",
                display: "website",
            },
            {
                url: "https://arxiv.org/abs/2403.01915",
                display: "paper",
            },
            {
                url: "http://github.com/bair-climate-initiative/xT/",
                display: "github",
            },
        ],
        excerpt:
            "xT is a framework which lets you model extremely large images (upwards of 30,000 x 30,000 pixels) end-to-end on contemporary GPUs. You get higher accuracy with fewer parameters and less memory used per region.",
        date: "2024-03-04",
        imgSrc: "/images/thumbnails/xt.png",
    },
    {
        title: "Russian Nuclear ASAT Weapons: The Fallout",
        authors: [
            { name: "Sarthak Bhatnagar" },
            { name: "Eli Glickman" },
            { name: "Bethany Goldblum" },
            { name: "Ritwik Gupta" },
            { name: "Kaitlyn Lenkeit" },
            { name: "Jane Darby Menton" },
            { name: "Andrew Neciuk" },
            { name: "Andrew Reddie" },
            { name: "Vishwaa Sofat" },
            { name: "Leah Walker" },
        ],
        venue: "Lawfare",
        links: [
            {
                url: "https://www.lawfaremedia.org/article/russian-nuclear-asat-weapons-the-fallout",
                display: "paper",
            },
        ],
        excerpt:
            "What is the state of the existing space governance regime amid concerns that Moscow is developing a nuclear-tipped anti-satellite weapon in orbit?",
        date: "2024-02-26",
        imgSrc: "/images/thumbnails/russianasat.jpg",
    },
    {
        title: "LAION and the Challenges of Preventing AI-Generated CSAM",
        authors: [{ name: "Ritwik Gupta" }],
        venue: "Tech Policy Press",
        links: [
            {
                url: "https://www.techpolicy.press/laion-and-the-challenges-of-preventing-ai-generated-csam/",
                display: "paper",
            },
        ],
        excerpt:
            "I examined the challenges in preventing AI-generated Child Sexual Abuse Material (CSAM), such as within the widely-used LAION-5B dataset, emphasizing the need for updated legal and technological strategies to tackle the spread of such content by generative AI technologies.",
        date: "2024-01-02",
        imgSrc: "/images/thumbnails/laion.png",
    },
    {
        title: "See, Say, and Segment: Teaching LMMs to Overcome False Premises",
        authors: [
            { name: "Tsung-Han Wu" },
            { name: "Giscard Biamby" },
            { name: "David Chan" },
            { name: "Lisa Dunlap" },
            { name: "Ritwik Gupta" },
            { name: "Xudong Wang" },
            { name: "Joseph E. Gonzalez" },
            { name: "Trevor Darrell" },
        ],
        venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) 2024",
        links: [
            {
                url: "https://see-say-segment.github.io/",
                display: "website",
            },
            {
                url: "https://arxiv.org/abs/2312.08366",
                display: "paper",
            },
            {
                url: "https://github.com/see-say-segment/sesame",
                display: "github",
            },
        ],
        excerpt:
            "A method to prevent large, multimodal models (LMMs) to stop hallucinating when given false premises.",
        date: "2023-12-13",
        imgSrc: "/images/thumbnails/sesame.jpg",
    },
    {
        title: "Proliferate, Don't Obliterate: How Responsive Launch Marginalizes Anti-Satellite Capabilities",
        authors: [{ name: "Ritwik Gupta" }, { name: "Andrew W. Reddie" }],
        venue: "War on the Rocks",
        links: [
            {
                url: "https://warontherocks.com/2023/09/proliferate-dont-obliterate-how-responsive-launch-marginalizes-anti-satellite-capabilities/",
                display: "paper",
            },
        ],
        excerpt:
            "We analyze how the emerging responsive launch industry fundamentally shifts the strategic calculus of ASAT weapons.",
        date: "2023-09-21",
        imgSrc: "/images/thumbnails/responsivelaunch.jpg",
    },
    {
        title: "Accelerating the Evolution of AI Export Controls",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Andrew W. Reddie" },
        ],
        venue: "Tech Policy Press",
        links: [
            {
                url: "https://techpolicy.press/accelerating-the-evolution-of-ai-export-controls/",
                display: "paper",
            },
        ],
        excerpt:
            "Current US AI hardware export controls are based on the best AI accelerator chip available at that time. This presents wide loopholes which allow adversarial nations to still maintain their capabilities. We propose an alternate way to set export control thresholds based on the analysis of specific ML workloads.",
        date: "2023-09-21",
        imgSrc: "/images/thumbnails/exportcontrols.png",
    },
    {
        title: "Confidence-Building Measures for Artificial Intelligence",
        authors: [
            { name: "Sarah Shoker" },
            { name: "Andrew Reddie" },
            { name: "Sarah Barrington" },
            { name: "Ruby Booth" },
            { name: "Miles Brundage" },
            { name: "Husanjot Chahal" },
            { name: "Michael Depp" },
            { name: "Bill Drexel" },
            { name: "Ritwik Gupta" },
            { name: "Marina Favaro" },
            { name: "Jake Hecla" },
            { name: "Alan Hickey" },
            { name: "Margarita Konaev" },
            { name: "Kirthi Kumar" },
            { name: "Nathan Lambert" },
            { name: "Andrew Lohn" },
            { name: "Cullen O'Keefe" },
            { name: "Nazneen Rajani" },
            { name: "Michael Sellitto" },
            { name: "Robert Trager" },
            { name: "Leah Walker" },
            { name: "Alexa Wehsener" },
            { name: "Jessica Young" },
        ],
        venue: "Workshop proceedings",
        links: [
            {
                url: "https://arxiv.org/abs/2308.00862",
                display: "paper",
            },
        ],
        excerpt:
            "Workshop proceedings from the the Confidence-Building Measures for Artificial Intelligence workshop hosted by the Geopolitics Team at OpenAI and the Berkeley Risk and Security Lab at the University of California.",
        date: "2023-08-01",
        imgSrc: "/images/thumbnails/cbmai.jpg",
    },
    {
        title: "ClimSim: An open large-scale dataset for training high-resolution physics emulators in hybrid multi-scale climate simulators",
        authors: [
            { name: "Sungduk Yu" },
            { name: "Walter M. Hannah" },
            { name: "Liran Peng" },
            { name: "Mohamed Aziz Bhouri" },
            { name: "Ritwik Gupta" },
            { name: "Jerry Lin" },
            { name: "Björn Lütjens" },
            { name: "Justus C. Will" },
            { name: "Tom Beucler" },
            { name: "Bryce E. Harrop" },
            { name: "Benjamin R. Hillman" },
            { name: "Andrea M. Jenney" },
            { name: "Savannah L. Ferretti" },
            { name: "Nana Liu" },
            { name: "Anima Anandkumar" },
            { name: "Noah D. Brenowitz" },
            { name: "Veronika Eyring" },
            { name: "Pierre Gentine" },
            { name: "Stephan Mandt" },
            { name: "Jaideep Pathak" },
            { name: "Carl Vondrick" },
            { name: "Rose Yu" },
            { name: "Laure Zanna" },
            { name: "Ryan P. Abernathey" },
            { name: "Fiaz Ahmed" },
            { name: "David C. Bader" },
            { name: "Pierre Baldi" },
            { name: "Elizabeth A. Barnes" },
            { name: "Gunnar Behrens" },
            { name: "Christopher S. Bretherton" },
            { name: "Julius J. M. Busecke" },
            { name: "Peter M. Caldwell" },
            { name: "Wayne Chuang" },
            { name: "Yilun Han" },
            { name: "Yu Huang" },
            { name: "Fernando Iglesias-Suarez" },
            { name: "Sanket Jantre" },
            { name: "Karthik Kashinath" },
            { name: "Marat Khairoutdinov" },
            { name: "Thorsten Kurth" },
            { name: "Nicholas J. Lutsko" },
            { name: "Po-Lun Ma" },
            { name: "Griffin Mooers" },
            { name: "J. David Neelin" },
            { name: "David A. Randall" },
            { name: "Sara Shamekh" },
            { name: "Akshay Subramaniam" },
            { name: "Mark A. Taylor" },
            { name: "Nathan M. Urban" },
            { name: "Janni Yuval" },
            { name: "Guang J. Zhang" },
            { name: "Tian Zheng" },
            { name: "Michael S. Pritchard" },
        ],
        venue: "Neural Information Processing Systems (NeurIPS) 2023",
        links: [
            {
                url: "https://leap-stc.github.io/ClimSim/",
                display: "website",
            },
            {
                url: "https://arxiv.org/abs/2306.08754",
                display: "paper",
            },
            {
                url: "https://github.com/leap-stc/ClimSim/",
                display: "github",
            },
        ],
        award: "Best Paper Award",
        excerpt:
            "The largest-ever dataset designed for hybrid ML-physics research. It comprises multi-scale climate simulations, developed by a consortium of climate scientists and ML researchers.",
        date: "2023-06-14",
        imgSrc: "/images/thumbnails/climsim.jpg",
    },
    {
        title: "Orbital hypersonic delivery systems threaten strategic stability",
        authors: [{ name: "Ritwik Gupta" }],
        venue: "The Bulletin of Atomic Scientists",
        links: [
            {
                url: "https://thebulletin.org/2023/06/orbital-hypersonic-delivery-systems-threaten-strategic-stability/",
                display: "paper",
            },
        ],
        excerpt:
            "We assess that China's development of a fractional orbital hypersonic delivery system, combining hypersonic glide vehicles with orbital bombardment, presents a concerning challenge to global stability, allowing for faster, undetectable delivery of large nuclear payloads and signaling renewed interest in first-strike capabilities.",
        date: "2023-06-13",
        imgSrc: "/images/thumbnails/fohds.jpg",
    },
    {
        title: "Harnessing AI and Robotics in Humanitarian Assistance and Disaster Response",
        authors: [
            { name: "Thomas Manzini" },
            { name: "Robin R Murphy" },
            { name: "Eric Heim" },
            { name: "Caleb Robinson" },
            { name: "Guido Zarrella" },
            { name: "Ritwik Gupta" },
        ],
        venue: "Science Robotics",
        links: [
            {
                url: "https://par.nsf.gov/servlets/purl/10445506",
                display: "paper",
            },
        ],
        excerpt:
            "AI and robotics can facilitate humanitarian assistance and disaster response, but partnerships with practitioners are crucial.",
        date: "2023-07-26",
        imgSrc: "/images/thumbnails/hadrrobotics.jpg",
    },
    {
        title: "Scale-MAE: A Scale-Aware Masked Autoencoder for Multiscale Geospatial Representation Learning",
        authors: [
            { name: "Ritwik Gupta", isPrimary: true },
            { name: "Colorado Reed", isPrimary: true },
            { name: "Shufan Li", isPrimary: true },
            { name: "Sarah Brockman" },
            { name: "Christopher Funk" },
            { name: "Brian Clipp" },
            { name: "Kurt Keutzer" },
            { name: "Salvatore Candido" },
            { name: "Matt Uyttendaele" },
            { name: "Trevor Darrell" },
        ],
        venue: "International Conference on Computer Vision (ICCV) 2023",
        links: [
            {
                url: "https://ai-climate.berkeley.edu/scale-mae-website/",
                display: "website",
            },
            {
                url: "https://arxiv.org/abs/2212.14532",
                display: "paper",
            },
            {
                url: "https://github.com/bair-climate-initiative/scale-mae",
                display: "github",
            },
        ],
        award: "Nominated for Best Paper",
        excerpt:
            "A pre-training method to make encoders robust to imagery captured at varying satellite resolutions. State-of-the-art multi-scale pre-training method and the largest satellite imagery foundation model, to date.",
        date: "2022-12-30",
        imgSrc: "/images/thumbnails/scalemae.png",
    },
    {
        title: "Emerging Technology and Policy Co-Design Considerations for the Safe and Transparent Use of Small Unmanned Aerial Systems",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Alexander Bayen" },
            { name: "Sarah Rohrschneider" },
            { name: "Adrienne Fulk" },
            { name: "Andrew Reddie" },
            { name: "Sanjit A. Seshia" },
            { name: "Shankar Sastry" },
            { name: "Janet Napolitano" },
        ],
        venue: "Center for Security in Politics, UC Berkeley",
        links: [
            {
                url: "https://arxiv.org/abs/2212.02795",
                display: "paper",
            },
        ],
        excerpt:
            "With the meteoric rise of small unmanned aerial systems, we discuss policy shortcomings in integrating sUAS technology in a safe fashion into our society. We suggest technology and policy co-design approaches to addressing these gaps in our systems.",
        date: "2022-12-06",
        imgSrc: "/images/thumbnails/suas.jpg",
    },
    {
        title: "xView3-SAR: Detecting Dark Fishing Activity Using Synthetic Aperture Radar Imagery",
        authors: [
            { name: "Ritwik Gupta", isPrimary: true },
            { name: "Fernando Paolo", isPrimary: true },
            { name: "Tsu-ting Tim Lin", isPrimary: true },
            { name: "Bryce Goodman" },
            { name: "Nirav Patel" },
            { name: "Daniel Kuster" },
            { name: "David Kroodsma" },
            { name: "Jared Dunnmon" },
        ],
        venue: "NeurIPS 2022",
        links: [
            {
                url: "https://iuu.xview.us/",
                display: "website",
            },
            {
                url: "https://arxiv.org/abs/2206.00897",
                display: "paper",
            },
            {
                url: "https://github.com/DIUx-xView/xview3-reference/",
                display: "github",
            },
            {
                url: "https://youtu.be/RPnUqmSyZ6Q",
                display: "youtube",
            },
        ],
        excerpt:
            "The largest labeled dataset for training ML models to detect and characterize vessels and ocean structures in synthetic aperture radar imagery. xView3 is built to help control illegal, unreported, and unregulated fishing.",
        date: "2022-12-03",
        imgSrc: "/images/thumbnails/xview3.jpg",
    },
    {
        title: "Satlas: A Large-Scale, Multi-Task Dataset for Remote Sensing Image Understanding",
        authors: [
            { name: "Favyen Bastani" },
            { name: "Piper Wolters" },
            { name: "Ritwik Gupta" },
            { name: "Joe Ferdinando" },
            { name: "Aniruddha Kembhavi" },
        ],
        venue: "International Conference on Computer Vision (ICCV) 2023",
        links: [
            {
                url: "https://satlas.allenai.org/",
                display: "website",
            },
            {
                url: "https://arxiv.org/abs/2211.15660",
                display: "paper",
            },
        ],
        excerpt:
            "A foundational remote sensing dataset with over 290M labels under 137 categories and seven label modalities for pre-training large machine learning models.",
        date: "2022-11-28",
        imgSrc: "/images/thumbnails/satlas.png",
    },
    {
        title: "Snowpack Estimation in Key Mountainous Water Basins from Openly-Available, Multimodal Data Sources",
        authors: [
            { name: "Malachy Moran" },
            { name: "Kayla Woputz" },
            { name: "Derrick Hee" },
            { name: "Manuela Girotto" },
            { name: "Paolo D'Odorico" },
            { name: "Ritwik Gupta" },
            { name: "Daniel Feldman" },
            { name: "Puya Vahabi" },
            { name: "Alberto Todeschini" },
            { name: "Colorado J Reed" },
        ],
        venue: "CVPR 2022 Workshop on Multimodal Learning for Earth and Environment",
        links: [
            {
                url: "https://arxiv.org/pdf/2208.04246.pdf",
                display: "paper",
            },
            {
                url: "https://github.com/Seiris21/ucb2022.snowcast",
                display: "github",
            },
        ],
        excerpt:
            "We fuse satellite and weather data to estimate snowpack depth in key mountainous regions and beat single-source estimation by 5.0 inches RMSE.",
        date: "2022-06-20",
        imgSrc: "/images/thumbnails/snowpack.png",
    },
    {
        title: "WiSoSuper: Benchmarking Super-Resolution Methods on Wind and Solar Data",
        authors: [
            { name: "Rupa Kurinchi-Vendhan" },
            { name: "Björn Lütjens" },
            { name: "Ritwik Gupta" },
            { name: "Lucien Werner" },
            { name: "Dava Newman" },
        ],
        venue: "Climate Change AI Workshop at NeurIPS 2021",
        links: [
            {
                url: "https://rupakv.com/wisosuper.html",
                display: "website",
            },
            {
                url: "https://arxiv.org/abs/2109.08770",
                display: "paper",
            },
            {
                url: "https://github.com/RupaKurinchiVendhan/WiSoSuper",
                display: "github",
            },
            {
                url: "https://www.youtube.com/watch?v=YUwmfqVKBMY",
                display: "youtube",
            },
        ],
        excerpt:
            "An extensible benchmark of deep learning-based super-resolution techniques on wind and solar data. We accompany the benchmark with a novel public, processed, and machine learning-ready dataset for benchmarking super-resolution methods on wind and solar data.",
        date: "2021-09-23",
        imgSrc: "/images/thumbnails/wisosuper.png",
    },
    {
        title: "Region-level Active Detector Learning",
        authors: [
            { name: "Michael Laielli" },
            { name: "Giscard Biamby" },
            { name: "Dian Chen" },
            { name: "Ritwik Gupta" },
            { name: "Adam Loeffler" },
            { name: "Phat Dat Nguyen" },
            { name: "Ross Luo" },
            { name: "Trevor Darrell" },
            { name: "Sayna Ebrahimi" },
        ],
        venue: "arXiv preprint",
        links: [
            {
                url: "https://arxiv.org/abs/2108.09186",
                display: "paper",
            },
        ],
        excerpt:
            "A new strategy that subsumes previous Image-level and Object-level approaches into a generalized, Region-level approach.",
        date: "2021-08-20",
        imgSrc: "/images/thumbnails/real.png",
    },
    {
        title: "xBD: A Dataset for Assessing Building Damage from Satellite Imagery",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Richard Hosfelt" },
            { name: "Sandra Sajeev" },
            { name: "Nirav Patel" },
            { name: "Bryce Goodman" },
            { name: "Jigar Doshi" },
            { name: "Eric Heim" },
            { name: "Howie Choset" },
            { name: "Matthew Gaston" },
        ],
        venue: "arXiv preprint",
        links: [
            {
                url: "https://www.xview2.org/",
                display: "website",
            },
            {
                url: "https://arxiv.org/abs/1911.09296",
                display: "paper",
            },
            {
                url: "https://github.com/DIUx-xView/xView2_baseline",
                display: "github",
            },
        ],
        excerpt:
            "The foundational dataset for assessing building damage after natural disasters from very-high resolution satellite imagery with over 850,000 annotations across 45,000 square kilometers.",
        date: "2019-11-21",
        imgSrc: "/images/thumbnails/xbd.jpg",
    },
    {
        title: "Creating xBD: A Dataset for Assessing Building Damage from Satellite Imagery",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Bryce Goodman" },
            { name: "Nirav Patel" },
            { name: "Ricky Hosfelt" },
            { name: "Sandra Sajeev" },
            { name: "Eric Heim" },
            { name: "Jigar Doshi" },
            { name: "Keane Lucas" },
            { name: "Howie Choset" },
            { name: "Matthew Gaston" },
        ],
        venue: "Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR) Workshops 2019",
        links: [
            {
                url: "https://www.xview2.org/",
                display: "website",
            },
            {
                url: "https://openaccess.thecvf.com/content_CVPRW_2019/papers/cv4gc/Gupta_Creating_xBD_A_Dataset_for_Assessing_Building_Damage_from_Satellite_CVPRW_2019_paper.pdf",
                display: "paper",
            },
            {
                url: "https://github.com/DIUx-xView/xView2_baseline",
                display: "github",
            },
        ],
        excerpt:
            "Preliminary work discussing xBD, the foundational dataset for assessing building damage after natural disasters from very-high resolution satellite imagery with over 850,000 annotations across 45,000 square kilometers.",
        date: "2019-06-20",
        imgSrc: "/images/thumbnails/creatingxbd.jpg",
    },
    {
        title: "Focusing on the Big Picture: Insights into a Systems Approach to Deep Learning for Satellite Imagery",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Carson D. Sestili" },
            { name: "Javier A. Vazquez-Trejo" },
            { name: "Matthew E. Gaston" },
        ],
        venue: "2018 IEEE International Conference on Big Data",
        links: [
            {
                url: "https://arxiv.org/abs/1811.04893",
                display: "paper",
            },
        ],
        excerpt:
            "Focused around the IARPA Functional Map of the World Challenge, this work discusses how to scale deep learning at an academic lab for geospatial analysis.",
        date: "2018-12-10",
        imgSrc: "/images/thumbnails/bigpicture.jpg",
    },
    {
        title: "Open Problems in Robotic Anomaly Detection",
        authors: [
            { name: "Ritwik Gupta" },
            { name: "Zachary T. Kurtz" },
            { name: "Sebastian Scherer" },
            { name: "Jonathon M. Smereka" },
        ],
        venue: "arXiv preprint",
        links: [
            {
                url: "https://arxiv.org/abs/1809.03565",
                display: "paper",
            },
        ],
        excerpt:
            "Motivated by the development of ROS 2, this work discusses open problems in the field of robotic anomaly detection and presents an inverse reinforcement learning-based approach to detecting anomalous motion.",
        date: "2018-12-10",
        imgSrc: "/images/thumbnails/rad.png",
    },
];
