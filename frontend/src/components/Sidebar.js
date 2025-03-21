import Bodysidebar from "./Bodysidebar";
import Headersidebar from "./Headersidebar";
import Footersidebar from "./Footersidebar";
import '../styles/Sidebar.css';

function Sidebar() {
    return (
        <div className = 'container-sidebar'>
            <Headersidebar />
            <Bodysidebar />
            <Footersidebar />
        </div>
    );
}

export default Sidebar;
