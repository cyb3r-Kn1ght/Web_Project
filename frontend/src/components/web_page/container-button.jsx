import "../../style/web_page/ContainerButton.css";
import { Link } from "react-router-dom";

function ContainerButton() {
  return (
    <div className="container-button">
       <a
        className="button-part"
        href="https://forms.gle/u54WnLQZ9d6Pa7TR8"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3>Đóng góp ý kiến!</h3>
        <p>Hãy cho chúng mình ý kiến phản hồi của bạn!</p>
      </a>
      
            <Link className="button-part" to ="/interview">
        <h3> Giới thiệu chung </h3>
        <p> Web này là gì có ăn được không? </p>
      </Link>
    </div>
  );
}
export default ContainerButton;
