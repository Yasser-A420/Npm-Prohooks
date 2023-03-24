
export enum Method {
    "DELETE",
    "GET",
    "HEAD",
    "OPTIONS",
    "POST",
    "PUT"
}

export interface ICreateBodyOptions {
    name: string;
    url: string;
    method: Method;
    duration: string;
    payload: object;
    headers: object;
    include_details?: boolean;
}

export interface IData {
    _id: string;
    id: string;
    name: string;
    user: string;
    date: string;
    url: string;
    method: Method;
    payload: object;
    headers: object;
    duration: number;
    notify_fail: boolean;
}

export interface ICreatedData {
    error: boolean;
    message: string;
    scheduled: string;
    data: IData;
}

export interface IEditBodyOptions {
    name?: string;
    url?: string;
    method?: Method;
    duration?: string;
    payload?: object;
    headers?: object;
    include_details?: boolean;
}
