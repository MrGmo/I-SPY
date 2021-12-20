import { Link } from "react-router-dom";

function FaceList(props) {
  const { faces } = props;

  const createLists = () => {
    if (!faces) return null;

    return faces.map((face, index) => {
      return (
        <div key={index+1}>
          <li
          style={{
              color: "blue",
            }}
            className="list-group-item"
            object={face}
          >
            {`${index + 1}. `}
            <Link style={{
                color: "blue",
                textDecoration: "none",
              }}
              to={`/face-detection/${face.id}/`}
            >
              {face.face_name}
            </Link>
          </li>
        </div>
      );
    });
  };

  return <div>{createLists()}</div>;
}

export default FaceList;
