import { useContext, useEffect, useState } from "react";
import { AuthenticatedUserContext } from "../contexts/AuthenticatedUserProvider";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import AdminRouter from "./Admin/AdminRouter";
import AuthRouter from "./Auth/AuthRouter";
import NonAuthRouter from "./nonAuth/NonAuthRouter";
import React from "react";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { ActivityIndicator } from "react-native";

export const RootNavigator = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        let userFromDB;
        const unsubscribeAuthStateChanged = onAuthStateChanged(
            auth,
            async (authenticatedUser) => {
                if (authenticatedUser) {
                    const userRef = doc(db, "users", auth.currentUser.uid);
                    const userSnapshot = await getDoc(userRef)
                    userFromDB = userSnapshot.data();
                }
                authenticatedUser ? setUser({ ...authenticatedUser, ...userFromDB }) : setUser(null);
                setIsLoading(false);
            }
        );

        // unsubscribe auth listener on unmount
        return unsubscribeAuthStateChanged;
    }, [user]);

    if (isLoading) {
        return <ActivityIndicator />;
    }

    return (
        <>
            {user && user.role === "admin" ? <AdminRouter /> : (user ? <AuthRouter /> : <NonAuthRouter />)}
        </>
    );
};