const inputName = document.getElementById("userName");
const inputEmail = document.getElementById("userInputEmail");
const inputPassword1 = document.getElementById("userInputPassword1");
const inputPassword2 = document.getElementById("userInputPassword2");
const userForm = document.querySelector("#userForm");

const messageFormEmpty = document.querySelector("#messageFormEmpty");
const messageUserName = document.querySelector("#messageUserName");
const messageInputEmail = document.querySelector("#messageInputEmail");
const messagePassword2 = document.querySelector("#messagePassword2");

function onSubmit(event) {
  event.preventDefault();

  if (
    inputName.value !== "" &&
    inputEmail.value !== "" &&
    inputPassword1.value !== "" &&
    inputPassword2.value !== ""
  ) {
    const userData = {
      name: inputName.value,
      email: inputEmail.value,
    };

    // checkName();
    // checkEmail();
    // checkPassword();

    localStorage.setItem("userData", JSON.stringify(userData));

    addUser(userData);

    printInformation();

    userForm.reset();
  } else {
    messageFormEmpty.innerText = "Rellene todos los campos";
    setTimeout(function () {
      messageFormEmpty.innerText = "";
    }, 3000);
  }
}

function checkName() {
  if (inputName.value === "") {
    messageUserName.innerText = "Nombre no válido";
    setTimeout(function () {
      messageUserName.innerText = "";
    }, 3000);
  }
}

function checkEmail() {
  if (inputEmail.value === "") {
    messageInputEmail.innerText = "email no válido";
    setTimeout(function () {
      messageInputEmail.innerText = "";
    }, 3000);
  }
}

function checkPassword() {
  if (inputPassword1.value !== inputPassword2.value) {
    messagePassword2.innerText = "La contraseña no coincide";
    setTimeout(function () {
      messagePassword2.innerText = "";
    }, 3000);
  }
}

let usersInformation = [];

function addUser(userData) {
  let usersLocalStorage = JSON.parse(localStorage.getItem("usersInformation"));
  if (usersLocalStorage) {
    usersInformation = usersLocalStorage;
  }
  usersInformation.push(userData);
  localStorage.setItem("usersInformation", JSON.stringify(usersInformation));
}

function printInformation() {
  const saveInformation = JSON.parse(localStorage.getItem("usersInformation"));
  const usersContainer = document.querySelector("#usersContainer");
  console.log(usersContainer);

  if (saveInformation) {
    saveInformation.forEach((userData) => {
      const cardName = document.querySelector("#cardName");
      const cardEmail = document.querySelector("#cardEmail");
      cardName.innerText = `
      Nombre: ${userData.name}`;
      cardEmail.innerText = `
      Email: ${userData.email}`;
      document.body.appendChild(usersContainer);
    });
  }
}

userForm.addEventListener("submit", onSubmit);
