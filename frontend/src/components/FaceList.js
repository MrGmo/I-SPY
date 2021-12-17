import { Link } from "react-router-dom";

function FaceList(props) {

  const { faces } = props;

  console.log(faces);

  const createLists = () => {

    if (!faces) return null;

    return faces.map((face, index) => {
      return (
        <div>
          <li key={index+1} className="list-group-item" face={face}><Link key={index+1} to={`/face-detection/${face.id}/`}>{ face.face_name }</Link></li>
        </div>
      );
    });
  };

  return (
    <div>
      { createLists() }
    </div>
  );
}

export default FaceList;
