import { IData, ICreateBodyOptions, ICreatedData, IEditBodyOptions } from "./index";
import { request } from "undici";

export class ProHooks {
    readonly #apiKey: string
    readonly #apiUrl: string;

    constructor(apiKey: string, baseUrl?: string) {
        this.#apiKey = apiKey;
        this.#apiUrl = baseUrl ?? "https://api.prohooks.xyz";
    }

    public get apiKey(): string {
        return this.#apiKey;
    }

    public get apiUrl(): string {
        return this.#apiUrl;
    }

    public async create(options: ICreateBodyOptions): Promise<ICreatedData> {
        return new Promise<ICreatedData>(async (resolve, reject): Promise<void> => {
            if(!options)
                reject(new Error("No options provided!"));

            const response = await request(`${this.#apiUrl}/timers/new`, { headers: { authorization: this.#apiKey, "Content-Type": "application/errorText" }, method: "PUT", body: JSON.stringify({ name: options.name, method: options.method, url: options.url, duration: options.duration, payload: options.payload, headers: options.headers, include_details: options.include_details ?? false }) });

            if (response.statusCode >= 200 && response.statusCode < 300)
                resolve(await response.body.json() as ICreatedData);

            reject(new Error(await response.body.text()));
        });
    }

    public async edit(timerId: string, options: IEditBodyOptions): Promise<IData> {
        return new Promise<IData>(async (resolve, reject): Promise<void> => {
            if(!timerId)
                reject(new Error("No timerId provided!"));

            if(!options)
                reject(new Error("No options provided!"));

            const response = await request(`${this.#apiUrl}/timers/${timerId}`, { headers: { authorization: this.#apiKey, "Content-Type": "application/errorText" }, method: "PATCH", body: JSON.stringify({ name: options.name, method: options.method, url: options.url, duration: options.duration, payload: options.payload, headers: options.headers, include_details: options.include_details }) });

            if (response.statusCode >= 200 && response.statusCode < 300)
                resolve( await response.body.json() as IData);

            reject(new Error(await response.body.text()));
        });
    }

    public async get(timerId: string): Promise<IData> {
        return new Promise<IData>(async (resolve, reject): Promise<void> => {
            if(!timerId)
                reject(new Error("No timerId provided!"));

            const response = await request(`${this.#apiUrl}/timers/${timerId}`, { headers: { authorization: this.#apiKey }, method: "GET" });

            if (response.statusCode >= 200 && response.statusCode < 300)
                resolve(await response.body.json() as IData);

            reject(new Error(await response.body.text()));
        });
    }

    public async getAll(): Promise<Array<IData>>{
        return new Promise<Array<IData>>(async (resolve, reject): Promise<void> => {
            const response = await request(`${this.#apiUrl}/timers/`, { headers: { authorization: this.#apiKey }, method: "GET" });

            if (response.statusCode >= 200 && response.statusCode < 300)
                resolve(await response.body.json() as Array<IData>);

            reject(new Error(await response.body.text()));
        });
    }

    public async delete(timerId: string): Promise<IData> {
        return new Promise(async (resolve, reject): Promise<void> => {
            if(!timerId)
                reject(new Error("No timerId provided!"));

            const response = await request(`${this.#apiUrl}/timers/${timerId}`, { headers: { authorization: this.#apiKey }, method: "DELETE" });

            if (response.statusCode >= 200 && response.statusCode < 300)
                resolve(await response.body.json() as IData);

            reject(new Error(await response.body.text()));
        });
    }

}
