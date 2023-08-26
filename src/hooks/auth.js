import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import {auth , db} from "../lib/firebase";
import { DASHBOARD , LOGIN} from "../lib/routes";
import { useState } from "react";
import {GoogleAuthProvider , getAuth , signInWithPopup , signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setDoc , doc} from "firebase/firestore";
import isUsernameExists from "utils/isUsernameExist";




export function useAuth() {
  const [authUser, isLoading, error] = useAuthState(auth);
  const user = authUser ? authUser : { uid: null };
  return { user, error, isLoading };
}




export function useLogin() {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    async function login({ email, password, redirectTo = DASHBOARD, isGoogleLogin = false }) {
        setIsLoading(true);

        try {
            if (isGoogleLogin) {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            toast({
                title: "Successfully Logged in",
                status: "success",
                isClosable: true,
                position: "top-right",
                duration: 500,
            });
            navigate(redirectTo);
        } catch (error) {
            toast({
                title: "Login Failed",
                description: error.message,
                status: "error",
                isClosable: true,
                position: "top-right",
                duration: 500,
            });
        }

        setIsLoading(false);
    }

    return { login, isLoading };
}



// // function to user login
// export function useLogin() {
//     const toast = useToast();
//     const [isLoading , setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     async function login({email , password , redirectTo = DASHBOARD}) {
//         setIsLoading(true);
        
//     try{
//         await signInWithEmailAndPassword(auth, email, password);
//         toast({
//             title: "Successfully Logged in",
//             status: "success",
//             isClosable: true,
//             position: "top-right",
//             duration: 500,
//         });
//         navigate(redirectTo)
//     }catch(error){

//         toast({
//             title: "Login Failed",
//             description: error.message,
//             status: "error",
//             isClosable: true,
//             position: "top-right",
//             duration: 500,
//         });
//         setIsLoading(false);
//         return false;
    
//     }

        
//     setIsLoading(false);
//     return true;
//     };
//     return {login , isLoading};
// }




















export function useRegister() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function register({
      username,
      email,
      password,
      redirectTo = LOGIN,
    }) {
      setLoading(true);
  
      const usernameExists = await isUsernameExists(username);
  
      if (usernameExists) {
        toast({ 
          title: "Username already exists",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 500,
        });
        setLoading(false);
      } else {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
  
          await setDoc(doc(db, "users", res.user.uid), {
            id: res.user.uid,
            username: username.toLowerCase(),
            date: Date.now(),
            avatar : "",
            password: password,
            email: email

          });

  
          toast({
            title: "Account created",
            description: "You are logged in",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 500,
          });
  
          navigate(redirectTo);
        } catch (error) {
          toast({
            title: "Signing Up failed",
            description: error.message,
            status: "error",
            isClosable: true,
            position: "top",
            duration: 500,
          });
        } finally {
          setLoading(false);
        }
      }
    }
  
    return { register, isLoading };
  }
  
export function useLogout() {
    const [signOut, isLoading] = useSignOut(auth);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function logout() {
      if (await signOut()) {
        toast({
          title: "Successfully logged out",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 500,
        });
        navigate(LOGIN);
      } // else: show error [signOut() returns false if failed]
    }
  
    return { logout, isLoading };
  }