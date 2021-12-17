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
