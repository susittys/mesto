import Popup from "./Popup.js";

export default class extends Popup {
     constructor( { handleSubmit }, selectorPopup ) {
        super(selectorPopup);
        this._form = this._popup.querySelector('.popup__form');
        this._handleSubmit = handleSubmit;
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    setElement(element){
        this.cardElement = element
    }

    setEventListeners(){
        super.setEventListeners();
        this._submitButton = this._form.querySelector('.popup__submit');

        // обр-ик клика кн-ки SUBMIT формы
        this._form.addEventListener('submit', evt => {
            super._handleFormSubmit(evt)

            // перед запросом сохраняем изначальный текст кнопки
            const initialText = this._submitButton.textContent;
            // меняем его, чтобы показать пользователю ожидание
            this._submitButton.textContent = 'Удаление...';
            this._handleSubmit()
                .then( () => this.close() ) // закрывается попап в `then`
                .finally( () => {
                    this._submitButton.textContent = initialText;
                }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
        });
    }
}