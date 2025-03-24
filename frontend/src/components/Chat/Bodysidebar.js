import React from 'react';
import Celebs from './Celebs';
import CelebImages1 from '../../assets/images/elon-musk.jpg';
import CelebImages2 from '../../assets/images/donald-trump.jpg';
import CelebImages3 from '../../assets/images/barack-obama.jpg';
import "../../styles/chatBox/Bodysidebar.css";
import { useSelectedCeleb } from "../../contexts/SelectedCelebContext";
import { useSelectedAvatar } from '../../contexts/SelectedAvatarContext';

/* Danh sách celebs, mỗi người gồm ảnh và tên, có thể bổ sung vào thêm */
const celebs = [
    {
        celebImage: CelebImages1,
        celebName: 'Elon Musk'
    },
    {
        celebImage: CelebImages2,
        celebName: 'Donald Trump'
    },
    {
        celebImage: CelebImages3,
        celebName: 'Barack Obama'
    }
];

/* Conponent chính hiển thị phần body sidebar, bao gồm danh sách các celebs */ 
function Bodysidebar() {
    /* Hook từ context SelectedCelebContext, dùng để lưu tên người nổi tiếng được chọn */
    const { setSelectedCeleb } = useSelectedCeleb();
    /* Hook từ context SelectedAvatarContext, dùng để lưu ảnh người nổi tiếng được chọn */
    const { setSelectedAvatar } = useSelectedAvatar();
    return (
        <div className="Bodysidebar">
            {/* map toàn bộ người nổi tiếng trong mảng celebs và hiển thị thông qua componets Celebs, nếu chọn vào Celebs nào thì lưu tên + ảnh người đó vào context */}
            {celebs.map((celeb, index) => (
                <div
                    key={index}
                    onClick={() => {

                        setSelectedCeleb(celeb.celebName);
                        setSelectedAvatar(celeb.celebImage);

                    }}
                >
                    <Celebs
                        key={index}
                        celebImage={celeb.celebImage}
                        celebName={celeb.celebName}

                    />
                </div>
            ))
            }
        </div>
    );
};
export default Bodysidebar;