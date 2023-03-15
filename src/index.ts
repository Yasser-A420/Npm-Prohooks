export type ApiOptions = {
    baseUrl: string;
}
export type CreateBodyOptions = {
    name: string;
    url: string;
    method: "DELETE" | "GET" | "HEAD" | "OPTIONS" | "POST" | "PUT";
    duration: string;
    payload: object;
    headers: object;
    include_details?: boolean;
}
export type Data = {
    _id: string;
    id: string;
    name: string;
    user: string;
    date: string;
    url: string;
    method: "DELETE" | "GET" | "HEAD" | "OPTIONS" | "POST" | "PUT";
    payload: object;
    headers: object;
    duration: number;
    notify_fail: boolean;
}
export type CreatedData = {
    error: boolean;
    message: string;
    scheduled: string;
    data: Data;
}
export type EditBodyOptions = {
    name?: string;
    url?: string;
    method?: "DELETE" | "GET" | "HEAD" | "OPTIONS" | "POST" | "PUT";
    duration?: string;
    payload?: object;
    headers?: object;
    include_details?: boolean;
}
export { Prohooks } from "./Prohooks";
