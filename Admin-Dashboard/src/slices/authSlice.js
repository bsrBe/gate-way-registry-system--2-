import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminInfo: localStorage.getItem('admininfo') ? JSON.parse(localStorage.getItem('admininfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo', JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.adminInfo = null
            localStorage.removeItem('adminInfo')
        },
    },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer