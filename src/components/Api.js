export default class {

    getInitCards({ data, config }){
        this._executeQuery(data, config)
    }

    getUserInfo({ data, config }){
        this._executeQuery(data, config)
    }

    updateAvatar({ data, config }){
        this._executeQuery(data, config)
    }

    addUserCard({ data, config }){
        this._executeQuery(data, config)
    }

    editUserProfile({ data, config }){
        this._executeQuery(data, config)
    }

    setLikeStatus({ data, config }){
        this._executeQuery(data, config)
    }

    removeUserCard({ data, config }){
        this._executeQuery(data, config)
    }

    _executeQuery({ link, callback }, config){
        fetch(link, config)
            .then( (response) => {
                if ( response.ok ) return response.json();

                return Promise.reject(`Ошибка: ${ response.status }`);
            })
            .then( data => callback(data) )
            .catch( error => console.log(error) )
    }
}