// Функция открытия попапа

function openPopup(popup, classOpen) {
    popup.classList.add(classOpen);
};

// Функция закрытия попапа

function closePopup(popup, classOpen) {
    popup.classList.remove(classOpen);
}


export {openPopup, closePopup};