import Popup from "./Popup.js";

export default class extends Popup {
    constructor( { handleSubmit }, selectorPopup ) {
        super(selectorPopup);
        this._form = this._popup.querySelector('.popup__form');
        this._handleSubmit = handleSubmit;
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    _getInputValues(){
        const inputList  = Array.from( this._form.querySelectorAll('input') ),
              valuesForm = {};

        inputList.forEach( input => {
            valuesForm[input.name] = input.value;
        })

        return valuesForm
    }


    _handleFormSubmit(evt) {
        super._handleFormSubmit(evt)
        this._handleSubmit( this._getInputValues() );
    }


    setEventListeners(){
        super.setEventListeners();

        // обр-ик клика кн-ки SUBMIT формы
        this._form.addEventListener('submit', this._handleFormSubmit);
    }

    close() {
        super.close();
        this._form.reset();
    }
}