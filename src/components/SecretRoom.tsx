import React, { useEffect, useState } from 'react';

interface SecretRoomProps {
    onClose: () => void;
}

const SecretRoom: React.FC<SecretRoomProps> = ({ onClose }) => {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(prev => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`position-fixed top-0 start-0 w-100 h-100 bg-black text-danger d-flex flex-column align-items-center justify-content-center z-3 ${glitch ? 'opacity-75' : 'opacity-100'}`} style={{ transition: 'opacity 0.1s' }}>
            <div className="text-center p-4 glass border-danger border-opacity-50 rounded-4 shadow-lg animate-fade-in-up">
                <h1 className="display-1 fw-bold mb-4 glitch-text" data-text="SYSTEM CORRUPTED">
                    SYSTEM CORRUPTED
                </h1>
                <p className="fs-4 mb-5 opacity-75">
                    You've entered the Chaos Realm.
                    <br />
                    Behind the scenes of designs and iterations.
                </p>

                <div className="d-flex flex-column gap-3 mb-5">
                    <div className="p-3 border border-danger border-opacity-25 rounded bg-dark bg-opacity-50 text-start">
                        <code className="text-info">// REJECTED_CONCEPT_v1.0</code>
                        <p className="small mb-0 opacity-50">"Maybe we should make the whole site rotate 360 degrees every 5 seconds?" - <i> discarded for causing motion sickness</i></p>
                    </div>
                    <div className="p-3 border border-info border-opacity-25 rounded bg-dark bg-opacity-50 text-start">
                        <code className="text-warning">// UNHANDLED_EXCEPTION_LOG</code>
                        <p className="small mb-0 opacity-50">Memory leak detected in 3D knot. Particles are drifting into the void.</p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="btn btn-outline-danger rounded-pill px-5 py-2 hover-scale d-flex align-items-center gap-2 mx-auto"
                >
                    <i className="bi bi-terminal-fill"></i> RESTORE SESSION
                </button>
            </div>

            <style>{`
        .glitch-text {
          position: relative;
          color: #ff4d4d;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        .glitch-text::before {
          color: #0ff;
          z-index: -1;
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
        }
        .glitch-text::after {
          color: #f0f;
          z-index: -2;
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }
      `}</style>
        </div>
    );
};

export default SecretRoom;
