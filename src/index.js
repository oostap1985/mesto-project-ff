import "./pages/index.css";
import {initialCards} from './scripts/cards';
import {openPopup, closePopup} from './scripts/modal';
import {getCard, likeCard} from './scripts/card';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placeForCard = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
    const cardElement = getCard(item.link, item.name);
    placeForCard.append(cardElement);
});


// Получаем DOM-элементы
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const closePopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const closePopupNewCard = popupNewCard.querySelector('.popup__close');
const closePopupTypeImage = popupTypeImage.querySelector('.popup__close');


// Редактирование профиля с помощью формы попапа
// Находим поля формы в DOM
const formPopupTypeEdit = document.forms['edit-profile'];
const nameInput = formPopupTypeEdit.elements.name; // Воспользуйтесь инструментом .querySelector()
const jobInput = formPopupTypeEdit.elements.description; // Воспользуйтесь инструментом .querySelector()

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
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
formPopupTypeEdit.addEventListener('submit', handleFormSubmit); 


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
closePopupTypeEdit.addEventListener('click', function () {
    closePopup(popupTypeEdit, 'popup_is-opened');
});

closePopupNewCard.addEventListener('click', function () {
    closePopup(popupNewCard, 'popup_is-opened');
});

closePopupTypeImage.addEventListener('click', function () {
    closePopup(popupTypeImage, 'popup_is-opened');
})



// Обработчик закрытия попапов кликом по "оверлею"
document.addEventListener('click', function (event) {
    if(event.target.classList.contains('popup_is-opened')) {
        closePopup(event.target, 'popup_is-opened');
    }
});


// Обработчик закрытия попапов нажатием клавиши "Escape"
document.addEventListener('keydown', function (event) {
    if(event.key === 'Escape') {
        closePopup(popupTypeEdit, 'popup_is-opened');
        closePopup(popupNewCard, 'popup_is-opened');
        closePopup(popupTypeImage, 'popup_is-opened');
    }
});


// Ниже описан лайк карточки и открытие попапа ".popup_type_image"
// Получаем DOM-элементы
const popupImg = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');



placesList.addEventListener('click', function (event) {
    // Лайк карточек (добавляем обработчик клика на весь блок карточек
    // и по клику на элемент добавляем/убираем класс)
    if(event.target.classList.contains('card__like-button')) {
        likeCard(event.target, 'card__like-button_is-active');
    }

    // Открытие попапа по клику на картинку
    if(event.target.classList.contains('card__image')) {
        popupImg.src = event.target.src;
        popupImg.alt = event.target.alt;
        popupCaption.textContent = event.target.alt;
        
        openPopup(popupTypeImage, 'popup_is-opened');
    }
});

// Создание и добавление катрочки с помощью попапа.
// Находим поля формы в DOM
const formNewPlace = document.forms['new-place'];
const placeNameInput = formNewPlace.elements['place-name'];
const linkInput = formNewPlace.elements['link'];

function createCardFromForm(event) {
    event.preventDefault(); // отменяем стандартную отправку формы.

    const newCard = getCard(linkInput.value, placeNameInput.value) // результат вызова записываем в переменную

    placeForCard.prepend(newCard); // выводим на экран (в начало списка карточек)

    formNewPlace.reset(); // очищаем поля формы

    closePopup(popupNewCard, 'popup_is-opened'); // закрываем попап

};

formNewPlace.addEventListener('submit', createCardFromForm);


export {cardTemplate};