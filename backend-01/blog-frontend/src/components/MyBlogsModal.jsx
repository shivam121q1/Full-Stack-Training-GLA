import React, { useState, useEffect } from "react";
import { X, Edit3, Trash2, BookOpen, Plus } from "lucide-react";
import { api } from "../services/api";

export default function MyBlogsModal({
  onClose,
  onEditBlog,
  onOpenCreate,
  onShowToast,
}) {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.getMyBlogs();
      if (res.success) {
        setMyBlogs(res.blogs || []);
      }
    } catch (err) {
      console.error(err);
      onShowToast("Failed to load your articles", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await api.deleteBlog(blogId);
      if (res.success) {
        setMyBlogs(myBlogs.filter((b) => b._id !== blogId));
        onShowToast("Article deleted successfully", "success");
      } else {
        onShowToast(res.message || "Failed to delete article", "error");
      }
    } catch (err) {
      onShowToast("An error occurred while deleting article", "error");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "750px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <BookOpen size={22} color="var(--primary-violet)" />
            <span>My Authored Articles ({myBlogs.length})</span>
          </h2>

          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onOpenCreate();
            }}
          >
            <Plus size={16} />
            <span>New Article</span>
          </button>
        </div>

        {loading ? (
          <p style={{ color: "var(--text-muted)" }}>Loading your articles...</p>
        ) : myBlogs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
              You haven't published any articles yet.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onOpenCreate();
              }}
            >
              Write Your First Article
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              maxHeight: "60vh",
              overflowY: "auto",
              paddingRight: "0.5rem",
            }}
          >
            {myBlogs.map((blog) => (
              <div
                key={blog._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem 1.2rem",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "var(--radius-md)",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    className="category-badge"
                    style={{ position: "static", fontSize: "0.7rem" }}
                  >
                    {blog.category}
                  </span>
                  <h4
                    style={{
                      fontSize: "1.05rem",
                      marginTop: "0.4rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {blog.title}
                  </h4>
                  <span className="post-date">
                    Published: {new Date(blog.createdAt).toLocaleDateString()} •{" "}
                    {blog.likes?.length || 0} Likes
                  </span>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="btn btn-secondary btn-icon"
                    onClick={() => {
                      onClose();
                      onEditBlog(blog);
                    }}
                    title="Edit article"
                  >
                    <Edit3 size={16} />
                  </button>

                  <button
                    className="btn btn-danger btn-icon"
                    onClick={() => handleDelete(blog._id)}
                    title="Delete article"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
