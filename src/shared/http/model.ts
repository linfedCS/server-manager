export interface HttpClient {
    get: <T>(url: string, options?: any) => Promise<T>
    post: <T>(url: string, json?: any, options?: any) => Promise<T>
}
