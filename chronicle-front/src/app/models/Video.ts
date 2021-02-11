import { Tag } from './Tag';

export interface Video {
    id: number;
    description: string;
    title: string;
    date: string;
    userId: any;
    url: string;
    tags: Tag[];
    whitelist: any[];
    isPrivate: boolean;
}
