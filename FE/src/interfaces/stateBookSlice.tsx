import { Book } from "./bookDetail";

export interface BookSliceState{
    listAllBook: Book[],
    listSearch: Book[],
    listFilter: Book[],
    listPaging: Book[],
    pageCurrent: Number,
    total: Number,
    sizeOfCurrentPage: Number,
    maxPage: Number,
    isLoading: boolean,
    hasError: boolean,
    isRefresh: boolean
}