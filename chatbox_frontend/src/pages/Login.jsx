import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";


function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("login/", form);
            setError("");
            navigate("/chat");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-home">
                <Link to="/" className="home-btn">
                    ← Home
                </Link>
            </div>

            <div className="auth-card">

                <h3 className="auth-title">TinyCare AI 👶</h3>
                <h5 className="auth-subtitle">Login</h5>

                {error && <p className="auth-error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="auth-input"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="auth-input"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="auth-btn">
                        Login
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>

            </div>

        </div>
    );
}

export default Login;