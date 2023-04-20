import { Genre } from "./Genre";
import { Book } from "./bookDetail";
import { Category } from "./category";

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
    isRefresh: boolean,
    currentGenre: Genre[],
    currentPrice: Number,
    currentCategory: Category[]
}