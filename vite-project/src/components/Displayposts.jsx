import React, { useContext } from 'react'
import Post from './Post'
import { crudStore } from '../store/Store';


const Displayposts = () => {

const {postList, displayHeader, displayMain} = useContext(crudStore);

if(!displayHeader && displayMain === "post"){
   if(postList){
    return (
      <div className="album py-5 bg-body-tertiary" style={{width: "100vw"}}>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
          {postList.map((ele, ind) => (
            <Post key={ele.id} title={ele.title} body={ele.body} userId={ele.userId} tags={ele.tags} reactions={ele.reactions}  id={ele.id} featuresNull={true}/>
          ))}
        </div>
      </div>
    </div>
    )
  }
}
}

export default Displayposts