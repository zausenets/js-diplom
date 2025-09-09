"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    console.log("Ответ сервера: ", response);

    if (response.success) {
      location.reload();
    } else {
      const message = "Ошибка авторизации";
      userForm.setLoginErrorMessage(message);
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    console.log("Ответ сервера: ", response);

    if (response.success) {
      location.reload();
    } else {
      const message = "Ошибка регистрации";
      userForm.setLoginErrorMessage(message);
    }
  });
};