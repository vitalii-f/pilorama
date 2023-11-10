import { Timestamp } from 'firebase/firestore'

export interface INews {
  news: IGetedArticle[]
  newsCount: number
}

export interface ICreatedArticle {
  author: string | null | undefined
  category: string[]
  creation_date: Date
  id?: number
  imgURL: any
  text: string
  title: string
}

export interface IGetedArticle {
  author: string | null | undefined
  category: string[]
  creation_date: Timestamp
  id: number
  imgURL: any
  text: string
  title: string
}
