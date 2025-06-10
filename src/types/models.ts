// Пример модели пользователя, пришедшей с API
export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: string; // ISO дата
}

// Пример модели поста
export interface IPost {
  id: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: string;
}