import React, { useState } from "react";
import { X, LogIn, UserPlus, Mail, Lock, User, Image } from "lucide-react";
import { api } from "../services/api";


export default function AuthModal({ onClose, onLoginSuccess, onShowToast }) {
    const [isLoginTab, setIsLoginTab] = useState(true);
    const [loading, setLoading] = useState(false);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Author");
    const [avatar, setAvatar] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLoginTab) {
                const res = await api.login({ email, password });
                if (res.success) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("user", JSON.stringify(res.user));
                    onLoginSuccess(res.user);
                    onShowToast("Logged in successfully!", "success");
                    onClose();
                } else {
                    onShowToast(res.message || "Invalid credentials", "error");
                }
            } else {
                const res = await api.register({
                    fullName,
                    email,
                    password,
                    role,
                    avatar,
                });
                if (res.success) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("user", JSON.stringify(res.user));
                    onLoginSuccess(res.user);
                    onShowToast("Account created successfully!", "success");
                    onClose();
                } else {
                    onShowToast(res.message || "Registration failed", "error");
                }
            }
        } catch (err) {
            console.error(err);
            onShowToast("An error occurred. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={18} />
                </button>

                {/* Tab Headers */}
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                        borderBottom: "1px solid var(--glass-border)",
                        paddingBottom: "1rem",
                    }}
                >
                    <button
                        className={`btn ${isLoginTab ? "btn-primary" : "btn-secondary"}`}
                        style={{ flex: 1 }}
                        onClick={() => setIsLoginTab(true)}
                    >
                        <LogIn size={16} />
                        <span>Sign In</span>
                    </button>

                    <button
                        className={`btn ${!isLoginTab ? "btn-primary" : "btn-secondary"}`}
                        style={{ flex: 1 }}
                        onClick={() => setIsLoginTab(false)}
                    >
                        <UserPlus size={16} />
                        <span>Create Account</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLoginTab && (
                        <>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <div style={{ position: "relative" }}>
                                    <User
                                        size={18}
                                        className="search-icon"
                                        style={{ left: "0.9rem" }}
                                    />
                                    <input
                                        type="text"
                                        className="form-input"
                                        style={{ paddingLeft: "2.6rem" }}
                                        placeholder="John Doe"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Role</label>
                                <select
                                    className="form-select"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="Author">Author (Create & Manage Articles)</option>
                                    <option value="Reader">Reader (Read & Comment)</option>
                                    <option value="Admin">Admin (Full Control)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Avatar Image URL (Optional)</label>
                                <div style={{ position: "relative" }}>
                                    <Image
                                        size={18}
                                        className="search-icon"
                                        style={{ left: "0.9rem" }}
                                    />
                                    <input
                                        type="url"
                                        className="form-input"
                                        style={{ paddingLeft: "2.6rem" }}
                                        placeholder="https://example.com/avatar.jpg"
                                        value={avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div style={{ position: "relative" }}>
                            <Mail
                                size={18}
                                className="search-icon"
                                style={{ left: "0.9rem" }}
                            />
                            <input
                                type="email"
                                className="form-input"
                                style={{ paddingLeft: "2.6rem" }}
                                placeholder="name@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: "2rem" }}>
                        <label className="form-label">Password</label>
                        <div style={{ position: "relative" }}>
                            <Lock
                                size={18}
                                className="search-icon"
                                style={{ left: "0.9rem" }}
                            />
                            <input
                                type="password"
                                className="form-input"
                                style={{ paddingLeft: "2.6rem" }}
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "100%", padding: "0.8rem" }}
                        disabled={loading}
                    >
                        {loading
                            ? "Processing..."
                            : isLoginTab
                                ? "Sign In to Your Account"
                                : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
}
