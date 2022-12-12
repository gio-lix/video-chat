import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import AuthLayout from "./layout/AuthLayout";
import io from "socket.io-client"
import {useAppDispatch} from "./redux/store";
import SocketClient from "./util/SocketClient";
import RoomId from "./pages/room/[slug]";
import JoinRoom from "./pages/Login";
import {socketActions} from "./redux/slices/socketSlice";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const socket = io("http://localhost:9001")
        dispatch(socketActions.setSocket(socket))
        return () => {socket.close()}
    },[dispatch])


    return (
        <>
            <SocketClient/>
            <Routes>
                <Route path="/login" element={<JoinRoom />}/>
                <Route path="/" element={<AuthLayout/>}>
                    <Route index path='/' element={<Home/>}/>
                    <Route path="/room/:id" element={<RoomId />}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
