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
                this._checkInputValidity(inputElement);
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
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся функция
            // hasInvalidInput вернёт true

            return !this._isValid( inputElement )
        })
    }

    _checkInputValidity(input) {
        if ( !this._isValid( input ) ) {
            this._showInputError( input );
        } else {
            this._hideInputError( input );
        }
    }

    _isValid = ( input ) => input.validity.valid;

    _showInputError(input) {
        const errorElement = this._formElement.querySelector(`.${ input.id }-error`);
        const errorMessage = input.validationMessage;

        input.classList.add(this._options.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._options.errorClass);
    }

    _hideInputError(input) {
        const errorElement = this._formElement.querySelector(`.${ input.id }-error`);
        input.classList.remove(this._options.inputErrorClass);
        errorElement.classList.remove(this._options.errorClass);
        errorElement.textContent = '';
    }

    resetForm() {
        this._inputList.forEach( input => {
            this._hideInputError( input )
        });

        this._toggleButtonState()
    }
}

