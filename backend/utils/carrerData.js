// Career categories
const careerData = {
    tech: [
        "Data Analyst", "Data Scientist", "Software Developer", "Web Developer",
        "AI Engineer", "Machine Learning Engineer", "Cybersecurity Analyst",
        "Cloud Engineer", "DevOps Engineer", "UI/UX Designer", "Mobile App Developer",
        "Database Administrator", "System Analyst", "Network Engineer",
        "Blockchain Developer", "Game Developer", "Embedded Systems Engineer",
        "QA/Test Engineer", "IT Support Specialist", "Full Stack Developer"
    ],
    arts: [
        "Content Writer", "Journalist", "Graphic Designer", "Animator",
        "Video Editor", "Digital Marketer", "Social Media Manager",
        "Public Relations Specialist", "Copywriter", "Blogger", "Photographer",
        "Fashion Designer", "Interior Designer", "Creative Director",
        "Script Writer", "Editor (Publishing)", "Event Manager", "Translator",
        "Voice-over Artist", "Advertising Specialist"
    ]
};

// Skill mappings for each career role
const skillMappings = {
    "Data Analyst": {
        required: ["Python", "SQL", "Excel", "Data Visualization", "Statistics"],
        recommended: ["Tableau", "Power BI", "R Programming"],
        roadmap: [
            { week: 1, topic: "Excel & Statistics Fundamentals", skills: ["Excel", "Statistics"] },
            { week: 2, topic: "SQL Mastery", skills: ["SQL"] },
            { week: 3, topic: "Python for Data Analysis", skills: ["Python"] },
            { week: 4, topic: "Data Visualization", skills: ["Data Visualization", "Tableau"] }
        ]
    },
    "Data Scientist": {
        required: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization"],
        recommended: ["Deep Learning", "Big Data", "TensorFlow"],
        roadmap: [
            { week: 1, topic: "Python & Statistics", skills: ["Python", "Statistics"] },
            { week: 2, topic: "Machine Learning Fundamentals", skills: ["Machine Learning"] },
            { week: 3, topic: "Advanced ML & Deep Learning", skills: ["Deep Learning"] },
            { week: 4, topic: "Big Data Tools", skills: ["Big Data", "TensorFlow"] }
        ]
    },
    "Software Developer": {
        required: ["Java", "Data Structures", "Algorithms", "Git", "SQL"],
        recommended: ["Spring Boot", "Microservices", "Cloud Computing"],
        roadmap: [
            { week: 1, topic: "Programming Fundamentals", skills: ["Java", "Data Structures"] },
            { week: 2, topic: "Algorithms & Problem Solving", skills: ["Algorithms"] },
            { week: 3, topic: "Version Control & Databases", skills: ["Git", "SQL"] },
            { week: 4, topic: "Framework & Architecture", skills: ["Spring Boot", "Microservices"] }
        ]
    },
    "Web Developer": {
        required: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
        recommended: ["TypeScript", "MongoDB", "Express.js"],
        roadmap: [
            { week: 1, topic: "HTML & CSS Fundamentals", skills: ["HTML", "CSS"] },
            { week: 2, topic: "JavaScript Essentials", skills: ["JavaScript"] },
            { week: 3, topic: "React Framework", skills: ["React"] },
            { week: 4, topic: "Backend Development", skills: ["Node.js"] }
        ]
    },
    "Full Stack Developer": {
        required: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
        recommended: ["TypeScript", "GraphQL", "Docker"],
        roadmap: [
            { week: 1, topic: "Frontend Fundamentals", skills: ["HTML", "CSS", "JavaScript"] },
            { week: 2, topic: "React & Frontend Frameworks", skills: ["React"] },
            { week: 3, topic: "Backend Development", skills: ["Node.js"] },
            { week: 4, topic: "Database & Deployment", skills: ["MongoDB", "Docker"] }
        ]
    },
    "AI Engineer": {
        required: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch"],
        recommended: ["NLP", "Computer Vision", "MLOps"],
        roadmap: [
            { week: 1, topic: "Python & ML Basics", skills: ["Python", "Machine Learning"] },
            { week: 2, topic: "Deep Learning", skills: ["Deep Learning", "TensorFlow"] },
            { week: 3, topic: "Advanced AI", skills: ["PyTorch", "NLP"] },
            { week: 4, topic: "MLOps & Deployment", skills: ["MLOps"] }
        ]
    },
    "UI/UX Designer": {
        required: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research"],
        recommended: ["HTML/CSS", "Design Systems", "Animation"],
        roadmap: [
            { week: 1, topic: "Design Fundamentals", skills: ["Wireframing", "User Research"] },
            { week: 2, topic: "Design Tools", skills: ["Figma", "Adobe XD"] },
            { week: 3, topic: "Prototyping", skills: ["Prototyping"] },
            { week: 4, topic: "Advanced Design", skills: ["Design Systems", "Animation"] }
        ]
    },
    "Content Writer": {
        required: ["Writing", "Grammar", "Research", "SEO", "Editing"],
        recommended: ["Copywriting", "Content Strategy", "WordPress"],
        roadmap: [
            { week: 1, topic: "Writing Fundamentals", skills: ["Writing", "Grammar"] },
            { week: 2, topic: "SEO & Research", skills: ["SEO", "Research"] },
            { week: 3, topic: "Content Strategy", skills: ["Editing"] },
            { week: 4, topic: "Advanced Writing", skills: ["Copywriting"] }
        ]
    },
    "Digital Marketer": {
        required: ["SEO", "Social Media", "Google Analytics", "Content Marketing", "Email Marketing"],
        recommended: ["PPC", "Facebook Ads", "Marketing Automation"],
        roadmap: [
            { week: 1, topic: "Digital Marketing Basics", skills: ["SEO", "Social Media"] },
            { week: 2, topic: "Analytics & Content", skills: ["Google Analytics", "Content Marketing"] },
            { week: 3, topic: "Paid Advertising", skills: ["PPC", "Facebook Ads"] },
            { week: 4, topic: "Advanced Marketing", skills: ["Marketing Automation"] }
        ]
    },
    "Graphic Designer": {
        required: ["Photoshop", "Illustrator", "Typography", "Color Theory", "Branding"],
        recommended: ["After Effects", "3D Design", "UI Design"],
        roadmap: [
            { week: 1, topic: "Design Fundamentals", skills: ["Typography", "Color Theory"] },
            { week: 2, topic: "Design Tools", skills: ["Photoshop", "Illustrator"] },
            { week: 3, topic: "Branding", skills: ["Branding"] },
            { week: 4, topic: "Motion Graphics", skills: ["After Effects"] }
        ]
    }
};

// Resource library for skills
const resourceLibrary = {
    "Python": {
        notes: "Python is a high-level, interpreted programming language known for its simplicity and readability. It supports multiple programming paradigms and has extensive libraries for data science, web development, and automation. Python's syntax allows developers to write programs with fewer lines than other languages, making it ideal for beginners and rapid development.",
        summary: "Beginner-friendly programming language with clean syntax. Perfect for data science, web dev, and automation.",
        videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc"
    },
    "SQL": {
        notes: "Structured Query Language (SQL) is used to manage and manipulate relational databases. It allows you to query, insert, update, and delete data efficiently. SQL is essential for data analysis, backend development, and database administration. Mastery of SQL joins, subqueries, and optimization is crucial for data professionals.",
        summary: "Essential database language for querying and managing data. Must-know for data professionals.",
        videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY"
    },
    "JavaScript": {
        notes: "JavaScript is a versatile programming language that enables interactive web pages. It's essential for frontend development and can be used on the backend with Node.js. Modern JavaScript (ES6+) includes features like arrow functions, promises, async/await, and modules that make development more efficient.",
        summary: "Core web technology for interactive websites. Powers modern web applications.",
        videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk"
    },
    "React": {
        notes: "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage application state efficiently. React uses a virtual DOM for optimal performance and supports hooks for state management. It's maintained by Facebook and has a massive ecosystem.",
        summary: "Popular frontend framework for building dynamic web apps with component-based architecture.",
        videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8"
    },
    "Node.js": {
        notes: "Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows JavaScript to run on the server side, enabling full-stack JavaScript development. Node.js is event-driven and non-blocking, making it ideal for I/O-heavy applications and real-time services.",
        summary: "Server-side JavaScript runtime for building scalable network applications.",
        videoUrl: "https://www.youtube.com/embed/ENrzD9HAZK4"
    },
    "HTML": {
        notes: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of web pages using elements and tags. HTML5 introduced semantic elements like <article>, <section>, and <nav> for better accessibility and SEO.",
        summary: "Foundation of web pages. Provides structure and content organization.",
        videoUrl: "https://www.youtube.com/embed/pQN-pnXPaVg"
    },
    "CSS": {
        notes: "CSS (Cascading Style Sheets) is used for styling and layout of web pages. It controls colors, fonts, spacing, and responsive design. Modern CSS includes Flexbox and Grid for complex layouts, and animations for interactive elements.",
        summary: "Styles web pages with colors, layouts, and responsive designs.",
        videoUrl: "https://www.youtube.com/embed/1PnVor36_40"
    },
    "Machine Learning": {
        notes: "Machine Learning is a subset of AI that enables systems to learn from data. It includes supervised learning (classification, regression), unsupervised learning (clustering), and reinforcement learning. Popular algorithms include linear regression, decision trees, and neural networks.",
        summary: "AI technique that allows systems to learn and improve from experience.",
        videoUrl: "https://www.youtube.com/embed/GwIo3gDZCVQ"
    },
    "SEO": {
        notes: "Search Engine Optimization (SEO) is the practice of optimizing websites to rank higher in search engine results. It includes on-page optimization (content, meta tags), off-page optimization (backlinks), and technical SEO (site speed, mobile-friendliness).",
        summary: "Optimizes websites to rank higher in search engine results.",
        videoUrl: "https://www.youtube.com/embed/-B58GgPLSq0"
    },
    "Figma": {
        notes: "Figma is a cloud-based design tool for creating user interfaces, prototypes, and design systems. It enables real-time collaboration between designers and developers. Features include vector editing, auto-layout, components, and developer handoff tools.",
        summary: "Cloud-based UI/UX design tool for collaborative interface design.",
        videoUrl: "https://www.youtube.com/embed/FTFaQWZBqQ8"
    }
};

// Job links for career roles
const jobLinks = {
    "Data Analyst": [
        "https://www.linkedin.com/jobs/data-analyst-jobs",
        "https://www.indeed.com/q-Data-Analyst-jobs.html",
        "https://www.naukri.com/data-analyst-jobs"
    ],
    "Data Scientist": [
        "https://www.linkedin.com/jobs/data-scientist-jobs",
        "https://www.indeed.com/q-Data-Scientist-jobs.html",
        "https://www.naukri.com/data-scientist-jobs"
    ],
    "Software Developer": [
        "https://www.linkedin.com/jobs/software-developer-jobs",
        "https://www.indeed.com/q-Software-Developer-jobs.html",
        "https://www.naukri.com/software-developer-jobs"
    ],
    "Web Developer": [
        "https://www.linkedin.com/jobs/web-developer-jobs",
        "https://www.indeed.com/q-Web-Developer-jobs.html",
        "https://www.naukri.com/web-developer-jobs"
    ],
    "Full Stack Developer": [
        "https://www.linkedin.com/jobs/full-stack-developer-jobs",
        "https://www.indeed.com/q-Full-Stack-Developer-jobs.html",
        "https://www.naukri.com/full-stack-developer-jobs"
    ],
    "AI Engineer": [
        "https://www.linkedin.com/jobs/ai-engineer-jobs",
        "https://www.indeed.com/q-AI-Engineer-jobs.html",
        "https://www.naukri.com/ai-engineer-jobs"
    ],
    "UI/UX Designer": [
        "https://www.linkedin.com/jobs/ui-ux-designer-jobs",
        "https://www.indeed.com/q-UI-UX-Designer-jobs.html",
        "https://www.naukri.com/ui-ux-designer-jobs"
    ],
    "Content Writer": [
        "https://www.linkedin.com/jobs/content-writer-jobs",
        "https://www.indeed.com/q-Content-Writer-jobs.html",
        "https://www.naukri.com/content-writer-jobs"
    ],
    "Digital Marketer": [
        "https://www.linkedin.com/jobs/digital-marketer-jobs",
        "https://www.indeed.com/q-Digital-Marketer-jobs.html",
        "https://www.naukri.com/digital-marketing-jobs"
    ],
    "Graphic Designer": [
        "https://www.linkedin.com/jobs/graphic-designer-jobs",
        "https://www.indeed.com/q-Graphic-Designer-jobs.html",
        "https://www.naukri.com/graphic-designer-jobs"
    ]
};

// Function to initialize progress for a user
const initializeProgress = (career) => {
    const careerSkills = skillMappings[career];
    if (!careerSkills) return [];

    return careerSkills.roadmap.map(week => ({
        week: week.week,
        skills: week.skills.map(skill => ({
            name: skill,
            completed: false,
            completedDate: null,
            resources: resourceLibrary[skill] || {
                notes: "Resources coming soon! Keep exploring and learning! 🚀",
                summary: "This skill is valuable for your career path. Check online platforms like Coursera, Udemy, and YouTube for comprehensive courses.",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            }
        })),
        completionPercentage: 0
    }));
};

// Export all the data
module.exports = {
    careerData,
    skillMappings,
    resourceLibrary,
    jobLinks,
    initializeProgress
};