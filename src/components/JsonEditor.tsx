import React, { useRef } from 'react';
import { PRESET_DEFAULT_LINHCHI, PRESET_UNIVERSITY } from '../data/presets';
import type { ScheduleData } from '../types/schedule';
import { 
  Code2, 
  Sparkles, 
  Upload, 
  Download, 
  RotateCcw, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface Props {
  jsonString: string;
  onChange: (val: string) => void;
  onApplyParsed: (data: ScheduleData) => void;
  error: string | null;
}

export const JsonEditor: React.FC<Props> = ({ 
  jsonString, 
  onChange, 
  onApplyParsed, 
  error 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      onChange(formatted);
      onApplyParsed(parsed);
    } catch (e: any) {
      // Keep string, error will display
    }
  };

  const handleLoadPreset = (presetType: string) => {
    let presetData: ScheduleData = PRESET_DEFAULT_LINHCHI;
    if (presetType === 'university') {
      presetData = PRESET_UNIVERSITY;
    }
    const formatted = JSON.stringify(presetData, null, 2);
    onChange(formatted);
    onApplyParsed(presetData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        try {
          const parsed = JSON.parse(content);
          onChange(JSON.stringify(parsed, null, 2));
          onApplyParsed(parsed);
        } catch (err: any) {
          onChange(content);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schedule.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col h-full">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-200">Dữ liệu JSON</h2>
          {error ? (
            <span className="flex items-center gap-1 text-[11px] text-rose-400 bg-rose-950/40 border border-rose-800/60 px-2 py-0.5 rounded-md">
              <AlertCircle className="w-3 h-3" /> Lỗi cú pháp
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3 h-3" /> Hợp lệ
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Preset selector */}
          <select
            onChange={(e) => handleLoadPreset(e.target.value)}
            defaultValue="linhchi"
            className="text-xs bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="linhchi">📋 Mẫu ảnh: Linh Chi</option>
            <option value="university">🎓 Mẫu: Sinh viên ĐH</option>
          </select>

          {/* Format button */}
          <button
            onClick={handleFormat}
            title="Định dạng lại code JSON"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Format</span>
          </button>

          {/* Import JSON */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".json" 
            className="hidden" 
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Tải lên file .json từ máy tính"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Nhập file</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleDownloadJson}
            title="Lưu file .json về máy"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Lưu JSON</span>
          </button>

          {/* Reset button */}
          <button
            onClick={() => handleLoadPreset('linhchi')}
            title="Khôi phục mẫu gốc"
            className="text-xs text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Error alert if any */}
      {error && (
        <div className="mb-2 p-2.5 bg-rose-950/50 border border-rose-800/80 rounded-lg text-xs text-rose-300 font-mono flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
          <div className="overflow-x-auto">
            <strong>Lỗi JSON: </strong>{error}
          </div>
        </div>
      )}

      {/* Editor textarea */}
      <div className="relative flex-1 min-h-[360px] lg:min-h-[480px]">
        <textarea
          value={jsonString}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-full h-full bg-slate-950 text-slate-200 font-mono text-xs sm:text-[13px] leading-relaxed p-3.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500/60 resize-none font-medium selection:bg-cyan-500/30"
          placeholder="Nhập hoặc dán chuỗi JSON vào đây..."
        />
      </div>

      {/* Tips at bottom */}
      <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Mẹo: Bạn có thể chỉnh sửa trực tiếp tên môn, giờ học, tên người dùng.</span>
      </div>
    </div>
  );
};
