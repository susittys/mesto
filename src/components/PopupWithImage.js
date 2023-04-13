import Popup from "./Popup.js";
import {titleFullImage, imageFullImage} from "../utils/constants.js";
import nonImageLink from '../images/image_no-places.jpg';
import loadImageLink from '../images/image_loading.gif';

export default class extends Popup {
    constructor( selectorPopup ) {
        super(selectorPopup);
    }

    open(data){
        this._empty();

        // анимация загрузки изображения
        imageFullImage.src = loadImageLink;

        // при неудачной загрузке
        imageFullImage.onerror = this._handleErrorImage;

        imageFullImage.src = data.link;
        imageFullImage.alt = data.title;
        titleFullImage.textContent = data.title;

        super.open();
    }

    _empty(){
        imageFullImage.src = nonImageLink;
        imageFullImage.alt = 'Нет изображения';
        titleFullImage.textContent = '';
    }

    _handleErrorImage(){
        this.src = nonImageLink;
    }
}