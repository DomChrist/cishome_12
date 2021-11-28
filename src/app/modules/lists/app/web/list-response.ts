export class ListResponse<T> {
    status: number;
    statsCode: string;
    contentHolder: ContentHolder<T>;
    message: string;
    exception?: any;
}

export interface ContentHolder<T> {
    content: T;
}
