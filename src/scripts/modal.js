// Функция открытия попапа

function openPopup(popup, classOpen) {
    popup.classList.add(classOpen);
    document.addEventListener('keydown', closeEscPopup); // добавляем обработчик события нажатия клавиши "Esc"
    popup.addEventListener('click', closeClickOverlay); // добавляем слушатель клика по оверлею
};

// Функция закрытия попапа

function closePopup(popup, classOpen) {
    popup.classList.remove(classOpen);
    document.removeEventListener('keydown', closeEscPopup); // удаляем обработчик события нажатия клавиши "Esc"
    popup.removeEventListener('click', closeClickOverlay); // добавляем слушатель клика по оверлею
}


// Функция закрытия попапа нажатием клавиши "Escape"
function closeEscPopup(event) {
    if(event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_is-opened');
        closePopup(popupOpened, 'popup_is-opened');
    }
};


// Функция закрытия попапа кликом по оверлею
function closeClickOverlay(event) {
    if(event.target.classList.contains('popup_is-opened')) {
        closePopup(event.target, 'popup_is-opened');
    }
};


export {openPopup, closePopup};