import React, { useState } from 'react';
import { Plus, Trash2, RefreshCw, BarChart2, Star, Sparkles, BookOpen } from 'lucide-react';
import './GradeCalculator.css';

const GradeCalculator = ({ courses, setCourses, gpa, skills }) => {
  const [activeSemester, setActiveSemester] = useState('1');
  const [draftCourses, setDraftCourses] = useState([
    { tempId: Date.now(), name: '', sks: 3, grade: 'A', category: 'UI/UX & Frontend' }
  ]);

  const gradeValues = {
    'A': 4.00, 'A-': 3.75, 'B+': 3.50, 'B': 3.00, 'B-': 2.75,
    'C+': 2.50, 'C': 2.00, 'D': 1.00, 'E': 0.00
  };

  const handleAddDraftRow = () => {
    setDraftCourses([...draftCourses, { tempId: Date.now(), name: '', sks: 3, grade: 'A', category: 'UI/UX & Frontend' }]);
  };

  const handleDraftChange = (id, field, value) => {
    setDraftCourses(draftCourses.map(c => c.tempId === id ? { ...c, [field]: value } : c));
  };

  const handleRemoveDraftRow = (id) => {
    if (draftCourses.length > 1) {
      setDraftCourses(draftCourses.filter(c => c.tempId !== id));
    }
  };

  const handleSaveSemester = () => {
    const validCourses = draftCourses.filter(c => c.name.trim() !== '');
    if (validCourses.length === 0) {
      alert("Harap isi nama mata kuliah sebelum menyimpan.");
      return;
    }

    const newCourses = validCourses.map((c, index) => ({
      id: Date.now() + index,
      name: c.name.trim(),
      sks: parseInt(c.sks),
      grade: c.grade,
      category: c.category,
      semester: activeSemester
    }));

    setCourses([...courses, ...newCourses]);
    setDraftCourses([{ tempId: Date.now(), name: '', sks: 3, grade: 'A', category: 'UI/UX & Frontend' }]);
    
    const nextSem = parseInt(activeSemester) + 1;
    if (nextSem <= 8) {
      setActiveSemester(nextSem.toString());
    }
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua mata kuliah yang tersimpan?')) {
      setCourses([]);
    }
  };

  // Group courses by semester
  const coursesBySemester = courses.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {});

  const sortedSemesters = Object.keys(coursesBySemester).sort((a, b) => parseInt(a) - parseInt(b));

  // Radar Chart coordinates calculation
  // Center is (150, 150), Max radius is 100
  const maxRadius = 100;
  const cx = 150;
  const cy = 150;

  // Axis lines
  // North (UI/UX & Frontend), East (Backend), South (Data & AI), West (Logic & Algos)
  const getCoordinates = (index, value) => {
    const percent = value / 100;
    const r = percent * maxRadius;
    if (index === 0) return { x: cx, y: cy - r };         // UI/UX (North)
    if (index === 1) return { x: cx + r, y: cy };         // Backend (East)
    if (index === 2) return { x: cx, y: cy + r };         // Data & AI (South)
    if (index === 3) return { x: cx - r, y: cy };         // Logic & Algos (West)
    return { x: cx, y: cy };
  };

  // Get points for polygon path
  const p0 = getCoordinates(0, skills[0]?.score || 0);
  const p1 = getCoordinates(1, skills[1]?.score || 0);
  const p2 = getCoordinates(2, skills[2]?.score || 0);
  const p3 = getCoordinates(3, skills[3]?.score || 0);

  const polygonPath = `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;

  return (
    <div className="calculator-container tab-content">
      <div className="calculator-grid">
        
        {/* Left Panel: Inputs and List */}
        <div className="calculator-card-section glass-panel">
          <div className="card-header-block">
            <BookOpen size={24} className="header-icon" />
            <h2>Daftar Nilai Rapor Kuliah</h2>
          </div>
          
          <p className="card-header-desc">
            Masukkan mata kuliah Anda. Sistem akan memetakan bobot nilainya secara otomatis ke diagram radar kompetensi.
          </p>

          <div className="semester-selector-block">
            <label className="semester-label">Pilih Semester Aktif: </label>
            <select className="semester-select" value={activeSemester} onChange={(e) => setActiveSemester(e.target.value)}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          <div className="add-course-form batch-form">
            {draftCourses.map((draft, idx) => (
              <div key={draft.tempId} className="draft-row">
                <div className="draft-row-header">
                  <span className="draft-number">Mata Kuliah #{idx + 1}</span>
                  {draftCourses.length > 1 && (
                    <button type="button" onClick={() => handleRemoveDraftRow(draft.tempId)} className="remove-draft-btn">
                      <Trash2 size={14} /> Hapus
                    </button>
                  )}
                </div>
                <div className="form-group row-name">
                  <input 
                    type="text" 
                    placeholder="Nama Mata Kuliah (Kosongkan jika tak perlu)" 
                    value={draft.name}
                    onChange={(e) => handleDraftChange(draft.tempId, 'name', e.target.value)}
                  />
                </div>
                <div className="form-row-three">
                  <div className="form-group">
                    <label>SKS</label>
                    <select value={draft.sks} onChange={(e) => handleDraftChange(draft.tempId, 'sks', e.target.value)}>
                      {[1, 2, 3, 4, 5, 6].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Nilai</label>
                    <select value={draft.grade} onChange={(e) => handleDraftChange(draft.tempId, 'grade', e.target.value)}>
                      {Object.keys(gradeValues).map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Kategori</label>
                    <select value={draft.category} onChange={(e) => handleDraftChange(draft.tempId, 'category', e.target.value)}>
                      <option value="UI/UX & Frontend">UI/UX & FE</option>
                      <option value="Backend & Infrastructure">Backend</option>
                      <option value="Data Science & AI">Data & AI</option>
                      <option value="Logic & Algorithms">Logic</option>
                      <option value="Lainnya / Umum">Lainnya / Umum</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="batch-actions">
              <button type="button" onClick={handleAddDraftRow} className="outline-btn add-row-btn">
                <Plus size={16} /> Tambah Baris
              </button>
              <button type="button" onClick={handleSaveSemester} className="glow-btn save-semester-btn">
                Simpan Rapor Semester {activeSemester}
              </button>
            </div>
          </div>

          <div className="courses-table-container">
            <div className="table-header">
              <span>Mata Kuliah ({courses.length})</span>
              <button onClick={handleReset} className="reset-btn-link" title="Kosongkan transkrip nilai">
                <Trash2 size={14} /> Kosongkan Rapor
              </button>
            </div>
            {courses.length === 0 ? (
              <div className="empty-state">
                <p>Belum ada mata kuliah yang diinput.</p>
              </div>
            ) : (
              <div className="courses-list">
                {sortedSemesters.map(semester => {
                  const semCourses = coursesBySemester[semester];
                  let totalPoints = 0;
                  let totalSks = 0;
                  semCourses.forEach(c => {
                    const gradeVal = gradeValues[c.grade] ?? 0.0;
                    totalPoints += gradeVal * c.sks;
                    totalSks += c.sks;
                  });
                  const ips = totalSks > 0 ? (totalPoints / totalSks) : 0.0;

                  return (
                    <div key={semester} className="semester-group">
                      <div className="semester-title-wrapper">
                        <h3 className="semester-title">Semester {semester}</h3>
                        <span className="semester-ips">IPS: {ips.toFixed(2)}</span>
                      </div>
                      {semCourses.map((course) => (
                        <div key={course.id} className="course-item-row">
                          <div className="course-info">
                            <span className="course-title">{course.name}</span>
                            <div className="course-meta">
                              <span className="meta-badge category">{course.category}</span>
                              <span className="meta-badge sks">{course.sks} SKS</span>
                            </div>
                          </div>
                          <div className="course-grade-actions">
                            <span className={`grade-badge ${course.grade.charAt(0)}`}>{course.grade}</span>
                            <button 
                              onClick={() => handleDeleteCourse(course.id)} 
                              className="delete-course-btn"
                              title="Hapus"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: GPA and Skill Visualization */}
        <div className="calculator-visuals-section">
          
          {/* IPK Dashboard Card */}
          <div className="glass-panel summary-gpa-card">
            <div className="summary-gpa-header">
              <div>
                <Sparkles size={20} className="visual-sparkle-icon" />
                <h3>Indeks Prestasi Kumulatif</h3>
              </div>
              <span className="badge-academic">Status Akademik</span>
            </div>
            <div className="summary-gpa-val">
              <span className="val-large gradient-text">{gpa.toFixed(2)}</span>
              <span className="val-max">/ 4.00</span>
            </div>
            <div className="gpa-description-text">
              {gpa >= 3.51 ? 'Predikat Kelulusan: Dengan Pujian (Cum Laude) 🌟' : 
               gpa >= 3.00 ? 'Predikat Kelulusan: Sangat Memuaskan 👍' : 
               gpa >= 2.00 ? 'Predikat Kelulusan: Memuaskan' : 
               'Status Akademik: Perlu Peningkatan'}
            </div>
          </div>

          {/* Radar Chart Card */}
          <div className="glass-panel radar-chart-card">
            <div className="card-header-block">
              <BarChart2 size={22} className="header-icon" />
              <h3>Diagram Radar Kompetensi</h3>
            </div>
            <p className="card-header-desc">Analisis kecenderungan keahlian teknis berdasarkan rata-rata bobot mata kuliah.</p>
            
            <div className="radar-visualization-container">
              <svg width="300" height="300" className="radar-svg">
                {/* Background Concentric Grid Lines (0%, 25%, 50%, 75%, 100%) */}
                {[25, 50, 75, 100].map((radiusPercent) => {
                  const r = (radiusPercent / 100) * maxRadius;
                  return (
                    <polygon 
                      key={radiusPercent}
                      points={`150,${150-r} ${150+r},150 150,${150+r} 150-${r},150`}
                      className="radar-grid-line"
                    />
                  );
                })}
                
                {/* Axis lines */}
                <line x1="150" y1="50" x2="150" y2="250" className="radar-axis-line" />
                <line x1="50" y1="150" x2="250" y2="150" className="radar-axis-line" />

                {/* Plot Area Polygon with glow */}
                {courses.length > 0 && (
                  <>
                    <polygon 
                      points={polygonPath}
                      className="radar-polygon-glow"
                    />
                    <polygon 
                      points={polygonPath}
                      className="radar-polygon"
                    />
                  </>
                )}

                {/* Markers / Dots at Vertices */}
                {courses.length > 0 && [p0, p1, p2, p3].map((p, idx) => (
                  <circle key={idx} cx={p.x} cy={p.y} r="5" className={`radar-vertex-dot dot-${idx}`} />
                ))}

                {/* Axis Labels */}
                <text x="150" y="32" textAnchor="middle" className="axis-label top">UI/UX & FE</text>
                <text x="260" y="154" textAnchor="start" className="axis-label right">Backend</text>
                <text x="150" y="278" textAnchor="middle" className="axis-label bottom">Data & AI</text>
                <text x="40" y="154" textAnchor="end" className="axis-label left">Algorithms</text>
              </svg>
            </div>

            {/* List detailing each Category average */}
            <div className="skills-score-list">
              {skills.map((skill, index) => {
                const colors = ['#00f2fe', '#4facfe', '#a18cd1', '#fbc2eb'];
                return (
                  <div key={skill.name} className="skill-score-row">
                    <div className="skill-score-info">
                      <span className="skill-dot" style={{ backgroundColor: colors[index] }}></span>
                      <span className="skill-score-name">{skill.name}</span>
                    </div>
                    <div className="skill-score-val">
                      <span className="val-text">{skill.score.toFixed(0)}%</span>
                      <span className="val-desc">(Rata-rata IPK: {skill.gpaAverage.toFixed(2)})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default GradeCalculator;
