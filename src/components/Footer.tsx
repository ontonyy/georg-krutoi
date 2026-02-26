import logo from '../assets/logo.png';

const Footer: React.FC = () => {
    return (
        <footer id="footer" className="footer-bg py-5 border-top border-secondary border-opacity-25 text-white">
            <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">

                <div className="mb-4 mb-md-0 text-center text-md-start">
                    <a href="mailto:geralichten@gmail.com" className="fs-5 fw-medium tracking-wide text-decoration-none text-light hover-opacity">
                        geralichten@gmail.com
                    </a>
                </div>

                <div className="d-flex gap-4">
                    <a
                        href="https://www.facebook.com/profile.php?id=100009394815945"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light text-decoration-none fs-2 hover-scale d-inline-block"
                    >
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a
                        href="https://www.instagram.com/l1chten/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light text-decoration-none fs-2 hover-scale d-inline-block"
                    >
                        <i className="bi bi-instagram"></i>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/georg-lichtenberg-164372252/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light text-decoration-none fs-2 hover-scale d-inline-block"
                    >
                        <i className="bi bi-linkedin"></i>
                    </a>
                </div>

                <div className="d-none d-md-block" style={{ width: '200px' }}></div>
            </div>
            <div className="text-center mt-5 text-secondary small d-flex align-items-center justify-content-center gap-2">
                <img src={logo} alt="Lichtenberg" style={{ height: '24px', width: 'auto', opacity: 0.6 }} />
                <span>&copy; {new Date().getFullYear()} Georg Lichtenberg. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
