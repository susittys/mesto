export default class {
    constructor(options, form) {
        this._options = options;
        this._formElement = form;
        this._button = this._formElement.querySelector(this._options.submitButtonSelector);
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(this._formElement.querySelectorAll( this._options.fieldsetSelector ));

        fieldsetList.forEach( fieldSet => {
            this._setEventListeners( fieldSet );
        });

        return true
    }

    _setEventListeners(fieldSet) {
        this._inputList = Array.from( fieldSet.querySelectorAll( this._options.inputSelector ) );

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
        if ( this._hasInvalidInput() ) {
            this._button.classList.add( this._options.inactiveButtonClass );
            this._button.disabled = true;
        } else {
            this._button.classList.remove( this._options.inactiveButtonClass );
            this._button.disabled = false;
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

        this._inputElement.classList.add(this._options.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._options.errorClass);
    }

    _hideInputError() {
        const errorElement = this._formElement.querySelector(`.${ this._inputElement.id }-error`);
        this._inputElement.classList.remove(this._options.inputErrorClass);
        errorElement.classList.remove(this._options.errorClass);
        errorElement.textContent = '';
    }

    resetForm() {
        const errorList   = this._formElement.querySelectorAll(this._options.inputErrorSelector);

        errorList.forEach( elementError => {
            elementError.classList.remove(this._options.errorClass);
        });

        this._inputList.forEach( elementInput => {
            elementInput.classList.remove(this._options.inputErrorClass);
        });

        this._toggleButtonState()
    }
}

