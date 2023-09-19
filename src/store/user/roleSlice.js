import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
    name: 'role',
    initialState: {
        value: 'default',
    },
    reducers: {
        setRole: (state) => {
            console.log(state.value)
        }
    }
})

export const { setRole } = roleSlice.actions
export default roleSlice.reducer