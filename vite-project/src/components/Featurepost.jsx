import React, { useContext } from 'react'
import DisplayFeatures from './DisplayFeatures';
import { crudStore } from "../store/Store";

const Featurepost = () => {

  const {displayHeader} = useContext(crudStore);
  return (
    <div>
        {displayHeader && <DisplayFeatures />}
    </div>
    
  )
}

export default Featurepost