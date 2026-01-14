import React from 'react';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-full h-full" }) => {
    return (
        <svg
            viewBox="0 0 250 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Mountains */}
            <path
                d="M15 100L95 45L115 65L170 35L235 95"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Tree */}
            <line x1="172" y1="52" x2="172" y2="105" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <line x1="172" y1="65" x2="185" y2="52" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <line x1="172" y1="80" x2="185" y2="67" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />

            {/* Text: AKTAW / AKTAШ styles */}
            <g fill="currentColor">
                {/* Simplified wide blocky font styles */}
                <text x="125" y="135" textAnchor="middle" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '24px', letterSpacing: '0.2em' }}>AKTAШ</text>
                <text x="125" y="165" textAnchor="middle" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '32px', letterSpacing: '0.1em' }}>VIBES</text>
            </g>
        </svg>
    );
};

export default Logo;
