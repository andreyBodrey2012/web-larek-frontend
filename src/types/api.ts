// Универсальный тип ответа API с пагинацией
export type ApiListResponse<T> = {
  total: number;
  items: T[];
};

// HTTP методы для POST-запросов
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Интерфейс API-клиента
export interface IApiClient {
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}