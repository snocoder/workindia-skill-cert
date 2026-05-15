export type Skill = { name: string; icon: string; bg: string; n: string };
export type Pending = { name: string; icon: string; score: string; date: string };
export type UserType = "free" | "p2" | "p0";
export type ResultType = "pass" | "fail";
export type ScreenId = "landing" | "detail" | "quiz" | "resultPass" | "resultFail" | "success";

export const SKILLS = {
  rec: [
    { name: "Tally", icon: "🧮", bg: "#FEF3C7", n: "3.2k" },
    { name: "GST", icon: "🧾", bg: "#E0E7FF", n: "2.8k" },
    { name: "Basic Accounting", icon: "📒", bg: "#D1FAE5", n: "1.9k" },
  ] as Skill[],
  gen: [
    { name: "Computer Basics", icon: "💻", bg: "#DBEAFE", n: "5.1k" },
    { name: "MS Excel", icon: "📊", bg: "#E0E7FF", n: "4.7k" },
    { name: "Spoken English", icon: "🗣️", bg: "#FCE7F3", n: "3.4k" },
  ] as Skill[],
};

export const QUESTIONS = [
  {
    q: "Which shortcut copies text in MS Excel?",
    o: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"],
  },
  {
    q: "What does the SUM function do?",
    o: ["Counts cells", "Adds numbers together", "Finds the average", "Sorts data"],
  },
  {
    q: 'Which tab has the "Chart" option?',
    o: ["Home", "Insert", "Data", "View"],
  },
];

export const REVIEWS = [
  {
    name: "Priya S.",
    loc: "Delhi",
    role: "Accountant @ Lodha",
    sal: "Rs 28k/mo",
    text: "Shortlisted in 5 days after adding Tally + GST verified badges. Recruiter said it stood out.",
    skill: "Tally + GST",
  },
  {
    name: "Rajesh M.",
    loc: "Mumbai",
    role: "Back Office Exec @ HDFC",
    sal: "Rs 22k/mo",
    text: "Got hired in 6 days. The Excel certificate made my application top of the list.",
    skill: "MS Excel",
  },
  {
    name: "Sunita D.",
    loc: "Pune",
    role: "Telecaller @ Policybazaar",
    sal: "Rs 19k + incentive",
    text: "Premium + 3 certificates was the best decision. Multiple shortlists in week 1.",
    skill: "Spoken English",
  },
  {
    name: "Amit K.",
    loc: "Bangalore",
    role: "Admin Asst @ CA firm",
    sal: "Rs 18k/mo",
    text: "Was getting calls but no shortlists. After verifying skills, 3 final interviews in 10 days.",
    skill: "Computer Basics",
  },
  {
    name: "Neha P.",
    loc: "Jaipur",
    role: "Data Entry Operator",
    sal: "Rs 16k/mo",
    text: "Hired in 4 days after adding Excel verified badge. Best Rs 99 I ever spent.",
    skill: "MS Excel",
  },
];
