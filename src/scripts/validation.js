import {objectOfClasses} from '../index';

// Ниже описаны функции валидации

// Функция невалидного input

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(objectOfClasses.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objectOfClasses.errorClass);
};

// Функция валидного input

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(objectOfClasses.inputErrorClass);
    
    errorElement.textContent = '';
    errorElement.classList.remove(objectOfClasses.errorClass);
};

// Функция валидации input

function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// функция поиска невалидного инпута в форме

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};

// Функция, которая делает кнопку отправки формы активной/неактивной

const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(objectOfClasses.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(objectOfClasses.inactiveButtonClass);
      buttonElement.disabled = false;
    }
};

// Навешиваем обработчик события "input" на все input формы

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(objectOfClasses.inputSelector));
    const buttonElement = formElement.querySelector(objectOfClasses.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

// Валидация всех форм на странице

const enableValidation = (objectOfClassesValid) => {
    const formList = Array.from(document.querySelectorAll(objectOfClassesValid.formSelector));
    formList.forEach(function(formElement) {
      formElement.addEventListener('submit', function(event) {
        event.preventDefault();
      });
      setEventListeners(formElement);
    });
};

//-----------------------------------------------------------------------------------------------------------------------------------
// Функция, которая очищает ошибки валидации формы и делает кнопку неактивной.

function clearValidation(profileForm, validationConfigObject) {
    const inputListNovalid = Array.from(profileForm.querySelectorAll('.popup__input'));
    inputListNovalid.forEach(function(inputElement) {
        if(!inputElement.validity.valid) {
            inputElement.classList.remove(validationConfigObject.classInputNovalidity);
            profileForm.querySelector(`.${inputElement.id}-error`).classList.remove(validationConfigObject.classErrorMessageActive);
            const buttonElenent = profileForm.querySelector('.popup__button');
            buttonElenent.classList.add(validationConfigObject.classButtonDisablet);
            buttonElenent.disabled = true;
            inputElement.value = ""
        } else {
          const buttonElenent = profileForm.querySelector('.popup__button');
          buttonElenent.classList.remove(validationConfigObject.classButtonDisablet);
          buttonElenent.disabled = false;
        }
    })
}


export {enableValidation, clearValidation};