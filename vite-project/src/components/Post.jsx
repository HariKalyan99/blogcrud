import React from 'react'

const Post = ({title,
    body,
    userId,
    tags,
    reactions}) => {
  return (
    <div className="col" >
          <div className="card shadow-sm" style={{height: "400px"}}>
            <div className="card-body">
              <h4 style={{display: "inline"}}>{title}</h4> <span >{userId}</span>
              <p className="card-text">{body}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  {tags.map((tag, ind) => (
                    <button type="button" className="btn btn-sm btn-outline-secondary" key={ind}>{tag}</button>
                  )) }
                </div>
                <small className="text-body-secondary">{reactions}</small>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Post