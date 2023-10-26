import { Alert, AlertTitle } from '@mui/material'

interface ErrorPageProps {
  errorCode: string
}

const ErrorPage: React.FunctionComponent<ErrorPageProps> = ({ errorCode }) => {
  return (
    <>
        <Alert severity="error" className='mx-auto mt-10'>
            <AlertTitle>Ошибка {errorCode}</AlertTitle>
            This is an error alert — <strong>check it out!</strong>
        </Alert>
    </>
  )
}

export default ErrorPage