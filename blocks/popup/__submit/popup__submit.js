// Находим форму в DOM
let formElement = document.querySelector('.popup');
// Находим поля формы в DOM
    let nameInput = formElement.querySelector('.popup__name'),
        jobInput = formElement.querySelector('.popup__job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function handleFormSubmit (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        // Так мы можем определить свою логику отправки.
        // О том, как это делать, расскажем позже.

        // Получите значение полей jobInput и nameInput из свойства value
        let name = nameInput.value,
            job  = jobInput.value;

        if ( ( typeof name !== "undefined" && typeof job !== "undefined" ) && ( name.length && job.length ) ) {
            let profileName = document.querySelector('.profile__name'),
                jobProfile  = document.querySelector('.profile__job');
            if ( typeof profileName !== "undefined" && typeof jobProfile !== "undefined" ) {
                profileName.textContent = name;
                jobProfile.textContent  = job;
                profile__close_btn.click();
            }
        }
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);