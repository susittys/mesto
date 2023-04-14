import Popup from "./Popup.js";

export default class extends Popup {
    constructor( { handleSubmit }, selectorPopup ) {
        super(selectorPopup);
        this._form = this._popup.querySelector('.popup__form');
        this._handleSubmit = handleSubmit;
    }

    _getInputValues(){
        return this._inputList.reduce((obj, input) => ({...obj, [input.name]: input.value}) ,{});
    }

    setInputValues(data) {
        this._inputList.forEach( input => input.value = data[input.name] )
    }


    setEventListeners(){
        super.setEventListeners();
        this._inputList  = Array.from( this._form.querySelectorAll('input') );
        this._submitButton = this._form.querySelector('.popup__submit');

        // обр-ик клика кн-ки SUBMIT формы
        this._form.addEventListener('submit', evt => {
            super._handleFormSubmit(evt)

            // перед запросом сохраняем изначальный текст кнопки
            const initialText = this._submitButton.textContent;
            // меняем его, чтобы показать пользователю ожидание
            this._submitButton.textContent = 'Сохранение...';
            this._handleSubmit(this._getInputValues())
                .then( () => this.close() ) // закрывается попап в `then`
                .finally( () => {
                    this._submitButton.textContent = initialText;
                }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}