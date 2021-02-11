import { Tag } from './Tag';

export interface Note {
    id: number;
    description: string;
    title: string;
    date: string;
    userId: string;
    url: string;
    tags: Tag[];
    whitelist: any[];
    isPrivate: boolean;
}
