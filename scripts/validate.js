// Запуск валидации с классами форм
enableValidation({
    formSelector: '.popup__form',                       // класс всех форм
    inputSelector: '.popup__input',                    // поля ввода форм
    fieldsetSelector: '.popup__fieldset',             // наборы полей ввода форм
    inputErrorSelector: '.popup__error',             // строка информирующая об неудачной валидации полей ввода форм
    submitButtonSelector: '.popup__submit',         // кнопки отправки форм
    inactiveButtonClass: 'popup__submit_disabled', // стили кнопки отправки при неудачной валидации полей ввода форм
    inputErrorClass: 'popup__input_type_error',   // стили полей ввода формы при неудачной валидации полей ввода форм
    errorClass: 'popup__error_visible'           // стили строки с ошибкой, делающий её видимой под полями ввода форм
});

// Фу-ия устанавливает слушатели на валидации с классами форм
function enableValidation( objElements ) {
    const formList = Array.from( document.querySelectorAll( objElements.formSelector ) );

    formList.forEach( formElement => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(formElement.querySelectorAll( objElements.fieldsetSelector ));

        fieldsetList.forEach( fieldSet => {
            setEventListeners(fieldSet);
        });
    });

    function setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll( objElements.inputSelector));
        const buttonElement = formElement.querySelector( objElements.submitButtonSelector);

        toggleButtonState(inputList, buttonElement);

        inputList.forEach( inputElement => {
            inputElement.addEventListener('input', function () {
                checkInputValidity( formElement, inputElement );
                toggleButtonState( inputList, buttonElement );
            });
        });
    }

    function isValid(inputElement) {
        return inputElement.validity.valid
    }

    const showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add('popup__input_type_error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('popup__error_visible');
    };

    const hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove('popup__input_type_error');
        errorElement.classList.remove('popup__error_visible');
        errorElement.textContent = '';
    };

    function checkInputValidity(formElement, inputElement) {
        if ( !isValid( inputElement ) ) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement);
        }
    }

    function toggleButtonState(inputList, buttonElement) {
        if ( hasInvalidInput(inputList) ) {
            buttonElement.classList.add( objElements.inactiveButtonClass );
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove( objElements.inactiveButtonClass );
            buttonElement.disabled = false;
        }
    }

    function hasInvalidInput(inputList) {
        // проходим по этому массиву методом some
        return inputList.some( inputElement => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся функция
            // hasInvalidInput вернёт true

            return !isValid( inputElement )
        })
    }
}

