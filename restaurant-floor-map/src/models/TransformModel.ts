import { Transform, ZoomLimits, PanLimits, Point } from '../types';

export class TransformModel {
  private transform: Transform;
  private zoomLimits: ZoomLimits;
  private panLimits: PanLimits;

  constructor(
    initialTransform: Transform = { x: 0, y: 0, scale: 1 },
    zoomLimits: ZoomLimits = { min: 0.5, max: 3 },
    panLimits: PanLimits = { minX: -500, maxX: 500, minY: -300, maxY: 300 }
  ) {
    this.transform = initialTransform;
    this.zoomLimits = zoomLimits;
    this.panLimits = panLimits;
  }

  getTransform(): Transform {
    return { ...this.transform };
  }

  setTransform(transform: Transform): void {
    this.transform = this.clampTransform(transform);
  }

  pan(deltaX: number, deltaY: number): Transform {
    const newTransform = {
      ...this.transform,
      x: this.transform.x + deltaX,
      y: this.transform.y + deltaY,
    };
    this.transform = this.clampTransform(newTransform);
    return this.getTransform();
  }

  zoom(delta: number, center: Point): Transform {
    const oldScale = this.transform.scale;
    const newScale = this.clampScale(oldScale * (1 + delta));

    const scaleRatio = newScale / oldScale;
    const newX = center.x - (center.x - this.transform.x) * scaleRatio;
    const newY = center.y - (center.y - this.transform.y) * scaleRatio;

    const newTransform = {
      x: newX,
      y: newY,
      scale: newScale,
    };

    this.transform = this.clampTransform(newTransform);
    return this.getTransform();
  }

  private clampScale(scale: number): number {
    return Math.max(this.zoomLimits.min, Math.min(this.zoomLimits.max, scale));
  }

  private clampTransform(transform: Transform): Transform {
    const scaledLimits = this.getScaledPanLimits(transform.scale);
    
    return {
      x: Math.max(scaledLimits.minX, Math.min(scaledLimits.maxX, transform.x)),
      y: Math.max(scaledLimits.minY, Math.min(scaledLimits.maxY, transform.y)),
      scale: this.clampScale(transform.scale),
    };
  }

  private getScaledPanLimits(scale: number): PanLimits {
    const scaleFactor = 1 / scale;
    return {
      minX: this.panLimits.minX * scaleFactor,
      maxX: this.panLimits.maxX * scaleFactor,
      minY: this.panLimits.minY * scaleFactor,
      maxY: this.panLimits.maxY * scaleFactor,
    };
  }

  reset(): Transform {
    this.transform = { x: 0, y: 0, scale: 1 };
    return this.getTransform();
  }
}