import React, { useRef, useState } from 'react';
import { Table } from '../types';
import { tables } from '../data/tables';
import { useMapInteraction } from '../lib/useMapInteraction';
import { FloorBackground } from './FloorBackground';
import { TableItem } from './TableItem';
import { TableDetailsPanel } from './TableDetailsPanel';

export const FloorMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const { transform, handlers, resetTransform } = useMapInteraction({
    containerRef,
    tables,
    onTableSelect: setSelectedTable,
  });

  const handleCloseDetails = () => {
    setSelectedTable(null);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#e5e7eb',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
            Управление
          </h3>
          <button
            onClick={resetTransform}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Сбросить вид
          </button>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
            Подсказки
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#4b5563', lineHeight: '1.8' }}>
            <li>Перетаскивайте для панорамирования</li>
            <li>Колесо мыши для масштабирования</li>
            <li>Кликните на стол для деталей</li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
            Легенда
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#4ade80', borderRadius: '3px' }} />
              <span style={{ color: '#4b5563' }}>Доступен</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#fbbf24', borderRadius: '3px' }} />
              <span style={{ color: '#4b5563' }}>Забронирован</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#f87171', borderRadius: '3px' }} />
              <span style={{ color: '#4b5563' }}>Занят</span>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '12px',
            color: '#6b7280',
          }}
        >
          Масштаб: {(transform.scale * 100).toFixed(0)}%
        </div>
      </div>

      <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000, pointerEvents: 'auto' }}>
        <TableDetailsPanel table={selectedTable} onClose={handleCloseDetails} />
      </div>

      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          userSelect: 'none',
          pointerEvents: 'auto',
        }}
        {...handlers}
      >
        <svg
          width="100%"
          height="100%"
          style={{
            display: 'block',
          }}
        >
          <g
            transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}
          >
            <FloorBackground />
            {tables.map((table) => (
              <TableItem
                key={table.id}
                table={table}
                isSelected={selectedTable?.id === table.id}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};