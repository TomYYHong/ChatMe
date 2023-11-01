// import { onAuthStateChanged } from 'firebase/auth';
// import { createContext, useContext, useState, useEffect } from 'react';
// import { userData } from '../entities/userDate';
// import { auth } from './auth';

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthContextType {
//   user: userData | null;
//   loginWithGoogle: () => Promise<void>;
//   logout: () => Promise<void>;
// }

// export function useAuth() {
//   return useContext(AuthContext) as AuthContextType;
// }

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<userData | null>(null);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const unsubscribe = onAuthStateChanged(auth, (authUser) => {
//   //     setUser(authUser);
//   //     setLoading(false);
//   //   });

//   //   return unsubscribe;
//   // }, []);

//   const login = async (email: string, password: string) => {
//     // Implement your login logic using Firebase Authentication
//     // Example: await signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = async () => {
//     // Implement your logout logic using Firebase Authentication
//     // Example: await signOut(auth);
//   };

//   // const value: AuthContextType = {
//   //   user,
//   //   login,
//   //   logout,
//   // };

//   return (
//     // <AuthContext.Provider value={value}>
//     //   {!loading && children}
//     // </AuthContext.Provider>
  
//   );
// }
