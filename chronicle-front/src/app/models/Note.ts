import { Tag } from './Tag';

export interface Note {
    id: number;
    description: string;
    userId: string;
    url: string;
    tags: Tag[];
}
