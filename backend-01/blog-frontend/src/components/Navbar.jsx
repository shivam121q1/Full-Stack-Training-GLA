import React from "react";
import { Search, PenSquare, LogIn, User, BookOpen, LogOut } from "lucide-react";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  user,
  onOpenAuth,
  onOpenCreate,
  onOpenMyBlogs,
  onLogout,
}) {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo" onClick={() => setSearchTerm("")}>
          <div className="logo-icon">
            <BookOpen size={22} color="#fff" />
          </div>
          <span className="logo-text">DEVBLOGS</span>
        </div>

        <div className="nav-search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search articles by title, content, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              {(user.role === "Author" || user.role === "Admin") && (
                <>
                  <button className="btn btn-primary" onClick={onOpenCreate}>
                    <PenSquare size={16} />
                    <span>Write</span>
                  </button>

                  <button className="btn btn-secondary" onClick={onOpenMyBlogs}>
                    <BookOpen size={16} />
                    <span>My Posts</span>
                  </button>
                </>
              )}

              <div className="author-info" style={{ marginLeft: "0.5rem" }}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="avatar-img"
                  />
                ) : (
                  <div className="avatar-fallback">
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <div>
                  <div className="author-name">{user.fullName}</div>
                  <span className={`role-badge ${user.role?.toLowerCase()}`}>
                    {user.role}
                  </span>
                </div>
              </div>

              <button
                className="btn btn-secondary btn-icon"
                onClick={onLogout}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={onOpenAuth}>
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
