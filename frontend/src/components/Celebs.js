import "../styles/Celebs.css";
const Celebs = ({ celebImage, celebName }) => {
    return (
        <div className="Celebs">
            {/* Hiển thị ảnh celebs */}
            <img src={celebImage}
                alt={celebName}
            />
            {/* Hiển thị tên celebs */}
            <p className="celeb-name"> {celebName} </p>
        </div>
    );
};
export default Celebs;