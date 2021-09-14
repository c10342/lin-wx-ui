import CancelToken from "../cancel/CancelToken";

export type RespondData = WechatMiniprogram.RequestSuccessCallbackResult<
  string | WechatMiniprogram.IAnyObject | ArrayBuffer
>;

export type RequestConfig =
  | XhrRequestConfig
  | DownloadRequestConfig
  | UploadRequestConfig;

export interface Respond {
  data: RespondData;
  status: number;
  statusText: string;
  config: RequestConfig;
  request: WechatMiniprogram.RequestTask;
}

export interface CommonRequestConfig {
  url: string;
  timeout?: number;
  validateStatus?: (respond: Respond) => boolean;
  transformRequest: Array<(data: any) => any> | ((data: any) => any);
  transformRespond?:
    | Array<(data: RespondData) => RespondData>
    | ((data: RespondData) => RespondData);

  adapter?: (config: RequestConfig) => Function;
  headers?: any;
  baseURL?: string;
  cancelToken: CancelToken;
  data?: any;
}

export interface XhrRequestConfig extends CommonRequestConfig {
  method?:
    | "options"
    | "get"
    | "head"
    | "post"
    | "put"
    | "delete"
    | "trace"
    | "connect"
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT";
  dataType?: "json" | "其他";
  responseType?: "text" | "arraybuffer";
  enableHttp2?: boolean;
  enableQuic?: boolean;
  enableCache?: boolean;
}
export interface DownloadRequestConfig extends CommonRequestConfig {
  onDownloadProgress?: (
    respond: WechatMiniprogram.DownloadTaskOnProgressUpdateCallbackResult
  ) => void;
  filePath: string;
  method?: "download";
}

export interface UploadRequestConfig extends CommonRequestConfig {
  onUploadProgress?: (
    respond: WechatMiniprogram.UploadTaskOnProgressUpdateCallbackResult
  ) => void;
  filePath: string;
  name: string;
  method?: "upload";
}
