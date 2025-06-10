// Интерфейс для отображения пользователя в UI (трансформированная модель)
export interface IUserView {
  id: string;
  displayName: string; // например, name + email
  memberSince: Date;
}

// Интерфейс для отображения поста в UI
export interface IPostView {
  id: string;
  authorName: string;
  headline: string;
  summary: string;
  date: Date;
}