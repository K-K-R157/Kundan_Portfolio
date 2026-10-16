import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiMysql,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiTailwindcss,
  SiMongodb,
  SiMongoose,
  SiSocketdotio,
  SiWebrtc,
  SiJsonwebtokens,
  SiGooglemaps,
  SiGooglegemini,
  SiCloudinary,
  SiGit,
  SiGithub,
  SiReactquery,
} from 'react-icons/si';
import { FaDatabase, FaCode, FaLayerGroup, FaServer, FaShieldAlt, FaBolt, FaGlobeAsia } from 'react-icons/fa';

// Shared with the server seed so there is one source of truth for projects.
// Used as a fallback when the API is unreachable.
export { default as fallbackProjects } from '../../../server/src/data/projects.js';

export const profile = {
  name: 'Kundan Kumar',
  roles: ['Software Engineer',
  'Full-Stack & Real-Time Systems Developer',
  'AI/ML & Data Enthusiast',
  'CS Undergrad @ IIIT Guwahati'],
  tagline:
     'I build end-to-end software solutions spanning full-stack development, real-time systems, data-driven applications, and AI integration—from backend APIs and databases to intelligent features and user-focused interfaces.',
  summary:
    'Computer Science undergraduate at IIIT Guwahati with hands-on experience in full-stack web development, REST APIs, databases, real-time applications and AI integration. I enjoy building MERN-stack applications, integrating AI APIs, implementing authentication, and creating location-aware and real-time systems. I am interested in software engineering, data engineering and AI-enabled application development.',
  email: 'kundanrider555666@gmail.com',
  phone: '+91 9534715863',
  location: 'Guwahati, Assam, India',
  // avatar: 'https://avatars.githubusercontent.com/u/220587525?v=4',
  avatar: '/profile.jpg',
  resume: '/KUNDAN_RESUME.pdf',
  socials: {
    github: 'https://github.com/K-K-R157',
    linkedin: 'https://www.linkedin.com/in/kundan-kumar-27475927b/',
    leetcode: 'https://leetcode.com/kundankumar1231',
  },
};

export const education = {
  school: 'Indian Institute of Information Technology, Guwahati',
  degree: 'B.Tech, Computer Science and Engineering',
  period: 'Aug 2023 - Jul 2027',
};

export const experience = [
  {
    role: 'Project Intern',
    org: 'Department of Computer Applications, NIT Tiruchirappalli',
    period: 'Jun 2026 - Jul 2026',
    stack: ['MERN Stack', 'Socket.IO', 'WebRTC', 'Gemini API'],
    points: [
      'Designed and developed SmartConvo, a real-time multilingual chat and video application with messaging, online presence, typing indicators and read receipts.',
      'Implemented video calling using WebRTC and the Stream Video SDK, with Socket.IO signaling for exchanging offers, answers and ICE candidates.',
      'Integrated Google Gemini for smart replies and translation across 14 languages; implemented Cloudinary uploads, voice-to-text input, and JWT authentication with bcrypt password hashing.',
      'Implemented cursor-based message pagination and managed application state using Zustand and React Query.',
    ],
  },
  {
    role: 'Software Development Engineer Intern',
    org: 'DailyKaam',
    period: 'Jan 2026 - Mar 2026',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    points: [
      'Completed a software development internship focused on full-stack web application development using the MERN stack.',
      'Developed responsive user interfaces and integrated frontend and backend components through REST APIs.',
      'Worked on database operations, authentication and application functionality testing while contributing to development tasks.',
    ],
  },
];

export const skills = [
  {
    title: 'Languages',
    icon: FaCode,
    items: [
      { name: 'C / C++', icon: SiCplusplus },
      { name: 'Python', icon: SiPython },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'SQL', icon: FaDatabase },
    ],
  },
  {
    title: 'Frameworks',
    icon: FaLayerGroup,
    items: [
      { name: 'React.js', icon: SiReact },
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'Flask', icon: SiFlask },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    title: 'Databases',
    icon: FaServer,
    items: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'MongoDB Atlas', icon: SiMongodb },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Mongoose', icon: SiMongoose },
      { name: 'Geospatial Queries', icon: FaGlobeAsia },
    ],
  },
  {
    title: 'Tools & APIs',
    icon: FaBolt,
    items: [
      { name: 'Socket.IO', icon: SiSocketdotio },
      { name: 'WebRTC', icon: SiWebrtc },
      { name: 'REST APIs', icon: FaServer },
      { name: 'JWT', icon: SiJsonwebtokens },
      { name: 'Google Maps API', icon: SiGooglemaps },
      { name: 'Gemini API', icon: SiGooglegemini },
      { name: 'Cloudinary', icon: SiCloudinary },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Zustand', icon: FaLayerGroup },
      { name: 'React Query', icon: SiReactquery },
    ],
  },
  {
    title: 'Core Concepts',
    icon: FaShieldAlt,
    items: [
      { name: 'Data Structures & Algorithms' },
      { name: 'OOP' },
      { name: 'DBMS' },
      { name: 'Operating Systems' },
      { name: 'MVC Architecture' },
      { name: 'RBAC' },
      { name: 'Real-Time Systems' },
    ],
  },
];

export const stats = [
  { value: '200+', label: 'LeetCode problems' },
  { value: '1450+', label: 'LeetCode rating' },
  { value: '150+', label: 'GfG / Coding Ninjas' },
  { value: '2', label: 'Internships' },
];

export const achievements = [
  {
    title: 'Flipkart GRID 7.0',
    detail: 'National Semi-Finalist',
    date: 'Aug 2025',
  },
  {
    title: 'LeetCode',
    detail: '200+ problems solved, rating 1450+ (Arrays, Trees, Graphs, DP, Sliding Window)',
    link: 'https://leetcode.com/kundankumar1231',
  },
  {
    title: 'GeeksforGeeks / Coding Ninjas',
    detail: '150+ problems solved (Recursion, Sorting, Backtracking, Bit Manipulation)',
  },
];

export const leadership = [
  {
    title: 'Team Lead - Entropy, Annual Technical Fest, IIIT Guwahati',
    date: '2024',
    detail: 'Led a team of 8 volunteers coordinating 3 events, scheduling, logistics and onboarding for 200+ attendees.',
  },
];

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];
