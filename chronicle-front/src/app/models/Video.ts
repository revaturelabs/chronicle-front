import { Tag } from './Tag';

export interface Video {
    id: number;
    description: string;
    title: string;
    date: string;
    userId: any;
    displayName: string;
    url: string;
    tags: Tag[];
    whitelist: any[];
    private: boolean;
}
