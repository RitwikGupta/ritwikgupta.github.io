interface Content {
    title: string;
    links: Link[];
}

interface Link {
    url: string;
    img: string;
}

export const content: Content[] = [
    {
        title: "AI for Disaster Response",
        links: [
            {
                url: "https://twitter.com/jchatterleyCNN/status/1630949841537839112",
                img: "/press/CNN.svg",
            },
            {
                url: "https://ig.ft.com/turkey-earthquake-apartment-collapse/",
                img: "/press/Financial_Times.svg",
            },
            {
                url: "https://www.technologyreview.com/2023/02/20/1068824/ai-actually-helpful-disaster-response-turkey-syria-earthquake/",
                img: "/press/MIT_Technology_Review.svg",
            },
            {
                url: "https://www.politico.com/news/2022/04/06/satellite-russian-war-crimes-00023386",
                img: "/press/POLITICO.svg",
            },
            {
                url: "https://appliedsciences.nasa.gov/our-impact/news/fighting-fires-together-xview-2-prize-challenge-helps-automate-damage-assessments",
                img: "/press/NASA.svg",
            },
            {
                url: "https://www.washingtonpost.com/technology/2019/11/06/california-has-million-acres-forest-this-company-is-training-artificial-intelligence-scour-it-all-wildfire/",
                img: "/press/Washington_Post.svg",
            },
            {
                url: "https://appliedsciences.nasa.gov/our-impact/story/challenge-automatically-assess-damaged-buildings-after-disaster",
                img: "/press/NASA.svg",
            },
            {
                url: "https://spectrum.ieee.org/tech-talk/computing/software/defense-department-launches-disastrous-computer-vision-contest",
                img: "/press/IEEE_Spectrum.svg",
            },
            {
                url: "https://www.nationaldefensemagazine.org/articles/2020/3/12/defense-innovation-unit-to-sponsor-computer-vision-prize-challenge",
                img: "/press/National_Defense.jpg",
            },
            {
                url: "https://www.theaustralian.com.au/science/bushfires-astronaut-paul-scullypower-in-space-age-plan-to-save-wildlife/news-story/b51795c4612c77213d387c995fa17b9f",
                img: "/press/The_Australian.svg",
            },
            {
                url: "https://sociable.co/technology/ai-natural-disaster-damage-assessment-california/",
                img: "/press/The_Sociable.png",
            },
            {
                url: "https://federalnewsnetwork.com/artificial-intelligence/2019/11/diu-teams-up-with-civilian-agencies-to-start-humanitarian-ai-challenge/",
                img: "/press/fnn.svg",
            },
            {
                url: "https://www.deutschlandfunkkultur.de/satelliten-bilder-krieg-100.html",
                img: "/press/Deutschlandfunk_Kultur.svg",
            },
            {
                url: "https://www.airforcemag.com/california-national-guard-using-satellites-to-fight-wildfires/",
                img: "/press/Air_Space_Forces.svg",
            },
            {
                url: "https://www.c4isrnet.com/intel-geoint/2019/10/04/can-ai-automate-damage-assessments-after-a-disaster/",
                img: "/press/c4isrnet.png",
            },
            {
                url: "https://www.fedscoop.com/xview2-challenge-building-damage-disaster-recovery/",
                img: "/press/FedScoop.svg",
            },
            {
                url: "https://spacenews.com/defense-innovation-unit-launches-new-satellite-imagery-prize-challenge/",
                img: "/press/spacenews.png",
            },
            {
                url: "https://www.afcea.org/content/dod-sponsors-artificial-intelligence-competition",
                img: "/press/AFCEA.svg",
            },
        ],
    },
    {
        title: "AI to Detect Illegal Fishing",
        links: [
            {
                url: "https://www.akbizmag.com/industry/fisheries/illegal-fishing-ai/",
                img: "/press/akbiz.webp",
            },
            {
                url: "https://www.nationaldefensemagazine.org/articles/2022/1/20/us-fishing-for-defense-tech-to-protect-international-waters",
                img: "/press/National_Defense.jpg",
            },
            {
                url: "https://www.defenseone.com/technology/2021/08/can-we-spot-illegal-fishing-fleets-space/184300/",
                img: "/press/defense-one.svg",
            },
            {
                url: "https://www.defense.gov/Explore/News/Article/Article/2703739/dod-announces-ai-competition-to-detect-defeat-illegal-fishing/",
                img: "/press/DOD.png",
            },
            {
                url: "https://www.nationaldefensemagazine.org/articles/2020/3/12/defense-innovation-unit-to-sponsor-computer-vision-prize-challenge",
                img: "/press/National_Defense.jpg",
            },
            {
                url: "https://www.maritime-executive.com/article/the-pentagon-wants-programmers-help-to-spot-iuu-fishing",
                img: "/press/marex.webp",
            },
        ],
    },
    {
        title: "AI for Climate Change",
        links: [
            {
                url: "https://berkeleysciencereview.com/article/2022/12/04/snowy-with-a-chance-of-data",
                img: "/press/berkeley-science.png",
            },
        ],
    },
    {
        title: "AI, National Security, and Public Policy",
        links: [
            {
                url: "https://www.wsj.com/tech/ai/artificial-intelligence-us-vs-china-03372176",
                img: "/press/wsj.svg"
            },
            {
                url: "https://www.defenseone.com/technology/2025/01/how-deepseek-changed-future-aiand-what-means-national-security/402594/",
                img: "/press/defense-one.svg"
            },
            {
                url: "https://giftarticle.ft.com/giftarticle/actions/redeem/97924662-a3db-44af-9875-d22023f945f1",
                img: "/press/Financial_Times.svg"
            },
            {
                url: "https://www.telegraph.co.uk/money/investing/stocks-shares/deepseek-sparks-ai-market-chaos-is-now-the-time-to-buy-up/",
                img: "/press/Telegraph.svg"
            },
            {
                url: "https://www.lemonde.fr/economie/article/2025/01/25/la-chine-talonne-les-americains-dans-la-course-a-l-intelligence-artificielle_6514703_3234.html",
                img: "/press/LeMonde.svg",
            },
            {
                url: "https://on.ft.com/4jwunLy",
                img: "/press/Financial_Times.svg",
            },
            {
                url: "https://time.com/7204164/china-ai-advances-chips/",
                img: "/press/Time.svg",
            },
            {
                url: "https://www.newscientist.com/article/2458860-tencent-seems-unaffected-by-us-ai-chip-export-ban-research-shows",
                img: "/press/NewScientist.svg",
            },
            {
                url: "https://www.csis.org/podcasts/ai-policy-podcast/ai-seoul-summit-us-china-ai-safety-readout-and-zhousidun-dataset",
                img: "/press/csis.png",
            },
            {
                url: "https://importai.substack.com/p/import-ai-374-chinas-military-ai",
                img: "/press/importai.png",
            },
            {
                url: "https://warontherocks.com/2023/09/proliferate-dont-obliterate-how-responsive-launch-marginalizes-anti-satellite-capabilities/",
                img: "/press/warontherocks.webp",
            },
            {
                url: "https://techpolicy.press/accelerating-the-evolution-of-ai-export-controls/",
                img: "/press/TechPolicyPress.svg",
            },
            {
                url: "https://thebulletin.org/2023/06/orbital-hypersonic-delivery-systems-threaten-strategic-stability/",
                img: "/press/atomic-scientists.webp",
            },
        ],
    },
    {
        title: "AI Safety and Governance",
        links: [
            {
                url: "https://fedscoop.com/ai-federal-research-database-laion-csam/",
                img: "/press/FedScoop.svg",
            },
            {
                url: "https://www.forbes.com/sites/timabansal/2023/11/17/corporate-strategies-for-ai-safety-and-governance/?sh=4e5013c327aa",
                img: "/press/Forbes.svg",
            },
            {
                url: "https://www.forbes.com/sites/timabansal/2023/10/13/does-openais-non-profit-ownership-structure-actually-matter/?sh=2d5548317d18",
                img: "/press/Forbes.svg",
            },
        ],
    },
    {
        title: "COVID-19",
        links: [
            {
                url: "https://www.usna.edu/NewsCenter/2020/12/Naval_Academy_Participates_in_Rapid_Analysis_of_Threat_Exposure_Rate_Study.php",
                img: "/press/USNA.svg",
            },
            {
                url: "https://www.afcea.org/content/detecting-change-artificial-intelligence",
                img: "/press/AFCEA.svg",
            },
            {
                url: "https://www.wsj.com/articles/thousands-of-american-troops-to-take-part-in-covid-19-early-detection-study-11600772402",
                img: "/press/wsj.svg",
            },
            {
                url: "https://www.defense.gov/Explore/News/Article/Article/2356086/ai-aiding-dod-in-early-detection-of-covid-19-say-technologists/",
                img: "/press/DOD.png",
            },
            {
                url: "https://www.defenseone.com/technology/2020/09/militarys-latest-wearables-can-detect-illness-two-days-you-get-sick/168664/",
                img: "/press/defense-one.svg",
            },
        ],
    },
];
