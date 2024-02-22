import React, { useState } from 'react'
import styles from './Createpost.module.css'
import {v4 as uuidv4} from 'uuid';
import { useNavigate } from 'react-router-dom';

const Createpost = ({postList, setPostList,}) => {

  const [getUserId, setUserId] = useState("");
  const [getTitle, setTitle] = useState("");
  const [getBody, setBody] = useState("");
  const [getTags,setTags] = useState("");
  const [getReactions, setReactions] = useState("");

  const navigate = useNavigate();
  




  const handleSubmit = (e) => {
    e.preventDefault();
    const getTag = getTags.split(",");
    // console.log(getUserId, getTitle, getBody, getReactions, getTag, uuidv4());
    setPostList([{id: uuidv4() , userId: getUserId, title: getTitle, body: getBody, tags: getTag, reactions: getReactions}, ...postList]);
    navigate("/");

  }

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start",alignItems:"center", width: "100%", padding: "5rem"}}>
        <h1>Add posts</h1>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}> 
            <label htmlFor="userId"><h4>UserId</h4></label>
            <input type="text" id='userId' onChange={(e) => setUserId(e.target.value)}/>
            <label htmlFor="title"><h4>Title</h4></label>
            <input type="text" id='title' onChange={(e) => setTitle(e.target.value)}/>
            <label htmlFor="Body"><h4>Body</h4></label>
            <textarea type="text" id='Body' cols={40} rows={4} onChange={(e) => setBody(e.target.value)}/>
            <label htmlFor="tags"><h4>Tags</h4></label>
            <input type="text" id='tags' onChange={(e) => setTags(e.target.value)}/>
            <label htmlFor="Reactions"><h4>Reactions</h4></label>
            <input type="number" id='Reactions' onChange={(e) => setReactions(e.target.value)}/>
            <label htmlFor="submit-btn" style={{margin: "1rem"}}></label>
            <input type="submit" id='submit-btn' style={{backgroundColor: "#ffc107"}}/>
        </form>
    </div>
  )
}

export default Createpost;