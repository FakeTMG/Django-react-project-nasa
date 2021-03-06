import React from "react";

function SingleNasa({ val }) {
  return (
    <div className="container">
      <div className="row">
        <div className="card col" style={{ width: "18rem" }}>
          <img src={val.url} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{val.title}</h5>
            <p className="card-text">{val.explanation}</p>
            <a href={val.hdurl} className="btn btn-primary">
              See Full Image
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleNasa;
