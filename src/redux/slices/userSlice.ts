import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    user: null,
    auth: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state,action) => {
            state.user = action.payload
        }
    }
})

export const userAction = userSlice.actions
export default userSlice.reducer