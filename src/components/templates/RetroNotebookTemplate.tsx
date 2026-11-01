import React from 'react';
import type { ScheduleData } from '../../types/schedule';
import { getSlotSubject } from '../../utils/scheduleUtils';

interface TemplateProps {
  data: ScheduleData;
}

export const RetroNotebookTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { title = "Weekly Schedule", subtitle = "", days = [], sections = [] } = data;

  return (
    <div 
      id="schedule-canvas-retro"
      className="relative w-[1050px] min-h-[720px] bg-[#fbf8ee] text-[#2c2724] p-8 select-none font-patrick shadow-2xl rounded-lg border-2 border-[#e3d8be] overflow-hidden"
      style={{ 
        boxSizing: 'border-box',
        backgroundImage: 'radial-gradient(#d3c7aa 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      {/* Washi Tape top header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-6 bg-amber-200/60 -rotate-1 border-t border-b border-amber-300/80 shadow-xs pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-dashed border-[#bdae93]">
        <div className="flex items-baseline gap-3">
          <h1 className="text-4xl font-bold tracking-wide text-[#433830]">
            📓 {title}
          </h1>
          {subtitle && (
            <span className="text-2xl text-[#786c5e] font-caveat">
              / {subtitle}
            </span>
          )}
        </div>
        <div className="text-sm font-sans font-semibold text-[#8b7d6b] bg-[#ede5d1] px-3 py-1 rounded">
          HỌC TẬP & KẾ HOẠCH
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex flex-col gap-3">
        {/* Days Header */}
        <div className="grid grid-flow-col gap-2 items-center" style={{ gridTemplateColumns: `150px repeat(${days.length}, minmax(0, 1fr))` }}>
          <div className="text-center font-bold text-sm text-[#786c5e] uppercase tracking-wider">Thời gian</div>
          {days.map((day, idx) => (
            <div 
              key={idx} 
              className="bg-[#eee5ce] text-[#3e342b] h-11 flex items-center justify-center px-2 rounded text-center font-black text-lg border border-[#d6c7a7] shadow-xs"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, sIdx) => (
          <React.Fragment key={sIdx}>
            {sIdx > 0 && (
              <div className="my-1 border-t-2 border-dashed border-[#cfbe9e] w-full flex items-center justify-center">
                {section.label && (
                  <span className="bg-[#fbf8ee] px-4 text-xs font-bold text-[#8b7d6b] uppercase tracking-widest -mt-2.5">
                    {section.label}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2">
              {section.slots.map((slot, rIdx) => (
                <div 
                  key={rIdx} 
                  className="grid grid-flow-col gap-2 items-center" 
                  style={{ gridTemplateColumns: `150px repeat(${days.length}, minmax(0, 1fr))` }}
                >
                  <div className="bg-[#fdfcf7] border border-[#d6c7a7] text-[#554b41] h-11 px-2 rounded text-[15px] sm:text-base font-mono font-black flex items-center justify-center text-center shadow-xs">
                    {slot.time}
                  </div>

                  {days.map((day, cIdx) => {
                    const subject = getSlotSubject(slot, day, cIdx);
                    const hasSubject = Boolean(subject && subject.trim());

                    return (
                      <div
                        key={cIdx}
                        className={`h-11 rounded flex items-center justify-center px-2 text-center text-[16px] sm:text-[17px] transition-all border ${
                          hasSubject 
                            ? 'bg-[#ffffff] border-[#c0b090] text-[#2c2724] font-black shadow-xs' 
                            : 'bg-transparent border-dashed border-[#dfd4bd] text-[#b3a58e]'
                        }`}
                      >
                        <span className="truncate w-full">{subject || '···'}</span>
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
