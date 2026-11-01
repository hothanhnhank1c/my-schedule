import { toPng, toJpeg, toBlob } from 'html-to-image';

export interface ExportOptions {
  pixelRatio?: number;
  quality?: number;
  fileName?: string;
}

export async function downloadScheduleAsPng(
  element: HTMLElement, 
  options: ExportOptions = {}
): Promise<void> {
  const { pixelRatio = 2, fileName = 'thoi-khoa-bieu.png' } = options;
  
  // Wait for fonts to be ready
  if (document.fonts) {
    await document.fonts.ready;
  }

  const dataUrl = await toPng(element, {
    pixelRatio,
    cacheBust: true,
    style: {
      transform: 'none', // reset any preview zoom scale
      margin: '0',
    }
  });

  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}

export async function downloadScheduleAsJpeg(
  element: HTMLElement, 
  options: ExportOptions = {}
): Promise<void> {
  const { pixelRatio = 2, quality = 0.95, fileName = 'thoi-khoa-bieu.jpg' } = options;

  if (document.fonts) {
    await document.fonts.ready;
  }

  const dataUrl = await toJpeg(element, {
    pixelRatio,
    quality,
    cacheBust: true,
    backgroundColor: '#ffffff',
    style: {
      transform: 'none',
      margin: '0',
    }
  });

  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}

export async function copyScheduleToClipboard(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<boolean> {
  const { pixelRatio = 2 } = options;

  if (document.fonts) {
    await document.fonts.ready;
  }

  const blob = await toBlob(element, {
    pixelRatio,
    cacheBust: true,
    style: {
      transform: 'none',
      margin: '0',
    }
  });

  if (!blob) {
    throw new Error('Không thể tạo blob ảnh');
  }

  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob })
  ]);

  return true;
}

