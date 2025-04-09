import "./pages/index.css";
import {initialCards} from './scripts/cards';
import {openPopup, closePopup} from './scripts/modal';
import {getCard, deleteCard, likeCard} from './scripts/card';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placeForCard = document.querySelector('.places__list');

// Получаем DOM-элементы для работы с попапами
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonClosePopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__close');
const buttonClosePopupTypeImage = popupTypeImage.querySelector('.popup__close');

// Находим поля формы в DOM
const formPopupTypeEdit = document.forms['edit-profile'];
const nameInput = formPopupTypeEdit.elements.name;
const jobInput = formPopupTypeEdit.elements.description;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Получаем DOM-элементы попапа ".popup_type_image"
const popupImg = popupTypeImage.querySelector('.popup__image');
const captionTypeImage = popupTypeImage.querySelector('.popup__caption');

// Находим поля формы ".popup_type_new-card" в DOM
const formNewPlace = document.forms['new-place'];
const placeNameInput = formNewPlace.elements['place-name'];
const linkInput = formNewPlace.elements['link'];

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
    const cardElement = getCard(item.link, item.name, deleteCard, likeCard, openImagePopup);
    placeForCard.append(cardElement);
});


// Редактирование профиля с помощью формы попапа

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function editProfileFromForm(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    // Закрытие попапа
    closePopup(popupTypeEdit, 'popup_is-opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopupTypeEdit.addEventListener('submit', editProfileFromForm); 


// Обработчики кликов открытия попапов
buttonEditProfile.addEventListener('click', function () {
    //здесь добавления значений инпутов при открытии попапа
    formPopupTypeEdit.elements.name.value = profileTitle.textContent;
    formPopupTypeEdit.elements.description.value = profileDescription.textContent;

    openPopup(popupTypeEdit, 'popup_is-opened');
});

buttonAddProfile.addEventListener('click', function () {
    openPopup(popupNewCard, 'popup_is-opened');
});


// Обработчики кликов закрытия попапов по кнопке закрытия ("крестик")
buttonClosePopupTypeEdit.addEventListener('click', function () {
    closePopup(popupTypeEdit, 'popup_is-opened');
});

buttonClosePopupNewCard.addEventListener('click', function () {
    closePopup(popupNewCard, 'popup_is-opened');
});

buttonClosePopupTypeImage.addEventListener('click', function () {
    closePopup(popupTypeImage, 'popup_is-opened');
})



/*
// Ниже описаны слушатели клика по оверлею для каждого попапа,
// но решил попробовать реализовать закрытие кликом по оверлею так же, как и по клавише "Esc".
popupTypeEdit.addEventListener('click', function(event) {
    if(event.target.classList.contains('popup_is-opened')) {
        closePopup(popupTypeEdit, 'popup_is-opened');
    }
});

popupNewCard.addEventListener('click', function(event) {
    if(event.target.classList.contains('popup_is-opened')) {
        closePopup(popupNewCard, 'popup_is-opened');
    }
});

popupTypeImage.addEventListener('click', function(event) {
    if(event.target.classList.contains('popup_is-opened')) {
        closePopup(popupTypeImage, 'popup_is-opened');
    }
});
*/



// Функция открытия попапа ".popup_type_image"

function openImagePopup(linkImg, nameImg) {
    popupImg.src = linkImg;
    popupImg.alt = nameImg;
    captionTypeImage.textContent = nameImg;

    openPopup(popupTypeImage, 'popup_is-opened');
}


// Создание и добавление катрочки с помощью попапа.

function createCardFromForm(event) {
    event.preventDefault(); // отменяем стандартную отправку формы.

    const newCard = getCard(linkInput.value, placeNameInput.value, deleteCard, likeCard, openImagePopup) // результат вызова записываем в переменную

    placeForCard.prepend(newCard); // выводим на экран (в начало списка карточек)

    formNewPlace.reset(); // очищаем поля формы

    closePopup(popupNewCard, 'popup_is-opened'); // закрываем попап

};

formNewPlace.addEventListener('submit', createCardFromForm);


export {cardTemplate};