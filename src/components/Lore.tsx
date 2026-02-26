import React from 'react';

type Skill = {
    name: string;
    level: number; // 0 to 100
};

type InventoryItem = {
    name: string;
    iconClass: string;
    description: string;
};

const skills: Skill[] = [
    { name: "3D Modeling", level: 90 },
    { name: "Game Design", level: 80 },
    { name: "Level Design", level: 75 },
    { name: "UX/UI Flow", level: 60 },
    { name: "C# / Scripting", level: 55 },
];

const inventory: InventoryItem[] = [
    { name: "Unity Engine", iconClass: "bi-unity", description: "Primary development environment" }, // Using a generic icon if unity isn't in bootstrap-icons, we'll try to use relevant ones
    { name: "Unreal Engine", iconClass: "bi-controller", description: "Secondary environment" },
    { name: "Blender", iconClass: "bi-box", description: "3D Modeling and Animation" },
    { name: "Photoshop", iconClass: "bi-palette", description: "Texture and 2D asset creation" },
    { name: "Figma", iconClass: "bi-bezier", description: "UI Mockups and prototyping" },
    { name: "Git", iconClass: "bi-git", description: "Version control" },
];

interface LoreProps {
    onOpenSecret?: () => void;
}

const Lore: React.FC<LoreProps> = ({ onOpenSecret }) => {
    return (
        <section id="lore" className="py-5 section-padding position-relative">
            <div className="container py-5">
                <h2 className="display-4 text-center mb-5 text-uppercase tracking-widest fw-bold text-body animate-fade-in-up">Character Sheet</h2>

                <div className="row g-5">
                    {/* Bio / Backstory */}
                    <div className="col-lg-12 mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="glass rounded-4 p-4 p-md-5 shadow-sm">
                            <h3 className="h4 fw-bold mb-4 text-body border-bottom border-secondary border-opacity-25 pb-3">
                                <i className="bi bi-book me-2"></i>Lore / Backstory
                            </h3>
                            <div className="fs-5 fw-light text-body opacity-75 lh-base">
                                <p>
                                    Every great game is built on a foundation of solid mechanics and compelling narrative. My journey started not just by playing games, but by breaking them down to understand what made them tick.
                                </p>
                                <p>
                                    I specialize in bridging the gap between raw functionality and the player's emotional experience. Whether it's designing intricate level layouts, fine-tuning core combat loops, or prototyping entirely new mechanics, I approach development as a puzzle waiting to be solved.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Skill Tree */}
                    <div className="col-lg-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="glass rounded-4 p-4 p-md-5 shadow-sm h-100">
                            <h3 className="h4 fw-bold mb-4 text-body border-bottom border-secondary border-opacity-25 pb-3">
                                <i className="bi bi-diagram-3 me-2"></i>Skill Tree
                            </h3>

                            <div className="d-flex flex-column gap-4 mt-4">
                                {skills.map((skill, index) => (
                                    <div key={index}>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="fw-medium text-body">{skill.name}</span>
                                            <span className="text-body opacity-50 small">Lvl {Math.floor(skill.level / 10)}</span>
                                        </div>
                                        <div className="progress bg-body bg-opacity-10" style={{ height: '8px' }}>
                                            <div
                                                className="progress-bar bg-primary"
                                                role="progressbar"
                                                style={{ width: `${skill.level}%`, transition: 'width 1.5s ease-in-out' }}
                                                aria-valuenow={skill.level}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="col-lg-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass rounded-4 p-4 p-md-5 shadow-sm h-100">
                            <h3 className="h4 fw-bold mb-4 text-body border-bottom border-secondary border-opacity-25 pb-3">
                                <i className="bi bi-backpack me-2"></i>Inventory Grid
                            </h3>

                            <div className="row g-3 mt-2">
                                {inventory.map((item, index) => (
                                    <div className="col-6 col-sm-4" key={index}>
                                        <div
                                            className="p-3 text-center border border-secondary border-opacity-25 rounded-3 hover-scale hover-opacity cursor-pointer h-100 d-flex flex-column justify-content-center align-items-center bg-body bg-opacity-10"
                                            title={item.description}
                                            onClick={onOpenSecret}
                                        >
                                            <i className={`bi ${item.iconClass} fs-1 text-body mb-2`}></i>
                                            <span className="fw-medium text-body small d-block">{item.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* The Arsenal (Interactive CV Timeline) */}
                <div className="row mt-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="col-12">
                        <div className="glass rounded-4 p-4 p-md-5 shadow-sm">
                            <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-secondary border-opacity-25 pb-3">
                                <h3 className="h4 fw-bold text-body m-0">
                                    <i className="bi bi-map me-2"></i>The Arsenal (Quest Log)
                                </h3>
                                <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary rounded-pill px-4 shadow-sm hover-scale d-flex align-items-center gap-2">
                                    <i className="bi bi-file-earmark-arrow-down-fill"></i> Download Profile
                                </a>
                            </div>

                            <div className="timeline position-relative ps-4 border-start border-primary border-2">
                                {[
                                    { year: '2021', title: 'Footwear Design', role: 'Footwear Designer', description: 'Designed footwear for various university projects and various collab brands.' },
                                    { year: '2023', title: 'Free time 3D design', role: '3D Designer', description: 'Focused on creating engaging 3D objects, scenes and multiplayer arenas.' },
                                    { year: '2024', title: 'Current Objective', role: 'Freelance Architect', description: 'Building custom game mechanics and UI systems for various creative clients.' },
                                    { year: '2025', title: 'Game Design Journey', role: 'Game Design Intern', description: 'Learned the basic mechanics of professional game development, working on small-scale mobile prototypes.' },
                                ].map((item, idx) => (
                                    <div key={idx} className="timeline-item mb-5 position-relative">
                                        <div className="position-absolute bg-primary rounded-circle shadow" style={{ width: '16px', height: '16px', left: '-33px', top: '4px' }}></div>
                                        <div className="d-flex align-items-center gap-3 mb-2">
                                            <span className="badge bg-body bg-opacity-25 text-body text-body p-2 fs-6">{item.year}</span>
                                            <h4 className="h5 fw-bold m-0 text-body">{item.title}</h4>
                                        </div>
                                        <h5 className="h6 fw-medium text-body opacity-75">{item.role}</h5>
                                        <p className="text-body opacity-75 mb-0">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Lore;
