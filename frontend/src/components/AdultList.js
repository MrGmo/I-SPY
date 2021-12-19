import { Link } from "react-router-dom";

function AdultList (props) {

  const { adults } = props

  const createLists = () => {

    if (!adults) return null;

    return adults.map((adult,index) => {
      return (
        <div>
          <li key={index+1}  style={{
              color: "blue"
            }}className="list-group-item" adult={adult}>{ `${index+1}. `}<Link key={index+1} style={{
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