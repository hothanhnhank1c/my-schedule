import React, { useState } from 'react';
import type { TemplateConfig, TemplateId } from '../types/schedule';
import { TEMPLATES } from '../data/presets';
import { Palette, Check, Heart, Sparkles } from 'lucide-react';

interface Props {
  selectedTemplate: TemplateId;
  onSelect: (id: TemplateId) => void;
}

export const TemplatePicker: React.FC<Props> = ({ selectedTemplate, onSelect }) => {
  const [filter, setFilter] = useState<'all' | 'pink' | 'other'>('all');

  const filteredTemplates = TEMPLATES.filter(tpl => {
    if (filter === 'all') return true;
    return tpl.category === filter;
  });

  const pinkCount = TEMPLATES.filter(t => t.category === 'pink').length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
      {/* Header & Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-pink-400" />
          <h2 className="text-sm font-bold text-slate-200">Chọn Template / Giao diện</h2>
          <span className="text-xs text-slate-400 font-mono">({TEMPLATES.length} mẫu)</span>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
              filter === 'all'
                ? 'bg-slate-800 text-cyan-300 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('pink')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
              filter === 'pink'
                ? 'bg-pink-950/60 text-pink-300 border border-pink-700/60 shadow-xs'
                : 'text-pink-400/80 hover:text-pink-300'
            }`}
          >
            <Heart className="w-3 h-3 fill-current" />
            <span>Tone Hồng ({pinkCount})</span>
          </button>
          <button
            onClick={() => setFilter('other')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
              filter === 'other'
                ? 'bg-slate-800 text-indigo-300 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Khác</span>
          </button>
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {filteredTemplates.map((tpl: TemplateConfig) => {
          const isSelected = tpl.id === selectedTemplate;
          const isPink = tpl.category === 'pink';

          return (
            <button
              key={tpl.id}
              onClick={() => onSelect(tpl.id)}
              className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? isPink
                    ? 'border-pink-400 bg-pink-950/25 shadow-md shadow-pink-500/10 ring-1 ring-pink-400/50'
                    : 'border-cyan-400 bg-cyan-950/20 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                  : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              {/* Color gradient banner preview */}
              <div className={`h-2.5 w-full rounded-md bg-gradient-to-r ${tpl.previewColor} mb-2 shadow-xs`} />
              
              <div className="flex items-start justify-between gap-1">
                <span className={`text-xs font-bold block ${
                  isSelected 
                    ? isPink ? 'text-pink-300' : 'text-cyan-300' 
                    : 'text-slate-200'
                }`}>
                  {tpl.name}
                </span>
                {isSelected && (
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    isPink ? 'bg-pink-400 text-slate-950' : 'bg-cyan-400 text-slate-950'
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {tpl.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
