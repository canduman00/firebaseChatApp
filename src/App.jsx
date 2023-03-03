import {useState, useRef} from "react";
import Cookies from "universal-cookie";

import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

import './App.css'
import Auth from './components/Auth'
import Chat from "./components/Chat";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef();

  async function signUserOut(){
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  if(!isAuth){
    return (
      <div className="App">
        
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }

  return (
    <>
      {room ? <Chat room={room}/> : 
      <div className="room">
        <label>Enter Room Name:</label>
        <input ref={roomInputRef} />
        <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
      </div>
      }
      <div className="sign-out">
        <button className="sign-out-btn" onClick={signUserOut}>sign out</button>
      </div>
    </>
  );
  

}

export default App
