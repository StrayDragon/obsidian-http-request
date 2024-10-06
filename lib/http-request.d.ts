declare module 'obsidian-http-request' {
  interface HttpRequestOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: Buffer | string | null;
    allowedMimes?: string[];
  }

  interface HttpResponse {
    statusCode: number;
    statusMessage: string;
    headers: Record<string, string>;
    body: Buffer;
  }

  interface HttpRequestError extends Error {
    statusCode?: number;
    statusMessage?: string;
    cause?: Error;
  }

  interface HttpRequest {
    proxyPath: string;

    getRaw(url: string): Promise<Buffer>;
    getRaw(url: string, callback: (error: HttpRequestError | null, result: Buffer) => void): void;

    getBlob(url: string): Promise<Blob>;
    getBlob(url: string, callback: (error: HttpRequestError | null, result: Blob) => void): void;

    getText(url: string): Promise<string>;
    getText(url: string, callback: (error: HttpRequestError | null, result: string) => void): void;

    getJson<T = any>(url: string): Promise<T>;
    getJson<T = any>(url: string, callback: (error: HttpRequestError | null, result: T) => void): void;

    request(url: string, options?: HttpRequestOptions): Promise<Buffer>;
    request(url: string, options: HttpRequestOptions, callback: (error: HttpRequestError | null, result: Buffer) => void): void;

    getRawProxy(url: string, options?: HttpRequestOptions): Promise<Buffer>;
    getRawProxy(url: string, options: HttpRequestOptions, callback: (error: HttpRequestError | null, result: Buffer) => void): void;

    getBlobProxy(url: string, options?: HttpRequestOptions): Promise<Blob>;
    getBlobProxy(url: string, options: HttpRequestOptions, callback: (error: HttpRequestError | null, result: Blob) => void): void;

    getTextProxy(url: string, options?: HttpRequestOptions): Promise<string>;
    getTextProxy(url: string, options: HttpRequestOptions, callback: (error: HttpRequestError | null, result: string) => void): void;

    getJsonProxy<T = any>(url: string, options?: HttpRequestOptions): Promise<T>;
    getJsonProxy<T = any>(url: string, options: HttpRequestOptions, callback: (error: HttpRequestError | null, result: T) => void): void;

    requestProxy(url: string, options?: HttpRequestOptions): Promise<Buffer>;
    requestProxy(url: string, options: HttpRequestOptions, callback: (error: HttpRequestError | null, result: Buffer) => void): void;

    _operations: {
      _request: (requestUrl: string, options?: HttpRequestOptions) => Promise<HttpResponse>;
      _requestProxy: (requestUrl: string, options?: HttpRequestOptions) => Promise<HttpResponse>;
      _checkHeaders: (response: HttpResponse) => HttpResponse;
      _readBody: (response: HttpResponse) => Promise<HttpResponse>;
      _bodyToString: (response: HttpResponse) => HttpResponse;
      _bodyParseJson: (response: HttpResponse) => HttpResponse;
      _returnBody: (response: HttpResponse) => Buffer | string | any;
    };
  }

  const httpRequest: HttpRequest;

  export = httpRequest;
}