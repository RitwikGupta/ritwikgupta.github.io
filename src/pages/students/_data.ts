export type StudentSection =
    | "phd"
    | "current"
    | "committee"
    | "former_bs_ms"
    | "former_phd";

export interface Student {
    name: string;
    role: string;
    institution: string;
    website: string;
    image: string;
    email?: string;
    description?: string;
    section: StudentSection;
}

export const students: Student[] = [
    {
        name: "Declan Kutscher",
        role: "Ph.D. Student",
        institution: "University of Maryland, College Park",
        website: "https://d3tk.github.io/",
        email: "declank@umd.edu",
        image: "/images/students/declan.jpg",
        section: "phd",
    },
    {
        name: "Priyankari Perali",
        role: "Ph.D. Student",
        institution: "University of Maryland, College Park",
        website: "https://www.linkedin.com/in/priyankari-perali",
        email: "perali@umd.edu",
        image: "/images/students/priya.jpg",
        section: "phd",
    },
    {
        name: "Clare Yang",
        role: "Ph.D. Student",
        institution: "University of Maryland, College Park",
        website: "https://www.linkedin.com/in/clare-yang/",
        email: "cyang120@umd.edu",
        image: "/images/students/clare.jpg",
        section: "phd",
    },
    {
        name: "CJ Nygard",
        role: "Ph.D. Student",
        institution: "University of Maryland, College Park",
        website: "https://www.linkedin.com/in/cj-nygard-31ab16224",
        email: "cnygard@umd.edu",
        image: "/images/students/cj.jpg",
        section: "phd",
    },
    {
        name: "Nyx Iskandar",
        role: "Research Engineer",
        institution: "Aura",
        website: "https://xyntechx.com/",
        image: "/images/students/nyx-iskandar.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Grey Pilarczyk",
        role: "B.S. Student",
        institution: "George Washington University",
        website: "https://www.linkedin.com/in/grey-pilarczyk-8203a5295/",
        image: "/images/students/grey-pilarczyk.jpg",
        section: "current",
    },
    {
        name: "Henry Gaston",
        role: "B.S. Student",
        institution: "California Institute of Technology",
        website: "https://www.linkedin.com/in/henry-gaston/",
        image: "/images/students/henry-gaston.jpg",
        section: "current",
    },
    {
        name: "Sahir Tandon",
        role: "B.S. Student",
        institution: "University of California, Berkeley",
        website: "https://www.linkedin.com/in/sahir-tandon",
        image: "/images/students/sahir-tandon.jpg",
        section: "current",
    },
    {
        name: "Anirudh Kotamraju",
        role: "B.S. Student",
        institution: "University of California, Berkeley",
        website: "https://www.anirudhkotamraju.com/",
        image: "/images/students/anirudh-kotamraju.jpg",
        section: "current",
    },
    {
        name: "Andrea Li",
        role: "B.S. Student",
        institution: "University of California, Berkeley",
        website: "https://www.linkedin.com/in/andrea-yilu-li",
        image: "/images/students/andrea-li.jpg",
        section: "current",
    },
    {
        name: "Pranav Pattatathunaduvil",
        role: "MPP Student",
        institution: "Yale University",
        website: "https://jackson.yale.edu/person/pranav-pattatathunaduvil/",
        image: "/images/students/pranav-pattatathunaduvil.jpg",
        section: "current",
    },
    {
        name: "Zhuoning Gu",
        role: "Ph.D. Student",
        institution: "Department of Geographical Sciences, University of Maryland, College Park",
        website: "https://geog.umd.edu/gradprofile/gu/zhuoning",
        image: "/images/students/zhuoning-gu.jpg",
        section: "committee",
    },
    {
        name: "Naomi Carvalho",
        role: "B.S. Student",
        institution: "University of California, Berkeley",
        website: "https://www.linkedin.com/in/naomilqcarvalho/",
        image: "/images/students/naomi-carvalho.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Kaylene Stocking",
        role: "Research Assistant Professor",
        institution: "Toyota Technological Institute at Chicago",
        website: "https://www.ttic.edu/faculty/stocking/",
        image: "/images/students/kaylene-stocking.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Alex Fulton",
        role: "Cyber Officer",
        institution: "U.S. Air Force",
        website: "https://www.linkedin.com/in/alex-fulton/",
        image: "/images/students/alex-fulton.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Sandra Sajeev",
        role: "Senior Machine Learning Scientist",
        institution: "Coursera",
        website: "https://www.linkedin.com/in/sandra-s-59a08298/",
        image: "/images/students/sandra-sajeev.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Dominick Gurnari",
        role: "Technical Program Manager",
        institution: "Snap",
        website: "https://www.linkedin.com/in/dominick-gurnari/",
        image: "/images/students/dominick-gurnari.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Danny Tunitis",
        role: "Cyber Officer",
        institution: "U.S. Air Force",
        website: "https://www.linkedin.com/in/daniel-tunitis/",
        image: "/images/students/danny-tunitis.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Rupa Kurinchi-Vendhan",
        role: "Ph.D. Student",
        institution: "Massachusetts Institute of Technology",
        website: "http://rupakv.com/",
        image: "/images/students/rupa-kurinchi-vendhan.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Rithwik Sudharshan",
        role: "Senior",
        institution: "University of California, Berkeley",
        website: "https://www.linkedin.com/in/rithwik-sudharsan/",
        image: "/images/students/rithwik-sudharshan.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Eli Glickman",
        role: "Marshall and Truman Scholar",
        institution: "University of California, Berkeley",
        website: "https://www.linkedin.com/in/eli-glickman/",
        image: "/images/students/eli-glickman.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Shufan Li",
        role: "Ph.D. Student",
        institution: "University of California, Los Angeles",
        website: "https://homepage.jackli.org/",
        image: "/images/students/shufan-li.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Emily Gelbart",
        role: "Ph.D. Student",
        institution: "Texas Tech University and NASA",
        website: "https://www.linkedin.com/in/emilygelbart",
        image: "/images/students/emily-gelbart.jpg",
        section: "former_bs_ms",
    },
    {
        name: "Tyler Zhu",
        role: "Ph.D. Student",
        institution: "Princeton University",
        website: "https://tylerzhu.com/",
        image: "/images/students/tyler-zhu.jpg",
        section: "former_bs_ms",
    },
];

export const studentSections: { id: StudentSection; title: string }[] = [
    { id: "phd", title: "Ph.D. Students" },
    { id: "current", title: "B.S./M.S. Students" },
    { id: "committee", title: "Committee Member" },
    { id: "former_bs_ms", title: "Former B.S./M.S. Students" },
    { id: "former_phd", title: "Former Ph.D. Students" },
];
