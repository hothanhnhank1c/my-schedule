import React from 'react';
import type { ScheduleData } from '../../types/schedule';
import { getSlotSubject } from '../../utils/scheduleUtils';

interface TemplateProps {
  data: ScheduleData;
}

export const DarkNeonTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { title = "Weekly Schedule", subtitle = "", days = [], sections = [] } = data;

  const colGradients = [
    'border-pink-500/50 bg-pink-950/20 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.15)]',
    'border-cyan-500/50 bg-cyan-950/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]',
    'border-purple-500/50 bg-purple-950/20 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.15)]',
    'border-amber-500/50 bg-amber-950/20 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.15)]',
    'border-emerald-500/50 bg-emerald-950/20 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.15)]',
    'border-blue-500/50 bg-blue-950/20 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.15)]',
  ];

  return (
    <div 
      id="schedule-canvas-neon"
      className="relative w-[1050px] min-h-[720px] bg-slate-950 text-slate-100 p-8 select-none font-sans shadow-2xl rounded-2xl border border-slate-800 overflow-hidden"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-3 h-8 bg-gradient-to-b from-cyan-400 to-pink-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)]"></div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-mono tracking-wider mt-0.5">// CYBER TIMETABLE MATRIX</p>
          </div>
        </div>

        {subtitle && (
          <div className="px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 font-mono text-sm shadow-[0_0_12px_rgba(6,182,212,0.25)]">
            {subtitle}
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Days Header */}
        <div className="grid grid-flow-col gap-2.5 items-center" style={{ gridTemplateColumns: `150px repeat(${days.length}, minmax(0, 1fr))` }}>
          <div className="text-xs font-mono font-bold text-slate-500 tracking-wider pl-2 uppercase">TIME_SLOT</div>
          {days.map((day, idx) => (
            <div 
              key={idx} 
              className="h-11 flex items-center justify-center px-3 rounded-lg text-center font-black text-base tracking-wide bg-slate-900 border border-slate-700 text-slate-200"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, sIdx) => (
          <React.Fragment key={sIdx}>
            {sIdx > 0 && (
              <div className="my-1.5 h-1.5 w-full bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 rounded-full blur-[0.5px]"></div>
            )}

            <div className="flex flex-col gap-2">
              {section.slots.map((slot, rIdx) => (
                <div 
                  key={rIdx} 
                  className="grid grid-flow-col gap-2.5 items-center" 
                  style={{ gridTemplateColumns: `150px repeat(${days.length}, minmax(0, 1fr))` }}
                >
                  <div className="bg-slate-900/90 border border-slate-800 text-cyan-400 h-11 px-2 rounded-lg text-[15px] sm:text-base font-mono font-black flex items-center justify-center text-center">
                    {slot.time}
                  </div>

                  {days.map((day, cIdx) => {
                    const subject = getSlotSubject(slot, day, cIdx);
                    const hasSubject = Boolean(subject && subject.trim());
                    const styleClass = colGradients[cIdx % colGradients.length];

                    return (
                      <div
                        key={cIdx}
                        className={`h-11 rounded-lg flex items-center justify-center px-3 text-center text-[15px] sm:text-base transition-all ${
                          hasSubject 
                            ? `${styleClass} font-extrabold` 
                            : 'bg-slate-900/40 border-slate-800/60 text-slate-600'
                        }`}
                      >
                        <span className="truncate w-full">{subject || '---'}</span>
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
