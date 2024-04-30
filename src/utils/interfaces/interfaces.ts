export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'none'
  message: string
}

export interface ICategory {
  name: string
}

export type ReportType = 'comment' | 'article'