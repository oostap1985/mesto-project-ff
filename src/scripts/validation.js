// Ниже описаны функции валидации

// Функция невалидного input

function showInputError(formElement, inputElement, errorMessage, objectOfClassesValidation) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(objectOfClassesValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objectOfClassesValidation.errorClass);
};

// Функция валидного input

function hideInputError(formElement, inputElement, objectOfClassesValidation) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(objectOfClassesValidation.inputErrorClass);
    
    errorElement.textContent = '';
    errorElement.classList.remove(objectOfClassesValidation.errorClass);
};

// Функция валидации input

function checkInputValidity(formElement, inputElement, objectOfClassesValidation) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, objectOfClassesValidation);
    } else {
        hideInputError(formElement, inputElement, objectOfClassesValidation);
    }
};

// функция поиска невалидного инпута в форме

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};

// Функция, которая делает кнопку отправки формы активной/неактивной

const toggleButtonState = (inputList, buttonElement, objectOfClassesValidation) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(objectOfClassesValidation.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(objectOfClassesValidation.inactiveButtonClass);
      buttonElement.disabled = false;
    }
};

// Навешиваем обработчик события "input" на все input формы

function setEventListeners(formElement, objectOfClassesValidation) {
    const inputList = Array.from(formElement.querySelectorAll(objectOfClassesValidation.inputSelector));
    const buttonElement = formElement.querySelector(objectOfClassesValidation.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, objectOfClassesValidation);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, objectOfClassesValidation);
        toggleButtonState(inputList, buttonElement, objectOfClassesValidation);
      });
    });
};

// Валидация всех форм на странице

const enableValidation = (objectOfClassesValidation) => {
    const formList = Array.from(document.querySelectorAll(objectOfClassesValidation.formSelector));
    formList.forEach(function(formElement) {
      formElement.addEventListener('submit', function(event) {
        event.preventDefault();
      });
      setEventListeners(formElement, objectOfClassesValidation);
    });
};

//-----------------------------------------------------------------------------------------------------------------------------------
// Функция, которая очищает ошибки валидации формы и делает кнопку неактивной.

function clearValidation(formForClearingErrors, objectOfClassesValidation) {
    const inputListNovalid = Array.from(formForClearingErrors.querySelectorAll(objectOfClassesValidation.inputSelector));
    inputListNovalid.forEach(function(inputElement) {
        if(!inputElement.validity.valid) {
            hideInputError(formForClearingErrors, inputElement, objectOfClassesValidation);
            const buttonElenent = formForClearingErrors.querySelector(objectOfClassesValidation.submitButtonSelector);
            toggleButtonState(inputListNovalid, buttonElenent, objectOfClassesValidation);
            inputElement.value = ""
        } else {
            const buttonElenent = formForClearingErrors.querySelector(objectOfClassesValidation.submitButtonSelector);
            toggleButtonState(inputListNovalid, buttonElenent, objectOfClassesValidation);;
        }
    })
}


export {enableValidation, clearValidation};