export type ApiListResponse<T> = {
  total: number;
  items: T[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApiClient {
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}