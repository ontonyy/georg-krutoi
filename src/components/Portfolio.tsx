import { useState, useMemo } from 'react';
import skrepka from '../assets/skrepka.png';
import fingerprint from '../assets/fingerprint.png';

const BASE_URL = import.meta.env.BASE_URL || '/';

const getAssetPath = (path: string) => {
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return BASE_URL + cleanPath;
};

type PortfolioItem = {
    id: number;
    type: 'image' | 'video';
    src: string;
    poster?: string;
};

type Project = {
    id: number;
    title: string;
    description?: string;
    items: PortfolioItem[];
};

const projects: Project[] = [
    {
        id: 1,
        title: "Project Alpha",
        description: "Initial footwear design concepts.",
        items: [
            { id: 1, type: 'image', src: '/images/1.png' },
            { id: 2, type: 'image', src: '/images/2.png' },
            { id: 3, type: 'image', src: '/images/3.png' },
            { id: 4, type: 'image', src: '/images/4.png' },
            { id: 5, type: 'image', src: '/images/5.png' },
        ]
    },
    {
        id: 2,
        title: "Project Beta",
        description: "Advanced synthetic materials and motion studies.",
        items: [
            { id: 6, type: 'image', src: '/images/3.png' },
            { id: 7, type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: '/images/2.png' },
            { id: 8, type: 'image', src: '/images/1.png' },
        ]
    },
    {
        id: 3,
        title: "Project Knight",
        description: "Knight is the hero of our world",
        items: [
            { id: 9, type: 'image', src: '/images/knight_1.jpg' },
            { id: 10, type: 'image', src: '/images/knight_2.jpg' },
            { id: 11, type: 'video', src: '/videos/knight_3.mp4' },
            { id: 12, type: 'image', src: '/images/knight_4.jpg' },
            { id: 13, type: 'video', src: '/videos/knight_5.mp4' },
            { id: 14, type: 'video', src: '/videos/knight_6.MP4' }
        ]
    },
    {
        id: 4,
        title: "Project Lab",
        description: "Lab is the place where is peace",
        items: [
            { id: 15, type: 'video', src: '/videos/lab_1.mp4' },
            { id: 16, type: 'image', src: '/images/lab_2.jpg' },
            { id: 17, type: 'image', src: '/images/lab_3.jpg' },
            { id: 18, type: 'image', src: '/images/lab_4.jpg' },
            { id: 19, type: 'video', src: '/videos/lab_5.MP4' }
        ]
    },
    {
        id: 5,
        title: "Side projects",
        description: "Free time projects that got me interesting",
        items: [
            { id: 20, type: 'video', src: '/videos/valka.mp4' },
            { id: 21, type: 'image', src: '/images/side/castle.jpg' },
            { id: 22, type: 'image', src: '/images/side/nogod.jpg' }
        ]
    }
];

const Portfolio: React.FC = () => {
    const [viewMode, setViewMode] = useState<'project' | 'chaos'>('project');
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

    const allItems = useMemo(() => projects.flatMap(p => p.items), []);
    const chaosItems = useMemo(() => [...allItems].sort(() => Math.random() - 0.5), [allItems]);
    const activeItems = viewMode === 'project' ? projects[currentProjectIndex].items : chaosItems;
    const currentProject = projects[currentProjectIndex];

    const handleSurpriseMe = () => {
        const randomIndex = Math.floor(Math.random() * allItems.length);
        const item = allItems[randomIndex];
        if (viewMode === 'project') {
            const parentProjectIndex = projects.findIndex(p => p.items.some(i => i.id === item.id));
            if (parentProjectIndex !== -1) setCurrentProjectIndex(parentProjectIndex);
        }
        setSelectedItem(item);
    };

    const handleNextProject = () => setCurrentProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    const handlePrevProject = () => setCurrentProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

    const handleNextItem = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedItem) return;
        const currentIndex = activeItems.findIndex(i => i.id === selectedItem.id);
        const nextIndex = currentIndex === activeItems.length - 1 ? 0 : currentIndex + 1;
        setSelectedItem(activeItems[nextIndex]);
    };

    const handlePrevItem = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedItem) return;
        const currentIndex = activeItems.findIndex(i => i.id === selectedItem.id);
        const prevIndex = currentIndex === 0 ? activeItems.length - 1 : currentIndex - 1;
        setSelectedItem(activeItems[prevIndex]);
    };

    const getProjectForItem = (item: PortfolioItem) => projects.find(p => p.items.some(i => i.id === item.id));

    return (
        <section id="portfolio" className="py-5 section-padding position-relative">
            <div className="container py-lg-5">
                <h2 className="display-4 text-center mb-2 text-uppercase tracking-widest fw-bold text-body" style={{ fontSize: 'calc(1.5rem + 1.5vw)' }}>Portfolio</h2>

                <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-4 mb-lg-5 mt-4">
                    <div className="btn-group shadow-sm" role="group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={viewMode === 'project'} onChange={() => setViewMode('project')} />
                        <label className="btn btn-outline-secondary dark-btn-outline" htmlFor="btnradio1">Projects</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={viewMode === 'chaos'} onChange={() => setViewMode('chaos')} />
                        <label className="btn btn-outline-secondary dark-btn-outline" htmlFor="btnradio2">Stream</label>
                    </div>

                    <button onClick={handleSurpriseMe} className="btn btn-outline-primary rounded-pill px-4 shadow-sm hover-scale d-flex align-items-center gap-2">
                        <i className="bi bi-dice-5-fill"></i> Surprise Me!
                    </button>
                </div>

                {viewMode === 'project' && (
                    <div className="d-flex justify-content-between align-items-center mb-4 position-relative animate-fade-in-up px-md-5">
                        <button
                            className="btn btn-outline-secondary dark-btn-outline rounded-circle shadow-sm hover-scale d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ width: '45px', height: '45px' }}
                            onClick={handlePrevProject}
                            aria-label="Previous Project"
                        >
                            <i className="bi bi-chevron-left fs-5"></i>
                        </button>

                        <div className="text-center flex-grow-1 px-3">
                            <h3 className="h5 fw-bold text-body mb-1">{currentProject.title}</h3>
                            {currentProject.description && <p className="mb-0 fst-italic text-body opacity-75 small d-none d-md-block">{currentProject.description}</p>}
                        </div>

                        <button
                            className="btn btn-outline-secondary dark-btn-outline rounded-circle shadow-sm hover-scale d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ width: '45px', height: '45px' }}
                            onClick={handleNextProject}
                            aria-label="Next Project"
                        >
                            <i className="bi bi-chevron-right fs-5"></i>
                        </button>
                    </div>
                )}

                <div className="row justify-content-center g-3 g-md-4 animate-fade-in-up" key={viewMode === 'project' ? currentProject.id : 'chaos'}>
                    {activeItems.map((item) => (
                        <div key={item.id} className="col-12 col-sm-6 col-md-4">
                            <div
                                className="portfolio-item glass rounded-4 overflow-hidden shadow-sm hover-scale cursor-pointer position-relative h-100"
                                onClick={() => setSelectedItem(item)}
                                style={{ minHeight: '200px' }}
                            >
                                {item.type === 'video' ? (
                                    <>
                                        <video
                                            src={getAssetPath(item.src)}
                                            poster={item.poster ? getAssetPath(item.poster) : undefined}
                                            className="img-fluid w-100 h-100 object-fit-cover portfolio-img"
                                            muted loop playsInline
                                            onMouseOver={(e) => e.currentTarget.play()}
                                            onMouseOut={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                                        />
                                        <div className="position-absolute top-50 start-50 translate-middle text-white bg-dark bg-opacity-75 rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ backdropFilter: 'blur(4px)' }}>
                                            <i className="bi bi-play-fill fs-3 m-1"></i>
                                        </div>
                                    </>
                                ) : (
                                    <img
                                        src={getAssetPath(item.src)}
                                        alt={`Portfolio item ${item.id}`}
                                        className="img-fluid w-100 h-100 object-fit-cover portfolio-img"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {viewMode === 'project' && (
                    <div className="d-flex justify-content-center mt-5 gap-2 animate-fade-in-up">
                        {projects.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentProjectIndex(idx)}
                                className={`rounded-circle border-0 ${idx === currentProjectIndex ? 'bg-secondary' : 'bg-secondary bg-opacity-25'}`}
                                style={{ width: '10px', height: '10px', transition: 'all 0.3s' }}
                                aria-label={`Go to project ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedItem && (
                <div
                    className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    onClick={() => setSelectedItem(null)}
                    style={{ zIndex: 1100 }}
                >
                    <div className="modal-content-custom glass rounded-4 p-3 p-md-5 animate-fade-in-up position-relative d-flex flex-column align-items-center" onClick={e => e.stopPropagation()}>
                        <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4 w-100">
                            <h3 className="h6 fw-bold m-0 px-3 py-2 rounded bg-body text-body text-truncate" style={{ maxWidth: '70%' }}>
                                {(() => {
                                    const proj = getProjectForItem(selectedItem);
                                    if (!proj) return "Item";
                                    const index = proj.items.findIndex(i => i.id === selectedItem.id) + 1;
                                    return `${proj.title} — Item ${index}`;
                                })()}
                            </h3>
                            <button onClick={() => setSelectedItem(null)} className="btn btn-link p-0 hover-scale">
                                <img src={skrepka} alt="Close" className="close-icon rounded-3" style={{ height: '35px', width: 'auto' }} />
                            </button>
                        </div>

                        <div className="d-flex align-items-center justify-content-between w-100 mb-3 mb-md-4 gap-2 gap-md-3">
                            <button
                                className="btn btn-outline-light rounded-circle shadow-sm hover-scale d-flex align-items-center justify-content-center flex-shrink-0"
                                style={{ width: '36px', height: '36px' }}
                                onClick={handlePrevItem}
                            >
                                <i className="bi bi-chevron-left"></i>
                            </button>

                            <div className="flex-grow-1 text-center bg-black rounded-3 overflow-hidden d-flex justify-content-center align-items-center" style={{ minHeight: '200px', maxHeight: '60vh' }}>
                                {selectedItem.type === 'video' ? (
                                    <video src={getAssetPath(selectedItem.src)} controls autoPlay className="img-fluid w-100" style={{ maxHeight: '60vh' }} key={selectedItem.id} />
                                ) : (
                                    <img src={getAssetPath(selectedItem.src)} alt="Expanded" className="img-fluid object-contain" style={{ maxHeight: '60vh' }} />
                                )}
                            </div>

                            <button
                                className="btn btn-outline-light rounded-circle shadow-sm hover-scale d-flex align-items-center justify-content-center flex-shrink-0"
                                style={{ width: '36px', height: '36px' }}
                                onClick={handleNextItem}
                            >
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </div>

                        <div className="w-100 overflow-auto mb-3 mb-md-4 custom-scrollbar">
                            <div className="d-flex gap-2 justify-content-center px-2 py-1" style={{ minWidth: 'min-content' }}>
                                {activeItems.map(item => (
                                    <div
                                        key={item.id}
                                        className={`flex-shrink-0 cursor-pointer rounded overflow-hidden border ${selectedItem.id === item.id ? 'border-primary border-2 opacity-100' : 'border-secondary border-opacity-50 opacity-50'}`}
                                        style={{ width: '60px', height: '45px' }}
                                        onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                                    >
                                        {item.type === 'video' ? (
                                            <div className="w-100 h-100 bg-dark d-flex align-items-center justify-content-center">
                                                <i className="bi bi-play-fill text-white small"></i>
                                            </div>
                                        ) : (
                                            <img src={getAssetPath(item.src)} className="w-100 h-100 object-fit-cover" alt="thumb" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="btn btn-link p-0 hover-opacity" onClick={() => setSelectedItem(null)}>
                            <img src={fingerprint} alt="Close" className="rounded-3" style={{ height: '50px', width: 'auto' }} />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
