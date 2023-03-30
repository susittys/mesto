export default class {
    constructor(options, form) {
        this._options = options;
        this._formElement = form;
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(this._formElement.querySelectorAll( this._options.fieldsetSelector ));

        fieldsetList.forEach( fieldSet => {
            this._formFieldSet = fieldSet;
            this._setEventListeners();
        });

        return true
    }

    _setEventListeners() {
        this._inputList = Array.from(this._formFieldSet.querySelectorAll( this._options.inputSelector));

        this._toggleButtonState();

        this._inputList.forEach( inputElement => {
            inputElement.addEventListener('input', () => {
                this._inputElement = inputElement;
                this._checkInputValidity();
                this._toggleButtonState();
            });
        });
    }

    _toggleButtonState() {
        const buttonElement = this._formElement.querySelector( this._options.submitButtonSelector);

        if ( this._hasInvalidInput() ) {
            buttonElement.classList.add( this._options.inactiveButtonClass );
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove( this._options.inactiveButtonClass );
            buttonElement.disabled = false;
        }
    }

    _hasInvalidInput() {
        // проходим по этому массиву методом some
        return this._inputList.some( inputElement => {
            this._inputElement = inputElement;
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся функция
            // hasInvalidInput вернёт true

            return !this._isValid()
        })
    }

    _checkInputValidity() {
        if ( !this._isValid( this._inputElement ) ) {
            this._showInputError();
        } else {
            this._hideInputError();
        }
    }

    _isValid() {
        return this._inputElement.validity.valid
    }

    _showInputError() {
        const errorElement = this._formElement.querySelector(`.${ this._inputElement.id }-error`);
        const errorMessage = this._inputElement.validationMessage;

        this._inputElement.classList.add('popup__input_type_error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('popup__error_visible');
    }

    _hideInputError() {
        const errorElement = this._formElement.querySelector(`.${ this._inputElement.id }-error`);
        this._inputElement.classList.remove('popup__input_type_error');
        errorElement.classList.remove('popup__error_visible');
        errorElement.textContent = '';
    }
}

