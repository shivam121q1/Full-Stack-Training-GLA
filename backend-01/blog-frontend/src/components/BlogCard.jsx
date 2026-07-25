import React from "react";
import { Heart, Clock, MessageSquare } from "lucide-react";

const DEFAULT_BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
];

export default function BlogCard({ blog, onClick, onLike, currentUserId }) {
  const isLiked = blog.likes?.includes(currentUserId);
  const likesCount = blog.likes?.length || 0;

  const fallbackImg =
    DEFAULT_BLOG_IMAGES[
      Math.abs(blog._id?.charCodeAt(blog._id.length - 1) || 0) %
        DEFAULT_BLOG_IMAGES.length
    ];

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  // Calculate estimated reading time
  const wordCount = blog.content ? blog.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="blog-card" onClick={onClick}>
      <div className="blog-card-img-wrapper">
        <img
          src={blog.image || fallbackImg}
          alt={blog.title}
          className="blog-card-img"
          onError={(e) => {
            e.target.src = fallbackImg;
          }}
        />
        <span className="category-badge">{blog.category || "General"}</span>
      </div>

      <div className="blog-card-body">
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-excerpt">
          {blog.content?.replace(/<[^>]*>?/gm, "").substring(0, 140)}...
        </p>

        <div className="blog-card-footer">
          <div className="author-info">
            {blog.author?.avatar ? (
              <img
                src={blog.author.avatar}
                alt={blog.author.fullName}
                className="avatar-img"
              />
            ) : (
              <div className="avatar-fallback">
                {blog.author?.fullName
                  ? blog.author.fullName.charAt(0).toUpperCase()
                  : "A"}
              </div>
            )}
            <div>
              <div className="author-name">
                {blog.author?.fullName || "Anonymous Author"}
              </div>
              <div
                className="post-date"
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <span>{formattedDate}</span>
                <span>•</span>
                <Clock size={12} />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>

          <button
            className={`like-btn ${isLiked ? "liked" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onLike(blog._id);
            }}
          >
            <Heart size={14} fill={isLiked ? "#ec4899" : "none"} />
            <span>{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
