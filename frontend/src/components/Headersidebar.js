import "../styles/Headersidebar.css";
import { useUsername } from "../contexts/UsernameContext";


function Headersidebar() {
    const {username} = useUsername();

    return (
        <div className="Headersidebar">
            <h1> Welcome {username} !!! </h1>
        </div>
    )
}

export default Headersidebar;