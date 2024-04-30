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