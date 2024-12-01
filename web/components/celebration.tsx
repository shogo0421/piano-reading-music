import React from "react";
import { useSpring, animated } from "react-spring";

interface CelebrationProps {
  isVisible: boolean;
}

const Celebration: React.FC<CelebrationProps> = ({ isVisible }) => {
  const animation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.8)",
    config: { tension: 300, friction: 10 },
  });

  if (!isVisible) return null;

  return (
    <animated.div
      style={animation}
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
    >
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-4xl font-bold p-8 rounded-lg shadow-lg text-center">
        Congratulations! 🎉🎉
      </div>
    </animated.div>
  );
};

export default Celebration;

