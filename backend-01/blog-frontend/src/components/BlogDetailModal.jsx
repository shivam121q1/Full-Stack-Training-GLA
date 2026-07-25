import React, { useState, useEffect } from "react";
import { X, Heart, MessageSquare, Send, Trash2, Calendar, User } from "lucide-react";
import { api } from "../services/api";

export default function BlogDetailModal({
  blog,
  onClose,
  onLike,
  currentUser,
  onShowToast,
}) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (blog?._id) {
      fetchComments();
    }
  }, [blog]);

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await api.getComments(blog._id);
      if (res.success) {
        setComments(res.comments || []);
      }
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      onShowToast("Please sign in to comment on articles", "error");
      return;
    }

    if (!commentText.trim()) return;

    try {
      setSubmittingComment(true);
      const res = await api.addComment(blog._id, commentText);
      if (res.success) {
        setCommentText("");
        setComments([res.comment, ...comments]);
        onShowToast("Comment added successfully!", "success");
      } else {
        onShowToast(res.message || "Failed to post comment", "error");
      }
    } catch (err) {
      onShowToast("An error occurred while posting comment", "error");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await api.deleteComment(commentId);
      if (res.success) {
        setComments(comments.filter((c) => c._id !== commentId));
        onShowToast("Comment deleted", "success");
      } else {
        onShowToast(res.message || "Failed to delete comment", "error");
      }
    } catch (err) {
      onShowToast("Failed to delete comment", "error");
    }
  };

  const isLiked = blog.likes?.includes(currentUser?._id);
  const likesCount = blog.likes?.length || 0;

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "800px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Cover Image */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            style={{
              width: "100%",
              maxHeight: "360px",
              objectFit: "cover",
              borderRadius: "var(--radius-md)",
              marginBottom: "1.5rem",
            }}
          />
        )}

        {/* Category & Title */}
        <div style={{ marginBottom: "1rem" }}>
          <span className="category-badge" style={{ position: "static" }}>
            {blog.category || "General"}
          </span>
          <h1
            style={{
              fontSize: "2rem",
              marginTop: "0.8rem",
              marginBottom: "1rem",
              lineHeight: 1.3,
            }}
          >
            {blog.title}
          </h1>
        </div>

        {/* Author Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 0",
            borderTop: "1px solid var(--glass-border)",
            borderBottom: "1px solid var(--glass-border)",
            marginBottom: "2rem",
          }}
        >
          <div className="author-info">
            {blog.author?.avatar ? (
              <img
                src={blog.author.avatar}
                alt={blog.author.fullName}
                className="avatar-img"
                style={{ width: "44px", height: "44px" }}
              />
            ) : (
              <div
                className="avatar-fallback"
                style={{ width: "44px", height: "44px", fontSize: "1.1rem" }}
              >
                {blog.author?.fullName
                  ? blog.author.fullName.charAt(0).toUpperCase()
                  : "A"}
              </div>
            )}
            <div>
              <div className="author-name" style={{ fontSize: "1rem" }}>
                {blog.author?.fullName || "Anonymous Author"}
              </div>
              <div className="post-date">{formattedDate}</div>
            </div>
          </div>

          <button
            className={`like-btn ${isLiked ? "liked" : ""}`}
            style={{ padding: "0.5rem 1.2rem", fontSize: "0.95rem" }}
            onClick={() => onLike(blog._id)}
          >
            <Heart size={18} fill={isLiked ? "#ec4899" : "none"} />
            <span>{likesCount} Likes</span>
          </button>
        </div>

        {/* Article Body Content */}
        <div
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "var(--text-primary)",
            marginBottom: "3rem",
            whiteSpace: "pre-line",
          }}
        >
          {blog.content}
        </div>

        {/* Comments Section */}
        <div
          style={{
            borderTop: "1px solid var(--glass-border)",
            paddingTop: "2rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <MessageSquare size={20} color="var(--primary-violet)" />
            <span>Discussion ({comments.length})</span>
          </h3>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} style={{ marginBottom: "2rem" }}>
            <div className="form-group">
              <textarea
                className="form-textarea"
                rows="3"
                placeholder={
                  currentUser
                    ? "Add to the discussion..."
                    : "Please sign in to write a comment."
                }
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!currentUser || submittingComment}
              />
            </div>

            {currentUser && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submittingComment || !commentText.trim()}
                >
                  <Send size={16} />
                  <span>{submittingComment ? "Posting..." : "Post Comment"}</span>
                </button>
              </div>
            )}
          </form>

          {/* Comments List */}
          <div className="comments-list">
            {loadingComments ? (
              <p style={{ color: "var(--text-muted)" }}>Loading comments...</p>
            ) : comments.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>
                No comments yet. Be the first to start the conversation!
              </p>
            ) : (
              comments.map((comment) => {
                const canDelete =
                  currentUser &&
                  (comment.user?._id === currentUser._id ||
                    blog.author?._id === currentUser._id ||
                    currentUser.role === "Admin");

                return (
                  <div key={comment._id} className="comment-item">
                    {comment.user?.avatar ? (
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.fullName}
                        className="avatar-img"
                      />
                    ) : (
                      <div className="avatar-fallback">
                        {comment.user?.fullName
                          ? comment.user.fullName.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                    )}

                    <div className="comment-content">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="comment-author">
                          {comment.user?.fullName || "User"}
                        </div>
                        {canDelete && (
                          <button
                            className="btn btn-danger btn-icon"
                            style={{ padding: "0.25rem" }}
                            onClick={() => handleDeleteComment(comment._id)}
                            title="Delete comment"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <p className="comment-text">{comment.content}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
