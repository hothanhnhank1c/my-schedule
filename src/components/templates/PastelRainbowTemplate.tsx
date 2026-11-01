import React from 'react';
import type { ScheduleData } from '../../types/schedule';
import { getSlotSubject } from '../../utils/scheduleUtils';

interface TemplateProps {
  data: ScheduleData;
}

export const PastelRainbowTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { title = "Weekly Schedule", subtitle = "", days = [], sections = [] } = data;

  // Alternating colors for columns (matches the user sample: Pink, Yellow, Pink, Yellow, Pink...)
  const getColColor = (colIdx: number) => {
    return colIdx % 2 === 0 ? 'bg-[#ffd3e2] text-slate-800' : 'bg-[#fff0a6] text-slate-800';
  };

  return (
    <div 
      id="schedule-canvas-pastel"
      className="relative w-[1050px] min-h-[720px] bg-white text-slate-800 p-8 select-none overflow-hidden font-nunito shadow-2xl rounded-2xl"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Top-left Pastel Rainbow Arc */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none -translate-x-10 -translate-y-10">
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-90">
          {/* Pink outer arc */}
          <circle cx="10" cy="10" r="140" fill="none" stroke="#fec5d9" strokeWidth="18" />
          {/* Yellow middle arc */}
          <circle cx="10" cy="10" r="120" fill="none" stroke="#fef39c" strokeWidth="18" />
          {/* Cyan inner arc */}
          <circle cx="10" cy="10" r="100" fill="none" stroke="#bfeef9" strokeWidth="18" />
        </svg>
      </div>

      {/* Top Header Section */}
      <div className="relative z-10 flex items-center justify-between mb-6 px-4">
        {/* Empty left spacer to balance */}
        <div className="w-24"></div>

        {/* Center Title with Sparkles */}
        <div className="relative flex items-center justify-center gap-3">
          {/* Sparkle Left */}
          <div className="relative -top-3">
            <svg className="w-8 h-8 text-[#ffd24d] fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
            </svg>
            <svg className="w-4 h-4 text-[#ffd24d] fill-current absolute -bottom-2 -left-2" viewBox="0 0 24 24">
              <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
            </svg>
          </div>

          <h1 
            className="text-5xl font-bold tracking-wide text-[#61d3ea] font-pacifico px-2"
            style={{ 
              textShadow: '1px 2px 0px rgba(0,0,0,0.05)',
              filter: 'drop-shadow(0 2px 4px rgba(97, 211, 234, 0.2))'
            }}
          >
            {title}
          </h1>

          {/* Sparkle Right */}
          <div className="relative -top-1">
            <svg className="w-9 h-9 text-[#ffd24d] fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
            </svg>
            <svg className="w-4 h-4 text-[#ffd24d] fill-current absolute top-0 -right-2" viewBox="0 0 24 24">
              <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
            </svg>
          </div>
        </div>

        {/* Subtitle / Owner Name (Top Right) */}
        <div className="min-w-28 text-right">
          {subtitle && (
            <span className="text-3xl font-bold text-[#80cb51] font-caveat tracking-wider">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Main Timetable Content */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Header Days Row */}
        <div className="grid grid-flow-col gap-3 items-center" style={{ gridTemplateColumns: `140px repeat(${days.length}, minmax(0, 1fr))` }}>
          {/* Blank space above time column */}
          <div className="h-10"></div>
          
          {/* Day pill labels */}
          {days.map((day, idx) => (
            <div
              key={idx}
              className={`h-11 rounded-full flex items-center justify-center font-bold text-base tracking-wide shadow-sm transition-all ${getColColor(idx)}`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Schedule Sections (e.g., Morning / Afternoon) */}
        {sections.map((section, sIdx) => (
          <React.Fragment key={sIdx}>
            {/* If not the first section, render the green divider bar */}
            {sIdx > 0 && (
              <div className="my-1.5 h-6 bg-[#b9f28d] rounded-full w-full shadow-inner opacity-90 flex items-center justify-center">
                {section.label && (
                  <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase opacity-0 hover:opacity-100 transition-opacity">
                    {section.label}
                  </span>
                )}
              </div>
            )}

            {/* Slots for this section */}
            <div className="flex flex-col gap-2.5">
              {section.slots.map((slot, rIdx) => (
                <div 
                  key={rIdx} 
                  className="grid grid-flow-col gap-3 items-center" 
                  style={{ gridTemplateColumns: `140px repeat(${days.length}, minmax(0, 1fr))` }}
                >
                  {/* Time Pill Badge */}
                  <div className="h-10 rounded-full bg-[#c2effb] text-slate-800 flex items-center justify-center font-extrabold text-sm tracking-tight shadow-sm px-2 text-center">
                    {slot.time}
                  </div>

                  {/* Day Slots */}
                  {days.map((day, cIdx) => {
                    const subject = getSlotSubject(slot, day, cIdx);
                    return (
                      <div
                        key={cIdx}
                        className={`h-10 rounded-full flex items-center justify-center px-3 text-center text-xs sm:text-sm font-bold shadow-sm transition-transform leading-tight overflow-hidden ${getColColor(cIdx)}`}
                        title={subject}
                      >
                        <span className="truncate w-full">{subject}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}

        {/* Bottom Accent Green Bar */}
        <div className="mt-2 h-6 bg-[#b9f28d] rounded-full w-full shadow-inner opacity-90"></div>
      </div>
    </div>
  );
};
