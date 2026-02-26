import { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [theme]);

    const toggleTheme = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <nav className={`navbar navbar-expand-lg fixed-top transition-all ${scrolled || isMenuOpen ? 'glass-nav py-2 shadow-sm' : 'bg-transparent py-4'}`}>
            <div className="container">
                <a href="#" className="navbar-brand d-flex align-items-center">
                    <span className="brand-text mt-1" style={{ fontSize: '1.5rem' }}>Lichtenberg</span>
                </a>

                <div className="d-flex align-items-center gap-2 d-lg-none">
                    <button onClick={toggleTheme} className="btn btn-link text-reset px-2 py-1 theme-toggle text-decoration-none hover-opacity">
                        {theme === 'dark' ? <i className="bi bi-moon-stars-fill fs-5"></i> : <i className="bi bi-sun-fill fs-5"></i>}
                    </button>
                    <button
                        className="navbar-toggler border-0 p-2 shadow-none"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                    >
                        <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-2 text-body`}></i>
                    </button>
                </div>

                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                    <div className="navbar-nav ms-auto gap-lg-4 align-items-center py-3 py-lg-0">
                        <a href="#home" className="nav-link text-reset hover-opacity" onClick={() => setIsMenuOpen(false)}>Home</a>
                        <a href="#lore" className="nav-link text-reset hover-opacity" onClick={() => setIsMenuOpen(false)}>Lore</a>
                        <a href="#portfolio" className="nav-link text-reset hover-opacity" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
                        <a href="#playground" className="nav-link text-reset hover-opacity" onClick={() => setIsMenuOpen(false)}>Playground</a>
                        <a href="#notes" className="nav-link text-reset hover-opacity" onClick={() => setIsMenuOpen(false)}>Notes</a>
                        <a href="#contact" className="nav-link text-reset hover-opacity" onClick={() => setIsMenuOpen(false)}>Contact</a>
                        <button onClick={toggleTheme} className="btn btn-link text-reset px-2 py-1 theme-toggle text-decoration-none hover-opacity d-none d-lg-block">
                            {theme === 'dark' ? <i className="bi bi-moon-stars-fill fs-5"></i> : <i className="bi bi-sun-fill fs-5"></i>}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
