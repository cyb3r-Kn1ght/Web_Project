import React, { useEffect } from "react";
import "../style/login/login.css";
import React, { useEffect } from 'react';
import Input_Field from "../components/login/Input_Fields.jsx";

function Forgot_Password() {
  return (
    <>
      <div className="forms-container">
        <div className="signin-signup"></div>
        <form action="#" className="sign-in-form">
          <h2 className="title">Forgot Password</h2>

          {/* su dung component vao thuc te */}
          <Input_Field
            icon="mail"
            type="email"
            placeholder="Email"
            // value={formData.email} // doan nay can BE check lai, thieu gi do ma web k chay dc tam thoi bo comment
            // onChange={(e) =>
            //   setFormData({ ...formData, email: e.target.value })
            // }
          />
        </form>
      </div>
    </>
  );
}

export default Forgot_Password;
