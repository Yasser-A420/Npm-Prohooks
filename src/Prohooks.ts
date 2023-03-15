import { ApiOptions, Data, CreateBodyOptions, CreatedData, EditBodyOptions } from "./index";
import { request } from "undici";
export class Prohooks {
    apiKey: string
    apiUrl: string;
    constructor(apiKey: string, options?: ApiOptions) {
        this.apiKey = apiKey;
        this.apiUrl = options?.baseUrl ?? "https://api.prohooks.xyz";
    }
    async create(options: CreateBodyOptions): Promise<CreatedData> {
        return new Promise(async (resolve, reject) => {
            if(!options) return reject(new Error("No options provided!"));
            const response = await request(`${this.apiUrl}/timers/new`, { headers: { authorization: this.apiKey, "Content-Type": "application/json" }, method: "PUT", body: JSON.stringify({ name: options.name, method: options.method, url: options.url, duration: options.duration, payload: options.payload, headers: options.headers, include_details: options.include_details ?? false }) });
            if (response.statusCode >= 200 && response.statusCode < 300) {
                const json = await response.body.json() as CreatedData;
                resolve(json);
            } else {
                const json = await response.body.text();
                reject(new Error(json));
            }
        });
    }
    async edit(timerId: string, options: EditBodyOptions): Promise<Data> {
        return new Promise(async (resolve, reject) => {
            if(!timerId) return reject(new Error("No timerId provided!"));
            if(!options) return reject(new Error("No options provided!"));
            const response = await request(`${this.apiUrl}/timers/${timerId}`, { headers: { authorization: this.apiKey, "Content-Type": "application/json" }, method: "PATCH", body: JSON.stringify({ name: options.name, method: options.method, url: options.url, duration: options.duration, payload: options.payload, headers: options.headers, include_details: options.include_details }) });
            if (response.statusCode >= 200 && response.statusCode < 300) {
                const json = await response.body.json() as Data;
                resolve(json);
            } else {
                const json = await response.body.text();
                reject(new Error(json));
            }
        });
    }
    async get(timerId: string): Promise<Data> {
        return new Promise(async (resolve, reject) => {
            if(!timerId) return reject(new Error("No timerId provided!"));
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
    async delete(timerId: string): Promise<Data> {
        return new Promise(async (resolve, reject) => {
            if(!timerId) return reject(new Error("No timerId provided!"));
            const response = await request(`${this.apiUrl}/timers/${timerId}`, { headers: { authorization: this.apiKey }, method: "DELETE" });
            if (response.statusCode >= 200 && response.statusCode < 300) {
                const json = await response.body.json() as Data;
                resolve(json);
            } else {
                const json = await response.body.text();
                reject(new Error(json));
            }
        });
    }
};
