import { auth, getDB } from "fbase";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

import { useHistory } from "react-router-dom";
const Profile = ({ userObj }) => {
  const history = useHistory();

  useEffect(() => {
    getMyNweets();
  }, []);

  const onLogOutClick = () => {
    signOut(auth);
    history.push("/");
  };

  const getMyNweets = async () => {
    const nweetsRef = await collection(getDB, "nweets");
    const nweetsQuery = query(
      nweetsRef,
      where("creatorId", "==", userObj.uid),
      orderBy("createAt", "asc")
    );
    const nweets = await getDocs(nweetsQuery);

    console.log(
      "haha",
      nweets.docs.map((doc) => doc.data())
    );
  };

  return (
    <>
      <button onClick={onLogOutClick}>Logout</button>
    </>
  );
};

export default Profile;
