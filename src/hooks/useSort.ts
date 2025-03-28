import { MedalData } from '@/config/type';
import { sortMedalData } from '@/utils/sort';

export const useSort = (medalData: MedalData[], sortParameter: string) => {
  sortMedalData(medalData, sortParameter);

  return sortMedalData;
};