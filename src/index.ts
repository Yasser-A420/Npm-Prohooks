export type ApiOptions = {
    baseUrl: string;
}
export type BodyOptions = {
    name: string;
    url: string;
    method: "DELETE" | "GET" | "HEAD" | "OPTIONS" | "POST" | "PUT";
    duration: string;
    payload: object;
    headers: object;
    include_details?: boolean;
}
export type Data = {
    id: string;
    user: string;
    url: string;
    method: "DELETE" | "GET" | "HEAD" | "OPTIONS" | "POST" | "PUT";
    payload: object;
    headers: object;
    duration: number;
    notify_fail: boolean;
}
export type CreationData = {
    error: boolean;
    id: string;
    scheduled: string;
}
export { Prohooks } from "./Prohooks";