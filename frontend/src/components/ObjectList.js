import { Link } from "react-router-dom";

function ObjectList (props) {

  const { objects } = props

  console.log(objects)

  const createLists = () => {

    if (!objects) return null;

    return objects.map((obj,index) => {
      return (
        <div>

        <ul key={index+1} style={{listStyleType: "none"}}>
          <li>Scan Type: { obj.scan_type }</li>
          <li>Object Id: { obj.id }</li>
          <li>Object URL: { obj.object_url }</li>
          <li>Object Name: { obj.object_name }</li>
          <li>Confidence Level: { obj.object_confidence_level }</li>
          <li>Notes: { obj.object_notes }</li>
        </ul>




        {/* <div className="card" style={{width: "18rem"}}>
        <img className="card-img-top" src={ obj.object_url } alt="Card image cap"></img>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div> */}
      </div>

      )
    })
  }

  return (
    <div>
      { createLists() }
    </div>
  );
}

export default ObjectList;
