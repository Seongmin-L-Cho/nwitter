import { getDB } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제요망?");
    if (ok) {
      console.log(nweetObj.id);
      const data = await deleteDoc(doc(getDB, "nweets", nweetObj.id));
      console.log("data ", data);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(getDB, "nweets", nweetObj.id), { text: newNweet });
    setEditing(false);
  };
  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <div key={nweetObj.id}>
      {editing ? (
        <>
          <form>
            <input value={newNweet} required onChange={onChange} />
            <input onClick={onSubmit} value="Upadate Value" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
