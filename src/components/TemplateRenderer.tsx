import React from 'react';
import type { ScheduleData, TemplateId } from '../types/schedule';
import { PastelRainbowTemplate } from './templates/PastelRainbowTemplate';
import { SakuraBlossomTemplate } from './templates/SakuraBlossomTemplate';
import { StrawberryMilkTemplate } from './templates/StrawberryMilkTemplate';
import { CoquetteRibbonTemplate } from './templates/CoquetteRibbonTemplate';
import { Y2KPinkTemplate } from './templates/Y2KPinkTemplate';
import { KawaiiLavenderTemplate } from './templates/KawaiiLavenderTemplate';
import { MinimalCleanTemplate } from './templates/MinimalCleanTemplate';
import { DarkNeonTemplate } from './templates/DarkNeonTemplate';
import { RetroNotebookTemplate } from './templates/RetroNotebookTemplate';

interface Props {
  templateId: TemplateId;
  data: ScheduleData;
}

export const TemplateRenderer: React.FC<Props> = ({ templateId, data }) => {
  switch (templateId) {
    case 'pastel-rainbow':
      return <PastelRainbowTemplate data={data} />;
    case 'sakura-blossom':
      return <SakuraBlossomTemplate data={data} />;
    case 'strawberry-milk':
      return <StrawberryMilkTemplate data={data} />;
    case 'coquette-ribbon':
      return <CoquetteRibbonTemplate data={data} />;
    case 'y2k-pink':
      return <Y2KPinkTemplate data={data} />;
    case 'kawaii-lavender':
      return <KawaiiLavenderTemplate data={data} />;
    case 'minimal-clean':
      return <MinimalCleanTemplate data={data} />;
    case 'dark-neon':
      return <DarkNeonTemplate data={data} />;
    case 'retro-notebook':
      return <RetroNotebookTemplate data={data} />;
    default:
      return <PastelRainbowTemplate data={data} />;
  }
};
