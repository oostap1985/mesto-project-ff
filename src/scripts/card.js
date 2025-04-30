import {sendLikeOnServer, deleteLikeOnServer, deleteCardOnServer} from './api';

// @todo: Функция создания карточки
    // Немного изменил функцию (добавил второй параметр(аргумент)), т.к по заданию эту же 
    //функцию нужно использовать при создании карточки через попап.
    // Получается:
    // --- при переборе массива, как аргумент передаем "ссылку" в objectCardLink, "имя" в objectCardName.
    // --- при создании карточки через попап: значение импута "ссылка" в objectCardLink, значение импута "имя" в objectCardName.
function getCard(patternCard,
    objectCardLink,
    objectCardName,
    objectCardId,
    objectCardLikes,
    objectCardOwner,
    myUseInfo,
    onDeleteCard,
    onLikeCard,
    onOpenImagePopup,
    myUseConfig) {
    const cardElement = patternCard.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const sumLikes = cardElement.querySelector('.card__like-text');
    const myLike = objectCardLikes.some(user => user._id === myUseInfo._id);
    cardImage.src = objectCardLink;
    cardImage.alt = objectCardName;
    cardImage.id = objectCardId;
    cardTitle.textContent = objectCardName;
    sumLikes.textContent = objectCardLikes.length;


    if(objectCardOwner._id === myUseInfo._id) {
        deleteButton.classList.remove('card__delete-button-hidden');
    }
    if(myLike === true) {
        likeButton.classList.add('card__like-button_is-active');
    }


    deleteButton.addEventListener('click', function() {
        onDeleteCard(myUseConfig, cardElement, objectCardId, objectCardName, objectCardLink);
    });

    likeButton.addEventListener('click', function() {
        onLikeCard(myUseConfig, likeButton, 'card__like-button_is-active', objectCardId, sumLikes);
    });

    cardImage.addEventListener('click', function() {
        onOpenImagePopup(objectCardLink, objectCardName);
    });

    return cardElement;
};

// @todo: Функция удаления карточки

function deleteCard(myConfig, deleteElement, idCard, nameCard, linkCard) {
    deleteCardOnServer(myConfig, idCard, nameCard, linkCard)
        .then((message) => {
            console.log(message);
            deleteElement.remove();
        })
        .catch((err) => {
            console.log("Ошибка при удалении карточки", err);
        })
};

// Функция лайка карточки и добавления/удаления лайка на сервере

function likeCard(myConfig, buttonLike, classLikeActive, idCard, likesSum) {
    if(!buttonLike.classList.contains(classLikeActive)) {
        sendLikeOnServer(myConfig, idCard)
            .then((result) => {
                buttonLike.classList.add(classLikeActive);
                likesSum.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log("Ошибка при добавлении лайка", err);
            })
    } else {
        deleteLikeOnServer(myConfig, idCard)
            .then((result) => {
                buttonLike.classList.remove(classLikeActive);
                likesSum.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log("Ошибка при удалении лайка", err);
            })
    }
};




export {getCard, deleteCard, likeCard};