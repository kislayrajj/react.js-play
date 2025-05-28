import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword, UserCredential } from "firebase/auth"
import { auth } from "./Firebase"
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export const doCreateUserWithEmailAndPassword = async (
    email: string,
    password: string,
): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
}

// Login with email and password
export const doSignInWithEmailAndPassword = (
    email: string,
    password: string
): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
};

// google sign in
export const doSignInWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
}

// sign out user
export const doSignOut = (): Promise<void> => {
    return auth.signOut();
}

// send password reset email
export const doPasswordReset = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email)
}

// change current user's password

export const doPasswordChange = (password: string): Promise<void> => {
    const user = auth.currentUser
    if (!user) throw new Error("No user is currently signed in.")
    return updatePassword(user, password)
}

// send verification email

export const doSendEmailVerification = (): Promise<void> => {
    const user = auth.currentUser;
    if (!user) throw new Error("No user is currently signed in.")
    return sendEmailVerification(user, {
        url: `${window.location.origin}/home`
    })
}