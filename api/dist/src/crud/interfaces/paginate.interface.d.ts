export interface IPaginationInput {
    limit?: number;
    page?: number;
}
export type IOptionsSelect<T> = {
    [P in keyof T]?: NonNullable<T[P]> | boolean;
};
export interface IPagination<T> {
    readonly items: T[];
    readonly total: number;
}
export interface IListQueryInput<T> {
    readonly relations?: string[];
    readonly findInput?: T | any;
    readonly where?: any;
}
