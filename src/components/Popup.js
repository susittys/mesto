export default class {
    constructor( selectorPopup ) {
        this._popup = document.querySelector(selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    // Фн-ия открытия Попап
    open(){
        this._popup.classList.add("popup_opened");
        this._setESCListener()
    }

    // Фн-ия закрытия Попап
    close(){
        this._popup.classList.remove("popup_opened");
        this._remESCListener()
    }

    // ф-ия закрытия попап по нажатию клавиши ESC
    _handleEscClose(action){
        if (action.key === 'Escape') {
            this.close()
        }
    }

    _handleFormSubmit(evt) {
        evt.preventDefault();
    }

    setEventListeners(){
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

    _setESCListener() {
        document.addEventListener('keyup', this._handleEscClose);
    }

    _remESCListener() {
        document.removeEventListener('keyup', this._handleEscClose);
    }
}