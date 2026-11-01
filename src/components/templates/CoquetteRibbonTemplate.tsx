import React from 'react';
import type { ScheduleData } from '../../types/schedule';
import { getSlotSubject } from '../../utils/scheduleUtils';

interface TemplateProps {
  data: ScheduleData;
}

export const CoquetteRibbonTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { title = "Weekly Schedule", subtitle = "", days = [], sections = [] } = data;

  return (
    <div 
      id="schedule-canvas-coquette"
      className="relative w-[1050px] min-h-[720px] bg-[#fffafb] text-[#702434] p-8 select-none font-mali shadow-2xl rounded-2xl border-4 border-double border-[#f4abbd] overflow-hidden"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Corner Bow Accents */}
      <div className="absolute top-3 left-4 text-2xl select-none opacity-80">🎀</div>
      <div className="absolute top-3 right-4 text-2xl select-none opacity-80">🎀</div>
      <div className="absolute bottom-3 left-4 text-2xl select-none opacity-80">🩰</div>
      <div className="absolute bottom-3 right-4 text-2xl select-none opacity-80">🩰</div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center justify-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xl text-[#f4abbd]">୨୧</span>
          <h1 className="text-4xl font-bold tracking-wide text-[#b5179e] font-mali drop-shadow-xs">
            {title}
          </h1>
          <span className="text-xl text-[#f4abbd]">୨୧</span>
        </div>

        {subtitle && (
          <span className="text-base font-semibold text-[#c75d7b] mt-1 bg-[#fff0f3] px-5 py-0.5 rounded-full border border-dashed border-[#f4abbd]">
            ༺ {subtitle} ༻
          </span>
        )}
      </div>

      {/* Main Grid */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Days Header */}
        <div className="grid grid-flow-col gap-2.5 items-center" style={{ gridTemplateColumns: `135px repeat(${days.length}, minmax(0, 1fr))` }}>
          <div className="h-10 rounded-xl bg-[#fff0f3] border border-[#f8bcc9] flex items-center justify-center text-xs font-bold text-[#b5179e] tracking-wider uppercase font-sans">
            Timeline
          </div>
          {days.map((day, idx) => (
            <div
              key={idx}
              className="h-10 rounded-xl bg-[#ffd6df] text-[#702434] border border-[#f4abbd] flex items-center justify-center font-bold text-sm tracking-wide shadow-xs"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, sIdx) => (
          <React.Fragment key={sIdx}>
            {/* Delicate Ribbon Divider Bar */}
            {sIdx > 0 && (
              <div className="my-1.5 h-5 bg-[#fce7ed] rounded-xl w-full border border-dashed border-[#f4abbd] flex items-center justify-center">
                {section.label && (
                  <span className="text-[11px] font-bold text-[#b5179e] tracking-widest font-sans uppercase">
                    ୨୧ {section.label} ୨୧
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
                  <div className="h-10 rounded-xl bg-white border border-[#f8bcc9] text-[#702434] flex items-center justify-center font-bold text-xs tracking-tight shadow-xs px-2 font-sans">
                    {slot.time}
                  </div>

                  {/* Day Slots */}
                  {days.map((day, cIdx) => {
                    const subject = getSlotSubject(slot, day, cIdx);
                    const hasSubject = Boolean(subject && subject.trim());

                    return (
                      <div
                        key={cIdx}
                        className={`h-10 rounded-xl flex items-center justify-center px-3 text-center text-xs font-bold shadow-xs transition-all ${
                          hasSubject
                            ? 'bg-[#fff0f3] border border-[#f8bcc9] text-[#702434]'
                            : 'bg-white/40 border border-dashed border-[#fae1e6] text-transparent'
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
        <div className="mt-2 h-5 bg-[#fce7ed] rounded-xl w-full border border-dashed border-[#f4abbd]"></div>
      </div>
    </div>
  );
};

