import React, { useState, useEffect } from 'react';
import initialNotes from '../data/notes.json';

type NoteCategory = '3D' | 'Game' | 'Life' | 'Work' | 'Other';

interface Note {
    id: string;
    content: string;
    author: string;
    category: NoteCategory;
    date: string;
}

const ADMIN_DETAILS: Record<string, { name: string, marker: string, deleteSecret: string }> = {
    ':gera ': { name: 'Gera', marker: '👑', deleteSecret: 'mister' },
    ':anton ': { name: 'Anton', marker: '🛠️', deleteSecret: 'barabashka' },
    ':liza ': { name: 'Liza', marker: '💎', deleteSecret: 'koroleva' },
    ':ksenja ': { name: 'Ksenja', marker: '🌟', deleteSecret: 'barabulka' }
};

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<NoteCategory>('Other');
    const [error, setError] = useState<string | null>(null);

    const getAdminMarker = (author: string) => {
        const admin = Object.values(ADMIN_DETAILS).find(a => a.name === author);
        return admin ? admin.marker : '👤';
    };

    useEffect(() => {
        const savedNotes = localStorage.getItem('georg-notes');
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        } else {
            setNotes(initialNotes as Note[]);
        }
    }, []);

    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem('georg-notes', JSON.stringify(notes));
        }
    }, [notes]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (error) setError(null);
    };

    const handleAddNote = () => {
        const trimmed = inputValue.trim();
        let author = '';
        let content = '';

        for (const [prefix, details] of Object.entries(ADMIN_DETAILS)) {
            if (trimmed.toLowerCase().startsWith(prefix.toLowerCase())) {
                author = details.name;
                content = trimmed.substring(prefix.length).trim();
                break;
            }
        }

        if (!author) {
            setError("SECURITY ALERT: Unauthorized access attempt detected. Admin credentials required.");
            return;
        }

        if (!content) {
            setError("Error: System registry cannot log empty commands.");
            return;
        }

        const newNote: Note = {
            id: Date.now().toString(),
            content,
            author,
            category: selectedCategory,
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setNotes([newNote, ...notes]);
        setInputValue('');
        setError(null);
    };

    const handleDeleteNote = (id: string, author: string) => {
        const admin = Object.values(ADMIN_DETAILS).find(a => a.name === author);
        const requiredSecret = admin ? admin.deleteSecret : 'godmode';
        const secret = window.prompt(`TERMINAL OVERRIDE [Author: ${author}]: Enter deletion authorization code:`);

        if (secret === requiredSecret) {
            setNotes(notes.filter(note => note.id !== id));
            setError(null);
        } else if (secret !== null) {
            setError(`ACCESS DENIED: Invalid frequency for account '${author}'. Log entry preserved.`);
        }
    };

    const categories: NoteCategory[] = ['3D', 'Game', 'Life', 'Work', 'Other'];

    return (
        <section id="notes" className="py-5 section-padding position-relative">
            <div className="container py-lg-5">
                <h2 className="display-4 text-center mb-5 text-uppercase tracking-widest fw-bold text-body" style={{ fontSize: 'calc(1.5rem + 1.5vw)' }}>Console Logs</h2>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="glass rounded-4 p-4 p-md-5 mb-4 mb-lg-5 shadow-sm">
                            <h3 className="h5 fw-bold mb-4 text-body border-bottom border-secondary border-opacity-25 pb-3 opacity-75 text-uppercase tracking-wider">
                                <i className="bi bi-terminal-fill me-2"></i>System Registry
                            </h3>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className={`form-control bg-transparent ${error ? 'border-danger' : 'border-secondary border-opacity-25'} text-body py-2`}
                                    placeholder="Enter system command..."
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddNote(); }}
                                />
                                <button className="btn btn-outline-secondary px-3 px-sm-4 text-body opacity-75" type="button" onClick={handleAddNote}>
                                    Push
                                </button>
                            </div>

                            {error && (
                                <div className="text-danger small mb-3 animate-fade-in">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
                                </div>
                            )}

                            <div className="d-flex align-items-center gap-2 gap-sm-3 overflow-auto pb-1">
                                <label className="text-body opacity-50 small text-uppercase tracking-wider flex-shrink-0">Partition:</label>
                                <div className="d-flex gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`btn btn-sm rounded-pill px-3 transition-all ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary border-opacity-25 text-body opacity-75'}`}
                                            style={{ fontSize: '10px', textTransform: 'uppercase' }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {notes.length === 0 ? (
                                <div className="text-center py-5 opacity-25">
                                    <i className="bi bi-archive fs-1 d-block mb-3"></i>
                                    <p className="fst-italic">Archive is empty.</p>
                                </div>
                            ) : (
                                notes.map((note) => (
                                    <div key={note.id} className="glass rounded-4 p-3 p-md-4 shadow-sm border-start border-primary border-4 position-relative">
                                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 gap-2">
                                            <div className="d-flex gap-2 align-items-center flex-wrap">
                                                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 text-uppercase tracking-wider x-small px-3">
                                                    {note.category}
                                                </span>
                                                <span className="badge bg-secondary bg-opacity-10 text-body border border-secondary border-opacity-25 text-uppercase tracking-wider x-small px-3 opacity-75 d-flex align-items-center gap-1">
                                                    <span>{getAdminMarker(note.author)}</span>
                                                    <span>{note.author}</span>
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center gap-3 ms-auto ms-sm-0">
                                                <span className="text-body opacity-25 x-small">{note.date}</span>
                                                <button
                                                    className="btn btn-link btn-sm text-danger p-0 opacity-50 hover-opacity-100"
                                                    onClick={() => handleDeleteNote(note.id, note.author)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-body m-0 fs-6 fw-light">{note.content}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Notes;
