import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase";
import { auth, firebaseApp } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserData = {
  uid: string;
  name: string;
  contact: string;
};

interface AuthContextValue {
  userData?: UserData;
  isLoading: boolean;
  loggedIn: boolean | undefined;
  verify: (verificationId: string, verificationCode: string) => Promise<void>;
  signOut: () => void;
  fakeLogin: () => void;
}

// We explicitly allow `undefined` as a potential value here
// to tell the compiler we plan to deal with it.
const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  let context = useContext(AuthContext);

  if (context === undefined) {
    throw Error("Auth Context is undefined");
  }
  return context;
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(undefined);

  // useEffect(() => {
  //   //Every time the App is opened, this provider is rendered
  //   //and call de loadStorageData function.

  //   loadStorageData();
  // }, []);

  const loadStorageData = async () => {
    await AsyncStorage.removeItem("@AuthData"); // todo attempt bug fix
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized) {
        console.log("Old data detected in async storage");
        //If there are data, it's converted to an Object and the state is updated.
        const _userData: UserData = JSON.parse(authDataSerialized);
        setUserData(_userData);
        setLoggedIn(true);
      }
    } catch (error) {
      console.log("error retrieving async storage");
      console.log(error);
    } finally {
      //loading finished
      setIsLoading(false);
    }
  };

  const handleUser = (rawUser: firebase.User | null) => {
    let user;
    if (rawUser) {
      const { uid, displayName, phoneNumber } = rawUser;

      user = {
        uid,
        name: displayName,
        contact: phoneNumber,
      };
      setUserData(user);
      setLoggedIn(true);
      setIsLoading(false);
    } else {
      setUserData(null);
      setLoggedIn(false);
      setIsLoading(false);
    }
    return user;
  };

  const verify = async (verificationId: string, verificationCode: string) => {
    try {
      const credential = firebaseApp.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const userCredential = await auth.signInWithCredential(credential);
      let user = handleUser(userCredential.user);

      AsyncStorage.setItem("@AuthData", JSON.stringify(user)); // TODO: check if this actually works because state changes might not have taken place
      console.log("Signed in successfully");
    } catch (err) {
      console.log("useAuth verify failed");
      console.log(err);
    }
  };

  const dummyUser: UserData = {
    contact: "12345678",
    name: "dummy user",
    uid: "1",
  };

  const fakeLogin = async () => {
    setIsLoading(true);
    try {
      const userCredential = await auth.signInAnonymously();
      let user = handleUser(userCredential.user);
      AsyncStorage.setItem("@AuthData", JSON.stringify(user)); // TODO: check if this actually works because state changes might not have taken place
      console.log("Signed in anonymously");
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = async () => {
    await auth.signOut();
    handleUser(null);
    await AsyncStorage.removeItem("@AuthData");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((e) => {
      // console.log("auth state changed");
      // console.log(e);

      handleUser(e);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Returns the authContext object containing the user object and auth methods
  return {
    userData,
    loggedIn,
    isLoading,
    verify,
    signOut,
    fakeLogin,
  };
}
