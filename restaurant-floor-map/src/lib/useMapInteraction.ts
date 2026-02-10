import { useState, useRef, useCallback, RefObject } from 'react';
import { TransformModel } from '../models/TransformModel';
import { Transform, Point, Table } from '../types';
import { screenToMap, findTableAtPoint, distance } from '../lib/coordinates';

interface UseMapInteractionProps {
  containerRef: RefObject<HTMLDivElement>;
  tables: Table[];
  onTableSelect: (table: Table | null) => void;
}

export function useMapInteraction({
  containerRef,
  tables,
  onTableSelect,
}: UseMapInteractionProps) {
  const [transform, setTransform] = useState<Transform>({ x: 0, y: 0, scale: 1 });
  const transformModelRef = useRef(new TransformModel());
  
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef<Point>({ x: 0, y: 0 });
  const dragStartPosRef = useRef<Point>({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  const DRAG_THRESHOLD = 5;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;

    const totalDistance = distance(dragStartPosRef.current, { x: e.clientX, y: e.clientY });
    if (totalDistance > DRAG_THRESHOLD) {
      hasDraggedRef.current = true;
    }

    const newTransform = transformModelRef.current.pan(deltaX, deltaY);
    setTransform(newTransform);

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;

    if (!hasDraggedRef.current) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const screenPoint = { x: e.clientX, y: e.clientY };
      const mapPoint = screenToMap(screenPoint, transform, containerRect);
      const clickedTable = findTableAtPoint(mapPoint, tables);

      onTableSelect(clickedTable);
    }
  }, [containerRef, tables, transform, onTableSelect]);

  const handleMouseLeave = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const currentScale = transformModelRef.current.getTransform().scale;
    
    if (currentScale >= 3 && e.deltaY < 0) {
      return;
    }
    
    if (currentScale <= 0.5 && e.deltaY > 0) {
      return;
    }

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const center = {
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top,
    };

    const newTransform = transformModelRef.current.zoom(delta, center);
    setTransform(newTransform);
  }, [containerRef]);

  const resetTransform = useCallback(() => {
    const newTransform = transformModelRef.current.reset();
    setTransform(newTransform);
  }, []);

  return {
    transform,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onWheel: handleWheel,
    },
    resetTransform,
  };
}