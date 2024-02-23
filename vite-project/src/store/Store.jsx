import { createContext, useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";


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

function pureReducerFunction(currentState, action){
  let newPostList = currentState;
  if(action.type === "INITIAL_POSTS"){
    newPostList = action.payload.data;
  }else if(action.type === "ADD_POST_FROM_FETCH"){
    newPostList = [{id: action.payload.id, userId: action.payload.userId , title: action.payload.title, body: action.payload.body, tags: action.payload.tags, reations: action.payload.reactions},...currentState]
  }else if(action.type === "DELETE_POST"){
    newPostList = action.payload.newPostList
  }else if(action.type === "EDIT_POST"){
    newPostList = [{id: action.payload.id, userId: action.payload.userId , title: action.payload.title, body: action.payload.body, tags: action.payload.tags, reations: action.payload.reactions},...action.payload.list]
  }
  return newPostList;
}


const pureReducerFunction2 = (currentState, action) => {
  let newFeatureList = currentState;
  if(action.type === "FEATURE_LIST"){
    newFeatureList = action.payload.posts;
  }else if(action.type === "FEATURE_SEARCH"){
    newFeatureList = action.payload.posts;
  }
  return newFeatureList;
}


const CrudStoreContextProvider = ({children}) => {
  const [displayMain, setDisplayMain] = useState("home");
  const [displayHeader, setDisplayHeader] = useState("");

  // const [featureList, setFeatureList] = useState("");
  const [featureSearch, setFeatureSearch] = useState("");


  const [addPostList, setAddPostList] = useState({});

  const onSearchPosts = (searchTerm) => {
    setFeatureSearch(searchTerm);
  };


  const [postList, dispacthPostList] = useReducer(pureReducerFunction, [])

  const [featureList, dispacthFeatureList] = useReducer(pureReducerFunction2, "");


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
          dispacthFeatureList({
            type: "FEATURE_SEARCH",
            payload: {
              posts
            }
          })
        } else {
          const { data } = await axios.get(
            "https://dummyjson.com/posts",
            signal
          );
          const { posts } = data;
          dispacthFeatureList({
            type: "FEATURE_LIST",
            payload: {
              posts,
            }
          })
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
        dispacthPostList({
          type: "INITIAL_POSTS",
          payload: {
            data,
          }
        })
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
          dispacthPostList({
            type: "ADD_POST_FROM_FETCH",
            payload: {
              id: id,
              userId: userId,
              title: title,
              body: body,
              tags: tags,
              reactions: reactions,
            }
          })
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

  const deletePost = useCallback((id) => {
    const deleteP = postList.filter((ele) => ele.id !== id);
    dispacthPostList({
      type: "DELETE_POST",
      payload: {
        newPostList: deleteP,
      }
    })
  });

  const editPost = useCallback((editablePost) => {
    const editList = postList.filter((ele) => ele.id !== editablePost.previd);
    dispacthPostList({
      type: "EDIT_POST",
      payload: {
        id: editablePost.id,
        userId: editablePost.userId,
        title: editablePost.title,
        body: editablePost.body,
        tags: editablePost.tags,
        reactions: editablePost.reactions,
        list: editList
      }
    })

  })

  const displayingHeader = (path) => {
    setDisplayHeader(path);
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