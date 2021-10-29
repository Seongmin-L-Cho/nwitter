import { useState, useEffect } from "react";
import { getDB } from "fbase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Nweet from "component/Nweet";
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(getDB, "nweets"), (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(newArray);
    });
  }, []);

  console.log(nweets);

  const onSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(getDB, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="뭐 생각함?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            nweetObj={nweet}
            key={nweet.id}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};
export default Home;
