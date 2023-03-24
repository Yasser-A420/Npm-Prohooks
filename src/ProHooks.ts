import { IData, ICreateBodyOptions, ICreatedData, IEditBodyOptions } from "./index";
import { request } from "undici";

/**
 * A class representing a client for the Prohooks API.
 */
export class ProHooks {
    readonly #apiKey: string
    readonly #apiUrl: string;

    /**
     * Constructs a new ProhooksClient instance.
     * @param apiKey Your Prohooks API key.
     * @param baseUrl The base URL of the Prohooks API. Defaults to "https://api.prohooks.xyz".
     */
    constructor(apiKey: string, baseUrl?: string) {
        this.#apiKey = apiKey;
        this.#apiUrl = baseUrl ?? "https://api.prohooks.xyz";
    }

    /**
     * Gets the API key used by this client.
     * @returns The API key used by this client.
     */
    public get apiKey(): string {
        return this.#apiKey;
    }

    /**
     * Gets the base URL of the Prohooks API used by this client.
     * @returns The base URL of the Prohooks API used by this client.
     */
    public get apiUrl(): string {
        return this.#apiUrl;
    }

    /**
     * Creates a new timer.
     * @param options An object containing options for the new timer.
     * @returns A Promise that resolves with an object containing the new timer's data.
     * @throws An error if there is an error creating the timer.
     */
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

    /**
     * Edits an existing timer.
     * @param timerId The ID of the timer to edit.
     * @param options An object containing options for the updated timer.
     * @returns A Promise that resolves with an object containing the updated timer's data.
     * @throws An error if there is an error editing the timer.
     */
    public async edit(timerId: string, options: IEditBodyOptions): Promise<IData> {
        return new Promise<IData>(async (resolve, reject): Promise<void> => {
            if(!timerId)
                reject(new Error("No timerId provided!"));

            if(!options)
                reject(new Error("No options provided!"));

            const response = await request(`${this.#apiUrl}/timers/${timerId}`, { headers: { authorization: this.#apiKey, "Content-Type": "application/errorText" }, method: "PATCH", body: JSON.stringify({ name: options.name, method: options.method, url: options.url, duration: options.duration, payload: options.payload, headers: options.headers, include_details: options.include_details }) });

            if (response.statusCode >= 200 && response.statusCode < 300)
                resolve(await response.body.json() as IData);

            reject(new Error(await response.body.text()));
        });
    }

    /**
     * Gets a timer by ID.
     * @param timerId The ID of the timer to get.
     * @returns A Promise that resolves with an object containing the timer's data.
     * @throws An error if there is an error getting the timer.
     */
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

    /**
     * Gets all timers.
     * @returns A Promise that resolves with an array of objects, each containing data for a timer.
     * @throws An error if there is an error getting the timers.
     */
    public async getAll(): Promise<Array<IData>>{
        return new Promise<Array<IData>>(async (resolve, reject): Promise<void> => {
            const response = await request(`${this.#apiUrl}/timers/`, { headers: { authorization: this.#apiKey }, method: "GET" });

            if (response.statusCode >= 200 && response.statusCode < 300)
                resolve(await response.body.json() as Array<IData>);

            reject(new Error(await response.body.text()));
        });
    }

    /**
     * Deletes a timer by ID.
     * @param timerId The ID of the timer to delete.
     * @returns A Promise that resolves with an object containing the deleted timer's data.
     * @throws An error if there is an error deleting the timer.
     */
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
