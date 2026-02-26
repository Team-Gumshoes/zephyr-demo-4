import { TipsResponseData } from "./response-data";

export interface TravelTips {
  id: string;
  transportTips: string;
  whenToVisitTips: string;
  safetyTips: string;
}

const SAMPLE_TIPS: TravelTips[] = [
  {
    id: 'string1',
    transportTips: 'Some transport tips here',
    whenToVisitTips: 'Some whenToVisitTips here',
    safetyTips: 'Some safetyTips here',
  },
  {
    id: 'string2',
    transportTips: 'Some more transport tips here',
    whenToVisitTips: 'Some more whenToVisitTips here',
    safetyTips: 'Some more safetyTips here',
  },
];


export const SAMPLE_TIPS_RESPONSE: TipsResponseData = {
  type: 'tips',
  options: SAMPLE_TIPS,
};
