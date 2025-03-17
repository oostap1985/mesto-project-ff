// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesForCard = document.querySelector('.places__list');

// @todo: Функция создания карточки

function getCard(objectCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = objectCard.link;
    cardImage.alt = objectCard.name;
    cardTitle.textContent = objectCard.name;

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

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
    const cardElement = getCard(item);   //Спасибо большое, Ирина, за пояснение!
    placesForCard.append(cardElement);
});