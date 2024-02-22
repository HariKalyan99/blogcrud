import React, { useRef, useState } from "react";
import styles from "./Createpost.module.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Createpost = ({
  addPost,
  editTrue,
  title,
body,
userId,
tags,
reactions,
id,
editPost,
  setPostList,
  postList,
}) => {
  const navigate = useNavigate();

  const inputUserId = useRef("");
  const inputTitle = useRef("");
  const inputBody = useRef("");
  const inputTags = useRef("");
  const inputReactions = useRef("");

  const [inputUserId2, setinputUserId2] = useState(userId);
  const [inputTitle2, setinputTitle2] = useState(title);
  const [inputBody2, setinputBody2] = useState(body);
  const [inputTags2, setinputTags2] = useState(tags);
  const [inputReactions2, setinputReactions2] = useState(reactions);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = inputUserId.current.value;
    const title = inputTitle.current.value;
    const body = inputBody.current.value;
    const tags = inputTags.current.value.split(",");
    const reactions = inputReactions.current.value;
    addPost(uuidv4(), userId, title, body, tags, reactions);
    inputUserId.current.value = "";
    inputTitle.current.value = "";
    inputBody.current.value = "";
    inputTags.current.value = "";
    inputReactions.current.value = "";
    // navigate("/");
  };

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
    })
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
  } else {
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
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="userId">
            <h4>UserId</h4>
          </label>
          <input type="text" id="userId" ref={inputUserId} />
          <label htmlFor="title">
            <h4>Title</h4>
          </label>
          <input type="text" id="title" ref={inputTitle} />
          <label htmlFor="Body">
            <h4>Body</h4>
          </label>
          <textarea type="text" id="Body" cols={40} rows={4} ref={inputBody} />
          <label htmlFor="tags">
            <h4>Tags</h4>
          </label>
          <input type="text" id="tags" ref={inputTags} />
          <label htmlFor="Reactions">
            <h4>Reactions</h4>
          </label>
          <input type="number" id="Reactions" ref={inputReactions} />
          <label htmlFor="submit-btn" style={{ margin: "1rem" }}></label>
          <input
            type="submit"
            id="submit-btn"
            style={{ backgroundColor: "#ffc107" }}
          />
        </form>
      </div>
    );
  }
};

export default Createpost;
