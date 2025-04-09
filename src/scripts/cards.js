
const arhiz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelayb = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const holmogorskiy = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);


const initialCards = [
    {
      name: "Архыз",
      link: arhiz,
    },
    {
      name: "Челябинская область",
      link: chelayb,
    },
    {
      name: "Иваново",
      link: ivanovo,
    },
    {
      name: "Камчатка",
      link: kamchatka,
    },
    {
      name: "Холмогорский район",
      link: holmogorskiy,
    },
    {
      name: "Байкал",
      link: baikal,
    }
];

export {initialCards};
