// One-time script to migrate existing projects to Firestore
// Run this once by importing and calling seedProjects() from browser console or a temporary component

import { addProject } from './services/firebase/firestore';

const existingProjects = [
  {
    title: 'Animated Stopwatch',
    description: 'A beautiful, responsive stopwatch with 3D tilt effects and glassmorphism design. Features precise timing lap functionality, and smooth animations',
    techStack: ['HTML5', 'CSS3', 'Javascript', 'Vanilla Tilt.js'],
    liveLink: 'https://prodigywd02.vercel.app/',
    githubLink: 'https://github.com/wtfnixin/PRODIGY_WD_02',
    imageUrl: ''
  },
  {
    title: 'TechVision Landing Page',
    description: 'Modern, responsive tech company website with particle animations, glassmorphism effects, and smooth scroll interactions.',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Adobe Fonts'],
    liveLink: 'https://prodigywd01.vercel.app/',
    githubLink: 'https://github.com/wtfnixin/PRODIGY_WD_01',
    imageUrl: ''
  },
  {
    title: 'Tic Tac Toe Game',
    description: 'Interactive Tic Tac Toe game with custom animations, sound effects, and meme celebrations. Features responsive design and engaging gameplay.',
    techStack: ['HTML5', 'CSS3', 'Javascript', 'Audio API'],
    liveLink: 'https://prodigywd03.vercel.app/',
    githubLink: 'https://github.com/wtfnixin/PRODIGY_WD_03',
    imageUrl: ''
  },
  {
    title: 'Multiplayer Quiz TIC-TAC-TOE',
    description: 'Trivia-based Tic-Tac-Toe where correct answers earn moves. Firebase real-time multiplayer with timed gameplay. Modern UI with cross-device compatibility.',
    techStack: ['HTML5', 'JavaScript', 'CSS3', 'Firebase'],
    liveLink: 'https://thecloudclub-tictactoe.vercel.app/',
    githubLink: 'https://github.com/wtfnixin/cloud-club',
    imageUrl: ''
  }
];

export const seedProjects = async () => {
  console.log('Starting project migration...');
  
  for (const project of existingProjects) {
    try {
      await addProject(project);
      console.log(`✓ Added: ${project.title}`);
    } catch (error) {
      console.error(`✗ Failed to add ${project.title}:`, error);
    }
  }
  
  console.log('Migration complete!');
};

// To run this, you can temporarily add this to any component:
// import { seedProjects } from '../seedProjects';
// useEffect(() => { seedProjects(); }, []);
