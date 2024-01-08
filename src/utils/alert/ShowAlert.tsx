import { AlertProps } from '@/utils/interfaces/interfaces'
import { Alert } from '@mui/material'

export interface ShowAlertProps {
  ({}: AlertProps): void
}

export const showAlert = (type: 'success' | 'error' | 'warning' | 'none', message: string, setAlert: ShowAlertProps) => {
  if (type === 'success')
    return (
      <Alert
        onClose={() => setAlert({ type: 'none', message: '' })}
        severity='success'
      >
        {message}
      </Alert>
    )
  if (type === 'error')
    return (
      <Alert
        onClose={() => setAlert({ type: 'none', message: '' })}
        severity='error'
      >
        {message}
      </Alert>
    )
}