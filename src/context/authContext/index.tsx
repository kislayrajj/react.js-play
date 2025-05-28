import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../../components/firebase/Firebase";
import { onAuthStateChanged, User, UserInfo } from "firebase/auth";

interface AuthContextType {
    currentUser: User | null;
    userLoggedIn: boolean;
    isEmailUser: boolean;
    isGoogleUser: boolean;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// creating the context


const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the context

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)

    if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");

    return context;
}

// props type for the AuthProvider component
interface AuthProviderProps {
    children: ReactNode
}

// AuthProvider component
export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [isEmailUser, setIsEmailUser] = useState(false)
    const [isGoogleUser, setIsGoogleUser] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe
    }, [])

    async function initializeUser(user: User | null) {
        if (user) {
            setCurrentUser(user)
            const providerData: UserInfo[] = user?.providerData;

            const isEmail = providerData.some(
                (provider) => provider.providerId === "password"
            )
            setIsEmailUser(isEmail)


            // const isGoogle = providerData.some(
            //     (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
            // );
            // setIsGoogleUser(isGoogle);

            setUserLoggedIn(true)
        } else {
            setCurrentUser(null)
            setUserLoggedIn(false)
            setIsEmailUser(false)
            setIsGoogleUser(false)
        }

        setLoading(false)
    }

    const value: AuthContextType = {
        currentUser,
        userLoggedIn,
        isEmailUser,
        isGoogleUser,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

