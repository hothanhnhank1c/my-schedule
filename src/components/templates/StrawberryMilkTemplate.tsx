import React from 'react';
import type { ScheduleData } from '../../types/schedule';
import { getSlotSubject } from '../../utils/scheduleUtils';

interface TemplateProps {
  data: ScheduleData;
}

export const StrawberryMilkTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { title = "Weekly Schedule", subtitle = "", days = [], sections = [] } = data;

  // Alternating cute strawberry palette
  const getColColor = (idx: number) => {
    return idx % 2 === 0
      ? 'bg-[#ffccd5] border border-[#ffb3c1] text-[#a4133c]'
      : 'bg-[#ffe5ec] border border-[#ffccd5] text-[#c9184a]';
  };

  return (
    <div
      id="schedule-canvas-strawberry"
      className="relative w-[1050px] min-h-[720px] bg-[#fff5f7] text-[#590d22] p-8 select-none font-baloo shadow-2xl rounded-3xl border-4 border-[#ffb3c1] overflow-hidden"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Background polka dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#ff758f 2px, transparent 2px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6 px-4">
        {/* Left cute badge */}
        <div className="flex items-center gap-1.5 bg-white/90 border-2 border-[#ffb3c1] px-3.5 py-1.5 rounded-2xl shadow-xs">
          <span className="text-xl">🍓</span>
          <span className="text-xs font-bold font-sans text-[#c9184a] uppercase tracking-wider">Sweet Berry</span>
        </div>

        {/* Center Title */}
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-extrabold tracking-wide text-[#ff4d6d] drop-shadow-sm flex items-center gap-2">
            <span>🍓</span> {title} <span>🥛</span>
          </h1>
          <span className="text-xs font-sans font-bold text-[#ff758f] tracking-widest uppercase mt-0.5">
            STRAWBERRY MILK SCHEDULE
          </span>
        </div>

        {/* Subtitle / Owner Name */}
        <div className="min-w-28 text-right">
          {subtitle && (
            <span className="inline-block px-4 py-1.5 bg-[#ff4d6d] text-white rounded-2xl text-base font-bold shadow-md shadow-pink-500/20 font-sans tracking-wide">
              {subtitle} ♡
            </span>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Days Header */}
        <div className="grid grid-flow-col gap-2.5 items-center" style={{ gridTemplateColumns: `150px repeat(${days.length}, minmax(0, 1fr))` }}>
          <div className="h-12 rounded-2xl bg-white border-2 border-[#ffb3c1] flex items-center justify-center text-xs font-black text-[#c9184a] uppercase tracking-wider font-sans shadow-xs">
            Thời Gian ⏰
          </div>
          {days.map((day, idx) => (
            <div
              key={idx}
              className="h-12 rounded-2xl bg-[#ff758f] text-white flex items-center justify-center font-black text-base tracking-wide shadow-xs border-2 border-[#ff4d6d]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, sIdx) => (
          <React.Fragment key={sIdx}>
            {/* Strawberry Cream Divider Bar */}
            {sIdx > 0 && (
              <div className="my-1.5 h-6 bg-[#ff8fa3] rounded-2xl w-full shadow-inner flex items-center justify-center border-2 border-[#ff758f]">
                {section.label && (
                  <span className="text-xs font-bold text-white tracking-widest font-sans uppercase">
                    🍓 {section.label} 🍓
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2">
              {section.slots.map((slot, rIdx) => (
                <div
                  key={rIdx}
                  className="grid grid-flow-col gap-2.5 items-center"
                  style={{ gridTemplateColumns: `150px repeat(${days.length}, minmax(0, 1fr))` }}
                >
                  {/* Time Badge */}
                  <div className="h-11 rounded-2xl bg-white border-2 border-[#ffccd5] text-[#800f2f] flex items-center justify-center font-black text-[15px] sm:text-base tracking-tight shadow-xs px-2 font-sans">
                    {slot.time}
                  </div>

                  {/* Day Slots */}
                  {days.map((day, cIdx) => {
                    const subject = getSlotSubject(slot, day, cIdx);
                    const colorStyle = getColColor(cIdx);

                    return (
                      <div
                        key={cIdx}
                        className={`h-11 rounded-2xl flex items-center justify-center px-3 text-center text-[18px] font-black shadow-xs transition-transform leading-tight overflow-hidden ${colorStyle}`}
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

        {/* Bottom Accent Bar */}
        <div className="mt-2 h-6 bg-[#ff8fa3] rounded-2xl w-full shadow-inner border-2 border-[#ff758f]"></div>
      </div>
    </div>
  );
};

