import { useState } from "react";

// ham nay dinh nghia cac fields co trong form
export default function Input_Field({ icon, type, placeholder, onChange }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  // bien nay duoc khai bao de kiem tra xem password co duoc hien hay an

  return (
    <div className="input-field">
      <i className="material-symbols-rounded">{icon}</i>
      <input // xu li input dau vao
        type={isPasswordShown && type === "password" ? "text" : type}
        placeholder={placeholder}
        onChange={onChange}
        required
        {...(type === "email"
          ? {
              // format nhap email
              pattern: "^[a-zA-Z0-9._%+-]+@gmail.com$",
            }
          : type === "password"
          ? {
              minLength: 8,
            }
          : {})}
      />

      {type === "password" && (
        <i
          onClick={() => setIsPasswordShown((prev) => !prev)}
          className="material-symbols-rounded eye-icon"
          style={{ cursor: "pointer" }}
        >
          {isPasswordShown ? "visibility" : "visibility_off"}
        </i>
      )}
    </div>
  );
}
