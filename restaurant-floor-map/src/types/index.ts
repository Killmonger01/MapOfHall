export interface Table {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape: 'rectangle' | 'circle';
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  section: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface Transform {
  x: number;
  y: number;
  scale: number;
}

export interface ZoomLimits {
  min: number;
  max: number;
}

export interface PanLimits {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
