export interface ScheduleSlot {
  time: string;
  subjects?: string[]; // Array of subject names for each day
  [key: string]: any;   // Or keyed by day name (e.g. "Monday", "Mon", "Thứ Hai", etc.)
}

export interface ScheduleSection {
  name: string; // e.g., "morning", "afternoon", "evening"
  label?: string; // e.g. "Buổi Sáng", "Buổi Chiều"
  slots: ScheduleSlot[];
}

export interface ScheduleData {
  title: string;
  subtitle?: string;
  days: string[];
  sections: ScheduleSection[];
  theme?: string;
  note?: string;
}

export type TemplateId = 
  | 'pastel-rainbow' 
  | 'sakura-blossom'
  | 'strawberry-milk'
  | 'coquette-ribbon'
  | 'y2k-pink'
  | 'kawaii-lavender' 
  | 'minimal-clean' 
  | 'dark-neon' 
  | 'retro-notebook';

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  previewColor: string;
  category?: 'pink' | 'other';
}
