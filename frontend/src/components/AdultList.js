import { Link } from "react-router-dom";

function AdultList (props) {

  const { adults } = props

  const createLists = () => {

    if (!adults) return null;

    return adults.map((adult,index) => {
      return (
        <div key={index+1}>
          <li style={{
              color: "blue"
            }}className="list-group-item" adult={adult}>{ `${index+1}. `}<Link style={{
              color: "blue",
              textDecoration: "none"
            }} to={`/adult/${adult.id}/`}>{ adult.adult_name }</Link></li>
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

export default AdultList;