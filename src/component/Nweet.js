import { getDB } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { storageService } from "fbase";
import { useState } from "react";
const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제요망?");
    if (ok) {
      const document = doc(getDB, "nweets", nweetObj.id);
      console.log(nweetObj.id);
      await deleteDoc(document);
      if (nweetObj.attachmentURL !== "") {
        const nweetImageRef = ref(storageService, nweetObj.attachmentURL);
        await deleteObject(nweetImageRef);
      }
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
            <input onClick={onSubmit} type="submit" value="Upadate Value" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentURL && (
            <img src={nweetObj.attachmentURL} width="50px" height="50px" />
          )}
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
