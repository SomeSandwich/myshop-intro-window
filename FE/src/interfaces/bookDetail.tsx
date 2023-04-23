export interface Book {
    id: Number;
    price: Number;
    discount: Number;
    title: string;
    description: string;
    mediaPath: string;
    createAt: string;
    updateAt: string;
    quantity: Number;
    status: string;
    categoryId: Number;
    author: string;
    publisher: string;
    publicationDate: string;
    coverType: string;
    categoryDescription: string;
    numPages: Number;
}
export interface AddBookWithForm {
    id: Number;
    price: Number;
    discount: Number;
    title: string;
    description: string;
    mediaPath: File | null;
    createAt: string;
    updateAt: string;
    quantity: Number;
    status: string;
    categoryId: Number;
    author: string;
    publisher: string;
    publicationDate: string;
    coverType: string;
    categoryDescription: string;
    numPages: Number;
}

export interface BookOption{
    label: string;
    value: Number;
}