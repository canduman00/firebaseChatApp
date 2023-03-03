import {auth, provider} from "../firebase-config";
import {signInWithPopup} from "firebase/auth"

import Cookies from "universal-cookie"
const cookies = new Cookies()

function Auth(props){
    
    const {setIsAuth} = props;

    async function signInWithGoogle(){

        try{
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken)
            setIsAuth(true);
        } catch(err){
            console.error(err);
        }
    }
    
    return(
        <div className="auth">
            <p className="sign-in-p">Sign in with Google to continue</p>
            <button className="sign-in-btn" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
}

export default Auth;