import {cardTemplate} from '../index';
import {sendLikeOnServer, deleteLikeOnServer, deleteCardOnServer, config} from './api';

// @todo: Функция создания карточки
    // Немного изменил функцию (добавил второй параметр(аргумент)), т.к по заданию эту же 
    //функцию нужно использовать при создании карточки через попап.
    // Получается:
    // --- при переборе массива, как аргумент передаем "ссылку" в objectCardLink, "имя" в objectCardName.
    // --- при создании карточки через попап: значение импута "ссылка" в objectCardLink, значение импута "имя" в objectCardName.
function getCard(objectCardLink, objectCardName, objectCardId, objectCardLikes, onDeleteCard, onLikeCard, onOpenImagePopup) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const sumLikes = cardElement.querySelector('.card__like-text');
    cardImage.src = objectCardLink;
    cardImage.alt = objectCardName;
    cardImage.id = objectCardId;
    cardTitle.textContent = objectCardName;
    sumLikes.textContent = objectCardLikes.length;

    deleteButton.addEventListener('click', function() {
        onDeleteCard(cardElement, objectCardId, objectCardName, objectCardLink);
    });

    likeButton.addEventListener('click', function() {
        onLikeCard(likeButton, 'card__like-button_is-active', objectCardId, sumLikes);
        
    });

    cardImage.addEventListener('click', function() {
        onOpenImagePopup(objectCardLink, objectCardName);
    });
    
    return cardElement;
};

// @todo: Функция удаления карточки

function deleteCard(deleteElement, idCard, nameCard, linkCard) {
    deleteElement.remove();
    deleteCardOnServer(config, idCard, nameCard, linkCard)
        .catch((err) => {
            console.log("Ошибка при удалении карточки", err);
        })
};

// Функция лайка карточки и добавления/удаления лайка на сервере

function likeCard(buttonLike, classLikeActive, idCard, likesSum) {
    if(!buttonLike.classList.contains(classLikeActive)) {
        sendLikeOnServer(config, idCard)
            .then((result) => {
                buttonLike.classList.add(classLikeActive);
                likesSum.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log("Ошибка при добавлении лайка", err);
            })
    } else {
        deleteLikeOnServer(config, idCard)
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