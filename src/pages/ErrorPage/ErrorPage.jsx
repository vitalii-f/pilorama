import { Alert, AlertTitle } from '@mui/material'
import { PropTypes } from 'prop-types';

function ErrorPage({errorCode = null}) {
  return (
    <>
        <Alert severity="error" className='mx-auto mt-10'>
            <AlertTitle>Ошибка {errorCode}</AlertTitle>
            This is an error alert — <strong>check it out!</strong>
        </Alert>
    </>
  )
}

ErrorPage.propTypes = {
    errorCode: PropTypes.string
}

export default ErrorPage