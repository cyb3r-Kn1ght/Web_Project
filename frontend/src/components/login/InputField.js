import React, { useState } from "react";

const InputField = ({ type, placeholder, icon }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    return (
        <div className="input-wrapper">
            <input
                type={isPasswordShown && type === "password" ? "text" : type}
                placeholder={placeholder}
                className="input-field"
                required
                {...(type === "email"
                    ? {
                        //pattern: "^[a-zA-Z0-9._%+-]+@gmail\\.com$",
                        //title: "Nhập địa chỉ email với định dạng example@gmail.com"
                    }
                    : type === "password"
                    ? {
                        minLength: 8,
                        title: "Mật khẩu phải có ít nhất 8 ký tự"
                    }
                    : {}
                )}
            />

            <i className="material-symbols-rounded">{icon}</i>

            {type === "password" && (
                <i
                    onClick={() => setIsPasswordShown(prev => !prev)}
                    className="material-symbols-rounded eye-icon"
                    style={{ cursor: "pointer" }}
                >
                    {isPasswordShown ? "visibility" : "visibility_off"}
                </i>
            )}
        </div>
    );
};

export default InputField;
