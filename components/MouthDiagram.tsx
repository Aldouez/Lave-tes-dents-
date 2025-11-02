import React from 'react';

interface MouthDiagramProps {
  currentZone: number;
}

const MouthDiagram: React.FC<MouthDiagramProps> = ({ currentZone }) => {
  // Zone definitions using SVG path data
  // These paths create a stylized representation of the 8 brushing zones.
  const zones = [
    // Outer upper arch
    { id: 0, d: "M170 100 A 70 60 0 0 0 100 40" }, // Upper Right Outer
    { id: 1, d: "M30 100 A 70 60 0 0 1 100 40" },  // Upper Left Outer

    // Outer lower arch
    { id: 3, d: "M170 100 A 70 60 0 0 1 100 160" }, // Lower Right Outer
    { id: 2, d: "M30 100 A 70 60 0 0 0 100 160" },  // Lower Left Outer

    // Inner upper arch
    { id: 4, d: "M145 100 A 45 40 0 0 0 100 60" }, // Upper Right Inner
    { id: 5, d: "M55 100 A 45 40 0 0 1 100 60" },  // Upper Left Inner

    // Inner lower arch
    { id: 7, d: "M145 100 A 45 40 0 0 1 100 140" }, // Lower Right Inner
    { id: 6, d: "M55 100 A 45 40 0 0 0 100 140" },  // Lower Left Inner
  ];

  return (
    <div className="w-48 h-48" aria-label="Diagramme de la bouche indiquant la zone de brossage actuelle">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <g fill="none" strokeWidth="18" strokeLinecap="round">
          {zones.map((zone) => (
            <path
              key={zone.id}
              d={zone.d}
              className={`transition-all duration-500 ease-in-out ${
                currentZone === zone.id
                  ? 'stroke-cyan-500'
                  : 'stroke-gray-300/70'
              }`}
              aria-hidden={currentZone !== zone.id}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default MouthDiagram;
