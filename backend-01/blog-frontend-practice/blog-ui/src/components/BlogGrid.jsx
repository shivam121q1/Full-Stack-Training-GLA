import React from "react";
import BlogCard from "./BlogCard";
import { BookOpen } from "lucide-react";

export default function BlogGrid({
    blogs,
    loading,
    onSelectBlog,
    onLike,
    currentUserId,
}) {
    if (loading) {
        return (
            <div className="blog-grid">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div
                        key={n}
                        className="blog-card"
                        style={{ height: "380px", opacity: 0.5 }}
                    >
                        <div
                            className="blog-card-img-wrapper"
                            style={{ background: "rgba(255,255,255,0.05)" }}
                        />
                        <div className="blog-card-body" style={{ gap: "1rem" }}>
                            <div
                                style={{
                                    height: "24px",
                                    background: "rgba(255,255,255,0.1)",
                                    borderRadius: "4px",
                                    width: "80%",
                                }}
                            />
                            <div
                                style={{
                                    height: "16px",
                                    background: "rgba(255,255,255,0.06)",
                                    borderRadius: "4px",
                                    width: "100%",
                                }}
                            />
                            <div
                                style={{
                                    height: "16px",
                                    background: "rgba(255,255,255,0.06)",
                                    borderRadius: "4px",
                                    width: "60%",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "4rem 1rem",
                    background: "var(--bg-card)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--glass-border)",
                }}
            >
                <BookOpen
                    size={48}
                    color="var(--text-muted)"
                    style={{ marginBottom: "1rem" }}
                />
                <h3 style={{ marginBottom: "0.5rem" }}>No Articles Found</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                    Try selecting a different category or refining your search term.
                </p>
            </div>
        );
    }

    return (
        <div className="blog-grid">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog._id}
                    blog={blog}
                    onClick={() => onSelectBlog(blog)}
                    onLike={onLike}
                    currentUserId={currentUserId}
                />
            ))}
        </div>
    );
}
