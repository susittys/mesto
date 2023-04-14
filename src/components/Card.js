export default class {
    constructor( { data, handleCardClick, handleLike, handleDislike, handleRemoveClick, checkUserLikes, checkUserOwner, imageForError }, selectorTemplate ) {
        this._link  = data.link;
        this._title = data.name;
        this._likes = data.likes ? data.likes : []; // костыль

        this._userLike = false;
        this._checkUserLikes = checkUserLikes.bind(this);

        this._userOwner = false;
        this._checkUserOwner = checkUserOwner.bind(this);

        this._handleCardClick = handleCardClick.bind(this);
        this._handleRemoveClick = handleRemoveClick.bind(this);

        this._handleLike = handleLike.bind(this);
        this._handleDislike = handleDislike.bind(this);

        this._imageForError = imageForError;
        this._selectorTemplate = selectorTemplate
    }

    getCard() {
        this._placeElement = this._getTemplate();

        const titleElement = this._placeElement.querySelector('.elements__title'),
            imageElement   = this._placeElement.querySelector('.elements__image'),
            removeElement  = this._placeElement.querySelector('.elements__remove');

        imageElement.onerror = ()=> imageElement.src = this._imageForError;

        titleElement.textContent  = this._title;
        imageElement.src = this._link;
        imageElement.alt = this._title;

        this._setEventListener();

        this._checkUserOwner();
        if ( !this._userOwner ) removeElement.remove();

        this._counterLikes = this._placeElement.querySelector('.elements__like-counter');
        this._likeElement  = this._placeElement.querySelector('.elements__like');

        this._toggleUserLike(this._likes);
        this._updateLikeCounter(this._likes);

        return this._placeElement
    }

    _updateLikeCounter(likes){
        this._counterLikes.innerText = this._countLikes( {likes} )
    }

    _toggleUserLike(likes){
        this._checkUserLikes(likes);

        if ( this._userLike ) this._likeElement.classList.add('elements__like_active')
        else this._likeElement.classList.remove('elements__like_active')
    }

    _countLikes = ( {likes} ) => likes.length;

    _getTemplate() {
        return (
            document
                .querySelector(this._selectorTemplate)
                .content
                .querySelector('.elements__element')
                .cloneNode(true)
        )
    }

    _hendlerLikeClick(){
        if ( this._userLike ){
            this._handleDislike();
        } else {
            this._handleLike();
        }
    }

    _setEventListener() {
        const fullImageButton = this._placeElement.querySelector('.elements__image-group');
        fullImageButton.addEventListener('click', this._handleCardClick)

        const removeButton = this._placeElement.querySelector('.elements__remove');
        removeButton.addEventListener('click', this._handleRemoveClick);

        const likeButton = this._placeElement.querySelector('.elements__like');
        likeButton.addEventListener('click', evt => this._hendlerLikeClick(evt));
    }
}