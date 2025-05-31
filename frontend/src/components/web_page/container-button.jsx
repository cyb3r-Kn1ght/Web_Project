import "../../style/web_page/ContainerButton.css";
import { Link } from "react-router-dom";

function ContainerButton() {
  return (
    <div className="container-button">
      <Link className="button-part" to="/auth/login">
        <h3> Bắt đầu ngay </h3>
        <p> demo </p>
      </Link>
      <div className="button-part" to="/interview">
        <h3> Hướng dẫn sử dụng </h3>
        <p> demo </p>
      </div>
    </div>
  );
}
export default ContainerButton;
