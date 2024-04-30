import { FormikErrors, useFormik } from 'formik'
import { ReportType } from '@/utils/interfaces/interfaces'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { closeReportForm } from '@/store/comments/reportSlice'
import { DatabaseService } from '@/services/database.service'

interface ReportFormProps {
  target_id: number
  type: ReportType
}

interface ReportFormInitialProps {
  text: string
}

enum ReportTypeEnum {
  'comment' = 'комментарий',
  'article' = 'статью',
}

const ReportBackdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  position: fixed;
  left: 0;
  top: 0;

  padding: 20px;
  z-index: 50;
  background-color: var(--color-backdrop);
`

const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  width: 100%;
  max-width: 900px;
  padding: 20px 20px;

  border-radius: 10px;
  background-color: var(--color-bg-dark);
`

const ReportTitle = styled.div``

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const ReportLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ReportInput = styled.input`
  width: 100%;
`

const ReportButton = styled.button`
  && {
    height: fit-content;
    padding: 0.3em 0.6em;
  }
`

const ReportControl = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

const ReportForm = ({ target_id, type }: ReportFormProps) => {
  const dispatch = useDispatch()
  const formik = useFormik<ReportFormInitialProps>({
    initialValues: {
      text: '',
    },
    validate: (values) => {
      const errors: FormikErrors<ReportFormInitialProps> = {}
      if (!values.text) {
        errors.text = 'Обязательное поле для ввода'
      } else if (values.text.length < 5) {
        errors.text = 'Минимум 5 символов для ввода'
      }
      return errors
    },
    onSubmit: async (data) => {
      await DatabaseService.sendReport(target_id, data.text)
      dispatch(closeReportForm())
    },
  })

  const handleClose = () => {
    dispatch(closeReportForm())
  }

  return (
    <ReportBackdrop>
      <ReportWrapper>
        <ReportTitle>
          <h3>Жалоба на {ReportTypeEnum[type]}</h3>
          {/* <blockquote>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
            reiciendis eum tenetur temporibus maxime deserunt?
          </blockquote> */}
        </ReportTitle>
        <StyledForm onSubmit={formik.handleSubmit}>
          <ReportLabel>
            <p>Текст жалобы:</p>
            <ReportInput
              type='text'
              name='text'
              autoComplete='off'
              onChange={formik.handleChange}
            />
          </ReportLabel>
          <ReportControl>
            <ReportButton type='reset' onClick={handleClose}>
              Отмена
            </ReportButton>
            <ReportButton type='submit'>Отправить</ReportButton>
          </ReportControl>
        </StyledForm>
      </ReportWrapper>
    </ReportBackdrop>
  )
}

export default ReportForm
