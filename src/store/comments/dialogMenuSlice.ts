import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface DialogMenuProps {
  id: number | null
}

const initialState: DialogMenuProps = {
  id: null,
}

export const dialogMenuSlice = createSlice({
  name: 'dialogMenu',
  initialState,
  reducers: {
    setRedactingComment: (state, value: PayloadAction<DialogMenuProps>) => {
      state.id = value.payload.id
    },
  },
})

export const { setRedactingComment } = dialogMenuSlice.actions
export default dialogMenuSlice.reducer
