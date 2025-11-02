import React, { useState, useEffect, useMemo, useRef } from 'react';
import TimerCircle from './components/TimerCircle';
import MouthDiagram from './components/MouthDiagram';
import ToothCharacter from './components/ToothCharacter';
import PlayIcon from './components/icons/PlayIcon';
import PauseIcon from './components/icons/PauseIcon';
import ResetIcon from './components/icons/ResetIcon';
import MusicIcon from './components/icons/MusicIcon';

const TOTAL_TIME = 120; // 2 minutes in seconds
const ZONES = 8;
const ZONE_DURATION = TOTAL_TIME / ZONES; // 15 seconds per zone

const MUSIC_URL = 'https://cdn.pixabay.com/audio/2022/10/24/audio_32c358a469.mp3';

const ZONE_DESCRIPTIONS = [
  "En haut à droite, à l'extérieur",
  "En haut à gauche, à l'extérieur",
  "En bas à gauche, à l'extérieur",
  "En bas à droite, à l'extérieur",
  "En haut à droite, à l'intérieur",
  "En haut à gauche, à l'intérieur",
  "En bas à gauche, à l'intérieur",
  "En bas à droite, à l'intérieur",
];


const App: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_TIME);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  
  const musicRef = useRef<HTMLAudioElement | null>(null);

  // Control music playback
  useEffect(() => {
    if (musicRef.current) {
      if (isMusicPlaying) {
        musicRef.current.play().catch(e => console.error("Music play failed", e));
      } else {
        musicRef.current.pause();
      }
    }
  }, [isMusicPlaying]);


  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      setIsMusicPlaying(false); // Stop music on finish
      // Play a bark sound when finished!
      const successSound = new Audio('https://gfxsounds.com/wp-content/uploads/2023/11/Arcade-game-16-bit-or-8-bit-level-complete-win-success.mp3');
      successSound.play();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeRemaining]);

  const handleToggle = () => {
    if (isFinished) return;
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsFinished(false);
    setTimeRemaining(TOTAL_TIME);
    setIsMusicPlaying(false);
    if (musicRef.current) {
        musicRef.current.currentTime = 0;
    }
  };
  
  const handleMusicToggle = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const currentZone = useMemo(() => {
    if (timeRemaining === 0) return ZONES - 1;
    const elapsedTime = TOTAL_TIME - timeRemaining;
    return Math.min(ZONES - 1, Math.floor(elapsedTime / ZONE_DURATION));
  }, [timeRemaining]);


  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-200 to-blue-400 flex flex-col items-center justify-center p-4 text-center text-slate-800 overflow-hidden">
      <audio ref={musicRef} src={MUSIC_URL} loop preload="auto" />
      <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl max-w-md w-full">
        <button
          onClick={handleMusicToggle}
          className="absolute top-4 right-4 text-cyan-600 hover:text-cyan-800 transition-colors duration-300 p-2 rounded-full hover:bg-cyan-100/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label={isMusicPlaying ? 'Couper la musique' : 'Jouer la musique'}
        >
          <MusicIcon isMuted={!isMusicPlaying} />
        </button>
        
        <h1 className="text-3xl sm:text-4xl font-black text-blue-800 mb-2">
          C'est l'heure de se brosser les dents !
        </h1>

        {isFinished ? (
          <div className="flex flex-col items-center justify-center h-64">
            <ToothCharacter isBrushing={false} />
            <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-4">
              Bravo ! Tes dents sont toutes propres !
            </p>
          </div>
        ) : (
          <>
            <div className="my-4 h-52 flex flex-col items-center justify-around">
              {!isActive && <ToothCharacter isBrushing={isActive} />}
              <p className="text-2xl sm:text-3xl font-bold text-cyan-700 text-center px-4">
                {isActive ? ZONE_DESCRIPTIONS[currentZone] : "Prêt(e) ?"}
              </p>
              {isActive && <MouthDiagram currentZone={currentZone} />}
            </div>
            <TimerCircle timeRemaining={timeRemaining} totalTime={TOTAL_TIME} />
          </>
        )}
        
        <div className="flex justify-center items-center space-x-6 mt-8">
          <button
            onClick={handleReset}
            className="w-20 h-20 bg-yellow-400 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            aria-label="Réinitialiser le minuteur"
          >
            <ResetIcon />
          </button>
          <button
            onClick={handleToggle}
            disabled={isFinished}
            className={`w-24 h-24 text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed ${
              isActive 
                ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300' 
                : 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
            }`}
            aria-label={isActive ? "Mettre en pause" : "Démarrer le minuteur"}
          >
            {isActive ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
      <footer className="mt-6 text-white/80 text-sm">
        Fait avec ❤️ pour des sourires éclatants
      </footer>
    </main>
  );
};

export default App;
