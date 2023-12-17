import { Example } from "./example";

export type LocalProblem = {
    id: string;
    title: string;
    problemStatement: string;
    examples : Example[];
    constraints: string;
    order: number;
    starterCode: string;
    handlerFunction: ((fn: any) => boolean) | string;
    starterFunctionName: string;
}

export type DbProblem = {
    id : string,
    title: string,
    category: string,
    difficulty: string,
    videoId?: string,
    link?: string,
    order: number,
    likes: number,
    disLikes: number
}
