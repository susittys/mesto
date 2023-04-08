import {checkNoPlaces} from "../utils/utils.js";

export default class {
        constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach( this._renderer )
    }

    addItem(element) {
        this._container.prepend(element);
        // если картинка добавлена, убрать "Нет добавленных.."
        checkNoPlaces();
    }
}