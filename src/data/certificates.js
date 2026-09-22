// Add one entry per certificate.
// 1. Put the thumbnail image (jpg/png of the certificate) in: public/certificates/
// 2. (Optional) Put the original PDF in the same folder and set `pdf` so visitors can open it.
// 3. Add an entry below. Filenames must match exactly (case-sensitive).
//
// category must be one of: "AI / ML", "Cloud & Data", "Software & Networks", "Career & Language"
// type is a small badge on the card: "Specialization" | "Course" | "Track"

export const CERT_CATEGORIES = ['All', 'AI / ML', 'Cloud & Data', 'Software & Networks', 'Career & Language'];

const certificates = [
  // ---------- AI / ML ----------
  {
    title: "IBM Introduction to Machine Learning",
    issuer: "IBM · Coursera",
    date: "May 14, 2026",
    type: "Specialization",
    category: "AI / ML",
    file: "/certificates/ibm-intro-to-machine-learning.jpg",
    pdf: "/certificates/ibm-intro-to-machine-learning.pdf",
  },
  {
    title: "Natural Language Processing",
    issuer: "DeepLearning.AI · Coursera",
    date: "Jul 26, 2026",
    type: "Specialization",
    category: "AI / ML",
    file: "/certificates/nlp-specialization.jpg",
    pdf: "/certificates/nlp-specialization.pdf",
  },
  {
    title: "Applied Machine Learning with Python",
    issuer: "Edureka · Coursera",
    date: "Jul 26, 2026",
    type: "Course",
    category: "AI / ML",
    file: "/certificates/applied-ml-python.jpg",
    pdf: "/certificates/applied-ml-python.pdf",
  },
  {
    title: "Generative AI: Introduction and Applications",
    issuer: "IBM · Coursera",
    date: "May 14, 2026",
    type: "Course",
    category: "AI / ML",
    file: "/certificates/generative-ai.jpg",
    pdf: "/certificates/generative-ai.pdf",
  },
  {
    title: "Computer Vision Basics",
    issuer: "University at Buffalo (SUNY) · Coursera",
    date: "Nov 19, 2025",
    type: "Course",
    category: "AI / ML",
    file: "/certificates/computer-vision-basics.jpg",
    pdf: "/certificates/computer-vision-basics.pdf",
  },
  {
    title: "Supervised Machine Learning: Regression",
    issuer: "IBM · Coursera",
    date: "May 14, 2026",
    type: "Course",
    category: "AI / ML",
    file: "/certificates/supervised-regression.jpg",
    pdf: "/certificates/supervised-regression.pdf",
  },
  {
    title: "Supervised Machine Learning: Classification",
    issuer: "IBM · Coursera",
    date: "May 14, 2026",
    type: "Course",
    category: "AI / ML",
    file: "/certificates/supervised-classification.jpg",
    pdf: "/certificates/supervised-classification.pdf",
  },
  {
    title: "Unsupervised Machine Learning",
    issuer: "IBM · Coursera",
    date: "May 14, 2026",
    type: "Course",
    category: "AI / ML",
    file: "/certificates/unsupervised-ml.jpg",
    pdf: "/certificates/unsupervised-ml.pdf",
  },
  {
    title: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM · Coursera",
    date: "May 12, 2026",
    type: "Course",
    category: "AI / ML",
    file: "/certificates/eda-for-ml.jpg",
    pdf: "/certificates/eda-for-ml.pdf",
  },

  // ---------- Cloud & Data ----------
  {
    title: "Google Cloud Data Analytics",
    issuer: "Google Cloud Career Launchpad",
    date: "Nov 1, 2025",
    type: "Track",
    category: "Cloud & Data",
    file: "/certificates/google-cloud-data-analytics.jpg",
    pdf: "/certificates/google-cloud-data-analytics.pdf",
  },
  {
    title: "Introduction to Cloud Computing",
    issuer: "IBM · Coursera",
    date: "Mar 31, 2026",
    type: "Course",
    category: "Cloud & Data",
    file: "/certificates/intro-cloud-computing.jpg",
    pdf: "/certificates/intro-cloud-computing.pdf",
  },
  {
    title: "SQL: A Practical Introduction for Querying Databases",
    issuer: "IBM · Coursera",
    date: "Jul 27, 2026",
    type: "Course",
    category: "Cloud & Data",
    file: "/certificates/sql-practical-introduction.jpg",
    pdf: "/certificates/sql-practical-introduction.pdf",
  },

  // ---------- Software & Networks ----------
  {
    title: "Computer Communications",
    issuer: "University of Colorado · Coursera",
    date: "Nov 20, 2025",
    type: "Specialization",
    category: "Software & Networks",
    file: "/certificates/computer-communications.jpg",
    pdf: "/certificates/computer-communications.pdf",
  },
  {
    title: "Software Design and Project Management",
    issuer: "HKUST · Coursera",
    date: "Sep 12, 2025",
    type: "Course",
    category: "Software & Networks",
    file: "/certificates/software-design-project-management.jpg",
    pdf: "/certificates/software-design-project-management.pdf",
  },

  // ---------- Career & Language ----------
  {
    title: "Job & Exam Aptitude Mastery",
    issuer: "Board Infinity · Coursera",
    date: "Jul 26, 2026",
    type: "Specialization",
    category: "Career & Language",
    file: "/certificates/job-exam-aptitude.jpg",
    pdf: "/certificates/job-exam-aptitude.pdf",
  },
  {
    title: "English Intermediate B1",
    issuer: "Federica Web Learning · Coursera",
    date: "Jul 26, 2026",
    type: "Specialization",
    category: "Career & Language",
    file: "/certificates/english-intermediate-b1.jpg",
    pdf: "/certificates/english-intermediate-b1.pdf",
  },

  // ---------- Still waiting for the image (drop the file into public/certificates/) ----------
  {
    title: "Anthropic MCP",
    issuer: "Anthropic",
    category: "AI / ML",
    file: "/certificates/anthropic-mcp.jpg",
  },
  {
    title: "Artificial Intelligence",
    issuer: "Infosys Springboard",
    category: "AI / ML",
    file: "/certificates/infosys-ai.jpg",
  },
  {
    title: "Data Structures & Algorithms",
    issuer: "CodeChef",
    category: "Software & Networks",
    file: "/certificates/codechef-dsa.jpg",
  },
];

export default certificates;
