import {checkNoPlaces} from "../utils/utils.js";

export default class {
        constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach( this._renderer )
    }

    addItem(element) {
        this._container.prepend(element);
        // если картинка добавлена, убрать "Нет добавленных.."
        checkNoPlaces();
    }
}