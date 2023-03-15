import { ApiOptions, Data, BodyOptions, CreatedOrDeletedData } from "./index";
import { request } from "undici";
export class Prohooks {
    apiKey: string
    apiUrl: string;
    constructor(apiKey: string, options?: ApiOptions) {
        this.apiKey = apiKey;
        this.apiUrl = options?.baseUrl ?? "https://api.prohooks.xyz/timers";
    }
    async create(options: BodyOptions): Promise<CreatedOrDeletedData> {
        return new Promise(async (resolve, reject) => {
            const response = await request(`${this.apiUrl}/new`, { headers: { authorization: this.apiKey, "Content-Type": "application/json" }, method: "PUT", body: JSON.stringify({ name: options.name, method: options.method, url: options.url, duration: options.duration, payload: options.payload, headers: options.headers, include_details: options.include_details ?? false }) });
            if (response.statusCode >= 200 && response.statusCode < 300) {
                const json = await response.body.json() as any;
                resolve({message: json.message, scheduled: json.scheduled, error: json.error});
            } else {
                const json = await response.body.text();
                reject(new Error(json));
            }
        });
    }
    async get(timerId: string): Promise<Data> {
        return new Promise(async (resolve, reject) => {
            const response = await request(`${this.apiUrl}/timers/${timerId}`, { headers: { authorization: this.apiKey }, method: "GET" });
            if (response.statusCode >= 200 && response.statusCode < 300) {
                const json = await response.body.json() as Data;
                resolve(json);
            } else {
                const json = await response.body.text();
                reject(new Error(json));
            }
        });
    }
    async getAll(): Promise<Data[]>{
        return new Promise(async (resolve, reject) => {
            const response = await request(`${this.apiUrl}/timers/`, { headers: { authorization: this.apiKey }, method: "GET" });
            if (response.statusCode >= 200 && response.statusCode < 300) {
                const json = await response.body.json() as Data[];
                resolve(json);
            } else {
                const json = await response.body.text();
                reject(new Error(json));
            }
        });
    }
    async delete(timerId: string): Promise<CreatedOrDeletedData> {
        return new Promise(async (resolve, reject) => {
            const response = await request(`${this.apiUrl}/timers/${timerId}`, { headers: { authorization: this.apiKey }, method: "DELETE" });
            if (response.statusCode >= 200 && response.statusCode < 300) {
                const json = await response.body.json() as any;
                resolve({message: json.message, scheduled: "Cancelled", error: json.error});
            } else {
                const json = await response.body.text();
                reject(new Error(json));
            }
        });
    }
};
