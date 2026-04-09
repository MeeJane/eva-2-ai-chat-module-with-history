import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
    return (
        <div style={{ minHeight: "100vh" }}>

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="hero text-center">

                <h1 className="hero-title">
                    Smart Baby Care with AI 👶
                </h1>

                <p className="hero-text">
                    Get instant help, product suggestions, and safe baby care advice.
                </p>

                <Link to="/chat" className="hero-btn mt-3">
                    Start Chat Now
                </Link>

            </div>

            {/* Features */}
            <div className="features-section">

                <div className="features-grid">

                    <div className="feature-card card1">
                        <div className="feature-icon">🤖</div>
                        <h5>AI Assistance</h5>
                        <p>Smart suggestions for baby products</p>
                    </div>

                    <div className="feature-card card2">
                        <div className="feature-icon">💬</div>
                        <h5>Instant Chat</h5>
                        <p>Ask anything anytime</p>
                    </div>





                    <div className="feature-card card3">
                        <div className="feature-icon">🛡</div>
                        <h5>Safe Advice</h5>
                        <p>Trusted baby care recommendations</p>
                    </div>

                </div>

            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default Home;