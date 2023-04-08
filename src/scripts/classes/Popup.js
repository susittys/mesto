export default class {
    constructor( selectorPopup ) {
        this._popup = document.querySelector(selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleSubmit = () => {};
    }

    // Фн-ия открытия Попап
    open(){
        this._popup.classList.add("popup_opened");
        this._setEventListeners()
    }

    // Фн-ия закрытия Попап
    close(){
        this._popup.classList.remove("popup_opened");
        this._remEventListeners()
    }

    // ф-ия закрытия попап по нажатию клавиши ESC
    _handleEscClose(action){
        if (action.key === 'Escape') {
            this.close()
        }
    }

    _setEventListeners(){
        document.addEventListener('keyup', this._handleEscClose);

        this._popup.addEventListener('mousedown', (evt) => {
            // клик по оверлею
            if (evt.target.classList.contains('popup_opened')) {
                this.close()
            // клик по иконке закрытия попапа
            } else if (evt.target.classList.contains('popup__close')) {
                this.close()
            }
        })
    }

    _remEventListeners(){
        document.removeEventListener('keyup', this._handleEscClose);
        document.removeEventListener('keyup', this._handleSubmit);
    }
}