import { Link } from "react-router-dom";

function ObjectList (props) {

  const { objects } = props

  console.log(objects)

  const createLists = () => {

    if (!objects) return null;

    return objects.map((object,index) => {
      return (
        <div>
          <li className="list-group-item" object={object}><Link to={`/object/${object.id}/`}>{ object.object_name }</Link></li>
        {/* <ul style={{listStyleType: "none"}}>
          <li>Scan Type: { obj.scan_type }</li>
          <li>Object Id: { obj.id }</li>
          <li>Object URL: { obj.object_url }</li>
          <li>Object Name: { obj.object_name }</li>
          <li>Confidence Level: { obj.object_confidence_level }</li>
          <li>Notes: { obj.object_notes }</li>
        </ul> */}
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
