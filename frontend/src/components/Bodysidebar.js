import React from 'react';
import Celebs from './Celebs';
import CelebImages1 from '../assets/images/elon-musk.jpg';
import CelebImages2 from '../assets/images/donald-trump.jpg';
import CelebImages3 from '../assets/images/barack-obama.jpg';
import "../styles/Bodysidebar.css";
import { useSelectedCeleb } from '../contexts/SelectedCelebContext';
import { useSelectedAvatar } from '../contexts/SelectedAvatarContext';

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
function Bodysidebar() {
    const { setSelectedCeleb } = useSelectedCeleb();
    const { setSelectedAvatar } = useSelectedAvatar();
    return (
        <div className="Bodysidebar">
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