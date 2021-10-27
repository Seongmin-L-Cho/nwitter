import { auth } from "fbase";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    signOut(auth);
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Logout</button>
    </>
  );
};

export default Profile;
