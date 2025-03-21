import Sidebar from "./components/Sidebar";
import Chatbox from "./components/Chatbox";
import { UsernameProvider } from "./contexts/UsernameContext";
import "./styles/App.css";
import { SelectedCelebProvider } from "./contexts/SelectedCelebContext";
import { SelectedAvatarProvider } from "./contexts/SelectedAvatarContext";
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
