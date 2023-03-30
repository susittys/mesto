import {openPopup, checkNoPlaces} from './utils/utils.js';

const popupFullImage = document.querySelector('.popup_type_image'),
      titleFullImage = popupFullImage.querySelector('.popup__subtitle-image'),
      imageFullImage = popupFullImage.querySelector('.popup__full-image');


export default class {
    constructor(data, selectorTemplate) {
        this._link = data.link;
        this._name = data.name;
        this._selectorTemplate = selectorTemplate
    }


    getCard() {
        this.placeElement = this._getTemplate();

        const titlePlaceElement   = this.placeElement.querySelector('.elements__title'),
            imagePlaceElement   = this.placeElement.querySelector('.elements__image');

        titlePlaceElement.textContent  = this._name;
        imagePlaceElement.src = this._link;
        imagePlaceElement.alt = this._name;

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
        const placeImageGrp     = this.placeElement.querySelector('.elements__image-group'),
            buttonLikeElement   = this.placeElement.querySelector('.elements__like'),
            buttonRemoveElement = this.placeElement.querySelector('.elements__remove');

        // обработчики кликов кнопок на наборе карточек с фото
        buttonLikeElement.addEventListener('click', function (likeBtn) {
            likeBtn.target.classList.toggle('elements__like_active');
        });

        buttonRemoveElement.addEventListener('click', function (removeBtn) {
            const listElement = removeBtn.target.closest('.elements__element');
            listElement.remove();
            checkNoPlaces();
        });

        placeImageGrp.addEventListener('click', () => this._showFullImage() );
    }

    // Фн-ия открытия и загрузки данных в попап
    _showFullImage() {
        imageFullImage.src = this._link;
        imageFullImage.alt = this._name;
        titleFullImage.textContent = this._name;
        openPopup(popupFullImage);
    }
}