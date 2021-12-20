import { Link } from "react-router-dom";

function TagList (props) {

  const { tags } = props

  const createLists = () => {

    if (!tags) return null;

    return tags.map((tag,index) => {
      return (
        <div key={index+1}>
          <li style={{
              color: "blue"
            }}className="list-group-item" tag={tag}>{ `${index+1}. `}<Link style={{
              color: "blue",
              textDecoration: "none"
            }} to={`/tag/${tag.id}/`}>{ tag.tag_name }</Link></li>
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

export default TagList;