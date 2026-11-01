import React, { useRef, useState } from 'react';
import type { ScheduleData, TemplateId } from '../types/schedule';
import { TemplateRenderer } from './TemplateRenderer';
import { 
  downloadScheduleAsPng, 
  downloadScheduleAsJpeg, 
  copyScheduleToClipboard 
} from '../utils/exportImage';
import { 
  Download, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Loader2,
  FileImage,
  Sparkles
} from 'lucide-react';

interface Props {
  templateId: TemplateId;
  data: ScheduleData;
}

export const PreviewSection: React.FC<Props> = ({ templateId, data }) => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number>(0.75); // default comfortable preview zoom
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportType, setExportType] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const cleanFilename = (ext: string) => {
    const title = data.title ? data.title.toLowerCase().replace(/[^a-z0-9]/gi, '_') : 'schedule';
    const sub = data.subtitle ? `_${data.subtitle.toLowerCase().replace(/[^a-z0-9]/gi, '_')}` : '';
    return `${title}${sub}.${ext}`;
  };

  const handleExportPng = async () => {
    if (!captureRef.current || isExporting) return;
    try {
      setIsExporting(true);
      setExportType('png');
      await downloadScheduleAsPng(captureRef.current, {
        pixelRatio: 2, // 2x crisp retina output
        fileName: cleanFilename('png'),
      });
    } catch (err) {
      console.error('Lỗi khi xuất ảnh PNG:', err);
      alert('Có lỗi khi tạo ảnh PNG: ' + String(err));
    } finally {
      setIsExporting(false);
      setExportType('');
    }
  };

  const handleExportJpeg = async () => {
    if (!captureRef.current || isExporting) return;
    try {
      setIsExporting(true);
      setExportType('jpeg');
      await downloadScheduleAsJpeg(captureRef.current, {
        pixelRatio: 2,
        quality: 0.95,
        fileName: cleanFilename('jpg'),
      });
    } catch (err) {
      console.error('Lỗi khi xuất ảnh JPG:', err);
      alert('Có lỗi khi tạo ảnh JPG: ' + String(err));
    } finally {
      setIsExporting(false);
      setExportType('');
    }
  };

  const handleCopyClipboard = async () => {
    if (!captureRef.current || isExporting) return;
    try {
      setIsExporting(true);
      setExportType('clipboard');
      await copyScheduleToClipboard(captureRef.current, { pixelRatio: 2 });
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch (err) {
      console.error('Lỗi khi sao chép ảnh:', err);
      alert('Không thể sao chép trực tiếp vào bộ nhớ tạm: ' + String(err));
    } finally {
      setIsExporting(false);
      setExportType('');
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col h-full">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Xem trước ảnh kết quả (Live Preview)
          </h2>
          <span className="text-[11px] text-slate-400">
            Kích thước chuẩn 1050px • Xuất nét gấp đôi (2X Retina)
          </span>
        </div>

        {/* Export & Copy buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-800/80 border border-slate-700/70 rounded-lg p-0.5 mr-1">
            <button
              onClick={() => setZoom(Math.max(0.4, Number((zoom - 0.1).toFixed(2))))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono text-slate-300 px-2 min-w-12 text-center select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(1.2, Number((zoom + 0.1).toFixed(2))))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Phóng to"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(0.75)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Vừa màn hình (75%)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Copy to clipboard */}
          <button
            onClick={handleCopyClipboard}
            disabled={isExporting}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 flex items-center gap-1.5 font-medium transition-all active:scale-95 disabled:opacity-50"
            title="Copy ảnh vào clipboard để dán trực tiếp Ctrl+V"
          >
            {isExporting && exportType === 'clipboard' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            ) : copySuccess ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-indigo-400" />
            )}
            <span>{copySuccess ? 'Đã sao chép!' : 'Sao chép ảnh'}</span>
          </button>

          {/* Download JPEG */}
          <button
            onClick={handleExportJpeg}
            disabled={isExporting}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 flex items-center gap-1.5 font-medium transition-all active:scale-95 disabled:opacity-50"
          >
            {isExporting && exportType === 'jpeg' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            ) : (
              <FileImage className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>Tải JPG</span>
          </button>

          {/* Download PNG (Primary) */}
          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className="text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isExporting && exportType === 'png' ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <Download className="w-4 h-4 stroke-[2.5]" />
            )}
            <span>Tải ảnh PNG (2X)</span>
          </button>
        </div>
      </div>

      {/* Visual Canvas Container with scroll & zoom transform */}
      <div className="flex-1 overflow-auto rounded-xl bg-slate-950/70 border border-slate-800/80 p-6 flex items-start justify-center min-h-[480px]">
        <div 
          style={{ 
            transform: `scale(${zoom})`, 
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="shrink-0"
        >
          {/* This wrapper element is captured by html-to-image */}
          <div ref={captureRef} className="inline-block shadow-2xl">
            <TemplateRenderer templateId={templateId} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};
