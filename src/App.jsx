import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import GradeCalculator from './components/GradeCalculator';
import CvBuilder from './components/CvBuilder';
import './App.css';

const gradeValues = {
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.5,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.5,
  'C': 2.0,
  'D': 1.0,
  'E': 0.0
};

const defaultCourses = [];

const defaultCvData = {
  name: 'Muhammad Zaky Maizi',
  title: 'Fullstack Developer & UI/UX Designer',
  email: 'zakymaizi2020@gmail.com',
  phone: '089530004221',
  address: 'Cingkariang Kec. Banuhampu, Kabupaten Agam, Sumatera Barat',
  website: 'github.com/ZakyMaizi2031',
  summary: 'Mahasiswa tingkat akhir program studi D4 Teknik Rekayasa Perangkat Lunak di Politeknik Negeri Padang yang berfokus pada pengembangan aplikasi Fullstack Web dan desain UI/UX. Memiliki ketertarikan mendalam dalam merancang antarmuka pengguna yang estetik, responsif, dan intuitif, didukung dengan pemahaman arsitektur backend yang solid serta logika pemecahan masalah yang kuat.',
  university: 'Politeknik Negeri Padang',
  major: 'D4 Teknik Rekayasa Perangkat Lunak',
  educationDuration: '2023 - Sekarang (Semester 7)',
  experiences: [],
  projects: []
};

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Load initial states from LocalStorage or fallback to default
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('porto_courses_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing courses from localStorage', e);
      }
    }
    return defaultCourses;
  });

  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem('porto_cv_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing CV from localStorage', e);
      }
    }
    return defaultCvData;
  });

  // Save updates to localStorage reactively
  useEffect(() => {
    localStorage.setItem('porto_courses_v3', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('porto_cv_v3', JSON.stringify(cvData));
  }, [cvData]);

  // Calculate Cumulative GPA (IPK)
  const gpa = useMemo(() => {
    if (courses.length === 0) return 0.0;
    let totalPoints = 0;
    let totalSks = 0;
    courses.forEach(c => {
      const gradeVal = gradeValues[c.grade] ?? 0.0;
      totalPoints += gradeVal * c.sks;
      totalSks += c.sks;
    });
    return totalSks > 0 ? (totalPoints / totalSks) : 0.0;
  }, [courses]);

  // Calculate Competency Scores per Category
  const skills = useMemo(() => {
    const categories = [
      'UI/UX & Frontend',
      'Backend & Infrastructure',
      'Data Science & AI',
      'Logic & Algorithms'
    ];

    return categories.map(cat => {
      const catCourses = courses.filter(c => 
        c.category === cat || c.category === 'Projek Capstone (Semua IT)'
      );
      if (catCourses.length === 0) {
        return { name: cat, score: 0, gpaAverage: 0, courses: [] };
      }

      let totalPoints = 0;
      let totalSks = 0;
      catCourses.forEach(c => {
        const gradeVal = gradeValues[c.grade] ?? 0.0;
        totalPoints += gradeVal * c.sks;
        totalSks += c.sks;
      });

      const avgGpa = totalSks > 0 ? (totalPoints / totalSks) : 0.0;
      // Convert 0.0 - 4.0 GPA range to percentage (0% - 100%)
      const scorePercentage = (avgGpa / 4.0) * 100;

      return {
        name: cat,
        score: scorePercentage,
        gpaAverage: avgGpa,
        courses: catCourses.map(c => c.name)
      };
    });
  }, [courses]);

  return (
    <div className="app-container">
      {/* Navbar floating at the top */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Background glowing shape blurs */}
      <div className="blob blob-primary no-print"></div>
      <div className="blob blob-secondary no-print"></div>

      {/* Main Dynamic View Area */}
      <main className="main-content">
        {activeTab === 'home' && (
          <Home 
            setActiveTab={setActiveTab} 
            gpa={gpa} 
            skills={skills} 
            cvData={cvData} 
          />
        )}
        
        {activeTab === 'calculator' && (
          <GradeCalculator 
            courses={courses} 
            setCourses={setCourses} 
            gpa={gpa} 
            skills={skills} 
          />
        )}
        
        {activeTab === 'cv' && (
          <CvBuilder 
            cvData={cvData} 
            setCvData={setCvData} 
            gpa={gpa} 
            skills={skills} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
