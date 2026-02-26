import bgImage from '../assets/background.png';
import mugshot from '../assets/mugshot.png';

const Hero: React.FC = () => {
    return (
        <section id="home" className="position-relative vh-100 d-flex align-items-center justify-content-center overflow-hidden">
            <div
                className="position-absolute top-0 start-0 w-100 h-100 hero-bg"
                style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25 hero-overlay" style={{ zIndex: 1 }} />

            <div className="position-relative text-center mt-5 hero-content animate-fade-in-up" style={{ zIndex: 2 }}>
                <h1 className="display-1 fw-bold mb-3 text-white">Georg Lichtenberg</h1>
                <p className="fs-3 fw-light mb-5 text-white opacity-75" style={{ animationDelay: '0.2s' }}>Game designer.</p>

                <div className="d-flex justify-content-center mb-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <img
                        src={mugshot}
                        alt="Georg Lichtenberg"
                        className="img-fluid hover-scale hero-image shadow-lg"
                        style={{ maxWidth: '250px' }}
                    />
                </div>

                <p className="fs-4 fw-medium text-white opacity-75 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>2026</p>
            </div>
        </section>
    );
};

export default Hero;
