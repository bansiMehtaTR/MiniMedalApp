import { MedalData } from '@/config/type';
import { StatusCode } from '@/config/constant';

export const fetchMedalData = async (): Promise<MedalData[]> => {
  try {
    const response = await fetch('/api/medalData');
    if (response.status !== StatusCode.OK) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};