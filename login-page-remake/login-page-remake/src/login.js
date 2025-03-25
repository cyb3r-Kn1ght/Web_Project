export function initLoginHandlers() {
  const sign_in_btn = document.querySelector("#sign-in-button");
  const sign_up_btn = document.querySelector("#sign-up-button");
  const container = document.querySelector(".container");

  if (sign_up_btn && container) {
    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });
  }

  if (sign_in_btn && container) {
    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }
}