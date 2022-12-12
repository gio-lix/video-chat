import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import socketSlice from "./slices/socketSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
    socket: socketSlice,
    user: userSlice
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})


type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector

export default store