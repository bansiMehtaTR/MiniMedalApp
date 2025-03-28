import { SortType } from '@/config/constant';
import { MedalData } from '@/config/type';

export const sortMedalData = (data: MedalData[], sort: string): MedalData[] => {
  return [...data].sort((a, b) => {
    if (sort.toLocaleLowerCase() === SortType.TOTAL) {
      return (b.total ?? 0) - (a.total ?? 0) || b.gold - a.gold;
    } else if (sort.toLocaleLowerCase() === SortType.GOLD) {
      return b.gold - a.gold || b.silver - a.silver;
    } else if (sort.toLocaleLowerCase() === SortType.SILVER) {
      return b.silver - a.silver || b.gold - a.gold;
    } else if (sort.toLocaleLowerCase() === SortType.BRONZE) {
      return b.bronze - a.bronze || b.gold - a.gold;
    }
    return 0;
  });
};