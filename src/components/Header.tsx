import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-pink-400 to-amber-300 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/10">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Calendar className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">Schedule Generator</h1>
            <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> JSON to Image
            </span>
          </div>
          <p className="text-xs text-slate-400">Tạo thời khóa biểu đẹp mắt từ dữ liệu JSON và xuất ảnh chuẩn nét</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400 hidden sm:inline-block">
          Hỗ trợ xuất ảnh PNG siêu nét 2K/Retina
        </span>
      </div>
    </header>
  );
};

