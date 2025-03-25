import Sidebar from "../components/Chat/Sidebar"
import Chatbox from "../components/Chat/Chatbox";
import { UsernameProvider } from "../contexts/UsernameContext";
import "../styles/chatBox/App.css";
import { SelectedCelebProvider } from "../contexts/SelectedCelebContext";
import { SelectedAvatarProvider } from "../contexts/SelectedAvatarContext";
function App() {
    return (
        <UsernameProvider>
            <SelectedCelebProvider>
                <SelectedAvatarProvider>
                    <div className="app">
                        <Sidebar />
                        <Chatbox />
                    </div>
                </SelectedAvatarProvider>
            </SelectedCelebProvider>
        </UsernameProvider>
    );
}

export default App;
