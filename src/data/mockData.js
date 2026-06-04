export const courses = [
  {
    id: 1,
    title: 'The Complete Full Stack Web Development Bootcamp',
    cat: 'Web Development',
    catTag: 'web',
    instructor: 'Rahul Pathak',
    instructorInitials: 'RP',
    price: 1499,
    oldPrice: 4999,
    duration: '72 hours',
    rating: 4.9,
    reviews: 12480,
    description: 'Master HTML, CSS, JavaScript, React, Node.js and MongoDB from scratch to job-ready.',
    longDescription: 'Go from zero to full-stack developer with this comprehensive bootcamp. Build 20+ real-world projects and master modern web development.',
    emoji: '🌐',
    badge: 'BESTSELLER',
    color: '#1e3a8a,#2563eb',
    progress: 68,
    syllabus: [
      { module: 'HTML & CSS Foundations', lessons: ['Introduction', 'HTML Structure', 'CSS Selectors', 'Flexbox', 'Grid', 'Responsive Design'] },
      { module: 'JavaScript Essentials', lessons: ['Variables', 'Functions', 'Arrays', 'Objects', 'DOM', 'Async/Await'] },
      { module: 'React.js', lessons: ['Components', 'Props', 'State', 'Hooks', 'Router', 'Redux'] },
      { module: 'Node.js & Express', lessons: ['Fundamentals', 'Express', 'REST APIs', 'Auth', 'Error Handling'] },
      { module: 'MongoDB', lessons: ['Basics', 'Mongoose', 'Aggregation', 'Integration'] }
    ]
  },
  {
    id: 2,
    title: 'Mathematics for GATE & IIT-JEE — Complete Preparation',
    cat: 'Mathematics',
    catTag: 'math',
    instructor: 'Dr. Meera Nair',
    instructorInitials: 'MN',
    price: 999,
    oldPrice: 3999,
    duration: '60 hours',
    rating: 4.8,
    reviews: 8240,
    description: 'Master calculus, algebra, probability and all GATE maths topics with 500+ practice problems.',
    longDescription: 'Complete GATE mathematics preparation with shortcut techniques and previous year questions.',
    emoji: '🧮',
    badge: 'TOP RATED',
    color: '#065f46,#10b981',
    progress: 45
  },
  {
    id: 3,
    title: 'Python Programming: From Zero to Hero',
    cat: 'Python',
    catTag: 'python',
    instructor: 'Vikram Anand',
    instructorInitials: 'VA',
    price: 799,
    oldPrice: 2999,
    duration: '48 hours',
    rating: 4.7,
    reviews: 6120,
    description: 'Learn Python completely — variables, functions, OOP, file handling, APIs, Flask and more.',
    longDescription: 'From absolute beginner to Python expert. Build real-world projects and master data structures.',
    emoji: '🐍',
    badge: 'POPULAR',
    color: '#4338ca,#6366f1',
    progress: 100
  },
  {
    id: 4,
    title: 'Data Science with Python & Machine Learning',
    cat: 'Data Science',
    catTag: 'data',
    instructor: 'Ananya Singh',
    instructorInitials: 'AS',
    price: 1999,
    oldPrice: 6999,
    duration: '85 hours',
    rating: 4.9,
    reviews: 4860,
    description: 'From pandas to deep learning — a complete data science journey with real-world projects.',
    emoji: '📊',
    badge: 'NEW',
    color: '#7c2d12,#ea580c',
    progress: 0
  }
];

export const testimonials = [
  {
    text: "EduNova completely changed my career trajectory. I landed a ₹18 LPA job at a top startup after completing the Full Stack Bootcamp.",
    author: "Arjun Sharma",
    role: "Full Stack Developer at Razorpay",
    initials: "AS",
    rating: 5,
    color: "linear-gradient(135deg,#1e3a8a,#2563eb)"
  },
  {
    text: "As a GATE aspirant, Dr. Meera's mathematics course was a game-changer. Helped me score in the top 1%.",
    author: "Priya Mehta",
    role: "GATE AIR 147, IIT Bombay",
    initials: "PM",
    rating: 5,
    color: "linear-gradient(135deg,#065f46,#10b981)"
  },
  {
    text: "The Python course is incredibly detailed. I went from knowing nothing to building full Flask web apps in just 3 months.",
    author: "Karan Patel",
    role: "Software Engineer at TCS",
    initials: "KP",
    rating: 5,
    color: "linear-gradient(135deg,#4338ca,#6366f1)"
  }
];

export const instructors = [
  { name: "Rahul Pathak", title: "Full Stack Dev Expert", initials: "RP", courses: 8, students: "14K+", rating: "4.9", color: "linear-gradient(135deg,#1e3a8a,#2563eb)" },
  { name: "Dr. Meera Nair", title: "Mathematics & GATE", initials: "MN", courses: 5, students: "9K+", rating: "4.8", color: "linear-gradient(135deg,#065f46,#10b981)" },
  { name: "Vikram Anand", title: "Python & Data Science", initials: "VA", courses: 6, students: "7K+", rating: "4.7", color: "linear-gradient(135deg,#4338ca,#6366f1)" },
  { name: "Ananya Singh", title: "ML & AI Specialist", initials: "AS", courses: 4, students: "5K+", rating: "4.9", color: "linear-gradient(135deg,#7c2d12,#ea580c)" }
];

 // Add this to your existing mockData.js if blogPosts is missing

export const blogPosts = [
  { 
    cat: "BOARD EXAMS", 
    emoji: "💼", 
    title: "Top 10 Tips to Score Better in Board Exams", 
    excerpt: "Simple and effective strategies to improve your performance in Class 8th–12th exams.", 
    date: "", 
    readTime: "" 
  },
  { 
    cat: "Study Tips", 
    emoji: "📖", 
    title: "How to Crack GATE 2025: A Complete Roadmap", 
    excerpt: "A month-by-month preparation strategy from GATE toppers.", 
    date: "", 
    readTime: "" 
  },
  { 
    cat: "NDA", 
    emoji: "🪖", 
    title: "Complete Guide to NDA Preparation", 
    excerpt: "Learn the right approach and preparation strategy for the NDA written examination.", 
    date: "", 
    readTime: "" 
  }
];

export const faqs = [
  { q: "Are the courses available for lifetime access?", a: "Yes! Once you enroll, you get lifetime access to all course materials including videos, PDFs, assignments and updates." },
  { q: "Do you offer certificates after course completion?", a: "Absolutely! Every course comes with a digital certificate of completion that you can share on LinkedIn." },
  { q: "What payment methods do you accept?", a: "We accept Credit/Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), and EMI options." },
  { q: "Is there a refund policy?", a: "Yes, we offer a 30-day money-back guarantee on all courses." },
  { q: "Can I access courses on mobile?", a: "Yes! EduNova has a fully responsive web app and mobile apps for iOS and Android." },
  { q: "How do Live Classes work?", a: "Live classes are conducted via Zoom or Google Meet. Registered students receive a meeting link via email." }
];
