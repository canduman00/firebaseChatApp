import {useEffect, useState} from "react";
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from "firebase/firestore"
import { auth, db } from "../firebase-config";

function Chat(props){
    const {room} = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room","==", room), orderBy("createdAt"))
        const cleanUp = onSnapshot(queryMessages, snapshot =>{
            let messages = [];
            snapshot.forEach(doc =>{
                messages.push({...doc.data(), id: doc.id})
            })

            setMessages(messages);
        })

        return () => cleanUp();
    }, []);


    async function handleSubmit(event){
        event.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        })
        setNewMessage("");
    }

    return(
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div className="messages">{messages.map((message) => {
                return (<div className="message" key={message.id}>
                    <span className="user">{message.user}: </span>
                    <span className="user-message">{message.text}</span>
                </div>)
            })}
                </div>

            <form onSubmit={handleSubmit} className="new-message-form">
                <input type="text" className="new-message-input"
                placeholder="Type your message here..." 
                onChange={e => setNewMessage(e.target.value)}
                value={newMessage}/>
                <button className="send-button">Send</button>
            </form>
        </div>
    );
}

export default Chat;