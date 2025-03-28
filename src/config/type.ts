import { StatusCode } from "./constant";

export interface MedalData {
    code: string;
    gold: number;
    silver: number;
    bronze: number;
    total?: number;
    flagIndex?: number;
}

export interface FetchMedalData {
    medalData: MedalData[];
    status: StatusCode;
}