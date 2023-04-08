export default class {
    constructor( {selectorName, selectorJob} ) {
        this._name = document.querySelector(selectorName);
        this._job  = document.querySelector(selectorJob)
    }

    setUserInfo(dataUser) {
        this._name.textContent = dataUser.name;
        this._job.textContent  = dataUser.job
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job:  this._job.textContent
        }
    }
}