import React, { useMemo, useState } from 'react';
import * as d3 from 'd3-scale';
import { POETS_DATA, ERA_COLORS, START_YEAR, END_YEAR, ROW_HEIGHT, BAR_HEIGHT, TOP_PADDING, LEFT_PADDING, RIGHT_PADDING } from '../constants';
import { TangEra } from '../types';

export const Timeline: React.FC = () => {
  // Zoom state (effectively controls the width of the chart in pixels)
  const [zoomLevel, setZoomLevel] = useState<number>(5); // 1 to 10
  // Hover state for the dynamic guide line
  const [hoverX, setHoverX] = useState<number | null>(null);

  // Calculate dynamic width based on zoom
  const baseWidth = 1200;
  const width = baseWidth + (zoomLevel - 1) * 300;
  const height = POETS_DATA.length * ROW_HEIGHT + TOP_PADDING + 50; // Dynamic height based on number of poets

  // Create D3 Linear Scale for Year -> Pixel mapping
  const xScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([START_YEAR, END_YEAR])
      .range([LEFT_PADDING, width - RIGHT_PADDING]);
  }, [width]);

  // Generate Ticks (every 10 years)
  const ticks = useMemo(() => {
    return xScale.ticks((END_YEAR - START_YEAR) / 10);
  }, [xScale]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    // Calculate mouse position relative to the SVG element
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setHoverX(x);
  };

  const handleMouseLeave = () => {
    setHoverX(null);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Header & Controls */}
      <div className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm pt-6 pb-4 px-4 sm:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 tracking-wide">
          唐代著名诗人生卒时间线
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          {/* Zoom Control */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">缩放比例:</span>
            <input
              type="range"
              min="1"
              max="10"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(Number(e.target.value))}
              className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-sm font-mono text-gray-500 w-6 text-center">{zoomLevel}</span>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4">
            {Object.values(TangEra).map((era) => (
              <div key={era} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-sm" 
                  style={{ backgroundColor: ERA_COLORS[era].hex }}
                ></div>
                <span className="text-sm font-medium text-gray-700">{era}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Scroll Container */}
      <div className="w-full overflow-x-auto custom-scrollbar pb-12">
        <div 
          style={{ width: width, height: height }} 
          className="relative mx-auto"
        >
          <svg 
            width={width} 
            height={height} 
            className="block cursor-crosshair"
            aria-label="Timeline Chart"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Grid & Axis */}
            <g className="axis-layer">
              {ticks.map((tick) => (
                <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
                  {/* Vertical grid line (Extended full height) */}
                  <line 
                    y1={TOP_PADDING} 
                    y2={height} 
                    stroke="#F3F4F6" 
                    strokeWidth={1} 
                    strokeDasharray="4 4"
                  />
                  {/* Short tick mark at top */}
                  <line 
                    y1={TOP_PADDING - 5} 
                    y2={TOP_PADDING} 
                    stroke="#9CA3AF" 
                    strokeWidth={1} 
                  />
                  {/* Year Label */}
                  <text
                    y={TOP_PADDING - 10}
                    textAnchor="middle"
                    className="text-[10px] fill-gray-500 font-mono select-none"
                  >
                    {tick}
                  </text>
                </g>
              ))}
              {/* Main Axis Line */}
              <line 
                x1={LEFT_PADDING} 
                x2={width - RIGHT_PADDING} 
                y1={TOP_PADDING} 
                y2={TOP_PADDING} 
                stroke="#D1D5DB" 
                strokeWidth={1} 
              />
            </g>

            {/* Poets Layer */}
            <g className="poets-layer">
              {POETS_DATA.map((poet, index) => {
                const yPos = TOP_PADDING + 20 + (index * ROW_HEIGHT);
                const xStart = xScale(poet.start);
                const xEnd = xScale(poet.end);
                const barWidth = Math.max(xEnd - xStart, 2); // Minimum 2px width
                const color = ERA_COLORS[poet.era].hex;

                return (
                  <g key={poet.id} className="group cursor-default">
                    {/* Hover guide line (local to bar, still useful visually) */}
                    <line 
                      x1={xStart} 
                      x2={xStart} 
                      y1={TOP_PADDING} 
                      y2={yPos + BAR_HEIGHT/2} 
                      stroke={color} 
                      strokeWidth={1}
                      strokeDasharray="2 2"
                      className="opacity-0 group-hover:opacity-40 transition-opacity"
                    />

                    {/* Life Bar */}
                    <rect
                      x={xStart}
                      y={yPos}
                      width={barWidth}
                      height={BAR_HEIGHT}
                      fill={color}
                      rx={BAR_HEIGHT / 2}
                      className="transition-all duration-200 group-hover:brightness-95 shadow-sm"
                    />

                    {/* Label */}
                    <text
                      x={xEnd + 8} // Position slightly right of the bar end
                      y={yPos + BAR_HEIGHT - 1} // Vertically align with bar
                      className="text-xs sm:text-[13px] leading-none"
                      dominantBaseline="auto"
                    >
                      <tspan 
                        fontWeight="700" 
                        fill="#1F2937"
                        className="font-bold tracking-tight"
                      >
                        {poet.name}
                      </tspan>
                      <tspan dx="8" fill="#6B7280" className="font-light tracking-tight">
                        {poet.description}
                      </tspan>
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Hover Guide Line Layer */}
            {hoverX !== null && (
              <g className="pointer-events-none">
                {/* Vertical Line */}
                <line
                  x1={hoverX}
                  x2={hoverX}
                  y1={TOP_PADDING}
                  y2={height}
                  stroke="#DC2626"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
                
                {/* Year Label Tag */}
                <g transform={`translate(${hoverX}, ${TOP_PADDING - 12})`}>
                  <rect
                    x="-24"
                    y="-20"
                    width="48"
                    height="20"
                    fill="#DC2626"
                    rx="4"
                    className="shadow-sm"
                  />
                  <text
                    x="0"
                    y="-6"
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight="bold"
                    className="font-mono"
                  >
                    {Math.round(xScale.invert(hoverX))}
                  </text>
                  {/* Triangle Arrow */}
                  <path
                    d="M -4 0 L 0 4 L 4 0 Z"
                    fill="#DC2626"
                  />
                </g>
              </g>
            )}
          </svg>
        </div>
      </div>
      
      {/* Mobile hint */}
      <div className="fixed bottom-4 right-4 md:hidden z-30 pointer-events-none opacity-50">
        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-md">
          ← 左右滑动 →
        </div>
      </div>
    </div>
  );
};