import { useEffect, useState } from 'react'
import './App.css'
import Createpost from '../components/Createpost'
import Displayposts from '../components/Displayposts'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Featurepost from '../components/Featurepost'
import axios from 'axios'

function App() {
  //display the conetnts and route
  const [displayMain, setDisplayMain] = useState("home");
  const [displayHeader, setDisplayHeader] = useState(false);

  const [featureList, setFeatureList] = useState("");
  const [featureSearch, setFeatureSearch] = useState("");

  const [postList, setPostList] = useState([]);

  const onSearchPosts = (searchTerm) => {
    setFeatureSearch(searchTerm);
  }
 
  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller
    const fetchApiInitial = async(searchTerm) => {
      try{
        if(searchTerm){
          const {data} = await axios.get(`https://dummyjson.com/posts/search?q=${searchTerm}`, signal)
          const {posts} = data;
          setFeatureList(posts)
        }else{
          const {data} = await axios.get('https://dummyjson.com/posts', signal)
          const {posts} = data;
          setFeatureList(posts)
        }
      }catch(error) {
        console.log("Error", error);
      }
    }

    fetchApiInitial();
    
    const timer = setTimeout(() => {
      fetchApiInitial(featureSearch)
    }, 600);


    return () => {
      controller.abort();
      clearTimeout(timer);
      console.log("cleaned initial search");
    }


  },[featureSearch]);


  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;
    const fetchPostList = async() => {
      try{
        const {data} = await axios.get(`http://localhost:8081/posts`, signal);
        // console.log(data);
        setPostList(data);
      }catch(error){
        console.log("Error", error);
      }
    }

    fetchPostList();

    return () => {
      controller.abort();
    }
  },[])

  return (
    <div>
      <Header displayMain={displayMain} setDisplayHeader={setDisplayHeader} displayHeader={displayHeader} onSearchPosts={onSearchPosts}/>
      <div style={{display: "flex"}}>
      {!displayHeader && <Sidebar displayMain={displayMain} setDisplayMain={setDisplayMain}/>}
      {displayMain === "home" && !displayHeader ? <Createpost postList={postList} setPostList={setPostList}/> : !displayHeader && displayMain === "post" &&
      <Displayposts postList={postList}/>}
      {displayHeader && <Featurepost featureList={featureList}/>}
      </div>
      <Footer />
    </div>
  )
}

export default App
