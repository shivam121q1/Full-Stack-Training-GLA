import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import BlogGrid from "./components/BlogGrid";
import BlogDetailModal from "./components/BlogDetailModal";
import AuthModal from "./components/AuthModal";
import CreateBlogModal from "./components/CreateBlogModal";
import MyBlogsModal from "./components/MyBlogsModal";
import Toast from "./components/Toast";
import { api } from "./services/api";
import { Sparkles } from "lucide-react";

export default function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Modals
  const [activeModal, setActiveModal] = useState(null); // 'auth' | 'create' | 'myBlogs' | 'detail'
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  // Notification Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Check Auth on Mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Fetch Blogs when search or category changes
  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, activeCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.getBlogs({
        search: searchTerm,
        category: activeCategory,
      });
      if (res.success) {
        setBlogs(res.blogs || []);
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch articles from backend", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (blogId) => {
    if (!user) {
      showToast("Please sign in to like articles", "error");
      setActiveModal("auth");
      return;
    }

    try {
      const res = await api.toggleLikeBlog(blogId);
      if (res.success) {
        setBlogs(
          blogs.map((b) => {
            if (b._id === blogId) {
              const likes = b.likes || [];
              const updatedLikes = res.isLiked
                ? [...likes, user._id]
                : likes.filter((id) => id !== user._id);
              return { ...b, likes: updatedLikes };
            }
            return b;
          })
        );

        if (selectedBlog && selectedBlog._id === blogId) {
          const likes = selectedBlog.likes || [];
          const updatedLikes = res.isLiked
            ? [...likes, user._id]
            : likes.filter((id) => id !== user._id);
          setSelectedBlog({ ...selectedBlog, likes: updatedLikes });
        }
      } else {
        showToast(res.message || "Failed to update like", "error");
      }
    } catch (err) {
      showToast("Error updating like status", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    showToast("Logged out successfully", "success");
  };

  // console.log("User details",details)
  return (
    <div className="app-root">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        user={user}
        onOpenAuth={() => setActiveModal("auth")}
        onOpenCreate={() => {
          setEditingBlog(null);
          setActiveModal("create");
        }}
        onOpenMyBlogs={() => setActiveModal("myBlogs")}
        onLogout={handleLogout}
      />

      <main className="app-container">
        {/* Hero Section */}
        <section className="hero-banner">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.9rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(139, 92, 246, 0.15)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "var(--primary-violet)",
              fontSize: "0.85rem",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            <Sparkles size={15} />
            <span>Discover Knowledge & Engineering Stories</span>
          </div>
          <h1 className="hero-title">Insights for Modern Developers</h1>
          <p className="hero-subtitle">
            Explore articles, tutorials, and deep dives written by authors across
            technology, design, and software engineering.
          </p>
        </section>

        {/* Category Pills */}
        <CategoryBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Blog Cards Grid */}
        <BlogGrid
          blogs={blogs}
          loading={loading}
          onSelectBlog={(blog) => {
            setSelectedBlog(blog);
            setActiveModal("detail");
          }}
          onLike={handleLike}
          currentUserId={user?._id}
        />
      </main>

      {/* Modals */}
      {activeModal === "auth" && (
        <AuthModal
          onClose={() => setActiveModal(null)}
          onLoginSuccess={(userData) => setUser(userData)}
          onShowToast={showToast}
        />
      )}

      {activeModal === "create" && (
        <CreateBlogModal
          initialBlog={editingBlog}
          onClose={() => {
            setActiveModal(null);
            setEditingBlog(null);
          }}
          onSaveSuccess={fetchBlogs}
          onShowToast={showToast}
        />
      )}

      {activeModal === "myBlogs" && (
        <MyBlogsModal
          onClose={() => setActiveModal(null)}
          onEditBlog={(blog) => {
            setEditingBlog(blog);
            setActiveModal("create");
          }}
          onOpenCreate={() => {
            setEditingBlog(null);
            setActiveModal("create");
          }}
          onShowToast={showToast}
        />
      )}

      {activeModal === "detail" && selectedBlog && (
        <BlogDetailModal
          blog={selectedBlog}
          onClose={() => {
            setActiveModal(null);
            setSelectedBlog(null);
          }}
          onLike={handleLike}
          currentUser={user}
          onShowToast={showToast}
        />
      )}

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
