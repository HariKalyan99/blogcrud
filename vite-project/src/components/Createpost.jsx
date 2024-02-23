import React, { useContext, useRef, useState } from "react";
import styles from "./Createpost.module.css";
import { v4 as uuidv4 } from "uuid";
import { crudStore } from "../store/Store";
import { useNavigate } from "react-router-dom";

const Createpost = () => {
  const { addPost, displayMain } = useContext(crudStore);
  const navigate = useNavigate();

  const inputUserId = useRef("");
  const inputTitle = useRef("");
  const inputBody = useRef("");
  const inputTags = useRef("");
  const inputReactions = useRef("");


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
    navigate("/displaypost");
  };


  if(displayMain === "home"){
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
