import React from 'react';
import { FLOOR_MAP_CONFIG } from '../data/tables';

export const FloorBackground: React.FC = () => {
  const { width, height } = FLOOR_MAP_CONFIG;

  return (
    <g>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#f9fafb"
        stroke="#e5e7eb"
        strokeWidth={2}
      />

      <defs>
        <pattern
          id="grid"
          width={50}
          height={50}
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={0.5}
          />
        </pattern>
      </defs>
      <rect x={0} y={0} width={width} height={height} fill="url(#grid)" />

      <rect
        x={50}
        y={50}
        width={420}
        height={200}
        fill="#fef3c7"
        opacity={0.3}
        rx={10}
      />
      <text x={70} y={80} fontSize={16} fontWeight="600" fill="#92400e">
        VIP Section
      </text>

      <rect
        x={50}
        y={270}
        width={500}
        height={290}
        fill="#dbeafe"
        opacity={0.3}
        rx={10}
      />
      <text x={70} y={300} fontSize={16} fontWeight="600" fill="#1e40af">
        Main Hall
      </text>

      <rect
        x={570}
        y={100}
        width={280}
        height={340}
        fill="#d1fae5"
        opacity={0.3}
        rx={10}
      />
      <text x={590} y={130} fontSize={16} fontWeight="600" fill="#065f46">
        Terrace
      </text>

      <rect
        x={620}
        y={420}
        width={250}
        height={140}
        fill="#fce7f3"
        opacity={0.3}
        rx={10}
      />
      <text x={640} y={445} fontSize={14} fontWeight="600" fill="#9f1239">
        Bar Area
      </text>
    </g>
  );
};
