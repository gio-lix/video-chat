import React, { useState} from 'react';
import s from "../styles/pages/login.module.scss"
import Form from "../components/Form";
import {ChangeType, SubmitType} from "../types/typing";
import {useAppSelector} from "../redux/store";

interface IUser {
    email: string
    roomId: string
}

const JoinRoom = () => {
    const {socket} = useAppSelector((state) => state.socket )
    const [user, setUser] = useState<IUser>({
        email: "",
        roomId: ""
    })


    const handleChange = (e: ChangeType) => {
        const {name, value} = e.target
        setUser({...user,[name]: value})

    }

    const handleSubmit = (e:SubmitType) => {
        e.preventDefault()
        if (!socket || !user.email || !user.roomId) return
        socket.emit("joinRoom", user)
    }



    return (
        <Form>
            <form onSubmit={handleSubmit} className={s.login}>
                <label htmlFor="email">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter Your Email Adress"
                    />
                </label>
                <label htmlFor="roomId">
                    <input
                        type="text"
                        id="roomId"
                        name="roomId"
                        onChange={handleChange}
                        placeholder="Enter Room roomId"
                    />
                </label>
                <button type="submit">
                    Enter Room
                </button>
            </form>
        </Form>
    );
};

export default JoinRoom;