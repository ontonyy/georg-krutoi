import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer') ||
                target.closest('.cursor-pointer') ||
                target.classList.contains('hover-scale') ||
                target.closest('.hover-scale')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        // Update position on move
        window.addEventListener('mousemove', updatePosition);
        // Determine hover state
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: isHovering ? '40px' : '20px',
                height: isHovering ? '40px' : '20px',
                borderRadius: '50%',
                backgroundColor: isHovering ? 'transparent' : 'var(--text-color)',
                border: isHovering ? '2px solid var(--text-color)' : 'none',
                pointerEvents: 'none',
                zIndex: 9999,
                transform: 'translate(-50%, -50%)',
                transition: 'width 0.2s, height 0.2s, background-color 0.2s, border 0.2s',
                mixBlendMode: 'difference',
            }}
        />
    );
};

export default CustomCursor;
