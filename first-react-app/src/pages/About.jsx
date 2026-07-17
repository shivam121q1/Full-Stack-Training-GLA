import "./About.css";

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>
          We are passionate about bringing high-quality products to customers at
          affordable prices. Our goal is to make online shopping simple, secure,
          and enjoyable.
        </p>
      </section>

      {/* Story */}
      <section className="about-section">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Founded with a vision to simplify online shopping, our platform
            connects customers with a wide range of premium products across
            multiple categories. We believe in quality, affordability, and
            exceptional customer service.
          </p>

          <p>
            Every product is carefully selected to ensure that our customers
            receive the best value for their money. From fashion to electronics,
            we strive to meet every shopping need.
          </p>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700"
            alt="About Us"
          />
        </div>
      </section>

      {/* Statistics */}
      <section className="stats">
        <div className="stat-card">
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat-card">
          <h2>500+</h2>
          <p>Products</p>
        </div>

        <div className="stat-card">
          <h2>50+</h2>
          <p>Trusted Brands</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Customer Support</p>
        </div>
      </section>

      {/* Mission */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          To deliver an exceptional online shopping experience by providing
          quality products, competitive prices, secure payments, and fast
          delivery while putting customer satisfaction at the heart of
          everything we do.
        </p>
      </section>
    </div>
  );
};

export default About;