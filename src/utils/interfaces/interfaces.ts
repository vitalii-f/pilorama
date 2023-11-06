export interface AlertProps {
  type: string
  message: string
  showAlert?(type: string, message: string | null): void
}

export interface ICategory {
  name: string
}
