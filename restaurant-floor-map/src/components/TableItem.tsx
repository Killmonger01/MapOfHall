import React from 'react';
import { Table } from '../types';

interface TableItemProps {
  table: Table;
  isSelected: boolean;
}

export const TableItem: React.FC<TableItemProps> = ({ table, isSelected }) => {
  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return '#4ade80';
      case 'occupied':
        return '#f87171';
      case 'reserved':
        return '#fbbf24';
      default:
        return '#9ca3af';
    }
  };

  const fillColor = getStatusColor(table.status);
  const strokeColor = isSelected ? '#3b82f6' : '#1f2937';
  const strokeWidth = isSelected ? 3 : 1;

  if (table.shape === 'circle') {
    const cx = table.x + table.width / 2;
    const cy = table.y + table.height / 2;
    const r = table.width / 2;

    return (
      <g data-table-id={table.id}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          opacity={0.8}
          style={{ cursor: 'pointer', transition: 'stroke-width 0.2s' }}
        />
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#1f2937"
          fontSize="14"
          fontWeight="600"
          pointerEvents="none"
        >
          {table.name}
        </text>
      </g>
    );
  } else {
    return (
      <g data-table-id={table.id}>
        <rect
          x={table.x}
          y={table.y}
          width={table.width}
          height={table.height}
          rx={8}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          opacity={0.8}
          style={{ cursor: 'pointer', transition: 'stroke-width 0.2s' }}
        />
        <text
          x={table.x + table.width / 2}
          y={table.y + table.height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#1f2937"
          fontSize="14"
          fontWeight="600"
          pointerEvents="none"
        >
          {table.name}
        </text>
      </g>
    );
  }
};
