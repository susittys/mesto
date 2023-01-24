let popup_modal = document.querySelector('.popup'),
    profileName = document.querySelector('.profile__name'),
    jobProfile  = document.querySelector('.profile__job'),
    profile__edit_btn = document.querySelector('.profile__edit');

if ( typeof profile__edit_btn !== "undefined" && typeof popup_modal !== "undefined" ) {

    profile__edit_btn.addEventListener('click', function (event) {
        let popup_name = popup_modal.querySelector('.popup__name'),
            popup_job = popup_modal.querySelector('.popup__job');

        popup_name.value = profileName.textContent;
        popup_job.value  = jobProfile.textContent;

        popup_modal.classList.add("popup_opened");
    });
}