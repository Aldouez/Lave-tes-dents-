
import React from 'react';

interface TimerCircleProps {
  timeRemaining: number;
  totalTime: number;
}

const TimerCircle: React.FC<TimerCircleProps> = ({ timeRemaining, totalTime }) => {
  const radius = 80;
  const strokeWidth = 15;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = timeRemaining / totalTime;
  const strokeDashoffset = circumference * (1 - progress);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="relative flex items-center justify-center w-48 h-48 mx-auto">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90"
      >
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#4ade80"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-500"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-5xl font-black text-blue-800">
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
};

export default TimerCircle;
