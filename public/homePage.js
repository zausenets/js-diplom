// Выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
    location.reload();
    }
  })
};

// Получение информации о пользователе
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function requestCourses() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  })
};
requestCourses();
setInterval(requestCourses, 60000);

// Операции с деньгами
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Баланс пополнен");
    } else {
      moneyManager.setMessage(false, "Ошибка пополнения");
    }
  })
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Конвертация выполнена успешно");
    } else {
      moneyManager.setMessage(false, "Ошибка конвертации");
    }
  })
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Перевод совершен");
    } else {
      moneyManager.setMessage(false, "Ошибка перевода");
    }
  })
};

// Работа с избранным
const favoritesWidget = new FavoritesWidget();
function requestFavorites() {
  ApiConnector.getFavorites((response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable();
      moneyManager.updateUsersList(response.data);
    }
  })
};

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      requestFavorites();
      favoritesWidget.setMessage(true, "Пользователь добавлен в избранное");
    } else {
      favoritesWidget.setMessage(false, "Ошибка добавления в избранное");
    }
  })
};

favoritesWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    if (response.success) {
      requestFavorites();
      favoritesWidget.setMessage(true, "Пользователь удален из избранного");
    } else {
      favoritesWidget.setMessage(false, "Ошибка удаления из избранного");
    }
  })
}