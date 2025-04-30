import "./pages/index.css";
//import {initialCards} from './scripts/cards';
import {openPopup, closePopup} from './scripts/modal';
import {getCard, deleteCard, likeCard} from './scripts/card';
import {enableValidation, clearValidation} from './scripts/validation';
import {myUserData,
    objectsCard,
    sendProfileData,
    sendCardOnServer,
    sendAvatarOnServer
    } from './scripts/api';







// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placeForCard = document.querySelector('.places__list');

// Получаем DOM-элементы для работы с попапами
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const buttonImageProfile = document.querySelector('.profile__image');

const popupImageEdit = document.querySelector('.popup_image_profile_edit');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const buttonClosePopupImageEdit = popupImageEdit.querySelector('.popup__close');
const buttonClosePopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__close');
const buttonClosePopupTypeImage = popupTypeImage.querySelector('.popup__close');

const buttonSubmitPopupTypeEdit = popupTypeEdit.querySelector('.popup__button');
const buttonSubmitPopupTypeImage = popupImageEdit.querySelector('.popup__button');
const buttonSubmitPopupNewCard = popupNewCard.querySelector('.popup__button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

// Находим поля формы ".popup_type_edit" в DOM
const formPopupTypeEdit = document.forms['edit-profile'];
const nameInput = formPopupTypeEdit.elements.name;
const jobInput = formPopupTypeEdit.elements.description;

// Получаем DOM-элементы попапа ".popup_type_image"
const popupImg = popupTypeImage.querySelector('.popup__image');
const captionTypeImage = popupTypeImage.querySelector('.popup__caption');

// Находим поля формы ".popup_type_new-card" в DOM
const formNewPlace = document.forms['new-place'];
const placeNameInput = formNewPlace.elements['place-name'];
const linkInput = formNewPlace.elements['link'];

// Находим форму ".popup_image_profile_edit" в DOM
const formPopupImageProfileEdit = document.forms['edit-image-profile'];
const avatarLinkInput = formPopupImageProfileEdit.elements['link'];

// @todo: Вывести карточки на страницу

/*initialCards.forEach(function(item) {
    const cardElement = getCard(item.link, item.name, deleteCard, likeCard, openImagePopup);
    placeForCard.append(cardElement);
});*/


// Функция изменения названия кнопки "Отправить" в форме попапов при ожидании ответв от сервера
function renderLoading(isLoading, button) {
    if(isLoading) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранить'
    }
};

// Редактирование профиля с помощью формы попапа
// Обработчик «отправки» формы
function editProfileFromForm(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // вызываем функцию изменения названия кнопки при ожидании ответа
    renderLoading(true, buttonSubmitPopupTypeEdit);

    // Вызываем функцию отправки на сервер измененных данных
    sendProfileData(config, nameInput.value, jobInput.value)
        .then((result) => {
            // Полученные в ответе "name" и "about" передаем с соответствующие элементы DOM
            profileTitle.textContent = result.name;
            profileDescription.textContent = result.about;
            // Очищаем поля формы
            formPopupTypeEdit.reset();
            // Закрытие попапа
            closePopup(popupTypeEdit, 'popup_is-opened');
        })
        .catch((err) => {
            console.log("Ошибка при редактировании профиля", err);
        })
        .finally(() => {
            renderLoading(false, buttonSubmitPopupTypeEdit);// вызываем функцию изменения названия кнопки после ответа
        })
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopupTypeEdit.addEventListener('submit', editProfileFromForm); 

// Редактирование изображения профиля
// Обработчик «отправки» формы
function editImageProfile(evt) {
    evt.preventDefault();

    //  вызываем функцию изменения названия кнопки при ожидании ответа
    renderLoading(true, buttonSubmitPopupTypeImage);
    // отправляем новую аватарку на сервер
    sendAvatarOnServer(config, avatarLinkInput.value)
        .then((result) => {
            console.log(result)
            profileAvatar.style.backgroundImage = `url(${result.avatar})`;
            // Очищаем форму после отправки
            formPopupImageProfileEdit.reset();
            // Закрытие попапа
            closePopup(popupImageEdit, 'popup_is-opened');
        })
        .catch((err) => {
            console.log("Ошибка при редактировании аватара профиля", err);
        })
        .finally(() => {
            renderLoading(false, buttonSubmitPopupTypeImage);// вызываем функцию изменения названия кнопки после ответа
        })
};

formPopupImageProfileEdit.addEventListener('submit', editImageProfile);



// Обработчики кликов открытия попапов
buttonEditProfile.addEventListener('click', function () {

    clearValidation(formPopupTypeEdit, objectOfClassesForValidation);

    //здесь добавления значений инпутов при открытии попапа
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    openPopup(popupTypeEdit, 'popup_is-opened');
});

buttonAddProfile.addEventListener('click', function () {
    clearValidation(formNewPlace, objectOfClassesForValidation);
    openPopup(popupNewCard, 'popup_is-opened');
});

buttonImageProfile.addEventListener('click', function() {
    clearValidation(formPopupImageProfileEdit, objectOfClassesForValidation);
    openPopup(popupImageEdit, 'popup_is-opened');
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
});

buttonClosePopupImageEdit.addEventListener('click', function() {
    closePopup(popupImageEdit, 'popup_is-opened');
});



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
};


// Создание и добавление катрочки с помощью попапа.

function createCardFromForm(event) {
    event.preventDefault(); // отменяем стандартную отправку формы.

    //  вызываем функцию изменения названия кнопки при ожидании ответа
    renderLoading(true, buttonSubmitPopupNewCard);
    // отправляем новую карточку на сервер
    sendCardOnServer(config, placeNameInput.value, linkInput.value)
        .then((newCadr) => {

            // записывае в константу результат вызова функции создания карточки
            const myNewCard = getCard(cardTemplate,
                newCadr.link,
                newCadr.name,
                newCadr._id,
                newCadr.likes,
                newCadr.owner,
                useInfo,
                deleteCard,
                likeCard,
                openImagePopup,
                config);
            
            // выводим на экран (в начало списка карточек)
            placeForCard.prepend(myNewCard);

            // очищаем поля формы
            formNewPlace.reset();

            // закрываем попап
            closePopup(popupNewCard, 'popup_is-opened');
        })
        .catch((err) => {
            console.log("Ошибка при добавлении карточки на сервер", err);
        })
        .finally(() => {
            renderLoading(false, buttonSubmitPopupNewCard);// вызываем функцию изменения названия кнопки после ответа
        })
    
    

};

formNewPlace.addEventListener('submit', createCardFromForm);


//-----------------------------------------------   ВАЛИДАЦИЯ   ----------------------------------------

// объект классов для валидации
const objectOfClassesForValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}


// Вызов функции валидации
enableValidation(objectOfClassesForValidation);

//----------------------------------------------------   API   -------------------------------------------

// Токен и индефикатор группы в URL
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
    headers: {
      authorization: '7589cc2e-fb35-43d4-a4c5-1c85a7f6547d',
      'Content-Type': 'application/json'
    }
}



// Функция заполнения профиля информацией с сервера
function infoProfile(useInfoOn) {
    profileTitle.textContent = useInfoOn.name;
    profileDescription.textContent = useInfoOn.about;
    profileAvatar.style.backgroundImage = `url(${useInfoOn.avatar})`;
};

// В переменной будут записаны данные пользователя
let useInfo;

const promises = [myUserData(config), objectsCard(config)];


// Промис, который принимает на себя два разных запроса на сервер
Promise.all(promises)
    .then(([myUse, cards]) => {

        useInfo = myUse;

        // Заполняем поля профиля
        infoProfile(myUse);

        cards.forEach(function(itemCard) {

            // записывае в константу результат вызова функции создания карточки
            const cardNewObject = getCard(cardTemplate,
                itemCard.link,
                itemCard.name,
                itemCard._id,
                itemCard.likes,
                itemCard.owner,
                myUse,
                deleteCard,
                likeCard,
                openImagePopup,
                config);
            
            // выводим карточку на экран
            placeForCard.append(cardNewObject);
        })
    })
    .catch((err) => {
        console.log("Ошибка", err);
    })