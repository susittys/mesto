import Popup from "./Popup.js";
import {titleFullImage, imageFullImage} from "../utils/constants.js";
import nonImageLink from '../../images/image_no-places.jpg';

export default class extends Popup {
    constructor( data, selectorPopup ) {
        super(selectorPopup);
        this._title = data.title;
        this._link = data.link;
    }

    open() {
        this._empty();

        imageFullImage.src = this._link;
        imageFullImage.alt = this._title;
        titleFullImage.textContent = this._title;

        super.open();
    }

    _empty(){
        imageFullImage.src = nonImageLink;
        imageFullImage.alt = 'Нет изображения';
        titleFullImage.textContent = '';
    }
}