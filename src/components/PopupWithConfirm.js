import Popup from "./Popup.js";

export default class extends Popup {
    constructor( { handleSubmit }, selectorPopup ) {
        super(selectorPopup);
        this._form = this._popup.querySelector('.popup__form');
        this._handleSubmit = handleSubmit;
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    _handleFormSubmit(evt) {
        super._handleFormSubmit(evt);
        this._handleSubmit();
    }

    setElement(element){
        this.cardElement = element
    }

    setEventListeners(){
        super.setEventListeners();

        // обр-ик клика кн-ки SUBMIT формы
        this._form.addEventListener('submit', this._handleFormSubmit);
    }

    showLoading(status){
        const buttonSubmit = this._form.querySelector('.popup__submit');
        buttonSubmit.textContent = status
    }
}