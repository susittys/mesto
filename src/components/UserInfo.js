export default class {
    constructor( {selectorName, selectorJob, selectorAva} ) {
        this._name = document.querySelector(selectorName);
        this._job  = document.querySelector(selectorJob);
        this._ava  = document.querySelector(selectorAva)
    }

    setUserInfo({name, job, id}) {
        this._name.textContent = name;
        this._job.textContent  = job;
        this._id = id
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job:  this._job.textContent,
            id:  this._id,
        }
    }

    changeAvatar(ava){
        this._ava.src = ava
    }
}