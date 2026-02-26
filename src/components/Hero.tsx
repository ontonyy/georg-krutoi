import React from 'react';
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
                <div className="mb-4">
                    <h2 className="brand-text m-0 animate-float" style={{ fontSize: '1.8rem', opacity: 0.8, letterSpacing: '0.4em' }}>Lichtenberg</h2>
                </div>

                <h1 className="display-1 fw-bold mb-3 text-white tracking-tight">Georg Lichtenberg</h1>
                <p className="fs-3 fw-light mb-5 text-white opacity-75" style={{ animationDelay: '0.2s', letterSpacing: '0.1em' }}>Game designer.</p>

                <div className="d-flex justify-content-center mb-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <img
                        src={mugshot}
                        alt="Georg Lichtenberg"
                        className="img-fluid hover-scale hero-image shadow-lg"
                        style={{ maxWidth: '250px' }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
