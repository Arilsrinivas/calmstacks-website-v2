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
    teamSizeLimit: "Flexible (Solo or Squads)",
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
      "A 24-hour offline hackathon by CalmStacks, conducted in collaboration with Agamya Cyber Tech and the Department of Computer Science & Engineering, Malnad College of Engineering.",
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
      "A 24-hour offline hackathon by CalmStacks, conducted in collaboration with Agamya Cyber Tech and the Department of Computer Science & Engineering, Malnad College of Engineering.",
    subIntro:
      "Participants will spend 24 hours turning ideas into working solutions through coding, collaboration and problem solving.",
  },

  coreValues: [
    {
      number: "01",
      title: "BUILD",
      description: "Turn ideas into working products.",
    },
    {
      number: "02",
      title: "COLLABORATE",
      description: "Work with people who think differently.",
    },
    {
      number: "03",
      title: "SOLVE",
      description: "Address meaningful problems through technology.",
    },
    {
      number: "04",
      title: "COMPETE",
      description: "Build, present and compete.",
    },
  ],

  challenge: {
    sectionTag: "02 // SPRINT FORMAT",
    heading: "THE CHALLENGE",
    statusText: "CHALLENGE DETAILS",
    statusBadge: "COMING SOON",
    description:
      "Official problem statements and track details will be announced on-stage at the event kickoff. Every participant starts with a clean slate for rapid 24-hour execution.",
  },

  timeline: {
    sectionTag: "03 // SPRINT PROTOCOL & TIMELINE",
    heading: "24 HOURS.\nONE BUILD.",
    subheading: "A 24-hour roadmap starting from kickoff to final jury evaluation.",
    startMilestone: {
      date: "25 SEPTEMBER",
      time: "11:30 AM IST",
      label: "HACKATHON BEGINS",
    },
    phases: [
      { number: "01", name: "IDEATION", desc: "Problem decomposition, brainstorming and alignment." },
      { number: "02", name: "ARCHITECTURE", desc: "System design, stack selection and repository setup." },
      { number: "03", name: "BUILD", desc: "Core feature engineering and rapid prototype creation." },
      { number: "04", name: "MENTORING", desc: "Checkpoints with engineers and technical feedback." },
      { number: "05", name: "ITERATION", desc: "Refining user experience, API integrations and bug fixes." },
      { number: "06", name: "FINAL BUILD", desc: "Feature freeze, production build and deployment." },
      { number: "07", name: "SUBMISSION", desc: "Project link lockout and slide deck submission." },
      { number: "08", name: "JUDGING", desc: "Live working demonstrations and Q&A before jury." },
    ],
    endMilestone: {
      date: "26 SEPTEMBER",
      time: "11:30 AM IST",
      label: "24-HOUR SPRINT ENDS",
    },
  },

  prizes: {
    sectionTag: "05 // PRIZES",
    headingAmount: "₹50,000",
    headingLabel: "PRIZE POOL",
    tagline: "BUILD. SOLVE. IMPACT.",
    description:
      "A total prize pool of ₹50,000 awaits the teams that rise to the challenge.",
    items: [
      {
        number: "01",
        place: "FIRST PLACE",
        details: "PRIZE DETAILS TO BE ANNOUNCED",
      },
      {
        number: "02",
        place: "SECOND PLACE",
        details: "PRIZE DETAILS TO BE ANNOUNCED",
      },
      {
        number: "03",
        place: "THIRD PLACE",
        details: "PRIZE DETAILS TO BE ANNOUNCED",
      },
    ],
  },

  collaborations: {
    sectionTag: "05 // PARTNERSHIP",
    heading: "IN COLLABORATION WITH",
    partners: [
      {
        number: "01",
        name: "AGAMYA CYBER TECH",
        description: "Cybersecurity-focused organization based in Karnataka.",
        website: "https://agamyacybertech.com/",
        cta: "VISIT AGAMYA CYBER TECH →",
        logo: "/assets/partners/agamya-cyber-tech-logo.png",
        alt: "Agamya Cyber Tech",
      },
      {
        number: "02",
        name: "DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING",
        institution: "MALNAD COLLEGE OF ENGINEERING",
        description: "Premier autonomous engineering institution in Hassan, Karnataka.",
        website: "https://www.mcehassan.ac.in/",
        cta: "VISIT MCE →",
        logo: "/assets/partners/mce-logo.png",
        alt: "Malnad College of Engineering",
      },
    ],
  },

  eligibility: {
    sectionTag: "06 // ELIGIBILITY & PARTICIPATION",
    heading: "WHO IS THIS FOR?",
    subheading: "BE A PART OF SOMETHING BIGGER.",
    badge: "OPEN TO CSE STUDENTS",
    description:
      "This hackathon is open to CSE students of Malnad College of Engineering. Come together, build something meaningful, and put your skills to the test in a 24-hour offline sprint.",
    cardTitle: "CSE STUDENT HACKATHON",
    cardDescription: "Open to CSE students of Malnad College of Engineering.",
    seriesLabel: ["CSE", "STUDENT", "DEVELOPMENT", "SERIES"],
    footerNote: "MORE PARTICIPATION DETAILS COMING SOON",
  },

  venue: {
    sectionTag: "07 // VENUE & LOCATION",
    heading: "SEE YOU AT MCE.",
    institution: "MALNAD COLLEGE OF ENGINEERING",
    location: "HASSAN, KARNATAKA",
    format: "OFFLINE HACKATHON",
    ctaLabel: "VIEW LOCATION →",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Malnad+College+of+Engineering+Hassan",
  },

  faq: {
    sectionTag: "08 // INTEL & FAQ",
    heading: "FREQUENTLY ASKED QUESTIONS",
    subheading: "Everything you need to know about the 24-hour sprint at MCE Hassan.",
    items: [
      {
        id: "faq-dates",
        question: "WHEN IS THE HACKATHON?",
        answer: "25–26 September 2026.",
      },
      {
        id: "faq-time",
        question: "WHAT TIME DOES IT START?",
        answer: "11:30 AM IST on 25 September 2026.",
      },
      {
        id: "faq-duration",
        question: "HOW LONG IS THE HACKATHON?",
        answer: "24 hours.",
      },
      {
        id: "faq-format",
        question: "IS IT ONLINE OR OFFLINE?",
        answer: "Offline.",
      },
      {
        id: "faq-venue",
        question: "WHERE IS THE HACKATHON?",
        answer: "Malnad College of Engineering, Hassan, Karnataka.",
      },
      {
        id: "faq-prizes",
        question: "WHAT IS THE PRIZE POOL?",
        answer: "₹50,000.",
      },
      {
        id: "faq-organizer",
        question: "WHO IS ORGANIZING THE HACKATHON?",
        answer: "CalmStacks.",
      },
      {
        id: "faq-collaboration",
        question: "WHO IS THE EVENT IN COLLABORATION WITH?",
        answer:
          "Agamya Cyber Tech and the Department of Computer Science & Engineering, Malnad College of Engineering.",
      },
    ] as FaqItem[],
  },

  finalCta: {
    line1: "YOU HAVE\n24 HOURS.",
    line2: "24 HOURS.",
    question1: "WHAT WILL",
    question2: "YOU BUILD?",
    dates: "25–26 SEPTEMBER 2026",
    startTime: "STARTS 11:30 AM IST",
    prizePool: "₹50,000 PRIZE POOL",
    location: "MALNAD COLLEGE OF ENGINEERING, HASSAN",
    collaborationText: "IN COLLABORATION WITH AGAMYA CYBER TECH × MCE CSE",
    buttonLabel: "REGISTER FOR THE HACKATHON →",
  },

  footer: {
    brandName: "CALMSTACKS",
    eventTitle: "24 HOUR HACKATHON",
    dates: "25–26 SEPTEMBER 2026",
    location: "MALNAD COLLEGE OF ENGINEERING, HASSAN",
    links: [
      { label: "Instagram", href: "https://instagram.com/calmstacks" },
      { label: "LinkedIn", href: "https://linkedin.com/company/calmstacks" },
      { label: "CalmStacks", href: "/" },
    ],
    copyright: "© CALMSTACKS",
  },
};
