import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const crudStore = createContext({
    postList: [],
    addPost: () => {},
    deletePost: () => {},
    editPost: () => {},
    onSearchPosts: () => {},
    displayingHeader: () => {},
    featureList: "",
    displayMain: "",
    displayingMain: () => {},
    displayHeader: "",
});


const CrudStoreContextProvider = ({children}) => {
  const [displayMain, setDisplayMain] = useState("home");
  const [displayHeader, setDisplayHeader] = useState(false);

  const [featureList, setFeatureList] = useState("");
  const [featureSearch, setFeatureSearch] = useState("");

  const [postList, setPostList] = useState([]);

  const [addPostList, setAddPostList] = useState({});

  const onSearchPosts = (searchTerm) => {
    setFeatureSearch(searchTerm);
  };

  const navigate = useNavigate();

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
    const fetchAddpostList = async (posts) => {
      if (posts.title) {
        try {
          const { data } = await axios.post(`http://localhost:8081/posts`, {
            id: posts.id,
            userId: posts.userId,
            title: posts.title,
            body: posts.body,
            tags: posts.tags,
            reactions: posts.reactions,
          });
          const { id, userId, title, body, tags, reactions } = data;
          setPostList([
            {
              id: id,
              userId: userId,
              title: title,
              body: body,
              tags: tags,
              reactions: reactions,
            },
            ...postList,
          ]);
        } catch (error) {
          console.log("Error", error);
        }
      }
    };

    fetchAddpostList(addPostList);
  }, [addPostList]);

  const addPost = (id, userId, title, body, tags, reactions) => {
    setAddPostList({ id, userId, title, body, tags, reactions });
  };

  const deletePost = (id) => {
    const deleteP = postList.filter((ele) => ele.id !== id);
    setPostList(deleteP);
  };

  const editPost = (editablePost) => {
    console.log(editablePost);
    const editList = postList.filter((ele) => ele.id !== editablePost.previd);
    setPostList([
      {
        id: editablePost.id,
        userId: editablePost.userId,
        title: editablePost.title,
        body: editablePost.body,
        tags: editablePost.tags,
        reactions: editablePost.reactions,
      },
      ...editList,
    ]);
  };

  const displayingHeader = () => {
    setDisplayHeader(!displayHeader);
    // navigate("/")
  };

  const displayingMain = (route) => {
    setDisplayMain(route);
  };
    return(
        <crudStore.Provider  value={{
            postList,
            addPost,
            deletePost,
            editPost,
            onSearchPosts,
            displayingHeader,
            featureList,
            displayMain,
            displayingMain,
            displayHeader,
          }}>
            {children}
        </crudStore.Provider>
    )

}



export default CrudStoreContextProvider;