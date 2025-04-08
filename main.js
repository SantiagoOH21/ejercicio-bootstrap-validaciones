if (document.getElementById("userForm")) {
  const userForm = document.querySelector("#userForm");
  const inputName = document.getElementById("userName");
  const inputEmail = document.getElementById("userInputEmail");
  const inputPassword1 = document.getElementById("userInputPassword1");
  const inputPassword2 = document.getElementById("userInputPassword2");

  const nameRegularExpression = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
  const emailRegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegularExpression =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])([^\s]){8,16}$/;
  // Password: 1 number (0-9) + 1 uppercase letters + 1 lowercase letters + 1 non-alpha numeric number + 8-16 characters with no space

  userForm.addEventListener("submit", onSubmit);

  function onSubmit(event) {
    event.preventDefault();

    const userName = inputName.value.trim();
    const userEmail = inputEmail.value.trim();
    const userPassword1 = inputPassword1.value.trim();
    const userPassword2 = inputPassword2.value.trim();

    userName === "" ||
    userEmail === "" ||
    userPassword1 === "" ||
    userPassword2 === ""
      ? showMessage("danger", "Rellene todos los campos")
      : checkInput();
  }

  function showMessage(messageColor, message) {
    if (message === "Rellene todos los campos") {
      if (inputName.value.trim() === "") {
        inputName.className = "form-control border border-danger";
      }
      if (inputEmail.value.trim() === "") {
        inputEmail.className = "form-control border border-danger";
      }
      if (inputPassword1.value.trim() === "") {
        inputPassword1.className = "form-control border border-danger";
      }
      if (inputPassword2.value.trim() === "") {
        inputPassword2.className = "form-control border border-danger";
      }
    }
    const container = document.getElementById("containerMessage");
    const divMessage = document.createElement("div");
    divMessage.id = "newMessage";
    divMessage.className = `alert alert-${messageColor} fade show`;
    divMessage.role = "alert";
    divMessage.textContent = `${message}`;
    container.appendChild(divMessage);

    messageTimer(3000);
  }

  function messageTimer(time) {
    setTimeout(() => {
      const messageElement = document.getElementById("newMessage");
      if (messageElement) {
        messageElement.remove();
      }
    }, time);
  }

  function checkInput() {
    const userName = inputName.value.trim();
    const userEmail = inputEmail.value.trim();
    const userPassword1 = inputPassword1.value.trim();
    const userPassword2 = inputPassword2.value.trim();

    let checkName = true;
    let checkEmail = true;
    let checkPass1 = true;
    let checkPass2 = true;

    inputName.className = "form-control";
    inputEmail.className = "form-control";
    inputPassword1.className = "form-control";
    inputPassword2.className = "form-control";

    if (!nameRegularExpression.test(userName)) {
      inputName.className = "form-control border border-danger";
      checkName = false;
      showMessage("danger", "Nombre no válido");
    }

    if (!emailRegularExpression.test(userEmail)) {
      inputEmail.className = "form-control border border-danger";
      checkEmail = false;
      showMessage("danger", "Correo electrónico no válido");
    }

    if (!passwordRegularExpression.test(userPassword1)) {
      inputPassword1.className = "form-control border border-danger";
      checkPass1 = false;
      showMessage("danger", "Contraseña no válida");
    } else if (userPassword1 !== userPassword2) {
      inputPassword2.className = "form-control border border-danger";
      checkPass2 = false;
      showMessage("danger", "Las contraseñas no coinciden");
    }

    if (checkName && checkEmail && checkPass1 && checkPass2) {
      addUser();
    }
  }

  function addUser() {
    const usersLocalStorage =
      JSON.parse(localStorage.getItem("usersLocalStorage")) || [];
    const userName = inputName.value.trim();
    const userEmail = inputEmail.value.trim();

    const registerFind = usersLocalStorage.find(
      (user) => user.email === userEmail
    );
    if (registerFind) {
      showMessage("warning", "Este email ya está registrado");
      return;
    }

    const newUser = {
      name: userName,
      email: userEmail,
    };

    usersLocalStorage.push(newUser);
    localStorage.setItem(
      "usersLocalStorage",
      JSON.stringify(usersLocalStorage)
    );
    userForm.reset();
    showMessage("success", "Usuario creado correctamente");
    redirectToUsers();
  }

  function redirectToUsers() {
    const linkUsers = document.getElementById("linkUsers");
    if (linkUsers) {
      setTimeout(() => {
        window.location.href = linkUsers.href;
      }, 3000);
    }
  }
} else if (window.document.location.pathname.endsWith("users.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    checkUsers();
  });
  function checkUsers() {
    const usersLocalStorage =
      JSON.parse(localStorage.getItem("usersLocalStorage")) || [];
    if (usersLocalStorage.length === 0) {
      return isNoUser();
    } else {
      return usersLocalStorage.forEach((user) => printInformation(user));
    }
  }

  function isNoUser() {
    const usersContainer = document.getElementById("usersContainer");
    const div = document.createElement("div");
    const noticeTitle = document.createElement("h2");
    noticeTitle.innerText = "No hay usuarios guardados en el LocalStorage";
    div.appendChild(noticeTitle);
    usersContainer.appendChild(div);
  }

  function printInformation(user) {
    const usersContainer = document.getElementById("usersContainer");
    const div = document.createElement("div");
    div.className = "card text-bg-light";
    div.style.width = "18rem";

    const image = document.createElement("img");
    image.src =
      "https://cdn.pixabay.com/photo/2023/08/05/15/42/panda-8171354_640.jpg";
    // "https://cdn.pixabay.com/photo/2022/03/09/04/57/zebra-7057023_640.jpg";
    // "https://cdn.pixabay.com/photo/2023/12/07/19/45/tiger-8436227_640.jpg";

    image.className = "card-img-top";
    image.alt = "Imagen de usuario";

    const div2 = document.createElement("div");
    div2.className = "card-body";

    const titleCard = document.createElement("h5");
    titleCard.className = "card-title";
    titleCard.textContent = `${user.name}`;
    console.log(user.name);

    const paragraph = document.createElement("p");
    paragraph.className = "card-text";
    paragraph.textContent = `${user.email}`;

    div2.appendChild(paragraph);
    div2.appendChild(titleCard);
    div.appendChild(image);
    div.appendChild(div2);
    usersContainer.appendChild(div);
  }
}
