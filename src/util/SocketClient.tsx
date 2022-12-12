import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {useNavigate} from "react-router-dom";
import {userAction} from "../redux/slices/userSlice";
import {createAnswer,  peer} from "./peer";
import {socketActions} from "../redux/slices/socketSlice";

const SocketClient = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {socket} = useAppSelector((state) => state.socket )

    const handleTrackEvent = useCallback( (e: any) => {
        const stream = e.streams
        dispatch(socketActions.setRemoteStream(stream[0]))
    },[])

    const handleNegotiationneeded = useCallback(async () => {
        const localOffer = peer.localDescription
        socket.emit("call_user", {email:socket.remoteEmail , offer: localOffer})
    },[])

    const handleAnswer = useCallback(async (data: any) => {
        const {from, offer} = data
        const answer = await createAnswer(offer)
        socket.emit("call_accepted", {email: from, answer })
        dispatch(socketActions.setRemoveEmail(from))
    },[socket, dispatch])

    useEffect(() => {
        if (!socket) return
        socket.on("joined_room", (data: {roomId: string }) => {
            const {roomId} = data
            navigate(`/room/${roomId}`)
        })
        return () => {socket.off("joined_room")}
    },[socket])

    useEffect(() => {
        if (!socket) return
        socket.on("user_joined", (data: {email: string}) => {
            const {email} = data
            dispatch(userAction.setUser(email))
        })
        return () => {socket.off("user_joined")}
    },[socket, dispatch])

    useEffect(() => {
        if (!socket) return
        socket.on("incoming_call", handleAnswer)
        return () => {socket.off("incoming_call", handleAnswer)}
    },[socket])



    useEffect(() => {
        peer.addEventListener("track", handleTrackEvent)
        peer.addEventListener("negotiationneeded", handleNegotiationneeded )
        return () => {
            peer.removeEventListener("track" , handleTrackEvent)
            peer.removeEventListener("negotiationneeded", handleNegotiationneeded)
        }
    },[handleTrackEvent, socket, dispatch, peer])

    return (
        <>

        </>
    );
};

export default SocketClient;