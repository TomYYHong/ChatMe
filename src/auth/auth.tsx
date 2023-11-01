import { signInWithGoogle, signOut } from "../firebase/auth";
import { useUser } from "./UserContext";

function Auth() {
  const { user, setUser } = useUser(); // Access user state from context

  const handleSignIn = async () => {
    const logonUser = await signInWithGoogle();
    setUser(logonUser); // Update the user state in context
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null); // Update the user state in context
  };
  return (
    <div>
      {user ? (
        <div>
          <p>{user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default Auth;
