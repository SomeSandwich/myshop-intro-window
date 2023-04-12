import { Book } from "./bookDetail";

export interface BookSliceState{
    allBook: Book[],
    listSearch: Book[],
    listFilter: Book[],
    isLoading: boolean,
    hasError: boolean
}