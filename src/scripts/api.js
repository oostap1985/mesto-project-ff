import {responseStatus} from '../index'





// Токен и индефикатор группы в URL
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
    headers: {
      authorization: '7589cc2e-fb35-43d4-a4c5-1c85a7f6547d',
      'Content-Type': 'application/json'
    }
}




// Функция GET запроса пользовательских данных
function myUserData() {
    return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers
            })
            .then(res => responseStatus(res))
};

// Функция GET запроса массива объектов карточек
function objectsCard() {
    return fetch(`${config.baseUrl}/cards`, {
            headers: config.headers
            })
            .then(res => responseStatus(res))
};




// Функция(запрос) сохранения на сервере текстовой информации профиля
function sendProfileData(myConfig, nameValue, aboutValue) {
    return fetch(`${myConfig.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: myConfig.headers,
            body: JSON.stringify({
                name: nameValue,
                about: aboutValue
                })
            })
            .then(res => responseStatus(res))
};

// Функция(запрос) отправки карточки на сервер
function sendCardOnServer(myConfig, nameValue, linkValue) {
    return fetch(`${myConfig.baseUrl}/cards`, {
            method: 'POST',
            headers: myConfig.headers,
            body: JSON.stringify({
                name: nameValue,
                link: linkValue
                })
            })
            .then(res => responseStatus(res))
};

// Функция(запрос) отправки аватарки на сервер
function sendAvatarOnServer(myConfig, linkValue) {
    return fetch(`${myConfig.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: myConfig.headers,
            body: JSON.stringify({
                avatar: linkValue
                })
            })
            .then(res => responseStatus(res))
};

// Функция(запрос) удаления карточки с сервера
function deleteCardOnServer(myConfig, cardID, cardName, cardLink) {
    return fetch(`${myConfig.baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: myConfig.headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
                })
            })
            .then(res => responseStatus(res))
};

// Функция(запрос) сохранения лайка
function sendLikeOnServer(myConfig, cardID) {
    return fetch(`${myConfig.baseUrl}/cards/likes/${cardID}`, {
            method: 'PUT',
            headers: myConfig.headers
            })
            .then(res => responseStatus(res))
};

// Функция(запрос) удаления лайка
function deleteLikeOnServer(myConfig, cardID) {
    return fetch(`${myConfig.baseUrl}/cards/likes/${cardID}`, {
            method: 'DELETE',
            headers: myConfig.headers
            })
            .then(res => responseStatus(res))
};




export {config,
    myUserData,
    objectsCard,
    sendProfileData,
    sendCardOnServer,
    sendAvatarOnServer,
    deleteCardOnServer,
    sendLikeOnServer,
    deleteLikeOnServer};
