import { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <nav className={`navbar navbar-expand-lg fixed-top transition-all ${scrolled ? 'glass-nav py-2' : 'bg-transparent py-4'}`}>
            <div className="container d-flex justify-content-between align-items-center">
                <a href="#" className="navbar-brand d-flex align-items-center">
                    <span className="brand-text mt-1" style={{ fontSize: '1.5rem' }}>Lichtenberg</span>
                </a>
                <div className="d-none d-md-flex gap-4 align-items-center">
                    <a href="#home" className="nav-link text-reset hover-opacity">Home</a>
                    <a href="#lore" className="nav-link text-reset hover-opacity">Lore</a>
                    <a href="#portfolio" className="nav-link text-reset hover-opacity">Portfolio</a>
                    <a href="#playground" className="nav-link text-reset hover-opacity">Playground</a>
                    <a href="#notes" className="nav-link text-reset hover-opacity">Notes</a>
                    <a href="#contact" className="nav-link text-reset hover-opacity">Contact</a>
                    <button onClick={toggleTheme} className="btn btn-link text-reset px-2 py-1 theme-toggle text-decoration-none hover-opacity">
                        {theme === 'dark' ? <i className="bi bi-moon-stars-fill fs-5"></i> : <i className="bi bi-sun-fill fs-5"></i>}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
