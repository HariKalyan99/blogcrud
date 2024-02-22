import React, { useContext } from 'react'
import { crudStore } from "../store/Store";
import Post from './Post';

const DisplayFeatures = () => {
  const {featureList} = useContext(crudStore);
  return (
    <div className="album py-5 bg-body-tertiary" style={{width: "100vw"}}>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
          {featureList.map((ele, ind) => (
            <Post key={ele.id} title={ele.title} body={ele.body} userId={ele.userId} tags={ele.tags} reactions={ele.reactions} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DisplayFeatures