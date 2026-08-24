import React, { useState } from 'react';
import { Printer, Save, Plus, Trash2, Mail, Phone, MapPin, Globe, Award, Briefcase, Code } from 'lucide-react';
import './CvBuilder.css';

const CvBuilder = ({ cvData, setCvData, gpa, skills }) => {
  // Experience list local helper
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpDuration, setNewExpDuration] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');

  // Project list local helper
  const [newProjName, setNewProjName] = useState('');
  const [newProjRole, setNewProjRole] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');

  const handleInputChange = (field, val) => {
    setCvData({
      ...cvData,
      [field]: val
    });
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    if (!newExpCompany.trim() || !newExpRole.trim()) return;
    const newExp = {
      id: Date.now(),
      company: newExpCompany,
      role: newExpRole,
      duration: newExpDuration,
      desc: newExpDesc
    };
    setCvData({
      ...cvData,
      experiences: [...cvData.experiences, newExp]
    });
    setNewExpCompany('');
    setNewExpRole('');
    setNewExpDuration('');
    setNewExpDesc('');
  };

  const handleDeleteExperience = (id) => {
    setCvData({
      ...cvData,
      experiences: cvData.experiences.filter(exp => exp.id !== id)
    });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjName.trim()) return;
    const newProj = {
      id: Date.now(),
      name: newProjName,
      role: newProjRole,
      desc: newProjDesc
    };
    setCvData({
      ...cvData,
      projects: [...cvData.projects, newProj]
    });
    setNewProjName('');
    setNewProjRole('');
    setNewProjDesc('');
  };

  const handleDeleteProject = (id) => {
    setCvData({
      ...cvData,
      projects: cvData.projects.filter(proj => proj.id !== id)
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cv-container tab-content">
      {/* Editor Panel - Hides on Print */}
      <div className="cv-editor glass-panel no-print">
        <div className="editor-header">
          <h2>Data CV Professional</h2>
          <button className="glow-btn print-btn" onClick={handlePrint}>
            <Printer size={16} /> Cetak CV / PDF
          </button>
        </div>
        <p className="card-header-desc">Isi informasi diri Anda di bawah. Preview CV A4 di kanan akan terupdate otomatis.</p>

        {/* Profile Info */}
        <div className="editor-section">
          <h3>Profil Diri</h3>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input 
              type="text" 
              value={cvData.name} 
              onChange={(e) => handleInputChange('name', e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Title Pekerjaan / Role</label>
            <input 
              type="text" 
              value={cvData.title} 
              onChange={(e) => handleInputChange('title', e.target.value)} 
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={cvData.email} 
                onChange={(e) => handleInputChange('email', e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Telepon</label>
              <input 
                type="text" 
                value={cvData.phone} 
                onChange={(e) => handleInputChange('phone', e.target.value)} 
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Alamat / Kota</label>
              <input 
                type="text" 
                value={cvData.address} 
                onChange={(e) => handleInputChange('address', e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Website / Portofolio</label>
              <input 
                type="text" 
                value={cvData.website} 
                onChange={(e) => handleInputChange('website', e.target.value)} 
              />
            </div>
          </div>
          <div className="form-group">
            <label>Ringkasan Profil (Summary)</label>
            <textarea 
              rows="3" 
              value={cvData.summary} 
              onChange={(e) => handleInputChange('summary', e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Education Info */}
        <div className="editor-section">
          <h3>Pendidikan</h3>
          <div className="form-group">
            <label>Nama Kampus / Universitas</label>
            <input 
              type="text" 
              value={cvData.university || ''} 
              onChange={(e) => handleInputChange('university', e.target.value)} 
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Jurusan / Program Studi</label>
              <input 
                type="text" 
                value={cvData.major || ''} 
                onChange={(e) => handleInputChange('major', e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Tahun Pendidikan (cth: 2023 - Sekarang)</label>
              <input 
                type="text" 
                value={cvData.educationDuration || ''} 
                onChange={(e) => handleInputChange('educationDuration', e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="editor-section">
          <h3>Riwayat Pengalaman</h3>
          
          <form onSubmit={handleAddExperience} className="nested-form glass-panel">
            <div className="form-row">
              <div className="form-group">
                <label>Perusahaan / Organisasi</label>
                <input 
                  type="text" 
                  value={newExpCompany} 
                  onChange={(e) => setNewExpCompany(e.target.value)} 
                  placeholder="cth: PT Maju Mundur"
                />
              </div>
              <div className="form-group">
                <label>Posisi / Role</label>
                <input 
                  type="text" 
                  value={newExpRole} 
                  onChange={(e) => setNewExpRole(e.target.value)} 
                  placeholder="cth: Frontend Developer Intern"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Durasi (Waktu)</label>
              <input 
                type="text" 
                value={newExpDuration} 
                onChange={(e) => setNewExpDuration(e.target.value)} 
                placeholder="cth: Jan 2025 - Jun 2025"
              />
            </div>
            <div className="form-group">
              <label>Deskripsi Tugas</label>
              <textarea 
                rows="2" 
                value={newExpDesc} 
                onChange={(e) => setNewExpDesc(e.target.value)} 
                placeholder="cth: Mengembangkan sistem UI e-commerce..."
              ></textarea>
            </div>
            <button type="submit" className="secondary-btn add-nested-btn">
              <Plus size={14} /> Tambah Pengalaman
            </button>
          </form>

          <div className="nested-items-list">
            {cvData.experiences.map((exp) => (
              <div key={exp.id} className="nested-item-row">
                <div>
                  <strong>{exp.role}</strong> di <span>{exp.company}</span>
                  <span className="nested-item-time"> ({exp.duration})</span>
                </div>
                <button onClick={() => handleDeleteExperience(exp.id)} className="delete-nested-btn">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="editor-section">
          <h3>Proyek Mandiri</h3>
          
          <form onSubmit={handleAddProject} className="nested-form glass-panel">
            <div className="form-row">
              <div className="form-group">
                <label>Nama Proyek</label>
                <input 
                  type="text" 
                  value={newProjName} 
                  onChange={(e) => setNewProjName(e.target.value)} 
                  placeholder="cth: Portfolio Website"
                />
              </div>
              <div className="form-group">
                <label>Teknologi / Peran</label>
                <input 
                  type="text" 
                  value={newProjRole} 
                  onChange={(e) => setNewProjRole(e.target.value)} 
                  placeholder="cth: React, CSS Modules"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Deskripsi Singkat</label>
              <textarea 
                rows="2" 
                value={newProjDesc} 
                onChange={(e) => setNewProjDesc(e.target.value)} 
                placeholder="cth: Membangun website portofolio interaktif..."
              ></textarea>
            </div>
            <button type="submit" className="secondary-btn add-nested-btn">
              <Plus size={14} /> Tambah Proyek
            </button>
          </form>

          <div className="nested-items-list">
            {cvData.projects.map((proj) => (
              <div key={proj.id} className="nested-item-row">
                <div>
                  <strong>{proj.name}</strong> - <span>{proj.role}</span>
                </div>
                <button onClick={() => handleDeleteProject(proj.id)} className="delete-nested-btn">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CV Preview Panel (A4 layout in browser, full page on print) */}
      <div className="cv-preview-container">
        <div className="cv-layout-a4">
          
          {/* Top Header Block */}
          <div className="cv-header">
            <h1 className="cv-name">{cvData.name || 'NAMA LENGKAP'}</h1>
            <h2 className="cv-title-role">{cvData.title || 'Job Title / Role'}</h2>
          </div>

          <div className="cv-body-grid">
            
            {/* Left Column (Contacts, Education, Skills) */}
            <div className="cv-column-left">
              
              <div className="cv-block">
                <h3 className="cv-block-title">KONTAK</h3>
                <div className="cv-contact-list">
                  {cvData.email && (
                    <div className="cv-contact-item">
                      <Mail size={12} className="cv-icon" />
                      <span>{cvData.email}</span>
                    </div>
                  )}
                  {cvData.phone && (
                    <div className="cv-contact-item">
                      <Phone size={12} className="cv-icon" />
                      <span>{cvData.phone}</span>
                    </div>
                  )}
                  {cvData.address && (
                    <div className="cv-contact-item">
                      <MapPin size={12} className="cv-icon" />
                      <span>{cvData.address}</span>
                    </div>
                  )}
                  {cvData.website && (
                    <div className="cv-contact-item">
                      <Globe size={12} className="cv-icon" />
                      <span>{cvData.website}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="cv-block">
                <h3 className="cv-block-title">PENDIDIKAN</h3>
                <div className="cv-education-item">
                  <h4 className="cv-sub-title">{cvData.major || 'Program Studi'}</h4>
                  <p className="cv-institution">{cvData.university || 'Nama Universitas'}</p>
                  <p className="cv-timeline">{cvData.educationDuration || 'Tahun Pendidikan'}</p>
                  
                  {/* GPA Live value */}
                  <div className="cv-gpa-badge">
                    <Award size={12} className="cv-icon" />
                    <strong>IPK: {gpa.toFixed(2)}</strong> (Bobot Transkrip)
                  </div>
                </div>
              </div>

              <div className="cv-block">
                <h3 className="cv-block-title">KEAHLIAN TEKNIS</h3>
                <p className="cv-block-subtitle">Dihitung otomatis dari nilai transkrip</p>
                <div className="cv-skills-list">
                  {skills.map((skill) => (
                    <div key={skill.name} className="cv-skill-item">
                      <div className="cv-skill-header">
                        <span>{skill.name.split(' & ')[0]}</span>
                        <strong>{skill.score.toFixed(0)}%</strong>
                      </div>
                      <div className="cv-skill-bar-bg">
                        <div className="cv-skill-bar-fill" style={{ width: `${skill.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (Summary, Work, Projects) */}
            <div className="cv-column-right">
              
              {cvData.summary && (
                <div className="cv-block">
                  <h3 className="cv-block-title">TENTANG SAYA</h3>
                  <p className="cv-summary-text">{cvData.summary}</p>
                </div>
              )}

              <div className="cv-block">
                <h3 className="cv-block-title">PENGALAMAN KERJA / ORGANISASI</h3>
                {cvData.experiences.length === 0 ? (
                  <p className="cv-empty-text">Belum ada riwayat pengalaman.</p>
                ) : (
                  <div className="cv-timeline-list">
                    {cvData.experiences.map((exp) => (
                      <div key={exp.id} className="cv-timeline-item">
                        <div className="cv-item-header">
                          <h4 className="cv-sub-title">{exp.role}</h4>
                          <span className="cv-item-time">{exp.duration}</span>
                        </div>
                        <p className="cv-item-company">{exp.company}</p>
                        {exp.desc && <p className="cv-item-desc">{exp.desc}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="cv-block">
                <h3 className="cv-block-title">PROYEK PORTFOLIO</h3>
                {cvData.projects.length === 0 ? (
                  <p className="cv-empty-text">Belum ada riwayat proyek.</p>
                ) : (
                  <div className="cv-timeline-list">
                    {cvData.projects.map((proj) => (
                      <div key={proj.id} className="cv-timeline-item">
                        <div className="cv-item-header">
                          <h4 className="cv-sub-title">{proj.name}</h4>
                          {proj.role && <span className="cv-project-tech">{proj.role}</span>}
                        </div>
                        {proj.desc && <p className="cv-item-desc">{proj.desc}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CvBuilder;
