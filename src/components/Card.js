import { checkNoPlaces } from '../utils/utils.js';

export default class {
    constructor({ data, handleCardClick}, selectorTemplate) {
        this._link  = data.link;
        this._title = data.name;
        this._handleCardClick = handleCardClick.bind(this);
        this._selectorTemplate = selectorTemplate
    }


    getCard() {
        this.placeElement = this._getTemplate();

        const titlePlaceElement   = this.placeElement.querySelector('.elements__title'),
            imagePlaceElement   = this.placeElement.querySelector('.elements__image');

        titlePlaceElement.textContent  = this._title;
        imagePlaceElement.src = this._link;
        imagePlaceElement.alt = this._title;

        this._setEventListener();

        return this.placeElement;
    }

    _getTemplate() {
        return ( document
                .querySelector(this._selectorTemplate)
                .content
                .querySelector('.elements__element')
                .cloneNode(true)
        )
    }

    _setEventListener() {

        const likeButton = {
            element: this.placeElement.querySelector('.elements__like'),
            // Фн-ия тоггле лайка
            click: function () {
                this.classList.toggle('elements__like_active');
            }
        };

        const removeButton = {
            element: this.placeElement.querySelector('.elements__remove'),
            // Фн-ия удаления карточки
            click: function () {
                this.closest('.elements__element').remove();
                checkNoPlaces();
            }
        };

        const fullImageButton = this.placeElement.querySelector('.elements__image-group');

        likeButton.element.addEventListener('click', likeButton.click.bind( likeButton.element ) );
        removeButton.element.addEventListener('click', removeButton.click.bind( removeButton.element ) );
        fullImageButton.addEventListener('click', this._handleCardClick );
    }
}