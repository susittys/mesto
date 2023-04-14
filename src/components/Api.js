export default class {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res){
        if ( res.ok ) return res.json();
        return Promise.reject(`Ошибка: ${ res.status }`);
    }

    getInitCards(link){
        return (
            fetch(this._baseUrl + link, {
                headers: this._headers,
                method: 'GET'
            }).then( response => this._checkResponse( response ) )
        )
    }

    getUserInfo(link){
        return (
            fetch(this._baseUrl + link, {
                headers: this._headers,
                method: 'GET'
            }).then( response => this._checkResponse( response ) )
        )
    }

    updateAvatar(avatar, link){
        return (
            fetch(this._baseUrl + link, {
                headers: this._headers,
                method: 'PATCH',
                body: JSON.stringify(avatar)
            }).then( response => this._checkResponse( response ) )
        )
    }

    addUserCard(data, link){
        return (
            fetch(this._baseUrl + link, {
                headers: this._headers,
                method: 'POST',
                body: JSON.stringify(data)
            }).then( response => this._checkResponse( response ) )
        )
    }

    editUserProfile({ name, job }, link){
        return (
            fetch(this._baseUrl + link, {
                headers: this._headers,
                method: 'PATCH',
                body: JSON.stringify({
                    name: name,
                    about: job
                })
            }).then( response => this._checkResponse( response ) )
        )
    }

    setLikeStatus({ link, method }){
        return (
            fetch(this._baseUrl + link, {
                headers: this._headers,
                method
            }).then( response => this._checkResponse( response ) )
        )
    }

    removeUserCard(link){
        return (
            fetch(this._baseUrl + link, {
                headers: this._headers,
                method: 'DELETE'
            }).then( response => this._checkResponse( response ) )
        )
    }
}