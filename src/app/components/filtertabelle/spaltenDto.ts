export interface SpaltenDto<T> {
    mappingName: keyof T;
    header: string;
    filterbar?: boolean;
    sortierbar?: boolean;
}