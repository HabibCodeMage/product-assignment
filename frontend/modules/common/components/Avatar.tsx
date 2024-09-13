import React from "react";

interface AvatarProps {
  character: string;
  size?: number; // Optional size prop for flexibility
}

const Avatar: React.FC<AvatarProps> = ({ character, size = 32 }) => {
  return (
    <div
      className={`flex items-center justify-center bg-blue-500 text-white font-bold rounded-full w-[100%] h-[100%]`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {character.toUpperCase()}
    </div>
  );
};

export default Avatar;
