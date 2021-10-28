import { useState, useEffect } from "react";
import { getDB } from "fbase";
import { collection, addDoc, getDocs } from "firebase/firestore";
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  console.log("userObj", userObj);
  const getNweets = async () => {
    const dbNweets = await getDocs(collection(getDB, "nweets"));
    dbNweets.forEach((document) => {
      const nweetObject = { ...document.data(), id: document.id };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
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
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
