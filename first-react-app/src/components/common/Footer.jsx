import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <h3>Product Page</h3>
                <p>Your one-stop destination for quality products.</p>

                <ul className="footer-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Products</a></li>
                    <li><a href="/">Contact Us</a></li>
                    <li><a href="/">About</a></li>
                </ul>

                <hr />

                <p className="copyright">
                    © {new Date().getFullYear()} Product Page. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;