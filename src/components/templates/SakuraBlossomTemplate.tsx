import React from 'react';
import type { ScheduleData } from '../../types/schedule';
import { getSlotSubject } from '../../utils/scheduleUtils';

interface TemplateProps {
  data: ScheduleData;
}

export const SakuraBlossomTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { title = "Weekly Schedule", subtitle = "", days = [], sections = [] } = data;

  return (
    <div 
      id="schedule-canvas-sakura"
      className="relative w-[1050px] min-h-[720px] bg-[#fff7f9] text-[#831843] p-8 select-none font-comfortaa shadow-2xl rounded-3xl border-2 border-[#fbcfe8] overflow-hidden"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Decorative Sakura Petals SVG */}
      <div className="absolute top-2 left-4 pointer-events-none opacity-70">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          {/* Petal 1 */}
          <path d="M20 10 C35 5, 45 25, 25 35 C15 30, 10 15, 20 10 Z" fill="#fda4af" opacity="0.8" transform="rotate(-15 20 20)" />
          {/* Petal 2 */}
          <path d="M60 20 C75 15, 85 35, 65 45 C55 40, 50 25, 60 20 Z" fill="#fecdd3" opacity="0.9" transform="rotate(25 60 30)" />
          {/* Petal 3 */}
          <path d="M95 8 C105 5, 112 18, 102 24 C95 21, 92 12, 95 8 Z" fill="#fda4af" opacity="0.6" transform="rotate(-40 95 15)" />
        </svg>
      </div>

      <div className="absolute top-3 right-6 pointer-events-none opacity-70">
        <svg width="100" height="70" viewBox="0 0 100 70" fill="none">
          <path d="M30 15 C45 10, 55 30, 35 40 C25 35, 20 20, 30 15 Z" fill="#fda4af" opacity="0.7" transform="rotate(45 30 25)" />
          <path d="M70 25 C82 20, 90 35, 75 42 C68 38, 65 30, 70 25 Z" fill="#fecdd3" opacity="0.85" transform="rotate(-20 70 30)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6 px-4">
        <div className="w-24 text-2xl">🌸</div>

        {/* Center Title */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-rose-400 text-lg">✿</span>
            <h1 className="text-4xl font-bold tracking-wide text-[#be185d] font-pacifico drop-shadow-xs">
              {title}
            </h1>
            <span className="text-rose-400 text-lg">✿</span>
          </div>
          <p className="text-[11px] font-sans font-semibold tracking-widest text-[#db2777] uppercase mt-0.5">
            SPRING SAKURA TIMETABLE
          </p>
        </div>

        {/* Subtitle / Name */}
        <div className="min-w-28 text-right">
          {subtitle && (
            <span className="inline-block px-4 py-1 rounded-full bg-[#fce7f3] border border-[#fbcfe8] text-base font-bold text-[#9d174d] font-caveat shadow-xs">
              🌸 {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Days Header */}
        <div className="grid grid-flow-col gap-2.5 items-center" style={{ gridTemplateColumns: `135px repeat(${days.length}, minmax(0, 1fr))` }}>
          <div className="h-10 rounded-full bg-[#fdf2f8] border border-[#fbcfe8] flex items-center justify-center text-xs font-bold text-[#be185d] tracking-wider uppercase font-sans">
            Giờ học
          </div>
          {days.map((day, idx) => (
            <div
              key={idx}
              className="h-11 rounded-full bg-gradient-to-r from-[#fbcfe8] to-[#f472b6] text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-xs"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, sIdx) => (
          <React.Fragment key={sIdx}>
            {/* Sakura Blossom Divider Bar */}
            {sIdx > 0 && (
              <div className="my-1.5 h-5 bg-gradient-to-r from-[#fbcfe8] via-[#fda4af] to-[#fbcfe8] rounded-full w-full opacity-90 shadow-xs flex items-center justify-center">
                {section.label && (
                  <span className="text-[11px] font-bold text-rose-900 tracking-wider font-sans uppercase">
                    ❀ {section.label} ❀
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {section.slots.map((slot, rIdx) => (
                <div 
                  key={rIdx} 
                  className="grid grid-flow-col gap-2.5 items-center" 
                  style={{ gridTemplateColumns: `135px repeat(${days.length}, minmax(0, 1fr))` }}
                >
                  {/* Time Badge */}
                  <div className="h-10 rounded-full bg-[#fce7f3] border border-[#fbcfe8] text-[#9d174d] flex items-center justify-center font-bold text-xs tracking-tight shadow-xs px-2 font-sans">
                    {slot.time}
                  </div>

                  {/* Day Slots */}
                  {days.map((day, cIdx) => {
                    const subject = getSlotSubject(slot, day, cIdx);
                    const hasSubject = Boolean(subject && subject.trim());

                    return (
                      <div
                        key={cIdx}
                        className={`h-10 rounded-full flex items-center justify-center px-3 text-center text-xs font-bold shadow-xs transition-all ${
                          hasSubject
                            ? 'bg-[#ffe4e6] border border-[#fecdd3] text-[#9f1239]'
                            : 'bg-[#fff1f2]/60 border border-[#ffe4e6]/70 text-transparent'
                        }`}
                        title={subject}
                      >
                        <span className="truncate w-full">{subject || '•'}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}

        {/* Bottom Accent Bar */}
        <div className="mt-2 h-5 bg-gradient-to-r from-[#fbcfe8] via-[#fda4af] to-[#fbcfe8] rounded-full w-full opacity-90 shadow-xs"></div>
      </div>
    </div>
  );
};

