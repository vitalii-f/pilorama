import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ReportSliceProps {
  isOpened?: boolean
  target_id: number | null
  // target_text: string
}

const initialState: ReportSliceProps = {
    isOpened: false,
    target_id: null,
    // target_text: ''
}

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    openReportForm: (state, value: PayloadAction<ReportSliceProps>) => {
        state.isOpened = true
        state.target_id = value.payload.target_id
    },
    closeReportForm: (state) => {
        state.isOpened = false
    }
  },
})


export const { openReportForm, closeReportForm } = reportSlice.actions
export default reportSlice.reducer