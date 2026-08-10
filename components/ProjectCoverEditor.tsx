"use client";

import { useCallback, useRef, useState } from "react";
import { Move, RotateCcw, ZoomIn } from "lucide-react";
import { CoverImageAdjust, DEFAULT_COVER_ADJUST } from "@/data/defaultPortfolioData";

export function getCoverImageStyle(adjust?: CoverImageAdjust): React.CSSProperties {
  const { scale, posX, posY } = { ...DEFAULT_COVER_ADJUST, ...adjust };

  return {
    objectFit: "cover",
    objectPosition: `${posX}% ${posY}%`,
    transform: `scale(${scale})`,
    transformOrigin: `${posX}% ${posY}%`,
  };
}

interface ProjectCoverEditorProps {
  imageSrc: string;
  adjust: CoverImageAdjust;
  onChange: (adjust: CoverImageAdjust) => void;
}

export default function ProjectCoverEditor({
  imageSrc,
  adjust,
  onChange,
}: ProjectCoverEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: adjust.posX,
      posY: adjust.posY,
    };
    setIsDragging(true);
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      const posX = clamp(
        dragRef.current.posX - (deltaX / rect.width) * 100,
        0,
        100
      );
      const posY = clamp(
        dragRef.current.posY - (deltaY / rect.height) * 100,
        0,
        100
      );

      onChange({ ...adjust, posX, posY });
    },
    [adjust, onChange]
  );

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative h-40 sm:h-48 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 select-none touch-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        title="Drag to reposition the cover image"
      >
        <img
          src={imageSrc}
          alt="Cover preview"
          draggable={false}
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-75"
          style={getCoverImageStyle(adjust)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-[#020617]/20 pointer-events-none" />
        <div className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/60 text-[10px] text-slate-200 font-medium pointer-events-none">
          <Move className="w-3 h-3" />
          Drag to adjust
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
        <div>
          <label className="flex items-center justify-between text-slate-300 font-semibold uppercase mb-1.5">
            <span className="inline-flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
              Zoom
            </span>
            <span className="text-blue-400 font-mono normal-case">{adjust.scale.toFixed(1)}x</span>
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={adjust.scale}
            onChange={(e) => onChange({ ...adjust, scale: parseFloat(e.target.value) })}
            className="w-full accent-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={() => onChange({ ...DEFAULT_COVER_ADJUST })}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:border-blue-500/40 hover:text-white transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-400 mb-1">Horizontal</label>
          <input
            type="range"
            min={0}
            max={100}
            value={adjust.posX}
            onChange={(e) => onChange({ ...adjust, posX: parseInt(e.target.value, 10) })}
            className="w-full accent-blue-500"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">Vertical</label>
          <input
            type="range"
            min={0}
            max={100}
            value={adjust.posY}
            onChange={(e) => onChange({ ...adjust, posY: parseInt(e.target.value, 10) })}
            className="w-full accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
