export interface HackathonTrack {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  focusAreas: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const HACKATHON_CONFIG = {
  meta: {
    name: "CALMSTACKS 24 HOUR HACKATHON",
    shortName: "24H HACKATHON",
    tagline: "BUILD. SOLVE. IMPACT.",
    series: "CSE Student Development Series",
    organizer: "CALMSTACKS",
    dates: "25–26 SEPTEMBER 2026",
    startTime: "11:30 AM IST",
    startDateIso: "2026-09-25T11:30:00+05:30",
    endDateIso: "2026-09-26T11:30:00+05:30",
    format: "OFFLINE",
    venue: "MALNAD COLLEGE OF ENGINEERING",
    venueShort: "Malnad College of Engineering",
    city: "HASSAN, KARNATAKA",
    department: "Department of Computer Science & Engineering",
    coordinates: "13.0072° N, 76.0964° E",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Malnad+College+of+Engineering+Hassan",
    registrationOpen: true,
    prizePoolTotal: "₹50,000",
    feePerMember: "₹300 / head",
    teamSizeLimit: "Flexible (1 to 4 Members)",
    foodIncluded: "Full Meals, Snacks & Refreshments Included",
    certificates: "Certificates for All Participants",
  },

  payment: {
    feePerMember: 300,
    upiId: "arilsrinivas8@okhdfcbank",
    payeeName: "Aril Srinivas",
    qrImage: "/assets/payment_qr.jpg",
  },

  hero: {
    smallLabel: "CALMSTACKS PRESENTS",
    headlineLine1: "24",
    headlineLine2: "HOUR",
    headlineLine3: "HACKATHON",
    supportingHeadline: "BUILD. SOLVE. IMPACT.",
    description:
      "The CalmStacks 24 Hour Hackathon is an intensive offline building sprint where participants turn ideas into working solutions within 24 hours. Open to students from any college, conducted at Malnad College of Engineering, Hassan, as part of the CSE Student Development Series.",
    metadataItems: [
      { label: "DATES", value: "25–26 SEPTEMBER 2026" },
      { label: "START", value: "11:30 AM IST" },
      { label: "VENUE", value: "MALNAD COLLEGE OF ENGINEERING" },
      { label: "LOCATION", value: "HASSAN, KARNATAKA" },
      { label: "PRIZE POOL", value: "₹50,000" },
      { label: "FORMAT", value: "OFFLINE" },
    ],
    primaryCta: "REGISTER NOW →",
    secondaryCta: "EXPLORE HACKATHON ↓",
  },

  telemetry: [
    { label: "EVENT", value: "24H OFFLINE SPRINT" },
    { label: "DATE", value: "25–26 SEPTEMBER 2026" },
    { label: "START", value: "11:30 AM IST" },
    { label: "DURATION", value: "24 HOURS" },
    { label: "FORMAT", value: "OFFLINE" },
    { label: "VENUE", value: "MALNAD COLLEGE OF ENGINEERING" },
    { label: "LOCATION", value: "HASSAN, KARNATAKA" },
    { label: "PRIZE POOL", value: "₹50,000" },
  ],

  about: {
    sectionTag: "01 // OVERVIEW",
    heading: "BUILD SOMETHING REAL.",
    intro:
      "The CalmStacks 24 Hour Hackathon is an intensive offline building sprint where participants turn ideas into working solutions within 24 hours.",
    subIntro:
      "Conducted at Malnad College of Engineering, Hassan, as part of the CSE Student Development Series, the event brings together passionate students from any college, branch, or year to build, collaborate, solve problems and present what they create.",
  },

  whatYouWillDo: [
    {
      number: "01",
      title: "IDEATE",
      description: "Start with a problem and shape it into a practical solution.",
    },
    {
      number: "02",
      title: "BUILD",
      description: "Design and develop a functional prototype within 24 hours.",
    },
    {
      number: "03",
      title: "COLLABORATE",
      description: "Work with teammates, mentors and fellow builders.",
    },
    {
      number: "04",
      title: "PRESENT",
      description: "Demonstrate your solution and explain the impact behind it.",
    },
  ],

  challenge: {
    sectionTag: "03 // THE CHALLENGE",
    heading: "THE CHALLENGE",
    subheading: "24 HOURS. ONE BUILD.",
    description:
      "You will receive the challenge at the beginning of the hackathon. Your task is to understand the problem, plan your approach and turn your idea into a working solution before the 24-hour sprint ends.",
    stackTitle: "NO PRE-DEFINED STACK",
    stackSubheading: "BUILD WITH THE TOOLS YOU KNOW.",
    stackDescription:
      "Use the technologies, frameworks and development tools that best suit your solution.",
  },

  buildFormat: [
    { number: "01", name: "START", desc: "Check in and understand the challenge." },
    { number: "02", name: "PLAN", desc: "Define your idea, architecture and approach." },
    { number: "03", name: "BUILD", desc: "Develop your working solution." },
    { number: "04", name: "TEST", desc: "Refine your product and prepare your demonstration." },
    { number: "05", name: "SUBMIT", desc: "Submit your completed solution before the 24-hour deadline." },
    { number: "06", name: "PRESENT", desc: "Demonstrate your project to the evaluation panel." },
  ],

  timeline: {
    sectionTag: "04 // SPRINT PROTOCOL & TIMELINE",
    heading: "24 HOURS.\nONE SPRINT.",
    subheading: "A continuous 24-hour roadmap starting from check-in to final demo.",
    startMilestone: {
      date: "25 SEPTEMBER",
      time: "11:30 AM IST",
      label: "CHECK-IN + HACKATHON OPENING",
    },
    steps: [
      { number: "01", label: "CHALLENGE REVEAL", desc: "Problem statement introduction live at kickoff." },
      { number: "02", label: "IDEATION", desc: "Brainstorming, problem decomposition and approach definition." },
      { number: "03", label: "BUILD", desc: "Rapid prototype development and core engineering." },
      { number: "04", label: "MENTORING", desc: "Technical feedback checkpoints with engineering leads." },
      { number: "05", label: "TESTING + ITERATION", desc: "UX refinement, code stabilization and feature checks." },
      { number: "06", label: "FINAL SUBMISSION", desc: "Codebase lockout and demonstration deck submission." },
      { number: "07", label: "DEMO + EVALUATION", desc: "Live working demonstration and presentation." },
    ],
    endMilestone: {
      date: "26 SEPTEMBER",
      time: "11:30 AM IST",
      label: "24-HOUR SPRINT ENDS",
    },
  },

  prizes: {
    sectionTag: "05 // PRIZES & REWARDS",
    headingAmount: "₹50,000",
    headingLabel: "PRIZE POOL",
    totalLabel: "TOTAL PRIZE POOL",
    tagline: "BUILD. SOLVE. IMPACT.",
    sprintMotto: "24 HOURS. ONE BUILD.",
    description:
      "A total prize pool of ₹50,000, along with internship opportunities for outstanding participants and teams.",
    internshipsHeading: "INTERNSHIP OPPORTUNITIES",
    internships: {
      paid: {
        value: "04",
        label: "PAID INTERNSHIPS",
        description:
          "Four paid internship opportunities will be offered to selected participants based on their performance during the hackathon.",
      },
      unpaid: {
        value: "VARIABLE",
        label: "UNPAID INTERNSHIPS",
        description:
          "Additional unpaid internship opportunities may be offered to selected participants based on performance, skills and organizational requirements.",
      },
    },
    items: [
      {
        number: "01",
        place: "FIRST PLACE",
        details: "TOP PROJECTS WILL BE REWARDED FROM THE ₹50,000 PRIZE POOL.",
      },
      {
        number: "02",
        place: "SECOND PLACE",
        details: "TOP PROJECTS WILL BE REWARDED FROM THE ₹50,000 PRIZE POOL.",
      },
      {
        number: "03",
        place: "THIRD PLACE",
        details: "TOP PROJECTS WILL BE REWARDED FROM THE ₹50,000 PRIZE POOL.",
      },
    ],
  },

  collaborations: {
    sectionTag: "06 // PARTNERSHIP & COLLABORATION",
    heading: "IN COLLABORATION WITH",
    partners: [
      {
        number: "01",
        name: "AGAMYA CYBER TECH",
        tagline: "SMART SECURITY FOR SMART PEOPLE.",
        description:
          "Agamya Cyber Tech is a cybersecurity company focused on services including Vulnerability Assessment and Penetration Testing (VAPT), information security audits, compliance, digital forensics, network security and cybersecurity training.",
        website: "https://agamyacybertech.com/",
        cta: "VISIT AGAMYA CYBER TECH →",
        logo: "/assets/partners/agamya-cyber-tech-logo.png",
        alt: "Agamya Cyber Tech",
        services: [
          "Cybersecurity services",
          "VAPT",
          "Information Security Audits",
          "Compliance",
          "Digital Forensics",
          "Network Security",
          "Cybersecurity Training",
        ],
      },
      {
        number: "02",
        name: "DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING",
        institution: "MALNAD COLLEGE OF ENGINEERING",
        tagline: "ESTABLISHED IN 1983–84 • NBA ACCREDITED",
        description:
          "The Department of Computer Science & Engineering at Malnad College of Engineering is the academic department supporting the event as part of the CSE Student Development Series. Established in 1983–84, the department offers the B.E. Computer Science & Engineering programme, is accredited by NBA, and supports research and innovation in computer networking, AI, machine learning, deep learning and cloud computing.",
        website: "https://www.mcehassan.ac.in/",
        cta: "VISIT MCE →",
        logo: "/assets/partners/mce-logo.png",
        alt: "Malnad College of Engineering",
      },
    ],
  },

  eligibility: {
    sectionTag: "07 // ELIGIBILITY & PARTICIPATION",
    heading: "OPEN TO ALL STUDENTS",
    subheading: "BE A PART OF SOMETHING BIGGER.",
    badge: "OPEN TO ALL STUDENTS",
    description:
      "The CalmStacks 24 Hour Hackathon is open to students from any college, regardless of branch or year. If you're passionate about building, solving real problems and creating meaningful solutions, you're welcome to join.",
    cardTitle: "OPEN HACKATHON",
    cardDescription:
      "The CalmStacks 24 Hour Hackathon is open to students from any college, regardless of branch or year. If you're passionate about building, solving real problems and creating meaningful solutions, you're welcome to join.",
    prominentMotto: "ANY COLLEGE. ANY BRANCH. ANY YEAR.",
    seriesLabel: [
      "CSE",
      "STUDENT",
      "DEVELOPMENT",
      "SERIES",
    ],
    seriesSubtext: "AN INITIATIVE BY CALMSTACKS AT MALNAD COLLEGE OF ENGINEERING",
  },

  participation: {
    whoShouldJoinTitle: "WHO SHOULD JOIN?",
    whoShouldJoinSubtitle: "STUDENTS WHO WANT TO:",
    reasons: [
      "BUILD REAL PROJECTS",
      "SOLVE MEANINGFUL PROBLEMS",
      "LEARN BY DOING",
      "WORK UNDER PRESSURE",
      "COLLABORATE WITH DIVERSE MINDS",
      "PRESENT THEIR IDEAS",
      "GAIN EXPOSURE AND NETWORK",
      "BE PART OF A THRIVING TECH COMMUNITY",
    ],
    whoShouldJoinFooter: "ANY COLLEGE. ANY BRANCH. ANY YEAR.",
    whatToBringTitle: "WHAT TO BRING",
    whatToBringSubtitle: "PREPARATION & ESSENTIALS",
    itemsToBring: [
      "YOUR LAPTOP",
      "YOUR DEVELOPMENT TOOLS",
      "YOUR IDEAS",
      "YOUR TEAMMATES",
      "A CHARGER & ESSENTIAL ACCESSORIES",
      "ENTHUSIASM AND A PROBLEM-SOLVING MINDSET",
    ],
    whatToBringFooter: "IDEAS + PEOPLE + 24 HOURS = IMPACT",
  },

  venue: {
    sectionTag: "08 // VENUE & LOCATION",
    heading: "SEE YOU AT MCE.",
    institution: "MALNAD COLLEGE OF ENGINEERING",
    addressLines: [
      "No. 21, Salagame Road,",
      "Rangoli Halla,",
      "Hassan, Karnataka – 573202",
    ],
    location: "HASSAN, KARNATAKA",
    format: "OFFLINE 24 HOUR HACKATHON",
    ctaLabel: "GET DIRECTIONS →",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Malnad+College+of+Engineering+Hassan",
  },

  faq: {
    sectionTag: "09 // INTEL & FAQ",
    heading: "FREQUENTLY ASKED QUESTIONS",
    subheading: "Everything you need to know about the 24-hour sprint at MCE Hassan.",
    items: [
      {
        id: "faq-dates",
        question: "WHEN IS THE HACKATHON?",
        answer:
          "25–26 September 2026. The 24-hour sprint begins at 11:30 AM IST on 25 September and concludes at 11:30 AM IST on 26 September.",
      },
      {
        id: "faq-venue",
        question: "WHERE IS IT BEING HELD?",
        answer: "Malnad College of Engineering, Hassan, Karnataka.",
      },
      {
        id: "faq-format",
        question: "IS IT ONLINE?",
        answer: "No. This is an offline, in-person hackathon.",
      },
      {
        id: "faq-duration",
        question: "HOW LONG IS THE HACKATHON?",
        answer: "24 continuous hours.",
      },
      {
        id: "faq-prizes",
        question: "WHAT IS THE PRIZE POOL?",
        answer: "The total prize pool is ₹50,000.",
      },
      {
        id: "faq-eligibility",
        question: "WHO CAN PARTICIPATE?",
        answer:
          "Students from any college, any branch and any year can participate.",
      },
      {
        id: "faq-bring",
        question: "WHAT SHOULD I BRING?",
        answer:
          "Bring your laptop, development tools and anything you need to build your project.",
      },
      {
        id: "faq-stack",
        question: "WHAT CAN WE BUILD WITH?",
        answer:
          "Participants can use the development technologies and tools appropriate for their solution.",
      },
      {
        id: "faq-challenge",
        question: "WHEN WILL THE CHALLENGE BE REVEALED?",
        answer: "The challenge will be introduced at the beginning of the hackathon.",
      },
      {
        id: "faq-submission",
        question: "WHAT HAPPENS AFTER SUBMISSION?",
        answer:
          "Projects will be demonstrated and evaluated as part of the final hackathon phase.",
      },
    ] as FaqItem[],
  },

  finalCta: {
    line1: "YOU HAVE",
    line2: "24 HOURS.",
    question1: "WHAT WILL",
    question2: "YOU BUILD?",
    dates: "25–26 SEPTEMBER 2026",
    startTime: "11:30 AM IST",
    prizePool: "₹50,000 PRIZE POOL",
    location: "MALNAD COLLEGE OF ENGINEERING, HASSAN",
    collaborationText: "IN COLLABORATION WITH AGAMYA CYBER TECH × MCE CSE",
    buttonLabel: "REGISTER NOW →",
  },

  footer: {
    brandName: "CALMSTACKS",
    eventTitle: "24 HOUR HACKATHON",
    dates: "25–26 SEPTEMBER 2026",
    location: "MALNAD COLLEGE OF ENGINEERING, HASSAN, KARNATAKA",
    collaborationText: "IN COLLABORATION WITH AGAMYA CYBER TECH + MCE CSE",
    seriesText: "CSE STUDENT DEVELOPMENT SERIES",
    links: [
      { label: "Instagram", href: "https://instagram.com/calmstacks" },
      { label: "LinkedIn", href: "https://linkedin.com/company/calmstacks" },
      { label: "CalmStacks", href: "/" },
    ],
    copyright: "© CALMSTACKS",
  },
};
