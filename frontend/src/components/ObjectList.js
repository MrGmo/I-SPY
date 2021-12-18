import { Link } from "react-router-dom";

function ObjectList (props) {

  const { objects } = props

  const createLists = () => {

    if (!objects) return null;

    return objects.map((object,index) => {
      return (
        <div>
          <li key={index+1}  style={{
              color: "blue"
            }}className="list-group-item" object={object}>{ `${index+1}. `}<Link key={index+1} style={{
              color: "blue",
              textDecoration: "none"
            }} to={`/object/${object.id}/`}>{ object.object_name }</Link></li>
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
