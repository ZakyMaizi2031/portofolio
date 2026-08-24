import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, BarChart2, BookOpen, Pencil, Check, X } from 'lucide-react';
import './GradeCalculator.css';

const SKILL_CATEGORIES = [
  { key: 'UI/UX & Frontend', label: 'UI/UX & Frontend', color: '#00f2fe' },
  { key: 'Backend & Infrastructure', label: 'Backend & Infrastructure', color: '#4facfe' },
  { key: 'Data Science & AI', label: 'Data Science & AI', color: '#a18cd1' },
  { key: 'Logic & Algorithms', label: 'Logic & Algorithms', color: '#fbc2eb' },
];

const GradeCalculator = ({
  semesters, setSemesters,
  skillPercentages, setSkillPercentages,
  gpa, skills
}) => {

  // --- Draft state for adding new semester ---
  const [draftNumber, setDraftNumber] = useState('');
  const [draftIps, setDraftIps] = useState('');
  const [draftSks, setDraftSks] = useState('');

  // --- Edit state ---
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleAddSemester = () => {
    const num = draftNumber.trim();
    const ips = parseFloat(draftIps);
    const sks = parseInt(draftSks);

    if (!num) { alert('Masukkan nomor semester.'); return; }
    if (isNaN(ips) || ips < 0 || ips > 4) { alert('IPS harus antara 0.00 – 4.00.'); return; }
    if (isNaN(sks) || sks <= 0) { alert('Total SKS harus diisi.'); return; }

    const existing = semesters.find(s => s.number === num);
    if (existing) { alert(`Semester ${num} sudah ada. Edit data yang sudah ada.`); return; }

    const newSem = { id: Date.now(), number: num, ips: ips.toFixed(2), totalSks: sks };
    const sorted = [...semesters, newSem].sort((a, b) => parseInt(a.number) - parseInt(b.number));
    setSemesters(sorted);
    setDraftNumber('');
    setDraftIps('');
    setDraftSks('');
  };

  const handleDeleteSemester = (id) => {
    setSemesters(semesters.filter(s => s.id !== id));
  };

  const handleStartEdit = (sem) => {
    setEditingId(sem.id);
    setEditData({ number: sem.number, ips: sem.ips, totalSks: sem.totalSks });
  };

  const handleSaveEdit = (id) => {
    const ips = parseFloat(editData.ips);
    const sks = parseInt(editData.totalSks);
    if (isNaN(ips) || ips < 0 || ips > 4) { alert('IPS harus antara 0.00 – 4.00.'); return; }
    if (isNaN(sks) || sks <= 0) { alert('Total SKS tidak valid.'); return; }
    const updated = semesters.map(s =>
      s.id === id ? { ...s, ips: ips.toFixed(2), totalSks: sks } : s
    );
    setSemesters(updated);
    setEditingId(null);
  };

  const handleCancelEdit = () => { setEditingId(null); setEditData({}); };

  const handleSkillChange = (key, value) => {
    const clamped = Math.min(100, Math.max(0, parseInt(value) || 0));
    setSkillPercentages(prev => ({ ...prev, [key]: clamped }));
  };

  const handleReset = () => {
    if (window.confirm('Hapus semua data rapor semester?')) setSemesters([]);
  };

  return (
    <div className="calculator-container tab-content">
      <div className="calculator-grid">

        {/* ===== LEFT PANEL: Semester IPS Input ===== */}
        <div className="calculator-card-section glass-panel">
          <div className="card-header-block">
            <BookOpen size={24} className="header-icon" />
            <h2>Rapor IP Semester</h2>
          </div>
          <p className="card-header-desc">
            Masukkan IP (Indeks Prestasi) dan total SKS untuk setiap semester. IPK akan dihitung otomatis.
          </p>

          {/* Add form */}
          <div className="semester-input-form">
            <div className="semester-input-row">
              <div className="form-group">
                <label>Semester ke-</label>
                <input
                  type="number"
                  min="1" max="8"
                  placeholder="cth: 1"
                  value={draftNumber}
                  onChange={(e) => setDraftNumber(e.target.value)}
                  className="sem-input"
                />
              </div>
              <div className="form-group">
                <label>IPS</label>
                <input
                  type="number"
                  min="0" max="4" step="0.01"
                  placeholder="cth: 3.75"
                  value={draftIps}
                  onChange={(e) => setDraftIps(e.target.value)}
                  className="sem-input"
                />
              </div>
              <div className="form-group">
                <label>Total SKS</label>
                <input
                  type="number"
                  min="1"
                  placeholder="cth: 22"
                  value={draftSks}
                  onChange={(e) => setDraftSks(e.target.value)}
                  className="sem-input"
                />
              </div>
            </div>
            <button onClick={handleAddSemester} className="glow-btn add-btn">
              <Plus size={16} /> Tambah Semester
            </button>
          </div>

          {/* Semesters list */}
          <div className="courses-table-container">
            <div className="table-header">
              <span>Data Semester ({semesters.length})</span>
              {semesters.length > 0 && (
                <button onClick={handleReset} className="reset-btn-link">
                  <Trash2 size={14} /> Hapus Semua
                </button>
              )}
            </div>

            {semesters.length === 0 ? (
              <div className="empty-state">
                <p>Belum ada data semester. Tambahkan data IP semester Anda.</p>
              </div>
            ) : (
              <div className="courses-list">
                {semesters.map((sem) => (
                  editingId === sem.id ? (
                    // EDIT MODE
                    <div key={sem.id} className="semester-record-row editing">
                      <div className="edit-fields">
                        <div className="edit-selects">
                          <div className="form-group">
                            <label>IPS</label>
                            <input
                              type="number" min="0" max="4" step="0.01"
                              className="edit-input"
                              value={editData.ips}
                              onChange={(e) => setEditData(p => ({ ...p, ips: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label>Total SKS</label>
                            <input
                              type="number" min="1"
                              className="edit-input"
                              value={editData.totalSks}
                              onChange={(e) => setEditData(p => ({ ...p, totalSks: e.target.value }))}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="edit-actions">
                        <button onClick={() => handleSaveEdit(sem.id)} className="edit-save-btn" title="Simpan">
                          <Check size={16} />
                        </button>
                        <button onClick={handleCancelEdit} className="edit-cancel-btn" title="Batal">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // VIEW MODE
                    <div key={sem.id} className="semester-record-row">
                      <div className="semester-record-info">
                        <span className="sem-number-badge">Semester {sem.number}</span>
                        <div className="semester-record-meta">
                          <span className="meta-badge sks">{sem.totalSks} SKS</span>
                        </div>
                      </div>
                      <div className="semester-record-right">
                        <span className="sem-ips-large">{parseFloat(sem.ips).toFixed(2)}</span>
                        <div className="course-grade-actions">
                          <button onClick={() => handleStartEdit(sem)} className="edit-course-btn" title="Edit">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => handleDeleteSemester(sem.id)} className="delete-course-btn" title="Hapus">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ===== RIGHT PANEL: IPK + Skill Sliders ===== */}
        <div className="calculator-visuals-section">

          {/* IPK Card */}
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
               semesters.length === 0 ? 'Belum ada data semester.' :
               'Status Akademik: Perlu Peningkatan'}
            </div>
          </div>

          {/* Skill Percentages Card */}
          <div className="glass-panel radar-chart-card">
            <div className="card-header-block">
              <BarChart2 size={22} className="header-icon" />
              <h3>Kompetensi Keahlian</h3>
            </div>
            <p className="card-header-desc">Atur persentase keahlian Anda secara manual untuk setiap bidang.</p>

            <div className="skill-sliders-list">
              {SKILL_CATEGORIES.map((cat) => {
                const val = skillPercentages[cat.key] ?? 0;
                return (
                  <div key={cat.key} className="skill-slider-item">
                    <div className="skill-slider-header">
                      <div className="skill-score-info">
                        <span className="skill-dot" style={{ backgroundColor: cat.color }}></span>
                        <span className="skill-score-name">{cat.label}</span>
                      </div>
                      <div className="skill-pct-input-wrap">
                        <input
                          type="number"
                          min="0" max="100"
                          value={val}
                          onChange={(e) => handleSkillChange(cat.key, e.target.value)}
                          className="skill-pct-input"
                        />
                        <span className="skill-pct-unit">%</span>
                      </div>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${val}%`, backgroundColor: cat.color }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0" max="100"
                      value={val}
                      onChange={(e) => handleSkillChange(cat.key, e.target.value)}
                      className="skill-slider"
                      style={{ '--slider-color': cat.color }}
                    />
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
