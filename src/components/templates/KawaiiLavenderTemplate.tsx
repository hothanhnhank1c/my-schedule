import React from 'react';
import type { ScheduleData } from '../../types/schedule';
import { getSlotSubject } from '../../utils/scheduleUtils';

interface TemplateProps {
  data: ScheduleData;
}

export const KawaiiLavenderTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { title = "Weekly Schedule", subtitle = "", days = [], sections = [] } = data;

  const dayColors = [
    'bg-[#fce7f3] text-pink-900 border-[#fbcfe8]',
    'bg-[#f3e8ff] text-purple-900 border-[#e9d5ff]',
    'bg-[#ede9fe] text-indigo-900 border-[#ddd6fe]',
    'bg-[#e0f2fe] text-sky-900 border-[#bae6fd]',
    'bg-[#fef3c7] text-amber-900 border-[#fde68a]',
    'bg-[#dcfce7] text-emerald-900 border-[#bbf7d0]',
  ];

  return (
    <div 
      id="schedule-canvas-kawaii"
      className="relative w-[1050px] min-h-[720px] bg-[#faf5ff] text-slate-800 p-8 select-none font-mali shadow-2xl rounded-3xl border-4 border-[#e9d5ff]"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Cute Decorative Clouds & Hearts */}
      <div className="absolute top-4 left-6 text-2xl select-none opacity-80">🌸 ☁️</div>
      <div className="absolute top-4 right-8 text-2xl select-none opacity-80">🎀 ✨</div>

      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6 pt-2">
        <h1 className="text-4xl font-bold text-[#7e22ce] tracking-wide font-mali drop-shadow-sm flex items-center gap-2">
          <span>💖</span> {title} <span>💖</span>
        </h1>
        {subtitle && (
          <span className="text-xl font-semibold text-[#a855f7] mt-1 bg-white/80 px-4 py-0.5 rounded-full border border-purple-200 shadow-xs">
            ~ {subtitle} ~
          </span>
        )}
      </div>

      {/* Main Grid */}
      <div className="flex flex-col gap-3">
        {/* Days Header */}
        <div className="grid grid-flow-col gap-2.5 items-center" style={{ gridTemplateColumns: `150px repeat(${days.length}, minmax(0, 1fr))` }}>
          <div className="text-center font-extrabold text-xs text-purple-500 uppercase tracking-widest font-comfortaa">Giờ học ⏰</div>
          {days.map((day, idx) => {
            const colorClass = dayColors[idx % dayColors.length];
            return (
              <div 
                key={idx} 
                className={`h-11 rounded-2xl flex items-center justify-center font-black text-base tracking-wide border-2 shadow-xs ${colorClass}`}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Sections */}
        {sections.map((section, sIdx) => (
          <React.Fragment key={sIdx}>
            {sIdx > 0 && (
              <div className="my-1.5 h-4 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 rounded-full w-full opacity-80"></div>
            )}

            <div className="flex flex-col gap-2">
              {section.slots.map((slot, rIdx) => (
                <div 
                  key={rIdx} 
                  className="grid grid-flow-col gap-2.5 items-center" 
                  style={{ gridTemplateColumns: `150px repeat(${days.length}, minmax(0, 1fr))` }}
                >
                  <div className="bg-white/90 border-2 border-purple-200 text-purple-800 h-11 rounded-2xl text-[15px] sm:text-base font-black flex items-center justify-center px-2 shadow-xs font-sans">
                    {slot.time}
                  </div>

                  {days.map((day, cIdx) => {
                    const subject = getSlotSubject(slot, day, cIdx);
                    const colorClass = dayColors[cIdx % dayColors.length];

                    return (
                      <div
                        key={cIdx}
                        className={`h-11 rounded-2xl flex items-center justify-center px-3 text-center text-[15px] sm:text-base font-extrabold border-2 transition-all shadow-xs ${colorClass}`}
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
      </div>
    </div>
  );
};
