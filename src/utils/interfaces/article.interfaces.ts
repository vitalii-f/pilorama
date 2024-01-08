import { Tables } from "./Supabase.interfaces"

export interface NewsProps {
  news: Tables<'news_articles'>[] | null
  newsCount: number | null
}

export enum NewsStatus {
  loading = 'loading',
  loaded = 'loaded',
  reject = 'reject'
}

export interface CategoriesOptions {
  value: string
  label: string
}

// export interface ArticleProps {
//   author: string
//   categories: string[]
//   creation_date: string
//   id: number
//   imgURL: string
//   text: string
//   title: string
// }
