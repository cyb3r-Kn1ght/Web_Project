import Bodysidebar from "./Bodysidebar";
import Headersidebar from "./Headersidebar";
import Footersidebar from "./Footersidebar";
import '../../styles/chatBox/Sidebar.css';

/* components dùng để hiển thị sidebar */
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
