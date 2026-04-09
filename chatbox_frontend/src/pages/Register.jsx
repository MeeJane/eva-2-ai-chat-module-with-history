import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";


function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("register/", form);

            setMessage("Registration successful ✅");
            setError("");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (err) {
            setError("Registration failed ❌");
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
                <h5 className="auth-subtitle">Register</h5>

                {message && <p className="auth-success">{message}</p>}
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
                        Register
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>

            </div>

        </div>
    );
}

export default Register;