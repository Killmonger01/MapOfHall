import React from 'react';
import { Table } from '../types';

interface TableDetailsPanelProps {
  table: Table | null;
  onClose: () => void;
}

export const TableDetailsPanel: React.FC<TableDetailsPanelProps> = ({
  table,
  onClose,
}) => {
  if (!table) return null;

  const getStatusLabel = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'Доступен';
      case 'occupied':
        return 'Занят';
      case 'reserved':
        return 'Забронирован';
      default:
        return 'Неизвестно';
    }
  };

  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      style={{
        margin: '20px',
        width: '320px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        padding: '24px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#1f2937' }}>
          Стол {table.name}
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#6b7280',
            padding: '0',
            lineHeight: '1',
          }}
          aria-label="Закрыть"
        >
          ×
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>
            Статус
          </div>
          <span
            className={getStatusColor(table.status)}
            style={{
              display: 'inline-block',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              backgroundColor: table.status === 'available' ? '#d1fae5' : table.status === 'reserved' ? '#fef3c7' : '#fee2e2',
              color: table.status === 'available' ? '#065f46' : table.status === 'reserved' ? '#92400e' : '#991b1b',
            }}
          >
            {getStatusLabel(table.status)}
          </span>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>
            Вместимость
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
            {table.capacity} {table.capacity === 1 ? 'место' : table.capacity < 5 ? 'места' : 'мест'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>
            Секция
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
            {table.section}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>
            Форма
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
            {table.shape === 'circle' ? 'Круглый' : 'Прямоугольный'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>
            Размеры
          </div>
          <div style={{ fontSize: '14px', color: '#4b5563' }}>
            {table.width} × {table.height} px
          </div>
        </div>
      </div>
    </div>
  );
};