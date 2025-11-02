import React from 'react';

interface ToothCharacterProps {
  isBrushing: boolean;
}

const ToothCharacter: React.FC<ToothCharacterProps> = ({ isBrushing }) => {
  return (
    <div
      className={`relative w-32 h-40 transition-transform duration-500 ease-in-out ${isBrushing ? 'animate-dance' : ''}`}
      aria-label="Personnage de dent animé"
    >
      {/* Tooth Body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-32 bg-white rounded-t-full rounded-b-2xl shadow-lg">
        {/* Crown points */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-white rounded-b-full"></div>
        <div className="absolute top-2 left-3 w-6 h-3 bg-white rounded-b-full transform -rotate-12"></div>
        <div className="absolute top-2 right-3 w-6 h-3 bg-white rounded-b-full transform rotate-12"></div>
      </div>

      {/* Eyes */}
      <div className={`absolute top-12 left-1/2 -translate-x-1/2 flex gap-4 transition-all duration-300 ${isBrushing ? 'gap-5' : 'gap-4'}`}>
        <div className="w-5 h-5 bg-slate-800 rounded-full"></div>
        <div className="w-5 h-5 bg-slate-800 rounded-full"></div>
      </div>

      {/* Mouth */}
      <div className={`absolute top-20 left-1/2 -translate-x-1/2 w-10 h-5 bg-slate-800 rounded-b-full transition-all duration-300 transform ${isBrushing ? 'h-7 scale-x-110' : 'h-5'}`}></div>

      {/* Toothbrush */}
      <div
        className={`absolute bottom-8 -right-12 w-28 h-6 bg-blue-400 rounded-full transform transition-transform duration-500 ease-in-out ${isBrushing ? 'translate-x-[-150px] rotate-[-25deg]' : 'translate-x-0 rotate-[25deg]'}`}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-2 w-6 h-8 bg-white/50 rounded-md"></div>
      </div>

      <style>{`
        @keyframes dance {
          0%, 100% { transform: translateY(0) rotate(0); }
          25% { transform: translateY(-8px) rotate(-3deg); }
          75% { transform: translateY(-8px) rotate(3deg); }
        }
        .animate-dance {
          animation: dance 0.8s infinite;
        }
      `}</style>
    </div>
  );
};

export default ToothCharacter;
