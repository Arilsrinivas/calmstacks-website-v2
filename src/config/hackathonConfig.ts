export interface HackathonTrack {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  focusAreas: string[];
}

export interface TimelineMilestone {
  time: string;
  title: string;
  phase: string;
  category: "CHECK-IN" | "IDEATION" | "BUILD" | "REVIEW" | "SUBMISSION" | "JURY";
  description: string;
  modality: string;
  status?: "upcoming" | "active" | "completed";
}

export interface SprintModality {
  number: string;
  title: string;
  subtitle: string;
  details: string;
  keyPoints: string[];
}

export interface PrizeItem {
  place: string;
  rankNumber: string;
  title: string;
  reward: string;
  details: string;
  highlight?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const HACKATHON_CONFIG = {
  meta: {
    name: "CALMSTACKS 24 HOUR HACKATHON",
    shortName: "24H HACKATHON",
    tagline: "BUILD. SOLVE. IMPACT.",
    series: "CSE Student Development Series",
    organizer: "CALMSTACKS",
    dates: "25–26 SEPTEMBER 2026",
    startTime: "02:00 PM IST",
    startDateIso: "2026-09-25T14:00:00+05:30",
    endDateIso: "2026-09-26T14:00:00+05:30",
    format: "24-HOUR OFFLINE SPRINT (STARTS 2:00 PM)",
    venue: "CENTRAL LIBRARY, MALNAD COLLEGE OF ENGINEERING",
    venueShort: "Malnad College Library",
    city: "HASSAN, KARNATAKA",
    department: "Central Library & Department of CSE",
    coordinates: "13.0072° N, 76.0964° E",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Malnad+College+of+Engineering+Library+Hassan",
    registrationOpen: true,
    prizePoolTotal: "₹25,000",
    internshipsCount: "2 Paid + 4 Unpaid",
    feePerMember: "₹300",
    teamSizeLimit: "3 to 4 Members",
    foodIncluded: "Full Meals, Snacks & Refreshments Included",
    certificates: "Certificates for All Participants",
  },

  hero: {
    smallLabel: "CALMSTACKS PRESENTS",
    headlineLine1: "24",
    headlineLine2: "HOUR",
    headlineLine3: "HACKATHON",
    supportingHeadline: "BUILD. SOLVE. IMPACT.",
    description:
      "A 24-hour offline hackathon held in the Malnad College Central Library. Turn ideas into working prototypes with ₹25,000 cash prizes, paid internships, full catering, and certificates for all.",
    metadataItems: [
      { label: "DATES", value: "25–26 SEPTEMBER 2026" },
      { label: "VENUE", value: "MALNAD COLLEGE LIBRARY" },
      { label: "PRIZE POOL", value: "₹25,000 + INTERNSHIPS" },
      { label: "FEE & FOOD", value: "₹300 / HEAD • FOOD INCL." },
    ],
    primaryCta: "REGISTER NOW",
    secondaryCta: "EXPLORE TIMELINE",
  },

  about: {
    sectionTag: "01 // OVERVIEW",
    heading: "BUILD SOMETHING REAL.",
    intro:
      "The CalmStacks 24-Hour Hackathon is an intensive offline innovation sprint hosted at the prestigious Central Library of Malnad College of Engineering, Hassan, under the CSE Student Development Series.",
    subIntro:
      "24 hours of uninterrupted building, senior industry mentorship, ₹25,000 in cash prizes, 6 high-value internship opportunities (2 Paid + 4 Unpaid), and complete catering with food, drinks, and snacks included for all participants.",
    features: [
      {
        number: "01",
        title: "24 HOURS IN MCE LIBRARY",
        description:
          "An uninterrupted 24-hour sprint in a focused, air-conditioned library environment with high-speed connectivity and power backups.",
      },
      {
        number: "02",
        title: "₹25K PRIZE + 6 INTERNSHIPS",
        description:
          "₹25,000 cash prize pool alongside 2 Paid Internships and 4 Unpaid Internships at CalmStacks for top performers.",
      },
      {
        number: "03",
        title: "3–4 MEMBERS PER SQUAD",
        description:
          "Form teams of 3 or 4 builders (₹300/member) with complementary skills in frontend, backend, AI, UI/UX, or systems design.",
      },
      {
        number: "04",
        title: "FOOD & CERTIFICATES INCLUDED",
        description:
          "All meals, tea/coffee, midnight energy snacks, and official Certificates of Participation provided to every attendee.",
      },
    ],
  },

  challenges: {
    sectionTag: "02 // PROBLEM DOMAINS",
    heading: "THE CHALLENGE TRACKS",
    description:
      "Choose a challenge track aligned with your strengths or build cross-disciplinary solutions. Detailed problem statement briefs and evaluation rubrics will be unveiled during kickoff.",
    tracks: [
      {
        id: "ai-automation",
        number: "01",
        title: "AI & AUTOMATION",
        tagline: "Autonomous agents, intelligent workflows & synthetic compute",
        description:
          "Harness generative models, specialized machine learning, or computer vision to build tools that eliminate friction and automate complex human and developer tasks.",
        tags: ["LLM Agents", "Computer Vision", "Workflow Automation", "API Synthesis"],
        focusAreas: ["Predictive tooling", "Autonomous assistants", "Context-aware engines"],
      },
      {
        id: "web-digital",
        number: "02",
        title: "WEB & DIGITAL PRODUCTS",
        tagline: "High-performance platforms, developer tools & modern SaaS",
        description:
          "Design and build fast, responsive, and intuitive web applications or utilities that solve tangible everyday workflows with exceptional UI/UX fidelity.",
        tags: ["Next.js", "Distributed APIs", "Design Systems", "Real-Time Sync"],
        focusAreas: ["Developer tooling", "Modern collaboration", "Micro-SaaS prototypes"],
      },
      {
        id: "social-impact",
        number: "03",
        title: "SOCIAL IMPACT & CIVIC TECH",
        tagline: "Accessible healthcare, sustainability & regional governance",
        description:
          "Craft purpose-driven engineering solutions that tackle pressing societal challenges—education accessibility, environmental monitoring, and public health systems.",
        tags: ["Civic Tech", "Accessibility", "Public Data", "Resource Optimization"],
        focusAreas: ["Healthcare workflows", "Educational tooling", "Community resilience"],
      },
      {
        id: "open-innovation",
        number: "04",
        title: "OPEN INNOVATION & IOT",
        tagline: "Hardware-software integration, robotics & new primitives",
        description:
          "For cross-disciplinary builders combining hardware, IoT, embedded microcontrollers, robotics, or novel software primitives that push creative boundaries.",
        tags: ["Embedded Systems", "Hardware/IoT", "Robotics", "Novel Primitives"],
        focusAreas: ["Physical-digital bridges", "Edge computing", "Novel interfaces"],
      },
    ] as HackathonTrack[],
  },

  timeline: {
    sectionTag: "03 // SPRINT PROTOCOL & TIMELINE",
    heading: "24 HOURS.\nTIMELINE & MODALITIES.",
    subheading:
      "A structured 24-hour roadmap with designated checkpoints, mentorship rounds, meal breaks, and evaluation modalities.",
    milestones: [
      {
        time: "01:00 PM",
        phase: "DAY 1 • CHECK-IN",
        title: "REPORTING & STATION ALLOCATION",
        category: "CHECK-IN",
        description:
          "Arrival at Malnad College Central Library. Registration verification, Wi-Fi onboarding, desk allocation, and welcome kit distribution.",
        modality: "Identity check against registered USN, network test & team table setup.",
      },
      {
        time: "02:00 PM",
        phase: "DAY 1 • KICKOFF",
        title: "OPENING CEREMONY & PROBLEM DROP",
        category: "IDEATION",
        description:
          "Official opening address by CalmStacks & CSE Department. Release of track problem statements, rubric criteria, and submission requirements.",
        modality: "Track selection confirmed; teams enter 1-hour ideation and system architecture freeze.",
      },
      {
        time: "03:00 PM",
        phase: "DAY 1 • SPRINT START",
        title: "THE 24-HOUR BUILD COMMENCES",
        category: "BUILD",
        description:
          "Sprint timer starts. Repository initialization, task distribution, wireframing, and active software development underway.",
        modality: "Code repositories created on GitHub; sprint timer countdown activated.",
      },
      {
        time: "05:30 PM",
        phase: "DAY 1 • HOSPITALITY",
        title: "EVENING SNACKS & TEA BREAK",
        category: "CHECK-IN",
        description:
          "Hot tea, coffee, and evening snacks served to all registered participants in the library refreshment zone.",
        modality: "Evening refreshments included; casual peer networking allowed.",
      },
      {
        time: "08:00 PM",
        phase: "DAY 1 • CHECKPOINT 1",
        title: "MENTORSHIP & ARCHITECTURE REVIEW",
        category: "REVIEW",
        description:
          "Senior CalmStacks engineers and faculty mentors conduct desk-side reviews to evaluate system architecture, clear technical blockers, and guide execution.",
        modality: "Mandatory milestone check: Mentors grade design feasibility and technical trajectory.",
      },
      {
        time: "09:30 PM",
        phase: "DAY 1 • HOSPITALITY",
        title: "DINNER BUFFET & RECHARGE",
        category: "CHECK-IN",
        description:
          "Dinner buffet served on-site, followed by hot tea and coffee to power through the night.",
        modality: "Full dinner provided for all participants.",
      },
      {
        time: "01:00 AM",
        phase: "NIGHT SPRINT",
        title: "MIDNIGHT ENERGY FUEL & SPRINT",
        category: "BUILD",
        description:
          "Midnight energy snacks and refreshments served. Intensive overnight coding sprint in the quiet library environment.",
        modality: "Core feature completion and backend API integrations.",
      },
      {
        time: "06:30 AM",
        phase: "DAY 2 • CHECKPOINT 2",
        title: "PRE-DAWN CODE & FEATURE FREEZE",
        category: "REVIEW",
        description:
          "Final feature commits locked. Teams shift to polishing user interfaces, fixing bugs, and deploying prototypes to live URLs.",
        modality: "Second progress verification: Deployment link validation and demo rehearsal.",
      },
      {
        time: "08:30 AM",
        phase: "DAY 2 • HOSPITALITY",
        title: "BREAKFAST & FINAL POLISH",
        category: "CHECK-IN",
        description:
          "Fresh breakfast served. Teams run final tests, rehearse live demos, and finalize submission slide decks.",
        modality: "Breakfast provided; demo slide deck preparation.",
      },
      {
        time: "12:00 PM",
        phase: "DAY 2 • SUBMISSION",
        title: "FINAL SUBMISSION LOCKOUT",
        category: "SUBMISSION",
        description:
          "Final project repositories, live preview URLs, and presentation slide decks submitted to the portal.",
        modality: "Strict code lockout at 12:00 PM. No commits accepted post deadline.",
      },
      {
        time: "12:30 PM",
        phase: "DAY 2 • FINALE",
        title: "LIVE JURY DEMOS & AWARD CEREMONY",
        category: "JURY",
        description:
          "5-minute live demo + 3-minute jury Q&A in the auditorium. Grand prize ceremony awarding ₹25,000, 6 internship offers, and certificates for all.",
        modality: "Live evaluation by panel of industry judges; trophy and certificate distribution.",
      },
    ] as TimelineMilestone[],

    modalities: [
      {
        number: "01",
        title: "TEAM COMPOSITION & ENTRY",
        subtitle: "3–4 Members • ₹300/head",
        details:
          "Teams must comprise strictly 3 or 4 members. The registration fee is ₹300 per member, which covers entry, full 24-hour catering (lunch, dinner, breakfast, snacks, beverages), and certificates.",
        keyPoints: [
          "3 or 4 students per squad",
          "₹300 per participant",
          "All meals & snacks included",
        ],
      },
      {
        number: "02",
        title: "DEVELOPMENT ENVIRONMENT",
        subtitle: "MCE Central Library",
        details:
          "All building occurs in-person within the air-conditioned MCE Central Library. Teams must bring their own laptops and chargers. High-speed network access and power backup are provided.",
        keyPoints: [
          "Central Library venue",
          "Continuous power backup",
          "Dedicated workstation desks",
        ],
      },
      {
        number: "03",
        title: "CODE INTEGRITY & LICENSING",
        subtitle: "Fresh Repositories Only",
        details:
          "All prototype code must be authored during the 24-hour sprint. Open-source packages, public APIs, and LLMs are permitted with proper attribution. Pre-built applications are strictly disqualified.",
        keyPoints: [
          "Fresh GitHub repository",
          "Public APIs & SDKs permitted",
          "Plagiarism checks enforced",
        ],
      },
      {
        number: "04",
        title: "2-ROUND MENTORSHIP REVIEW",
        subtitle: "Structured Progress Gates",
        details:
          "Mentors evaluate teams in two structured checkpoint rounds (Day 1 Evening and Day 2 Dawn) to ensure progress, guide architecture, and validate working software components.",
        keyPoints: [
          "Checkpoint 1: Architecture review",
          "Checkpoint 2: Deployment check",
          "Direct engineer mentorship",
        ],
      },
      {
        number: "05",
        title: "JURY DEMOS & SCORING RUBRIC",
        subtitle: "5-Min Live Demonstration",
        details:
          "Each team presents a 5-minute live working demonstration followed by 3 minutes of technical Q&A with the jury. Scoring is weighted across Innovation (25%), Technical Depth (35%), UI/UX (20%), and Practical Impact (20%).",
        keyPoints: [
          "Live working software demo",
          "No pure slide-deck pitches",
          "Transparent rubric scoring",
        ],
      },
      {
        number: "06",
        title: "REWARDS & INTERNSHIPS",
        subtitle: "₹25,000 Pool + 6 Roles",
        details:
          "₹25,000 total cash prizes awarded to podium winners. 2 Paid Internships and 4 Unpaid Internships granted at CalmStacks for top performers. Official Certificates of Participation awarded to ALL attendees.",
        keyPoints: [
          "₹25,000 cash pool",
          "2 Paid + 4 Unpaid internships",
          "Certificates for every participant",
        ],
      },
    ] as SprintModality[],
  },

  pillars: {
    sectionTag: "04 // CULTURE",
    heading: "THE SPRINT ETHOS",
    items: [
      {
        title: "BUILD",
        subtitle: "Turn ideas into working products.",
        description:
          "Slides do not solve problems—functional code does. We prioritize functional execution, solid architecture, and usable interfaces.",
      },
      {
        title: "COLLABORATE",
        subtitle: "Work with your team and mentors.",
        description:
          "Brainstorm with CalmStacks engineers and faculty mentors. The best solutions emerge when frontend, backend, and domain thinkers unite.",
      },
      {
        title: "COMPETE",
        subtitle: "Demonstrate impact and win.",
        description:
          "Pitch your live demo to judges, defend your architectural choices, and compete for ₹25,000, internship roles, and recognition.",
      },
    ],
  },

  prizes: {
    sectionTag: "05 // RECOGNITION & REWARDS",
    heading: "₹25,000 CASH POOL.\n+ 6 INTERNSHIPS.",
    subheading:
      "A total cash prize pool of ₹25,000, 2 Paid Internships, 4 Unpaid Internships for top performers, and Certificates of Participation for all attendees.",
    prizePoolTotal: "₹25,000",
    internshipsSummary: "2 Paid Internships + 4 Unpaid Internships",
    certificateNotice: "OFFICIAL CERTIFICATE OF PARTICIPATION FOR ALL",
    items: [
      {
        place: "1ST PLACE",
        rankNumber: "01",
        title: "CHAMPIONSHIP WINNER",
        reward: "Cash Prize + Paid Internship (CalmStacks)",
        details:
          "Highest cash award from the ₹25,000 pool, direct Paid Internship offer at CalmStacks, winner trophy, and priority startup incubation.",
        highlight: "Top Cash Prize + Paid Role",
      },
      {
        place: "2ND PLACE",
        rankNumber: "02",
        title: "FIRST RUNNER UP",
        reward: "Cash Prize + Paid Internship (CalmStacks)",
        details:
          "Substantial cash award from the ₹25,000 pool, direct Paid Internship offer at CalmStacks, runner-up trophy, and engineering mentorship.",
        highlight: "Cash Reward + Paid Role",
      },
      {
        place: "3RD PLACE",
        rankNumber: "03",
        title: "SECOND RUNNER UP",
        reward: "Cash Prize + Merit Recognition",
        details:
          "Cash prize from the pool, merit trophy, recognition certificate, and preferential review for upcoming CalmStacks opportunities.",
        highlight: "Cash Award + Merit Trophy",
      },
    ] as PrizeItem[],
    specialPerks: [
      {
        title: "2 PAID INTERNSHIPS",
        subtitle: "Direct placement at CalmStacks with monthly compensation.",
        tag: "CAREER ACCELERATOR",
      },
      {
        title: "4 UNPAID INTERNSHIPS",
        subtitle: "Exclusive project internship roles for standout performers across all tracks.",
        tag: "TOP PERFORMERS",
      },
      {
        title: "CERTIFICATES FOR ALL",
        subtitle: "Verified Certificate of Participation awarded to every registered attendee.",
        tag: "100% OF PARTICIPANTS",
      },
      {
        title: "FULL FOOD & SNACKS",
        subtitle: "All meals, tea/coffee, snacks, and midnight refreshments included throughout 24H.",
        tag: "ALL INCLUSIVE",
      },
    ],
  },

  eligibility: {
    sectionTag: "06 // ELIGIBILITY & REGISTRATION",
    heading: "WHO CAN PARTICIPATE?",
    primaryAudience: "Open to students forming teams of 3 to 4 members.",
    eventContext:
      "Held in the Central Library of Malnad College of Engineering, Hassan, under the CSE Student Development Series.",
    teamConfiguration: {
      title: "Team Structure & Fee Details",
      details:
        "Participants must register in squads of 3 or 4 members. The registration fee is ₹300 per team member (₹900 for a 3-member team, ₹1,200 for a 4-member team), which includes all food, snacks, midnight refreshments, and certificates.",
      requirements: [
        "Team size: Strictly 3 or 4 members per team",
        "Registration fee: ₹300 per team member",
        "Full food, lunch, dinner, breakfast & snacks included for all 24 hours",
        "Certificate of Participation awarded to ALL participating team members",
        "Valid college Student ID card required at check-in",
        "Bring your own development laptops, chargers, and extension strips",
        "All code must be written within the 24-hour hackathon window",
      ],
    },
  },

  venue: {
    sectionTag: "07 // CAMPUS & VENUE",
    heading: "MCE CENTRAL LIBRARY.\nHASSAN, KARNATAKA.",
    institution: "MALNAD COLLEGE OF ENGINEERING",
    department: "Central Library & Department of CSE",
    city: "HASSAN, KARNATAKA",
    pincode: "573202",
    coordinates: "13.0072° N, 76.0964° E",
    ctaLabel: "VIEW LIBRARY LOCATION ON MAPS",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Malnad+College+of+Engineering+Library+Hassan",
    amenities: [
      "Quiet, air-conditioned Central Library workspaces",
      "High-speed campus network access & power backup",
      "Dedicated charging points at every team table",
      "Full food, meals, tea/coffee & midnight fuel station",
      "Dedicated jury presentation & project demo area",
      "On-site mentor desks for round-the-clock guidance",
    ],
  },

  faq: {
    sectionTag: "08 // INTEL & FAQ",
    heading: "FREQUENTLY ASKED QUESTIONS",
    subheading: "Everything you need to know about the 24-hour sprint at MCE Library.",
    items: [
      {
        id: "faq-dates",
        question: "When and where is the hackathon taking place?",
        answer:
          "The hackathon will take place on 25th and 26th September 2026 at the Central Library, Malnad College of Engineering, Hassan, Karnataka. It starts at 2:00 PM on Friday, 25th September, and runs for 24 continuous hours until 2:00 PM on Saturday, 26th September.",
      },
      {
        id: "faq-prizes",
        question: "What is the prize pool and internship opportunities?",
        answer:
          "The hackathon features a ₹25,000 cash prize pool divided among top winning teams, plus 2 Paid Internships at CalmStacks, 4 Unpaid Internships for standout performers, and Certificates of Participation for all attendees.",
      },
      {
        id: "faq-fee-food",
        question: "What is the registration fee and is food included?",
        answer:
          "The registration fee is ₹300 per team member. This fee covers full participation, hackathon kit, and complete hospitality—including lunch, evening snacks, dinner, midnight energy refreshments, tea/coffee, and morning breakfast.",
      },
      {
        id: "faq-teams",
        question: "What is the required team size?",
        answer:
          "Teams must consist of 3 to 4 members. You can register your full squad together, or register with 3 members and invite a 4th teammate before check-in.",
      },
      {
        id: "faq-certificate",
        question: "Will every participant receive a certificate?",
        answer:
          "Yes! Every registered participant who attends and submits a working project will receive an official Certificate of Participation from CalmStacks and the Department of CSE.",
      },
      {
        id: "faq-offline",
        question: "Is the hackathon fully in-person/offline?",
        answer:
          "Yes, it is a 100% offline, on-campus 24-hour hackathon held in the Malnad College Central Library to foster intense collaboration, active building, and live mentor interaction.",
      },
      {
        id: "faq-bring",
        question: "What do we need to bring?",
        answer:
          "Each team member should bring their laptop, chargers, extension cords, valid college student ID card, and any specialized hardware (if building in the IoT/Open Innovation track).",
      },
      {
        id: "faq-tracks",
        question: "What can we build during the 24 hours?",
        answer:
          "You can build solutions in one of four tracks: AI & Automation, Web & Digital Products, Social Impact & Civic Tech, or Open Innovation & IoT. Problem statements will be detailed during the opening ceremony.",
      },
      {
        id: "faq-register",
        question: "How do we register our team?",
        answer:
          "Click the 'REGISTER NOW' button on this page, fill out the team details, USN, contact numbers, and track preference. You will receive a confirmation with check-in instructions.",
      },
    ] as FaqItem[],
  },

  finalCta: {
    headlinePre: "24 HOURS IN THE LIBRARY.",
    headlineHours: "₹25,000 PRIZES.",
    headlinePost: "BUILD.\nSOLVE.\nIMPACT.",
    supportingText:
      "Join us on 25–26 September 2026 at the Malnad College Central Library. ₹25,000 cash prizes, 6 internship roles, food included, and certificates for all.",
    buttonLabel: "REGISTER YOUR TEAM (3–4 MEMBERS) →",
    dates: "25–26 SEPTEMBER 2026",
    location: "MCE CENTRAL LIBRARY, HASSAN",
  },

  footer: {
    brandName: "CALMSTACKS",
    eventTitle: "24 HOUR HACKATHON",
    parentSeries: "CSE Student Development Series",
    links: [
      { label: "Instagram", href: "https://instagram.com/calmstacks" },
      { label: "LinkedIn", href: "https://linkedin.com/company/calmstacks" },
      { label: "Calmstacks Home", href: "/" },
    ],
    copyright: "© 2026 CALMSTACKS. ALL RIGHTS RESERVED.",
  },
};
