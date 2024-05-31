import { useState } from "react";
import AuthRouter from "./Auth/AuthRouter";
import NonAuthRouter from "./nonAuth/NonAuthRouter";



export const RootNavigator = () => {
    // const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     // onAuthStateChanged returns an unsubscriber
    //     let userFromDB;
    //     const unsubscribeAuthStateChanged = onAuthStateChanged(
    //         auth,
    //         async (authenticatedUser) => {
    //             if (authenticatedUser) {
    //                 const userRef = doc(db, "users", auth.currentUser.uid);
    //                 const userSnapshot = await getDoc(userRef)
    //                 userFromDB = userSnapshot.data();
    //             }
    //             authenticatedUser ? setUser({ ...authenticatedUser, ...userFromDB }) : setUser(null);
    //             setIsLoading(false);
    //         }
    //     );

    //     // unsubscribe auth listener on unmount
    //     return unsubscribeAuthStateChanged;
    // }, [user]);

    // if (isLoading) {
    //     return <ActivityIndicator />;
    // }

    return (
        <>
            <AuthRouter />
        </>
    );
};