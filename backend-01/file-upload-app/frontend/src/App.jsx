import React, { useState, useEffect } from 'react';
import { Image, Video, Minimize2, HardDrive, Upload, CheckCircle2, Copy, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('imageSizeReduce'); // Default to requested feature
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [name, setName] = useState('');
  const [tags, setTags] = useState('tech,demo');
  const [email, setEmail] = useState('student@example.com');
  const [quality, setQuality] = useState(60);

  const [loading, setLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const API_BASE = "http://localhost:4001/api/v1/upload";

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_BASE}/getAllFiles`);
      const json = await res.json();
      if (json.success) setGallery(json.data);
    } catch (e) {
      console.log("Gallery fetch fallback:", e);
    }
  };

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setName(selected.name);

    if (selected.type.startsWith('image/')) {
      setFilePreview(URL.createObjectURL(selected));
    } else {
      setFilePreview(null);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setLoading(true);
    setUploadResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageFile', file);
    formData.append('videoFile', file);
    formData.append('name', name);
    formData.append('tags', tags);
    formData.append('email', email);
    formData.append('quality', quality);

    // Map active tab to exact backend route in diagram
    const endpointMap = {
      imageUpload: `${API_BASE}/imageUpload`,
      videoUpload: `${API_BASE}/videoUpload`,
      imageSizeReduce: `${API_BASE}/imageSizeReduce`,
      localFileUpload: `${API_BASE}/localFileUpload`
    };

    try {
      const res = await fetch(endpointMap[activeTab], {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setUploadResult(data);
        fetchGallery();
      } else {
        alert('Upload Error: ' + data.message);
      }
    } catch (err) {
      setLoading(false);
      alert('Network / Server Error. Make sure backend node index.js is running on PORT 4000.');
    }
  };

  const copyToClipboard = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="brand">
          <h1>Express + Cloudinary + MongoDB Uploader</h1>
          <p>Implementation of Classroom Architecture Diagram (Sharp Compression + Multer + Cloudinary)</p>
        </div>

        <div className="route-tabs">
          <button 
            className={`tab-btn ${activeTab === 'imageSizeReduce' ? 'active' : ''}`}
            onClick={() => { setActiveTab('imageSizeReduce'); setFile(null); setFilePreview(null); }}
          >
            <Minimize2 size={16} />
            <span>Image Size Reduce</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'imageUpload' ? 'active' : ''}`}
            onClick={() => { setActiveTab('imageUpload'); setFile(null); setFilePreview(null); }}
          >
            <Image size={16} />
            <span>Image Upload</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'videoUpload' ? 'active' : ''}`}
            onClick={() => { setActiveTab('videoUpload'); setFile(null); setFilePreview(null); }}
          >
            <Video size={16} />
            <span>Video Upload</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'localFileUpload' ? 'active' : ''}`}
            onClick={() => { setActiveTab('localFileUpload'); setFile(null); setFilePreview(null); }}
          >
            <HardDrive size={16} />
            <span>Local Upload</span>
          </button>
        </div>
      </header>

      {/* Main Upload Card */}
      <main className="card">
        <form onSubmit={handleUploadSubmit}>
          <label className="dropzone">
            <input 
              type="file" 
              onChange={handleFileSelect} 
              accept={
                activeTab === 'videoUpload' 
                  ? 'video/*' 
                  : 'image/*'
              }
              style={{ display: 'none' }}
            />
            {filePreview ? (
              <img src={filePreview} alt="Preview" style={{ maxHeight: '160px', borderRadius: '10px' }} />
            ) : (
              <>
                <Upload size={40} color="#6366F1" />
                <div>
                  <strong style={{ fontSize: '1rem', color: '#FFF' }}>
                    Click to select {activeTab === 'videoUpload' ? 'a video' : 'an image'}
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '4px' }}>
                    {activeTab === 'imageSizeReduce' ? 'Sharp will automatically compress file size before uploading to Cloudinary' : 'Select file to test backend route'}
                  </p>
                </div>
              </>
            )}
            {file && <span className="badge" style={{ background: '#6366F1', color: '#FFF' }}>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>}
          </label>

          <div className="form-grid">
            <div className="input-group">
              <label>File Title / Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="e.g. My Profile Photo"
                required 
              />
            </div>

            <div className="input-group">
              <label>Tags</label>
              <input 
                type="text" 
                value={tags} 
                onChange={(e) => setTags(e.target.value)} 
                placeholder="e.g. avatar, compressed" 
              />
            </div>

            <div className="input-group">
              <label>Email Notification</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="user@example.com" 
              />
            </div>

            {activeTab === 'imageSizeReduce' && (
              <div className="input-group">
                <label>Compression Quality ({quality}%)</label>
                <input 
                  type="range" 
                  min="20" 
                  max="90" 
                  value={quality} 
                  onChange={(e) => setQuality(e.target.value)} 
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn-upload" disabled={loading}>
            {loading ? 'Uploading & Processing in Express Backend...' : `Upload via Route: /api/v1/upload/${activeTab}`}
          </button>
        </form>

        {/* Upload Result Badge */}
        {uploadResult && (
          <div className="stats-card">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: '#10B981' }}>
                <CheckCircle2 size={18} />
                <span>{uploadResult.message}</span>
              </div>
              {uploadResult.savedPercentage && (
                <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px' }}>
                  Original: <strong>{uploadResult.originalSize}</strong> ➔ Compressed: <strong>{uploadResult.reducedSize}</strong> (Saved <strong>{uploadResult.savedPercentage}</strong>!)
                </div>
              )}
            </div>
            {uploadResult.imageUrl && (
              <button className="badge" style={{ background: '#10B981', color: '#FFF', cursor: 'pointer' }} onClick={() => window.open(uploadResult.imageUrl, '_blank')}>
                View Cloudinary URL
              </button>
            )}
          </div>
        )}
      </main>

      {/* Gallery Section */}
      <section className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Uploaded Files Gallery (MongoDB Records)</h2>
          <span className="badge">{gallery.length} Records</span>
        </div>

        <div className="gallery-grid">
          {gallery.map((item, idx) => (
            <div key={item._id || idx} className="gallery-item">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="preview-media" />
              ) : item.videoUrl ? (
                <video src={item.videoUrl} className="preview-media" controls />
              ) : (
                <div className="preview-media" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
                  📁 Local Server File
                </div>
              )}

              <div className="item-info">
                <strong style={{ fontSize: '0.9rem', color: '#FFF' }}>{item.name}</strong>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge">{item.uploadType || 'cloud'}</span>
                  {item.savedPercentage && (
                    <span className="badge" style={{ background: '#10B981', color: '#FFF' }}>
                      ⚡ -{item.savedPercentage}
                    </span>
                  )}
                </div>

                {(item.imageUrl || item.videoUrl) && (
                  <button 
                    className="btn-upload" 
                    style={{ marginTop: '8px', padding: '6px 10px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    onClick={() => copyToClipboard(item.imageUrl || item.videoUrl, item._id || idx)}
                  >
                    <Copy size={12} />
                    <span>{copiedId === (item._id || idx) ? 'Copied URL!' : 'Copy Cloudinary URL'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
