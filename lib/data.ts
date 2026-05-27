export type Skill = {
  id: string;
  name: string;
  icon: string;
  desc: string;
  bg: string;
  n: string;
  cluster: string;
  totalBank: number;
  qPerAttempt: number;
  timeSec: number;
  perQSec: number;
  passPct: number;
  passCorrect: number;
};
export type Pending = { name: string; icon: string; score: string; date: string };
export type UserType = "free" | "p2" | "p0";
export type ResultType = "pass" | "fail";
export type ScreenId = "landing" | "browse" | "detail" | "quiz" | "resultPass" | "resultFail" | "success";
export type Question = { q: string; o: string[]; ans: number };
export type Cluster = { title: string; emoji: string; subtitle: string; skills: Skill[] };

// All 30 skills from production bank
export const ALL_SKILLS: Skill[] = [
  {"id": "SKL_005", "name": "Tally", "icon": "📒", "desc": "Test your Tally knowledge", "bg": "#FEF3C7", "n": "4.0k", "cluster": "Accounts & Finance", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_006", "name": "GST", "icon": "🧾", "desc": "Test your GST knowledge", "bg": "#FEF3C7", "n": "1.6k", "cluster": "Accounts & Finance", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_007", "name": "Basic Accounting", "icon": "📚", "desc": "Test your accounting fundamentals", "bg": "#FEF3C7", "n": "4.0k", "cluster": "Accounts & Finance", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_008", "name": "Advanced Excel", "icon": "📈", "desc": "Test your advanced Excel skills", "bg": "#FEF3C7", "n": "1.8k", "cluster": "Accounts & Finance", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_009", "name": "Payroll Basics", "icon": "💰", "desc": "Test your payroll knowledge (ESIC, PF)", "bg": "#FEF3C7", "n": "2.2k", "cluster": "Accounts & Finance", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_010", "name": "Banking Basics", "icon": "🏦", "desc": "Test your banking operations knowledge", "bg": "#FEF3C7", "n": "5.2k", "cluster": "Accounts & Finance", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_001", "name": "Computer Basics", "icon": "💻", "desc": "Test your basic computer knowledge", "bg": "#DBEAFE", "n": "4.0k", "cluster": "Computer & Office", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_002", "name": "MS Excel", "icon": "📊", "desc": "Test your MS Excel skills", "bg": "#DBEAFE", "n": "2.6k", "cluster": "Computer & Office", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_003", "name": "MS Word", "icon": "📝", "desc": "Test your MS Word skills", "bg": "#DBEAFE", "n": "1.3k", "cluster": "Computer & Office", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_004", "name": "MS PowerPoint", "icon": "📽️", "desc": "Test your MS PowerPoint skills", "bg": "#DBEAFE", "n": "3.8k", "cluster": "Computer & Office", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_021", "name": "Photoshop", "icon": "🎨", "desc": "Test your Photoshop skills", "bg": "#FFE4E1", "n": "5.3k", "cluster": "Design & Creative", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_022", "name": "CorelDRAW", "icon": "✏️", "desc": "Test your CorelDRAW skills", "bg": "#FFE4E1", "n": "4.1k", "cluster": "Design & Creative", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_023", "name": "Video Editing", "icon": "🎬", "desc": "Test your video editing skills", "bg": "#FFE4E1", "n": "1.4k", "cluster": "Design & Creative", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_024", "name": "AutoCAD Basics", "icon": "📐", "desc": "Test your AutoCAD knowledge", "bg": "#FFE4E1", "n": "1.4k", "cluster": "Design & Creative", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_025", "name": "Digital Marketing Fundamentals", "icon": "📱", "desc": "Test your digital marketing knowledge", "bg": "#F3E8FF", "n": "1.1k", "cluster": "Digital Marketing", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_026", "name": "SEO Basics", "icon": "🔍", "desc": "Test your SEO knowledge", "bg": "#F3E8FF", "n": "1.2k", "cluster": "Digital Marketing", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_027", "name": "Email Marketing", "icon": "📧", "desc": "Test your email marketing knowledge", "bg": "#F3E8FF", "n": "5.2k", "cluster": "Digital Marketing", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_028", "name": "HR Basics", "icon": "👥", "desc": "Test your HR knowledge", "bg": "#D1FAE5", "n": "1.4k", "cluster": "HR & Recruitment", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_029", "name": "Recruitment Basics", "icon": "🔎", "desc": "Test your recruitment knowledge", "bg": "#D1FAE5", "n": "3.5k", "cluster": "HR & Recruitment", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_030", "name": "Warehouse Operations", "icon": "📦", "desc": "Test your warehouse and store management knowledge", "bg": "#FED7AA", "n": "5.0k", "cluster": "Operations", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_011", "name": "English Communication", "icon": "🗣️", "desc": "Test your English communication skills", "bg": "#FCE7F3", "n": "2.5k", "cluster": "Sales & Customer Service", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_012", "name": "Customer Service Fundamentals", "icon": "🎧", "desc": "Test your customer service knowledge", "bg": "#FCE7F3", "n": "2.7k", "cluster": "Sales & Customer Service", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_013", "name": "Telesales Fundamentals", "icon": "📞", "desc": "Test your telesales knowledge", "bg": "#FCE7F3", "n": "1.5k", "cluster": "Sales & Customer Service", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_014", "name": "Sales Process Basics", "icon": "💼", "desc": "Test your sales process knowledge", "bg": "#FCE7F3", "n": "3.2k", "cluster": "Sales & Customer Service", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_015", "name": "Retail Sales Basics", "icon": "🛒", "desc": "Test your retail sales knowledge", "bg": "#FCE7F3", "n": "2.9k", "cluster": "Sales & Customer Service", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_016", "name": "SQL Basics", "icon": "🗄️", "desc": "Test your SQL knowledge", "bg": "#E0E7FF", "n": "830", "cluster": "Tech & IT", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_017", "name": "HTML & CSS Basics", "icon": "🌐", "desc": "Test your HTML and CSS knowledge", "bg": "#E0E7FF", "n": "3.6k", "cluster": "Tech & IT", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_018", "name": "JavaScript Basics", "icon": "⚡", "desc": "Test your JavaScript knowledge", "bg": "#E0E7FF", "n": "4.0k", "cluster": "Tech & IT", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_019", "name": "Software Testing", "icon": "🐞", "desc": "Test your software testing knowledge", "bg": "#E0E7FF", "n": "3.0k", "cluster": "Tech & IT", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
  {"id": "SKL_020", "name": "Hardware Troubleshooting", "icon": "🛠️", "desc": "Test your hardware troubleshooting knowledge", "bg": "#E0E7FF", "n": "1.8k", "cluster": "Tech & IT", "totalBank": 40, "qPerAttempt": 15, "timeSec": 600, "perQSec": 40, "passPct": 70, "passCorrect": 11},
];

export const CLUSTERS: Cluster[] = [
  {
    title: "Accounts & Finance",
    emoji: "\ud83d\udcd2",
    subtitle: "For Accountants, Audit Assistants",
    skills: ALL_SKILLS.filter(s => s.cluster === "Accounts & Finance"),
  },
  {
    title: "Computer & Office",
    emoji: "\ud83d\udcbb",
    subtitle: "For Back Office, Admin Roles",
    skills: ALL_SKILLS.filter(s => s.cluster === "Computer & Office"),
  },
  {
    title: "Sales & Customer Service",
    emoji: "\ud83d\udde3\ufe0f",
    subtitle: "For Sales, Telecallers, Customer Support",
    skills: ALL_SKILLS.filter(s => s.cluster === "Sales & Customer Service"),
  },
  {
    title: "Tech & IT",
    emoji: "\ud83d\udcbc",
    subtitle: "For Developers, Support, IT Roles",
    skills: ALL_SKILLS.filter(s => s.cluster === "Tech & IT"),
  },
  {
    title: "Design & Creative",
    emoji: "\ud83c\udfa8",
    subtitle: "For Designers, Editors, Creative Roles",
    skills: ALL_SKILLS.filter(s => s.cluster === "Design & Creative"),
  },
  {
    title: "Digital Marketing",
    emoji: "\ud83d\udcf1",
    subtitle: "For Marketing, SEO, Content Roles",
    skills: ALL_SKILLS.filter(s => s.cluster === "Digital Marketing"),
  },
  {
    title: "HR & Recruitment",
    emoji: "\ud83d\udc65",
    subtitle: "For HR Executives, Recruiters",
    skills: ALL_SKILLS.filter(s => s.cluster === "HR & Recruitment"),
  },
  {
    title: "Operations",
    emoji: "\ud83d\udce6",
    subtitle: "For Warehouse, Logistics, Operations",
    skills: ALL_SKILLS.filter(s => s.cluster === "Operations"),
  },
];

// Recommended for "Accounts" job profile (default demo user)
export const SKILLS = {
  rec: ALL_SKILLS.filter(s => ["Tally","GST","Basic Accounting"].includes(s.name)),
  gen: ALL_SKILLS.filter(s => ["Computer Basics","MS Excel","English Communication"].includes(s.name)),
};

export function getSkillByName(name: string): Skill | undefined {
  return ALL_SKILLS.find(s => s.name === name);
}

// 3 sample questions per skill (Easy difficulty preferred). Real bank has 40/skill.
export const QUESTIONS_BY_SKILL: Record<string, Question[]> = {
  "Computer Basics": [
    {
      "q": "What does CPU stand for?",
      "o": [
        "Central Program Unit",
        "Computer Processing Unit",
        "Control Processing Unit",
        "Central Processing Unit"
      ],
      "ans": 3
    },
    {
      "q": "Which of these is an input device?",
      "o": [
        "Speaker",
        "Keyboard",
        "Monitor",
        "Printer"
      ],
      "ans": 1
    },
    {
      "q": "Which of these is an output device?",
      "o": [
        "Scanner",
        "Printer",
        "Microphone",
        "Mouse"
      ],
      "ans": 1
    }
  ],
  "MS Excel": [
    {
      "q": "Which shortcut is used to save a workbook in Excel?",
      "o": [
        "Ctrl + N",
        "Ctrl + V",
        "Ctrl + S",
        "Ctrl + P"
      ],
      "ans": 2
    },
    {
      "q": "What is the file extension for an Excel workbook?",
      "o": [
        ".pptx",
        ".xlsx",
        ".docx",
        ".pdf"
      ],
      "ans": 1
    },
    {
      "q": "Which function is used to add a range of numbers in Excel?",
      "o": [
        "PLUS",
        "SUM",
        "TOTAL",
        "ADD"
      ],
      "ans": 1
    }
  ],
  "MS Word": [
    {
      "q": "Which shortcut is used to save a Word document?",
      "o": [
        "Ctrl + P",
        "Ctrl + S",
        "Ctrl + N",
        "Ctrl + V"
      ],
      "ans": 1
    },
    {
      "q": "What is the file extension for a Word document?",
      "o": [
        ".docx",
        ".pptx",
        ".xlsx",
        ".pdf"
      ],
      "ans": 0
    },
    {
      "q": "Which shortcut is used to bold selected text?",
      "o": [
        "Ctrl + B",
        "Ctrl + D",
        "Ctrl + I",
        "Ctrl + U"
      ],
      "ans": 0
    }
  ],
  "MS PowerPoint": [
    {
      "q": "What is the file extension for a PowerPoint presentation?",
      "o": [
        ".pptx",
        ".docx",
        ".pdf",
        ".xlsx"
      ],
      "ans": 0
    },
    {
      "q": "Which shortcut is used to start a slideshow from the beginning?",
      "o": [
        "F5",
        "Shift + F5",
        "Ctrl + S",
        "F7"
      ],
      "ans": 0
    },
    {
      "q": "Which shortcut ends a slideshow?",
      "o": [
        "Enter",
        "F5",
        "Esc",
        "Space"
      ],
      "ans": 2
    }
  ],
  "Tally": [
    {
      "q": "Who developed Tally software?",
      "o": [
        "SAP",
        "Oracle",
        "Microsoft",
        "Tally Solutions"
      ],
      "ans": 3
    },
    {
      "q": "Which shortcut is used to select a company in Tally?",
      "o": [
        "F1",
        "F11",
        "F3",
        "F2"
      ],
      "ans": 0
    },
    {
      "q": "In Tally, F2 is used to?",
      "o": [
        "Select company",
        "Print",
        "Change period",
        "Change date"
      ],
      "ans": 3
    }
  ],
  "GST": [
    {
      "q": "What does GST stand for?",
      "o": [
        "General Sales Tax",
        "Goods Sales Tax",
        "Government Services Tax",
        "Goods and Services Tax"
      ],
      "ans": 3
    },
    {
      "q": "When was GST implemented in India?",
      "o": [
        "1st April 2017",
        "1st July 2017",
        "1st January 2018",
        "1st April 2018"
      ],
      "ans": 1
    },
    {
      "q": "CGST stands for?",
      "o": [
        "Country GST",
        "Combined GST",
        "Common GST",
        "Central GST"
      ],
      "ans": 3
    }
  ],
  "Basic Accounting": [
    {
      "q": "What is the basic accounting equation?",
      "o": [
        "Assets = Liabilities - Capital",
        "Liabilities = Capital - Assets",
        "Assets = Liabilities + Capital",
        "Capital = Assets + Liabilities"
      ],
      "ans": 2
    },
    {
      "q": "What is a debit entry?",
      "o": [
        "Decrease in asset or expense",
        "Decrease in capital",
        "Increase in asset or expense",
        "Increase in liability"
      ],
      "ans": 2
    },
    {
      "q": "What is a credit entry?",
      "o": [
        "Increase in liability, income or capital",
        "Increase in asset or expense",
        "Decrease in income",
        "Decrease in liability"
      ],
      "ans": 0
    }
  ],
  "Advanced Excel": [
    {
      "q": "Which Excel function looks up a value in a column and returns a value from another column in the same row?",
      "o": [
        "HLOOKUP",
        "VLOOKUP",
        "FIND",
        "LOOKUP"
      ],
      "ans": 1
    },
    {
      "q": "Which Excel function looks up a value in a row and returns a value from another row in the same column?",
      "o": [
        "VLOOKUP",
        "LOOKUP",
        "FIND",
        "HLOOKUP"
      ],
      "ans": 3
    },
    {
      "q": "What is the 4th argument in VLOOKUP for exact match?",
      "o": [
        "TRUE",
        "0",
        "FALSE",
        "Both B and C"
      ],
      "ans": 3
    }
  ],
  "Payroll Basics": [
    {
      "q": "What does CTC stand for?",
      "o": [
        "Cash To Company",
        "Capital To Company",
        "Credit To Company",
        "Cost To Company"
      ],
      "ans": 3
    },
    {
      "q": "What does PF stand for in payroll?",
      "o": [
        "Provident Fund",
        "Pay Fund",
        "Personal Fund",
        "Profit Fund"
      ],
      "ans": 0
    },
    {
      "q": "What does ESIC stand for?",
      "o": [
        "Employer State Insurance Cover",
        "Employee Salary Insurance Corp",
        "Employees State Insurance Corporation",
        "Employee Security Insurance Cover"
      ],
      "ans": 2
    }
  ],
  "Banking Basics": [
    {
      "q": "What does KYC stand for?",
      "o": [
        "Know Your Currency",
        "Keep Your Customer",
        "Keep Your Cash",
        "Know Your Customer"
      ],
      "ans": 3
    },
    {
      "q": "Which document is commonly used as proof of identity for KYC in India?",
      "o": [
        "Aadhaar Card",
        "Passport",
        "PAN Card",
        "All of the above"
      ],
      "ans": 3
    },
    {
      "q": "What is the full form of RBI?",
      "o": [
        "Reserve Bank of India",
        "Republic Bank of India",
        "Rural Bank of India",
        "Regional Bank of India"
      ],
      "ans": 0
    }
  ],
  "English Communication": [
    {
      "q": "Choose the correct sentence:",
      "o": [
        "He doesn't likes coffee",
        "He don't like coffee",
        "He doesn't like coffee",
        "He not like coffee"
      ],
      "ans": 2
    },
    {
      "q": "Which is the correct past tense of 'go'?",
      "o": [
        "Goed",
        "Went",
        "Gone",
        "Going"
      ],
      "ans": 1
    },
    {
      "q": "Choose the correct sentence:",
      "o": [
        "She having a pen",
        "She has a pen",
        "She had a pen now",
        "She have a pen"
      ],
      "ans": 1
    }
  ],
  "Customer Service Fundamentals": [
    {
      "q": "What is the first step in handling a customer complaint?",
      "o": [
        "Transfer the call immediately",
        "Ignore the complaint",
        "Listen patiently and acknowledge the issue",
        "Argue with the customer"
      ],
      "ans": 2
    },
    {
      "q": "What does 'customer is always right' mean?",
      "o": [
        "Treat customer feedback as important and valid",
        "Customer can do anything",
        "Customer is never wrong",
        "Agree with whatever customer says"
      ],
      "ans": 0
    },
    {
      "q": "Which is the best response to an angry customer?",
      "o": [
        "Stay calm and empathize",
        "Yell back",
        "Hang up the phone",
        "Tell them it's their fault"
      ],
      "ans": 0
    }
  ],
  "Telesales Fundamentals": [
    {
      "q": "What is telesales?",
      "o": [
        "Online selling",
        "Door to door sales",
        "Selling in stores only",
        "Selling products or services over the phone"
      ],
      "ans": 3
    },
    {
      "q": "What is cold calling?",
      "o": [
        "Calling during winter",
        "Calling existing customers",
        "Calling potential customers who haven't expressed interest",
        "Calling friends"
      ],
      "ans": 2
    },
    {
      "q": "What is a sales pitch?",
      "o": [
        "Persuasive message to sell a product",
        "Sales discount",
        "Sports activity",
        "Sales report"
      ],
      "ans": 0
    }
  ],
  "Sales Process Basics": [
    {
      "q": "What is the typical first stage of a sales process?",
      "o": [
        "Delivery",
        "Prospecting",
        "Closing",
        "Negotiation"
      ],
      "ans": 1
    },
    {
      "q": "What is prospecting?",
      "o": [
        "Filing tax",
        "Sending invoice",
        "Finding potential customers",
        "Closing the deal"
      ],
      "ans": 2
    },
    {
      "q": "What is negotiation in sales?",
      "o": [
        "Always giving discount",
        "Argument with customer",
        "Refusing to budge",
        "Reaching a mutually acceptable agreement"
      ],
      "ans": 3
    }
  ],
  "Retail Sales Basics": [
    {
      "q": "What is retail sales?",
      "o": [
        "Selling goods directly to end consumers",
        "Selling to wholesalers",
        "Selling raw materials",
        "Selling abroad"
      ],
      "ans": 0
    },
    {
      "q": "What is 'walk-in customer'?",
      "o": [
        "Customer who visits store without prior appointment",
        "Wholesale customer",
        "Customer who pre-orders",
        "Online customer"
      ],
      "ans": 0
    },
    {
      "q": "Which is the first step when greeting a customer at retail store?",
      "o": [
        "Ignore them",
        "Stare at them",
        "Ask them to leave",
        "Smile and offer a warm greeting"
      ],
      "ans": 3
    }
  ],
  "SQL Basics": [
    {
      "q": "What does SQL stand for?",
      "o": [
        "Simple Query Language",
        "Sequential Query Language",
        "Structured Query Language",
        "Standard Query Language"
      ],
      "ans": 2
    },
    {
      "q": "Which command is used to retrieve data from a database?",
      "o": [
        "SELECT",
        "GET",
        "OPEN",
        "FETCH"
      ],
      "ans": 0
    },
    {
      "q": "Which clause is used to filter rows in a SELECT query?",
      "o": [
        "FILTER",
        "WHERE",
        "ORDER BY",
        "HAVING"
      ],
      "ans": 1
    }
  ],
  "HTML & CSS Basics": [
    {
      "q": "What does HTML stand for?",
      "o": [
        "High Tech Modern Language",
        "Hyper Text Markup Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      "ans": 1
    },
    {
      "q": "What does CSS stand for?",
      "o": [
        "Creative Style Sheets",
        "Coloured Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets"
      ],
      "ans": 2
    },
    {
      "q": "Which tag is used for the largest heading in HTML?",
      "o": [
        "<heading>",
        "<big>",
        "<h1>",
        "<head>"
      ],
      "ans": 2
    }
  ],
  "JavaScript Basics": [
    {
      "q": "Which symbol is used for single-line comments in JavaScript?",
      "o": [
        "/* */",
        "#",
        "//",
        "--"
      ],
      "ans": 2
    },
    {
      "q": "Which symbol is used for multi-line comments in JavaScript?",
      "o": [
        "//",
        "/* */",
        "<!-- -->",
        "##"
      ],
      "ans": 1
    },
    {
      "q": "Which keyword declares a constant variable?",
      "o": [
        "static",
        "var",
        "let",
        "const"
      ],
      "ans": 3
    }
  ],
  "Software Testing": [
    {
      "q": "What is software testing?",
      "o": [
        "Process of evaluating software to find defects",
        "Writing code",
        "Selling software",
        "Documenting software"
      ],
      "ans": 0
    },
    {
      "q": "What is a bug or defect?",
      "o": [
        "A user",
        "A test case",
        "A flaw in software that causes incorrect behavior",
        "A feature"
      ],
      "ans": 2
    },
    {
      "q": "What is a test case?",
      "o": [
        "A bug report",
        "A code review",
        "A test plan",
        "Set of conditions and steps to verify a feature works"
      ],
      "ans": 3
    }
  ],
  "Hardware Troubleshooting": [
    {
      "q": "What is the primary function of a CPU?",
      "o": [
        "Process instructions and perform calculations",
        "Store data permanently",
        "Display images",
        "Connect to internet"
      ],
      "ans": 0
    },
    {
      "q": "Which component is the brain of the computer?",
      "o": [
        "Monitor",
        "Hard Disk",
        "CPU",
        "RAM"
      ],
      "ans": 2
    },
    {
      "q": "What does RAM do?",
      "o": [
        "Stores data temporarily while computer is on",
        "Stores data permanently",
        "Displays images",
        "Processes instructions"
      ],
      "ans": 0
    }
  ],
  "Photoshop": [
    {
      "q": "Which company developed Photoshop?",
      "o": [
        "Google",
        "Adobe",
        "Corel",
        "Microsoft"
      ],
      "ans": 1
    },
    {
      "q": "What is the file extension for native Photoshop files?",
      "o": [
        ".psd",
        ".png",
        ".pdf",
        ".jpg"
      ],
      "ans": 0
    },
    {
      "q": "Which tool is used to select a rectangular area in Photoshop?",
      "o": [
        "Move Tool",
        "Lasso Tool",
        "Marquee Tool",
        "Magic Wand"
      ],
      "ans": 2
    }
  ],
  "CorelDRAW": [
    {
      "q": "Which company developed CorelDRAW?",
      "o": [
        "Adobe",
        "Corel Corporation",
        "Microsoft",
        "Google"
      ],
      "ans": 1
    },
    {
      "q": "Is CorelDRAW primarily a vector or raster software?",
      "o": [
        "Raster",
        "Both equally",
        "Neither",
        "Vector"
      ],
      "ans": 3
    },
    {
      "q": "What is the file extension for native CorelDRAW files?",
      "o": [
        ".cdr",
        ".psd",
        ".jpg",
        ".ai"
      ],
      "ans": 0
    }
  ],
  "Video Editing": [
    {
      "q": "Which Adobe software is used for professional video editing?",
      "o": [
        "InDesign",
        "Photoshop",
        "Premiere Pro",
        "Illustrator"
      ],
      "ans": 2
    },
    {
      "q": "Which Adobe software is used for motion graphics and visual effects?",
      "o": [
        "Photoshop",
        "After Effects",
        "InDesign",
        "Premiere Pro"
      ],
      "ans": 1
    },
    {
      "q": "Which panel in Premiere Pro is used to arrange clips on a timeline?",
      "o": [
        "Source Monitor",
        "Project Panel",
        "Timeline Panel",
        "Effects Panel"
      ],
      "ans": 2
    }
  ],
  "AutoCAD Basics": [
    {
      "q": "What is AutoCAD?",
      "o": [
        "Video editing software",
        "Database software",
        "Computer-aided design software for 2D and 3D drafting",
        "Photo editing software"
      ],
      "ans": 2
    },
    {
      "q": "Which company developed AutoCAD?",
      "o": [
        "Autodesk",
        "Adobe",
        "Corel",
        "Microsoft"
      ],
      "ans": 0
    },
    {
      "q": "What is the native file format of AutoCAD?",
      "o": [
        ".pdf",
        ".dwg",
        ".cad",
        ".dxf"
      ],
      "ans": 1
    }
  ],
  "Digital Marketing Fundamentals": [
    {
      "q": "What is digital marketing?",
      "o": [
        "Marketing on TV only",
        "Marketing through digital channels like internet, social media, email",
        "Print marketing",
        "Marketing on radio only"
      ],
      "ans": 1
    },
    {
      "q": "Which is a digital marketing channel?",
      "o": [
        "Email",
        "Search Engine",
        "Social Media",
        "All of the above"
      ],
      "ans": 3
    },
    {
      "q": "What is SEO?",
      "o": [
        "Search Engine Operation",
        "Site Engine Optimization",
        "Search Engine Optimization",
        "Search Easy Optimization"
      ],
      "ans": 2
    }
  ],
  "SEO Basics": [
    {
      "q": "What does SEO stand for?",
      "o": [
        "Search Engine Operation",
        "Site Engine Optimization",
        "Search Engine Optimization",
        "Search Easy Optimization"
      ],
      "ans": 2
    },
    {
      "q": "What is the main goal of SEO?",
      "o": [
        "Reduce website speed",
        "Increase paid ads",
        "Send emails",
        "Improve website ranking on search engines organically"
      ],
      "ans": 3
    },
    {
      "q": "Which is the most popular search engine globally?",
      "o": [
        "DuckDuckGo",
        "Yahoo",
        "Bing",
        "Google"
      ],
      "ans": 3
    }
  ],
  "Email Marketing": [
    {
      "q": "What is email marketing?",
      "o": [
        "TV ads",
        "Cold calling",
        "Sending promotional or informational emails to subscribers",
        "Print ads"
      ],
      "ans": 2
    },
    {
      "q": "Which is an email marketing platform?",
      "o": [
        "ConvertKit",
        "SendGrid",
        "Mailchimp",
        "All of the above"
      ],
      "ans": 3
    },
    {
      "q": "What is an email subject line?",
      "o": [
        "Email body",
        "Text that appears in inbox preview",
        "Signature",
        "Sender name"
      ],
      "ans": 1
    }
  ],
  "HR Basics": [
    {
      "q": "What does HR stand for?",
      "o": [
        "Human Records",
        "Hiring Resources",
        "Help Resources",
        "Human Resources"
      ],
      "ans": 3
    },
    {
      "q": "What is the primary role of HR?",
      "o": [
        "Selling products",
        "Marketing",
        "Accounting",
        "Managing people-related functions in organization"
      ],
      "ans": 3
    },
    {
      "q": "Which is a core HR function?",
      "o": [
        "Training",
        "Payroll",
        "Recruitment",
        "All of the above"
      ],
      "ans": 3
    }
  ],
  "Recruitment Basics": [
    {
      "q": "What is recruitment?",
      "o": [
        "Training employees",
        "Process of finding and hiring suitable candidates",
        "Promoting employees",
        "Firing employees"
      ],
      "ans": 1
    },
    {
      "q": "What is the first stage of recruitment?",
      "o": [
        "Onboarding",
        "Final interview",
        "Offer letter",
        "Identifying hiring need / job analysis"
      ],
      "ans": 3
    },
    {
      "q": "Which is a sourcing channel?",
      "o": [
        "LinkedIn",
        "Job portals",
        "Employee referrals",
        "All of the above"
      ],
      "ans": 3
    }
  ],
  "Warehouse Operations": [
    {
      "q": "What is a warehouse?",
      "o": [
        "Shop",
        "Factory",
        "Office",
        "Facility for storing goods"
      ],
      "ans": 3
    },
    {
      "q": "What is inventory?",
      "o": [
        "Stock of goods stored in warehouse",
        "Customer list",
        "Tax record",
        "Sales report"
      ],
      "ans": 0
    },
    {
      "q": "What is inventory management?",
      "o": [
        "Buying stock only",
        "Storing stock only",
        "Selling stock",
        "Tracking and controlling stock levels"
      ],
      "ans": 3
    }
  ]
};

export function getQuestionsFor(name: string): Question[] {
  return QUESTIONS_BY_SKILL[name] || QUESTIONS_BY_SKILL["MS Excel"];
}

export const QUESTIONS: Question[] = QUESTIONS_BY_SKILL["MS Excel"];

export const REVIEWS = [
  {
    "name": "Priya S.",
    "loc": "Delhi",
    "role": "Accountant @ Lodha",
    "sal": "Rs 28k/mo",
    "text": "Shortlisted in 5 days after adding Tally + GST verified badges. Recruiter said it stood out.",
    "skill": "Tally + GST"
  },
  {
    "name": "Rajesh M.",
    "loc": "Mumbai",
    "role": "Back Office Exec @ HDFC",
    "sal": "Rs 22k/mo",
    "text": "Got hired in 6 days. The Excel certificate made my application top of the list.",
    "skill": "MS Excel"
  },
  {
    "name": "Sunita D.",
    "loc": "Pune",
    "role": "Telecaller @ Policybazaar",
    "sal": "Rs 19k + incentive",
    "text": "Premium + 3 certificates was the best decision. Multiple shortlists in week 1.",
    "skill": "English Communication"
  },
  {
    "name": "Amit K.",
    "loc": "Bangalore",
    "role": "Admin Asst @ CA firm",
    "sal": "Rs 18k/mo",
    "text": "Was getting calls but no shortlists. After verifying skills, 3 final interviews in 10 days.",
    "skill": "Computer Basics"
  },
  {
    "name": "Neha P.",
    "loc": "Jaipur",
    "role": "Data Entry Operator",
    "sal": "Rs 16k/mo",
    "text": "Hired in 4 days after adding Excel verified badge. Best Rs 99 I ever spent.",
    "skill": "MS Excel"
  }
];