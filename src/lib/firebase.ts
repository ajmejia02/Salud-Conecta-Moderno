import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult,
  AuthError
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Handle cross-origin isolation and popup issues
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    const authError = error as AuthError;
    
    // These are common and usually don't need to be treated as fatal errors
    if (authError.code === 'auth/popup-closed-by-user' || authError.code === 'auth/cancelled-popup-request') {
      console.warn("User cancelled the sign-in popup.");
      return null;
    }
    
    console.error("Firebase Auth Error:", {
      code: authError.code,
      message: authError.message,
    });

    if (authError.code === 'auth/unauthorized-domain') {
       alert("Error: Este dominio no está autorizado en Firebase. \n\nInstrucciones:\n1. Ve a Firebase Console -> Authentication -> Settings -> Authorized Domains.\n2. Añade tu dominio de Vercel (ej. mi-app.vercel.app).\n3. También añade 'localhost' si pruebas localmente.");
    } else if (authError.code === 'auth/popup-blocked') {
       alert("El navegador bloqueó la ventana emergente. Por favor, permite las ventanas emergentes para este sitio o intenta de nuevo.");
    } else {
       // If popup fails persistently, we suggest using redirect
       const useRedirect = confirm("Hubo un error con el inicio de sesión (Ventana emergente). ¿Deseas intentar usando el método de redirección?");
       if (useRedirect) {
         return signInWithGoogleRedirect();
       }
    }

    throw error;
  }
};

export const signInWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in with Google Redirect:", error);
    throw error;
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (error) {
    console.error("Error handling redirect result:", error);
    return null;
  }
};
