// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesForCards = document.querySelector('.places__list');

// @todo: Функция создания карточки

function getCard (element) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;

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
    cardElement = getCard (item);   //подскажите, пожалуйста, почему я смог обратится к этой переменной? она ведь объявлена в другой функции (НЕ в области видимости)
    placesForCards.append(cardElement);
});