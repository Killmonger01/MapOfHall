import { Point, Transform, Table } from '../types';

export function screenToMap(
  screenPoint: Point,
  transform: Transform,
  containerRect: DOMRect
): Point {
  return {
    x: (screenPoint.x - containerRect.left - transform.x) / transform.scale,
    y: (screenPoint.y - containerRect.top - transform.y) / transform.scale,
  };
}

export function mapToScreen(
  mapPoint: Point,
  transform: Transform
): Point {
  return {
    x: mapPoint.x * transform.scale + transform.x,
    y: mapPoint.y * transform.scale + transform.y,
  };
}

export function isPointInTable(point: Point, table: Table): boolean {
  if (table.shape === 'rectangle') {
    return (
      point.x >= table.x &&
      point.x <= table.x + table.width &&
      point.y >= table.y &&
      point.y <= table.y + table.height
    );
  } else if (table.shape === 'circle') {
    const centerX = table.x + table.width / 2;
    const centerY = table.y + table.height / 2;
    const radius = table.width / 2;
    const distance = Math.sqrt(
      Math.pow(point.x - centerX, 2) + Math.pow(point.y - centerY, 2)
    );
    return distance <= radius;
  }
  return false;
}

export function findTableAtPoint(point: Point, tables: Table[]): Table | null {
  for (let i = tables.length - 1; i >= 0; i--) {
    if (isPointInTable(point, tables[i])) {
      return tables[i];
    }
  }
  return null;
}

export function distance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
