import "../styles/Celebs.css";
const Celebs = ({ celebImage, celebName }) => {
    return (
        <div className="Celebs">
            <img src={celebImage}
                alt={celebName}
            />
            <p className="celeb-name"> {celebName} </p>
        </div>
    );
};
export default Celebs;