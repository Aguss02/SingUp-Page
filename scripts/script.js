const formName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");
const warning = document.getElementById("warning");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let auxWarning = "";
  let error = false;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  warning.innerHTML = "";

  if (
    formName.value.length <= 2 ||
    formName.value == "" ||
    formName.value == null
  ) {
    warning.innerHTML += `<p>The name isn't valid or empty! </p>`;
    error = true;
  }

  if (
    !regexEmail.test(email.value) ||
    email.value == "" ||
    email.value == null
  ) {
    warning.innerHTML += `<p>The email is invalid or empty.</p>`;
    error = true;
  }

  if (password.value.length < 8 || password.value == "" || password.value == null) {
    warning.innerHTML += `<p>The password is too short or empty.</p>`;
    error = true;
  }

  if (!error) {
    warning.innerHTML = `<p style="color:black">Successfully Submited</p>`;
  }
});
