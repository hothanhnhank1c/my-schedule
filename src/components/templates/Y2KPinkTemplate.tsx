import React from 'react';
import type { ScheduleData } from '../../types/schedule';
import { getSlotSubject } from '../../utils/scheduleUtils';

interface TemplateProps {
  data: ScheduleData;
}

export const Y2KPinkTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { title = "Weekly Schedule", subtitle = "", days = [], sections = [] } = data;

  return (
    <div 
      id="schedule-canvas-y2k"
      className="relative w-[1050px] min-h-[720px] bg-gradient-to-br from-[#ffe5ec] via-[#f72585]/10 to-[#ffb3c1] text-[#4a044e] p-8 select-none font-sans shadow-2xl rounded-3xl border-4 border-[#ff007f] overflow-hidden"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Y2K Starburst & Sparkle Accents */}
      <div className="absolute top-2 left-6 text-3xl select-none animate-pulse">✦ 💖</div>
      <div className="absolute top-3 right-8 text-3xl select-none animate-pulse">✨ 💅</div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6 px-4">
        <div className="w-24 text-center">
          <span className="text-xs font-mono font-bold bg-[#ff007f] text-white px-2.5 py-1 rounded-full uppercase tracking-widest shadow-md">
            Y2K POP
          </span>
        </div>

        {/* Center Title */}
        <div className="text-center">
          <h1 
            className="text-5xl font-black tracking-tight text-[#ff007f] font-baloo uppercase italic"
            style={{ 
              textShadow: '3px 3px 0px #ffe5ec, 5px 5px 0px #f72585',
              letterSpacing: '1px'
            }}
          >
            {title}
          </h1>
          <p className="text-xs font-mono font-bold text-[#b5179e] tracking-widest uppercase mt-1">
            ★ BABE ENERGY TIMETABLE ★
          </p>
        </div>

        {/* Subtitle / Owner Name */}
        <div className="min-w-28 text-right">
          {subtitle && (
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#ff007f] to-[#7209b7] text-white rounded-full text-sm font-extrabold shadow-lg shadow-pink-500/30 uppercase tracking-wider font-mono">
              ★ {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Days Header */}
        <div className="grid grid-flow-col gap-2.5 items-center" style={{ gridTemplateColumns: `135px repeat(${days.length}, minmax(0, 1fr))` }}>
          <div className="h-11 rounded-xl bg-white border-2 border-[#ff007f] flex items-center justify-center text-xs font-black text-[#ff007f] uppercase tracking-wider shadow-sm">
            TIME
          </div>
          {days.map((day, idx) => (
            <div
              key={idx}
              className="h-11 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#f72585] text-white flex items-center justify-center font-black text-sm tracking-wide shadow-md uppercase border border-pink-300"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, sIdx) => (
          <React.Fragment key={sIdx}>
            {/* Y2K Divider Bar */}
            {sIdx > 0 && (
              <div className="my-1.5 h-6 bg-gradient-to-r from-[#ff007f] via-[#f72585] to-[#7209b7] rounded-xl w-full shadow-md flex items-center justify-center">
                {section.label && (
                  <span className="text-xs font-black text-white tracking-widest uppercase font-mono">
                    ★ {section.label} ★
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2">
              {section.slots.map((slot, rIdx) => (
                <div 
                  key={rIdx} 
                  className="grid grid-flow-col gap-2.5 items-center" 
                  style={{ gridTemplateColumns: `135px repeat(${days.length}, minmax(0, 1fr))` }}
                >
                  {/* Time Badge */}
                  <div className="h-10 rounded-xl bg-white border-2 border-[#ffb3c1] text-[#7209b7] flex items-center justify-center font-mono font-black text-xs tracking-tight shadow-sm px-2">
                    {slot.time}
                  </div>

                  {/* Day Slots */}
                  {days.map((day, cIdx) => {
                    const subject = getSlotSubject(slot, day, cIdx);
                    const hasSubject = Boolean(subject && subject.trim());

                    return (
                      <div
                        key={cIdx}
                        className={`h-10 rounded-xl flex items-center justify-center px-3 text-center text-xs font-bold transition-all shadow-xs ${
                          hasSubject
                            ? 'bg-white border-2 border-[#ff007f] text-[#ff007f] font-black'
                            : 'bg-white/40 border border-pink-200 text-transparent'
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
        <div className="mt-2 h-6 bg-gradient-to-r from-[#ff007f] via-[#f72585] to-[#7209b7] rounded-xl w-full shadow-md"></div>
      </div>
    </div>
  );
};

