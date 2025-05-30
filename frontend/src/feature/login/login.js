// const sign_in_btn = document.querySelector("#sign-in-btn");
// const sign_up_btn = document.querySelector("#sign-up-btn");
// const container = document.querySelector(".container");

// sign_up_btn.addEventListener("click", () => {
//   container.classList.add("sign-up-mode");
// });

// sign_in_btn.addEventListener("click", () => {
//   container.classList.remove("sign-up-mode");
// });

export function initLoginHandlers() {
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  if (sign_up_btn && container) {
    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });
  } else {
    console.warn("Không tìm thấy nút đăng ký hoặc container.");
  }

  if (sign_in_btn && container) {
    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  } else {
    console.warn("Không tìm thấy nút đăng nhập hoặc container.");
  }
}
