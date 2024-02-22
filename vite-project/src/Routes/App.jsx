import { useEffect, useState } from "react";
import "./App.css";
import Createpost from "../components/Createpost";
import Displayposts from "../components/Displayposts";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Featurepost from "../components/Featurepost";
import axios from "axios";

function App() {
  //display the conetnts and route
  const [displayMain, setDisplayMain] = useState("home");
  const [displayHeader, setDisplayHeader] = useState(false);

  const [featureList, setFeatureList] = useState("");
  const [featureSearch, setFeatureSearch] = useState("");

  const [postList, setPostList] = useState([]);

  const [addPostList, setAddPostList] = useState({});


  const onSearchPosts = (searchTerm) => {
    setFeatureSearch(searchTerm);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchApiInitial = async (searchTerm) => {
      try {
        if (searchTerm) {
          const { data } = await axios.get(
            `https://dummyjson.com/posts/search?q=${searchTerm}`,
            signal
          );
          const { posts } = data;
          setFeatureList(posts);
        } else {
          const { data } = await axios.get(
            "https://dummyjson.com/posts",
            signal
          );
          const { posts } = data;
          setFeatureList(posts);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchApiInitial();

    const timer = setTimeout(() => {
      fetchApiInitial(featureSearch);
    }, 500);

    
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [featureSearch]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchPostList = async () => {
        try {
          const { data } = await axios.get(`http://localhost:8081/posts`, signal);
          setPostList(data);
        } catch (error) {
          console.log("Error", error);
        }
    };

    fetchPostList();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const fetchAddpostList = async(posts) => {
      if(posts.title){
        try{
          const {data} = await axios.post(`http://localhost:8081/posts`, {
            id: posts.id,
            userId: posts.userId,
            title: posts.title,
            body: posts.body,
            tags: posts.tags,
            reactions: posts.reactions,
          });
          const {id, userId, title, body, tags, reactions} = data;
          setPostList([{id:id, userId:userId, title:title, body:body, tags:tags, reactions:reactions},...postList])
          }catch(error){
            console.log("Error", error);
          }
      }
    }

    fetchAddpostList(addPostList);
  }, [addPostList])

  const addPost = (id, userId, title, body, tags, reactions) => {
    setAddPostList({ id, userId, title, body, tags, reactions });
  };

  const deletePost = (id) => {
    const deleteP = postList.filter((ele) => ele.id !== id);
    setPostList(deleteP);
  }

  const editPost = (editablePost) => {
    const editList = postList.filter((ele) => ele.id !== editablePost.previd);
    setPostList([
      {
        id: editablePost.id,
        userId: editablePost.userId,
        title: editablePost.title,
        body: editablePost.body,
        tags: editablePost.tags,
        reactions: editablePost.reactions,
      },...editList
    ]);
  }


  return (
    <div>
      <Header
        displayMain={displayMain}
        setDisplayHeader={setDisplayHeader}
        displayHeader={displayHeader}
        onSearchPosts={onSearchPosts}
      />
      <div style={{ display: "flex" }}>
        {!displayHeader && (
          <Sidebar displayMain={displayMain} setDisplayMain={setDisplayMain} />
        )}
        {displayMain === "home" && !displayHeader ? (
          <Createpost addPost={addPost} />
        ) : (
          !displayHeader &&
          displayMain === "post" && <Displayposts postList={postList} deletePost={deletePost} editPost={editPost}  setPostList={setPostList} />
        )}
        {displayHeader && <Featurepost featureList={featureList} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
