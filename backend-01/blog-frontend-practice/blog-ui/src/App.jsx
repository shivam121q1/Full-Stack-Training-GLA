import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import AuthModal from './components/AuthModal'
import { api } from './services/api'
import BlogGrid from './components/BlogGrid'

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handelOpenModal = () => {
    setOpenModal(true)
  }

  const handelCloseModal = () => {
    setOpenModal(false)
  }


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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    showToast("Logged out successfully", "success");
  };

  console.log("User details", user)

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
  return (
    <>
      <Navbar onOpenAuth={handelOpenModal} user={user} onLogout={handleLogout} />
      {/* condition render */}
      {openModal && <AuthModal
        onClose={handelCloseModal}
        onLoginSuccess={(userData) => setUser(userData)}
        onShowToast={showToast} />}
      <BlogGrid 
        blogs={blogs}
        loading={loading}
        onSelectBlog={(blog) => {
          setSelectedBlog(blog);
          setActiveModal("detail");
        }}
        // onLike={handleLike}
        currentUserId={user?._id}
      />
    </>
  )
}

export default App
