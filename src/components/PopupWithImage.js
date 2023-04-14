import Popup from "./Popup.js";

export default class extends Popup {
    constructor({ imageForLoad, imageForError, titleFullImage, imageFullImage }, selectorPopup ) {
        super(selectorPopup);

        this._imageFullImage = imageFullImage;
        this._titleFullImage = titleFullImage;

        this._imageForLoad  = imageForLoad;
        this._imageForError = imageForError;
    }

    open(data){
        this._empty();

        // анимация загрузки изображения
        this._imageFullImage.src = this._imageForLoad;

        // при неудачной загрузке
        this._imageFullImage.onerror = this._handleErrorImage.bind(this);

        this._imageFullImage.src = data.link;
        this._imageFullImage.alt = data.title;
        this._titleFullImage.textContent = data.title;

        super.open();
    }

    _empty(){
        this._imageFullImage.src = this._imageForError;
        this._imageFullImage.alt = 'Нет изображения';
        this._titleFullImage.textContent = '';
    }

    _handleErrorImage(){
        this._imageFullImage.src = this._imageForError;
    }
}