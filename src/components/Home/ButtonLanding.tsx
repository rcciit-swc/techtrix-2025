import React from 'react';

interface ButtonLandingProps {
  text: string;
  // onClick: () => void;
  disabled?: boolean;
}

const ButtonLanding: React.FC<ButtonLandingProps> = ({
  text,
  disabled = false,
}) => {
  return (
    <button className="p-[3px] relative cursor-pointer" disabled={disabled}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-yellow-500 rounded-lg " />
      <div className="px-10 py-2 lg:py-4 hover:border-black bg-black rounded-[6px]  relative group transition duration-200 text-2xl lg:text-3xl font-semibold font-kagitingan tracking-wider text-white hover:bg-transparent">
        {text}
      </div>
    </button>
  );
};

export default ButtonLanding;
