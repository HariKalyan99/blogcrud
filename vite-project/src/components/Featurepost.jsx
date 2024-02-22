import React from 'react'
import Displayposts from './Displayposts'

const Featurepost = ({featureList}) => {
  return (
    <div>
        <Displayposts featureList={featureList}/>
    </div>
  )
}

export default Featurepost