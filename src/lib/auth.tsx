import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase";
import { auth, firebaseApp, firestore } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "types/types";

interface AuthContextValue {
  userData?: UserData;
  isLoading: boolean;
  verify: (verificationId: string, verificationCode: string) => Promise<void>;
  signOut: () => void;
  updateUserInfo: (userInfo: UserData) => Promise<void>;
  restoreToken: (userToken: string) => void;
  // fakeLogin: () => void;
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

  const handleUser = async (rawUser: firebase.User | null) => {
    setIsLoading(true);
    let user;
    if (rawUser) {
      const { uid, displayName, phoneNumber } = rawUser;

      user = {
        uid,
        name: displayName,
        contact: phoneNumber,
      };

      // check if user uid exists in `users` collection
      const userDocument = await firestore.collection("users").doc(uid).get();
      if (userDocument.exists) {
        setUserData(userDocument.data() as UserData);
      } else {
        setUserData({
          uid: uid,
          contact: phoneNumber,
          firstName: null,
          lastName: null,
          username: null,
          url_original: null,
          url_thumbnail: null,
        } as UserData);
      }
      setIsLoading(false);
    } else {
      setUserData(null);
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
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const userCredential = await auth.signInWithCredential(credential);
      let user = await handleUser(userCredential.user);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const signOut = async () => {
    await auth.signOut();
    handleUser(null);
    await AsyncStorage.removeItem("@AuthData");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((e) => {
      handleUser(e);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const updateUserInfo = async (userInfo: UserData) => {
    // update state
    setUserData(userInfo);

    const { firstName, lastName, username } = userInfo;

    // update firestore entry
    await firestore.collection("users").doc(userInfo.uid).set(userInfo);
  };

  const restoreToken = async (userToken: string) => {};

  // Returns the authContext object containing the user object and auth methods
  return {
    userData,
    isLoading,
    verify,
    signOut,
    updateUserInfo,
    restoreToken,
  };
}
