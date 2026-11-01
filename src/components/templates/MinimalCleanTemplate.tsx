import React from 'react';
import type { ScheduleData } from '../../types/schedule';
import { getSlotSubject } from '../../utils/scheduleUtils';

interface TemplateProps {
  data: ScheduleData;
}

export const MinimalCleanTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { title = "Weekly Schedule", subtitle = "", days = [], sections = [] } = data;

  return (
    <div 
      id="schedule-canvas-minimal"
      className="relative w-[1050px] min-h-[720px] bg-slate-50 text-slate-900 p-8 select-none font-sans shadow-2xl rounded-2xl border border-slate-200"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Header */}
      <div className="flex items-end justify-between border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">TIMETABLE & AGENDA</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mt-0.5">{title}</h1>
        </div>
        {subtitle && (
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-slate-900 text-white rounded-md text-sm font-semibold tracking-wide">
              {subtitle}
            </span>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="flex flex-col gap-4">
        {/* Days Header */}
        <div className="grid grid-flow-col gap-2.5 items-center" style={{ gridTemplateColumns: `150px repeat(${days.length}, minmax(0, 1fr))` }}>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-2">Khung giờ</div>
          {days.map((day, idx) => (
            <div key={idx} className="bg-slate-200 text-slate-900 py-3 px-2 rounded-lg text-center font-extrabold text-base tracking-wide">
              {day}
            </div>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="flex flex-col gap-2">
            {section.label && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                  {section.label}
                </span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>
            )}

            {section.slots.map((slot, rIdx) => (
              <div 
                key={rIdx} 
                className="grid grid-flow-col gap-2.5 items-center" 
                style={{ gridTemplateColumns: `150px repeat(${days.length}, minmax(0, 1fr))` }}
              >
                <div className="bg-white border border-slate-200 h-11 px-3 rounded-lg text-[15px] sm:text-base font-extrabold text-slate-800 flex items-center justify-center text-center shadow-xs">
                  {slot.time}
                </div>

                {days.map((day, cIdx) => {
                  const subject = getSlotSubject(slot, day, cIdx);
                  const hasSubject = Boolean(subject && subject.trim());
                  return (
                    <div
                      key={cIdx}
                      className={`h-11 rounded-lg flex items-center justify-center px-3 text-center text-[15px] sm:text-base border transition-all ${
                        hasSubject 
                          ? 'bg-white border-indigo-200 text-indigo-950 shadow-sm font-extrabold border-l-4 border-l-indigo-600' 
                          : 'bg-slate-100/60 border-slate-200/60 text-slate-400'
                      }`}
                    >
                      <span className="truncate w-full">{subject || '—'}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
