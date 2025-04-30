// Функция проверки статуса ответа от сервера. Если ок, тогда переводим ответ в формат JSON
function responseStatus(res) {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
};



// Функция GET запроса пользовательских данных
function myUserData(config) {
    return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers
            })
            .then(res => responseStatus(res))
};

// Функция GET запроса массива объектов карточек
function objectsCard(config) {
    return fetch(`${config.baseUrl}/cards`, {
            headers: config.headers
            })
            .then(res => responseStatus(res))
};




// Функция(запрос) сохранения на сервере текстовой информации профиля
function sendProfileData(config, nameValue, aboutValue) {
    return fetch(`${config.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                name: nameValue,
                about: aboutValue
                })
            })
            .then(res => responseStatus(res))
};

// Функция(запрос) отправки карточки на сервер
function sendCardOnServer(config, nameValue, linkValue) {
    return fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                name: nameValue,
                link: linkValue
                })
            })
            .then(res => responseStatus(res))
};

// Функция(запрос) отправки аватарки на сервер
function sendAvatarOnServer(config, linkValue) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                avatar: linkValue
                })
            })
            .then(res => responseStatus(res))
};

// Функция(запрос) удаления карточки с сервера
function deleteCardOnServer(config, cardID, cardName, cardLink) {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: config.headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
                })
            })
            .then(res => responseStatus(res))
};

// Функция(запрос) сохранения лайка
function sendLikeOnServer(config, cardID) {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
            method: 'PUT',
            headers: config.headers
            })
            .then(res => responseStatus(res))
};

// Функция(запрос) удаления лайка
function deleteLikeOnServer(config, cardID) {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
            method: 'DELETE',
            headers: config.headers
            })
            .then(res => responseStatus(res))
};




export {myUserData,
    objectsCard,
    sendProfileData,
    sendCardOnServer,
    sendAvatarOnServer,
    deleteCardOnServer,
    sendLikeOnServer,
    deleteLikeOnServer};
