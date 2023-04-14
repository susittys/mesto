export default class {
    constructor({ renderer, checkNoPlaces }, containerSelector) {
        this._checkNoPlaces = checkNoPlaces;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.reverse().forEach( this._renderer )
    }

    addItem(element) {
        this._container.prepend(element);
        // если картинка добавлена, убрать "Нет добавленных.."
        this._checkNoPlaces();
    }
}