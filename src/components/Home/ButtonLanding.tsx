import React from 'react';

interface ButtonLandingProps {
    text: string;
    // onClick: () => void;
    disabled?: boolean;
}

const ButtonLanding: React.FC<ButtonLandingProps> = ({ text, disabled = false }) => {
    return (
        <button className="text-black bg-[#FFCC00] font-semibold px-12 py-2 rounded-3xl font-alexandria" disabled={disabled}>
            {text}
        </button>
    );
};

export default ButtonLanding;