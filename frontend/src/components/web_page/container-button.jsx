import "../../style/web_page/ContainerButton.css";
import { Link } from "react-router-dom";

function ContainerButton() {
  return (
    <div className="container-button">
      <Link className="button-part" to="/auth/login">
        <h3> Đóng góp ý kiến! </h3>
        <p> Hãy cho chúng mình ý kiến phản hồi của bạn! </p>
      </Link>
      
            <Link className="button-part" to ="/interview">
        <h3> Giới thiệu chung </h3>
        <p> Web này là gì có ăn được không? </p>
      </Link>
    </div>
  );
}
export default ContainerButton;
