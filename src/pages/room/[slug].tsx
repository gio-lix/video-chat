import React, {useCallback, useEffect, useState} from 'react';
import ReactPlayer from 'react-player'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {createOffer, sendStream} from "../../util/peer";
import {socketActions} from "../../redux/slices/socketSlice";

const RoomId = () => {
    const [myStream, setMyStream] = useState<any>(null)
    const {user, socket} = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const getMediaStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        setMyStream(stream)
    }, [])

    const handleCallAccepted = useCallback(async (data: any) => {
        const offer = await createOffer()
        console.log(data)
    },[])


    useEffect(() => {
        if (!socket) return
        socket.socket.on("call_accepted", handleCallAccepted)
        return () => {
            socket.socket.off("call_accepted")
        }
    }, [socket.socket])


    useEffect(() => {
        if (!user.user) return
        const handleUserJoin = async () => {
            const offer = await createOffer()
            socket.socket.emit("call_user", {user: user.user, offer})
            dispatch(socketActions.setRemoveEmail(user.user))
        }
        handleUserJoin()
    }, [user.user, socket.socket])

    useEffect(() => {
        getMediaStream()
    },[getMediaStream])




    return (
        <div>
            <h4>You are connected to {socket.remoteEmail}</h4>
            <button onClick={e => sendStream(myStream)}>
                Send My video
            </button>
            <ReactPlayer url={myStream} playing muted />
            <ReactPlayer url={socket.remoteStream} playing  />
        </div>
    );
};

export default RoomId;