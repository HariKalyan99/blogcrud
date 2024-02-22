import React, { useContext, useState } from "react";
import { RiChatDeleteFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { crudStore } from "../store/Store";
import Editedpost from "./Editedpost";


const Post = ({ title, body, userId, tags, reactions,  id, featuresNull}) => {
  
  const {deletePost} = useContext(crudStore);


  const [showAddPost, setShowAddPost] = useState(false);


  const handleEdit = () => {
    setShowAddPost(!showAddPost);
    // console.log("clicked", showAddPost)
  }

  return (
    <div className="col">
      <div className="card shadow-sm" style={{ height: "400px" }}>
        <div className="card-body">
          <h4 style={{ display: "inline" }}>{title}</h4> <span>{userId}</span>
          <p className="card-text">{body}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              {tags.map((tag, ind) => (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  key={ind}
                >
                  #{tag}
                </button>
              ))}
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              {reactions}
            </span>
            {featuresNull && <span className="position-absolute bottom-0 translate-middle badge rounded-pill bg-danger" onClick={() => deletePost(id)}>
              <RiChatDeleteFill style={{fontSize: "2rem"}}/>
            </span>}
            {featuresNull && <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger" onClick={handleEdit}>
              <FaPen style={{fontSize: "2rem"}}/>
            </span>}
            {showAddPost && <div style={{position: "absolute", zIndex: 10, top: "-109px", right: "-512px"}}>
              <Editedpost editTrue={true} title={title} body={body} userId={userId} tags={tags} reactions={reactions} id={id}   />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
