import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import firebase_app from "../config";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<User | null>(null);

export const useAuthContext = () => React.useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
