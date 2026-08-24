import React from 'react';
import { ArrowRight, Code2, Database, LayoutTemplate, Brain, ArrowUpRight, Award, Mail, Phone, MapPin } from 'lucide-react';
import './Home.css';

const Home = ({ setActiveTab, gpa, skills, cvData }) => {
  // Map skill icons
  const getSkillIcon = (category) => {
    switch (category) {
      case 'UI/UX & Frontend': return <LayoutTemplate size={20} className="skill-icon-style frontend" />;
      case 'Backend & Infrastructure': return <Database size={20} className="skill-icon-style backend" />;
      case 'Data Science & AI': return <Brain size={20} className="skill-icon-style ai" />;
      case 'Logic & Algorithms': return <Code2 size={20} className="skill-icon-style logic" />;
      default: return <Code2 size={20} className="skill-icon-style" />;
    }
  };

  const sampleProjects = [
    {
      title: "Interactive E-Commerce Interface",
      description: "Platform e-commerce modern dengan fokus pada UI yang mulus, mikro-animasi mewah, dan performa tinggi.",
      tech: ["React.js", "Vite", "Vanilla CSS", "Framer Motion"],
      demo: "#",
      repo: "#",
      category: "UI/UX & Frontend"
    },
    {
      title: "High Performance Real-Time Chat API",
      description: "Backend microservice dengan websocket untuk messaging real-time dengan load-balancing dan basis data terdistribusi.",
      tech: ["Node.js", "Express", "MongoDB", "Socket.io"],
      demo: "#",
      repo: "#",
      category: "Backend & Infrastructure"
    },
    {
      title: "Machine Learning Sentiment Analysis Tool",
      description: "Alat analisis sentimen teks menggunakan pemrosesan bahasa alami (NLP) untuk menganalisis review produk secara otomatis.",
      tech: ["Python", "TensorFlow", "FastAPI", "React"],
      demo: "#",
      repo: "#",
      category: "Data Science & AI"
    }
  ];

  return (
    <div className="home-container tab-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge glass-panel">
          <span className="badge-dot"></span>
          <span>Available for Freelance & Full-time</span>
        </div>
        <h1 className="hero-title">
          Halo, Gw <span className="gradient-text">{cvData.name || 'Developer Name'}</span>
        </h1>
        <p className="hero-subtitle">
          {cvData.title || 'Full Stack Web Developer & UI Specialist'}
        </p>
        <p className="hero-description">
          Membuat produk digital yang berkinerja tinggi, interaktif, dan berestetika premium. 
          Website ini dirancang khusus untuk menganalisis kompetensi teknis gw berdasarkan nilai transkrip rapor akademis.
        </p>
        <div className="hero-actions">
          <button className="glow-btn" onClick={() => setActiveTab('calculator')}>
            Mulai Kalkulasi Rapor
            <ArrowRight size={18} />
          </button>
          <button className="secondary-btn" onClick={() => setActiveTab('cv')}>
            Lihat CV Professional
          </button>
        </div>
      </section>

      {/* GPA & Live Stats Highlight */}
      <section className="stats-section">
        <div className="glass-panel stat-highlight-card">
          <div className="stat-info">
            <Award size={48} className="gpa-icon" />
            <div>
              <h3>Indeks Prestasi Kumulatif (IPK)</h3>
              <p>Diperoleh secara dinamis berdasarkan kalkulator rapor kuliah</p>
            </div>
          </div>
          <div className="gpa-display">
            <span className="gpa-number gradient-text">{gpa.toFixed(2)}</span>
            <span className="gpa-max">/ 4.00</span>
          </div>
        </div>

        <div className="skills-overview-container">
          <h2 className="section-title">Pemetaan Kompetensi Aktif</h2>
          <p className="section-subtitle">Grafik kemampuan dinamis yang dihitung dari bobot nilai mata kuliah di transkrip akademik.</p>
          
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.name} className="glass-panel skill-progress-card">
                <div className="skill-card-header">
                  <div className="skill-title-block">
                    {getSkillIcon(skill.name)}
                    <h4>{skill.name}</h4>
                  </div>
                  <span className="skill-score-percent">{skill.score.toFixed(0)}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className={`progress-bar-fill ${skill.name.toLowerCase().replace(/[^a-z]/g, '')}`} 
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
                <p className="skill-card-desc">
                  Mata kuliah pendukung: {skill.courses.length > 0 ? skill.courses.join(', ') : 'Belum ada input'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="projects-section">
        <h2 className="section-title">Project Unggulan</h2>
        <p className="section-subtitle">Kumpulan karya digital terbaik yang mengintegrasikan seni desain UI dan logika pemrograman.</p>
        
        <div className="grid-container">
          {sampleProjects.map((project) => (
            <div key={project.title} className="glass-panel card project-card">
              <div className="project-category-badge">{project.category}</div>
              <h3 className="card-title">{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.demo} className="project-link">
                  Live Demo <ArrowUpRight size={16} />
                </a>
                <a href={project.repo} className="project-link secondary">
                  Repository
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section glass-panel">
        <div className="contact-grid">
          <div className="contact-info-block">
            <h2 className="contact-title gradient-text">Mari Kolaborasi</h2>
            <p>Tertarik untuk membuat sesuatu yang luar biasa bersama? Hubungi gw melalui kontak berikut atau lihat detail di CV Builder.</p>
            <div className="contact-details">
              <div className="contact-item">
                <Mail size={18} className="contact-icon" />
                <span>{cvData.email || 'developer@example.com'}</span>
              </div>
              <div className="contact-item">
                <Phone size={18} className="contact-icon" />
                <span>{cvData.phone || '+62 812-3456-7890'}</span>
              </div>
              <div className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <span>{cvData.address || 'Jakarta, Indonesia'}</span>
              </div>
            </div>
          </div>
          <div className="contact-interactive-element">
            <div className="glowing-circle-accent"></div>
            <div className="floating-card-mockup glass-panel">
              <span className="mockup-line-number">01</span>
              <span className="mockup-code-text">const dev = new Developer();</span>
              <br />
              <span className="mockup-line-number">02</span>
              <span className="mockup-code-text">dev.connect({'{'} status: 'active' {'}'});</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
