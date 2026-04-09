import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar-custom">
            <h4 className="brand-title">TinyCare AI 👶</h4>

            <div className="nav-links">
                <Link to="/login" className="btn btn-outline-primary">Login</Link>
                <Link to="/register" className="btn btn-outline-primary">Register</Link>
                <Link to="/chat" className="btn btn-primary">Chat</Link>
            </div>
        </nav>
    );
}

export default Navbar;