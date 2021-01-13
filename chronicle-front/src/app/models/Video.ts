import { Tag } from './Tag';

export interface Video {
    id: number;
    description: string;
    userId: any;
    url: string;
    tags: Tag[];
}
