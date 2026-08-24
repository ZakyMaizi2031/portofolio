import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import GradeCalculator from './components/GradeCalculator';
import CvBuilder from './components/CvBuilder';
import './App.css';

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

// Default: array of semester records { id, number, ips, totalSks }
const defaultSemesters = [];

// Default: manual skill percentages (0–100)
const defaultSkillPercentages = {
  'UI/UX & Frontend': 0,
  'Backend & Infrastructure': 0,
  'Data Science & AI': 0,
  'Logic & Algorithms': 0
};

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // --- Semesters state ---
  const [semesters, setSemesters] = useState(() => {
    const saved = localStorage.getItem('porto_semesters_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return defaultSemesters;
  });

  // --- Manual skill percentages state ---
  const [skillPercentages, setSkillPercentages] = useState(() => {
    const saved = localStorage.getItem('porto_skills_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return defaultSkillPercentages;
  });

  // --- CV state ---
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem('porto_cv_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return defaultCvData;
  });

  // --- Persist to localStorage ---
  useEffect(() => {
    localStorage.setItem('porto_semesters_v1', JSON.stringify(semesters));
  }, [semesters]);

  useEffect(() => {
    localStorage.setItem('porto_skills_v1', JSON.stringify(skillPercentages));
  }, [skillPercentages]);

  useEffect(() => {
    localStorage.setItem('porto_cv_v3', JSON.stringify(cvData));
  }, [cvData]);

  // --- IPK = Σ(IPS × TotalSKS) / Σ(TotalSKS) ---
  const gpa = useMemo(() => {
    if (semesters.length === 0) return 0.0;
    let totalPoints = 0;
    let totalSks = 0;
    semesters.forEach(s => {
      totalPoints += parseFloat(s.ips) * parseInt(s.totalSks);
      totalSks += parseInt(s.totalSks);
    });
    return totalSks > 0 ? (totalPoints / totalSks) : 0.0;
  }, [semesters]);

  // --- Skills from manual percentages ---
  const skills = useMemo(() => {
    return Object.entries(skillPercentages).map(([name, score]) => ({
      name,
      score,
      gpaAverage: (score / 100) * 4.0,
      courses: []
    }));
  }, [skillPercentages]);

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="blob blob-primary no-print"></div>
      <div className="blob blob-secondary no-print"></div>

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
            semesters={semesters}
            setSemesters={setSemesters}
            skillPercentages={skillPercentages}
            setSkillPercentages={setSkillPercentages}
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
