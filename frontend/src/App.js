import Sidebar from "./components/Sidebar";
import Chatbox from "./components/Chatbox";
import { UsernameProvider } from "./contexts/UsernameContext";
import "./styles/App.css";
import { SelectedCelebProvider } from "./contexts/SelectedCelebContext";
import { SelectedAvatarProvider } from "./contexts/SelectedAvatarContext";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
function App() {
    const {authUser, checkAuth} = useAuthStore(); // từ useAuthStore truy xuất thông tin người dùng được xác thực và hàm checkAuth

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log({authUser});
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
