import { Tag } from "./Tag";

export interface Video {
    id : number;
    description : string;
    userId : string;
    url : string;
    tags : Tag[];
}