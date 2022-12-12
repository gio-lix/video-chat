import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Socket} from "socket.io-client";


const initialState = {
    socket: null as any,
    remoteStream: null as any,
    remoteEmail: null as any
}

type State = typeof initialState

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state: State, action: PayloadAction<Socket>) => {
            state.socket = action.payload
        },
        setRemoteStream: (state:State, action) => {
            state.remoteStream = action.payload
        },
        setRemoveEmail: (state:State, action) => {
            state.remoteEmail = action.payload
        }
    }
})

export const socketActions = socketSlice.actions;
export default socketSlice.reducer