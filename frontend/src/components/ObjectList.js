import { Link } from "react-router-dom";

function ObjectList (props) {

  const { objects } = props

  const createLists = () => {

    if (!objects) return null;

    return objects.map((object,index) => {
      return (
        <div key={index+1}>
          <li style={{
              color: "blue"
            }}className="list-group-item" object={object}>{ `${index+1}. `}<Link style={{
              color: "blue",
              textDecoration: "none"
            }} to={`/object/${object.id}/`}>{ object.name }</Link></li>
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
