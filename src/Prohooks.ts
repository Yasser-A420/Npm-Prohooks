import { ApiOptions, Data, BodyOptions, CreationData } from "./index";
export class Prohooks {
    apiKey: string
    apiUrl: string;
    constructor(apiKey: string, options?: ApiOptions) {
        this.apiKey = apiKey;
        this.apiUrl = options?.baseUrl ?? "https://api.prohooks.xyz/timers";
    }
    async create(options: BodyOptions): Promise<CreationData> {
        return new Promise(async (resolve, reject) => {
            const request = await fetch(`${this.apiUrl}/new`, { mode: "cors", headers: { authorization: this.apiKey, "Content-Type": "application/json" }, method: "PUT", body: JSON.stringify({ name: options.name, method: options.method, url: options.url, duration: options.duration, payload: options.payload, headers: options.headers, include_details: options.include_details ?? false }) });
            if (request.status >= 200 && request.status < 300) {
                const json = await request.json();
                resolve({id: json.message, scheduled: json.scheduled, error: json.error});
            } else {
                const json = await request.text();
                reject(new Error(json));
            }
        });
    }
    async get(timerId: string): Promise<Data> {
        return new Promise(async (resolve, reject) => {
            const request = await fetch(`${this.apiUrl}/timers/${timerId}`, { headers: { authorization: this.apiKey }, method: "GET" });
            if (request.status >= 200 && request.status < 300) {
                const json = await request.json() as Data;
                resolve(json);
            } else {
                const json = await request.text();
                reject(new Error(json));
            }
        });
    }
    async getAll(): Promise<Data[]>{
        return new Promise(async (resolve, reject) => {
            const request = await fetch(`${this.apiUrl}/timers/`, { headers: { authorization: this.apiKey }, method: "GET" });
            if (request.status >= 200 && request.status < 300) {
                const json = await request.json() as Data[];
                resolve(json);
            } else {
                const json = await request.text();
                reject(new Error(json));
            }
        });
    }
    async delete(timerId: string): Promise<Data> {
        return new Promise(async (resolve, reject) => {
            const request = await fetch(`${this.apiUrl}/timers/${timerId}`, { headers: { authorization: this.apiKey }, method: "DELETE" });
            if (request.status >= 200 && request.status < 300) {
                const json = await request.json() as Data;
                resolve(json);
            } else {
                const json = await request.text();
                reject(new Error(json));
            }
        });
    }
};