import React, { useState, useEffect } from "react";
import { X, PenSquare, Image, Tag, FileText } from "lucide-react";
import { api } from "../services/api";

const PRESET_CATEGORIES = [
  "Technology",
  "Web Development",
  "JavaScript",
  "AI & ML",
  "Design",
  "Career",
  "Tutorials",
  "General",
];

export default function CreateBlogModal({
  initialBlog,
  onClose,
  onSaveSuccess,
  onShowToast,
}) {
  const isEditing = Boolean(initialBlog);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialBlog) {
      setTitle(initialBlog.title || "");
      setCategory(initialBlog.category || "Technology");
      setImage(initialBlog.image || "");
      setContent(initialBlog.content || "");
    }
  }, [initialBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category.trim()) {
      onShowToast("Please fill in all required fields", "error");
      return;
    }

    setLoading(true);

    try {
      const blogData = {
        title: title.trim(),
        category: category.trim(),
        image: image.trim(),
        content,
      };

      let res;
      if (isEditing) {
        res = await api.updateBlog(initialBlog._id, blogData);
      } else {
        res = await api.createBlog(blogData);
      }

      if (res.success) {
        onShowToast(
          isEditing ? "Blog updated successfully!" : "Blog published successfully!",
          "success"
        );
        onSaveSuccess();
        onClose();
      } else {
        onShowToast(res.message || "Failed to save blog post", "error");
      }
    } catch (err) {
      console.error(err);
      onShowToast("An error occurred while saving blog post", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "700px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <h2
          style={{
            fontSize: "1.6rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <PenSquare size={22} color="var(--primary-violet)" />
          <span>{isEditing ? "Edit Article" : "Create New Article"}</span>
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Article Title */}
          <div className="form-group">
            <label className="form-label">Article Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 10 Essential Clean Code Principles Every Developer Should Know"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category & Image URL */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {PRESET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Cover Image URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://images.unsplash.com/..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          {/* Image Preview */}
          {image && (
            <div style={{ marginBottom: "1.25rem" }}>
              <label className="form-label">Image Preview</label>
              <img
                src={image}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "180px",
                  objectFit: "cover",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--glass-border)",
                }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          {/* Article Content */}
          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label className="form-label">Article Body Content *</label>
            <textarea
              className="form-textarea"
              rows="10"
              placeholder="Write your article content here..."
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Article"
                : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
