import { useState } from 'react';
import { Header } from './components/Header';
import { TemplatePicker } from './components/TemplatePicker';
import { JsonEditor } from './components/JsonEditor';
import { PreviewSection } from './components/PreviewSection';
import { PRESET_DEFAULT_LINHCHI } from './data/presets';
import type { ScheduleData, TemplateId } from './types/schedule';

export function App() {
  const [templateId, setTemplateId] = useState<TemplateId>('pastel-rainbow');
  const [scheduleData, setScheduleData] = useState<ScheduleData>(PRESET_DEFAULT_LINHCHI);
  const [jsonString, setJsonString] = useState<string>(() => 
    JSON.stringify(PRESET_DEFAULT_LINHCHI, null, 2)
  );
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleJsonChange = (newVal: string) => {
    setJsonString(newVal);
    try {
      const parsed = JSON.parse(newVal);
      setScheduleData(parsed);
      setJsonError(null);
      // If template/theme is defined inside JSON, optionally update
      if (parsed.theme && ['pastel-rainbow', 'minimal-clean', 'dark-neon', 'kawaii-lavender', 'retro-notebook'].includes(parsed.theme)) {
        setTemplateId(parsed.theme as TemplateId);
      }
    } catch (err: any) {
      setJsonError(err.message || 'Cú pháp JSON không hợp lệ');
    }
  };

  const handleApplyParsed = (data: ScheduleData) => {
    setScheduleData(data);
    setJsonError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1720px] w-full mx-auto p-4 sm:p-6 flex flex-col gap-5">
        {/* Template Selector Bar */}
        <TemplatePicker 
          selectedTemplate={templateId} 
          onSelect={(id) => setTemplateId(id)} 
        />

        {/* Main 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-start">
          {/* Left Column: JSON Editor (5 cols) */}
          <div className="lg:col-span-5 h-full">
            <JsonEditor 
              jsonString={jsonString}
              onChange={handleJsonChange}
              onApplyParsed={handleApplyParsed}
              error={jsonError}
            />
          </div>

          {/* Right Column: Live Preview & Export (7 cols) */}
          <div className="lg:col-span-7 h-full">
            <PreviewSection 
              templateId={templateId} 
              data={scheduleData} 
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-6 text-center text-xs text-slate-400">
        <p>Schedule Generator • Tạo ảnh thời khóa biểu tự động từ JSON • Hỗ trợ đầy đủ tiếng Việt có dấu</p>
      </footer>
    </div>
  );
}

export default App;
