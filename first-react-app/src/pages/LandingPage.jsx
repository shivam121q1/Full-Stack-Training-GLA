import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Discover Amazing Products</h1>
                    <p>
                        Shop the latest trends with unbeatable prices and premium quality.
                        Find everything you need in one place.
                    </p>

                    <div className="hero-buttons">
                        <button className="primary-btn">Shop Now</button>
                        <button className="secondary-btn">Explore</button>
                    </div>
                </div>

                <div className="hero-image">
                    <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
                        alt="Products"
                    />
                </div>
            </section>

            {/* Features */}
            <section className="features">
                <h2>Why Choose Us?</h2>

                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>Fast Delivery</h3>
                        <p>Get your products delivered within 24-48 hours.</p>
                    </div>

                    <div className="feature-card">
                        <h3>Best Quality</h3>
                        <p>Premium quality products sourced from trusted brands.</p>
                    </div>

                    <div className="feature-card">
                        <h3>Secure Payments</h3>
                        <p>100% secure transactions with multiple payment options.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta">
                <h2>Ready to Start Shopping?</h2>
                <p>Join thousands of happy customers today.</p>

                <button className="primary-btn">Browse Products</button>
            </section>
        </div>
    );
};

export default LandingPage;