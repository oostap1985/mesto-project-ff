import {cardTemplate} from '../index';

// @todo: Функция создания карточки
    // Немного изменил функцию (добавил второй параметр(аргумент)), т.к по заданию эту же 
    //функцию нужно использовать при создании карточки через попап.
    // Получается:
    // --- при переборе массива, как аргумент передаем "ссылку" в objectCardLink, "имя" в objectCardName.
    // --- при создании карточки через попап: значение импута "ссылка" в objectCardLink, значение импута "имя" в objectCardName.
function getCard(objectCardLink, objectCardName) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = objectCardLink;
    cardImage.alt = objectCardName;
    cardTitle.textContent = objectCardName;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });
    
    return cardElement;
};

// @todo: Функция удаления карточки

function deleteCard(deleteElement) {
    deleteElement.remove();
};

// Функция лайка карточки

function likeCard(buttonLike, classLikeActive) {
    buttonLike.classList.toggle(classLikeActive);
};

export {getCard, likeCard};