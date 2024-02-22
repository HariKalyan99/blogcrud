import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { crudStore } from "../store/Store";
import styles from './Editedpost.module.css'

const Editedpost = ({ editTrue, title, body, userId, tags, reactions, id }) => {

    const {editPost} = useContext(crudStore);
    
  const [inputUserId2, setinputUserId2] = useState(userId);
  const [inputTitle2, setinputTitle2] = useState(title);
  const [inputBody2, setinputBody2] = useState(body);
  const [inputTags2, setinputTags2] = useState(tags);
  const [inputReactions2, setinputReactions2] = useState(reactions);

    const handleSubmit2 = (e) => {
        e.preventDefault();
        const tag2 = inputTags2.split(",");
        editPost({
          id: uuidv4(),
          userId: inputUserId2,
          title: inputTitle2,
          body: inputBody2,
          tags: tag2,
          reactions: inputReactions2,
          previd: id,
        });
        setinputUserId2("");
        setinputTitle2("");
        setinputBody2("");
        setinputTags2("");
        setinputReactions2("");
      };
      

    if (editTrue) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              padding: "5rem",
            }}
          >
            <h1>Add posts</h1>
            <form
              className={styles.form}
              onSubmit={(e) => handleSubmit2(e)}
              style={{ backgroundColor: "#e1bdc1" }}
            >
              <label htmlFor="userId">
                <h4>UserId</h4>
              </label>
              <input
                type="text"
                id="userId"
                value={inputUserId2}
                onChange={(e) => setinputUserId2(e.target.value)}
              />
              <label htmlFor="title">
                <h4>Title</h4>
              </label>
              <input
                type="text"
                id="title"
                value={inputTitle2}
                onChange={(e) => setinputTitle2(e.target.value)}
              />
              <label htmlFor="Body">
                <h4>Body</h4>
              </label>
              <textarea
                type="text"
                id="Body"
                cols={40}
                rows={4}
                value={inputBody2}
                onChange={(e) => setinputBody2(e.target.value)}
              />
              <label htmlFor="tags">
                <h4>Tags</h4>
              </label>
              <input
                type="text"
                id="tags"
                value={inputTags2}
                onChange={(e) => setinputTags2(e.target.value)}
              />
              <label htmlFor="Reactions">
                <h4>Reactions</h4>
              </label>
              <input
                type="number"
                id="Reactions"
                value={inputReactions2}
                onChange={(e) => setinputReactions2(e.target.value)}
              />
              <label htmlFor="submit-btn" style={{ margin: "1rem" }}>
                Resubmit
              </label>
              <input
                type="submit"
                id="submit-btn"
                style={{ backgroundColor: "#ffc107" }}
              />
            </form>
          </div>
        );
      }
}

export default Editedpost