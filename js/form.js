'use strict';
(function(){
    const noticeSetup = document.querySelector('.notice');
    const noticeForm = noticeSetup.querySelector('.notice__form');
    const noticeFieldsetsSetup = noticeSetup.querySelectorAll('fieldset');
    const noticeButton = noticeSetup.querySelector('.form__submit');
    const noticeTitle = noticeSetup.querySelector('#title'); 
    const noticePrice = noticeSetup.querySelector('#price');
    const noticeAddress = noticeSetup.querySelector('#address');
    const noticeCapacity = noticeSetup.querySelector('#capacity');
    const noticeRooms = noticeSetup.querySelector('#room_number');

    function changeNoticeFieldsetsMode (mode) { 
        for (let i = 0; i < noticeFieldsetsSetup.length; i ++){
            noticeFieldsetsSetup[i].disabled = mode;
        }
    }

    window.form = {
        disableNoticeFieldsets: function () {
            changeNoticeFieldsetsMode('disabled')
            noticeForm.classList.add('notice__form--disabled');
        },
        enableNoticeFieldsets: function () {
            changeNoticeFieldsetsMode(false);
            noticeForm.classList.remove('notice__form--disabled');
        }
    }

    const title = new window.validation.InputText ({
        getValue: function () {
            return noticeTitle.value
        },
        fieldsetElement: noticeTitle.parentElement,
        minLength: 30,
        maxLength: 100
    })

    const price = new window.validation.InputNumber ({
        getValue: function () {
            return noticePrice.value
        },
        fieldsetElement: noticePrice.parentElement,
        minNumber: 1000,
        maxNumber: 1000000
    })

    const address = new window.validation.InputValue ({
        getValue: function () {
            return noticeAddress.value
        },
        fieldsetElement: noticeAddress.parentElement
    })

    const capacity = new window.validation.InputCapacity ({
        getValue: function () {
            return noticeCapacity.value
        },
        getRooms: function () {
            return noticeRooms.value
        },
        fieldsetElement: noticeCapacity.parentElement
    })
    function onSuccessValidation (element) {
        let validationElement = element.querySelector('.validation-message');
        element.classList.remove('error');
        if (validationElement) element.querySelector('.validation-message').classList.add('visuallyhidden');
        element.classList.add('success');
    }

    function onErrorValidation (message, element) {
        element.classList.remove('success');
        element.classList.add('error');
        let validationElement;
        if (element.querySelector('.validation-message') === null) {
            validationElement = document.createElement('small');
            validationElement.classList = 'validation-message visuallyhidden'
            element.appendChild(validationElement);
        }
        validationElement = element.querySelector('.validation-message');
        validationElement.classList.remove('visuallyhidden');
        validationElement.innerText = message;
    }    

    function addNoticeEventListeners () {
        noticeTitle.addEventListener('input', onTitleInput);
        noticePrice.addEventListener('input', onPriceInput);
        noticeAddress.addEventListener('input', onAddressInput);
        noticeCapacity.addEventListener('input', onCapacityInput);
        noticeRooms.addEventListener('input', onCapacityInput);
    }

    function removeNoticeEventListeners () {
        noticeTitle.removeEventListener('input', onTitleInput);
        noticePrice.removeEventListener('input', onPriceInput);
        noticeAddress.removeEventListener('input', onAddressInput);
        noticeCapacity.removeEventListener('input', onCapacityInput);
        noticeRooms.removeEventListener('input', onCapacityInput);
    }

    function checkValidityItems () {
        title.checkValidity(onErrorValidation, onSuccessValidation);
        price.checkValidity(onErrorValidation, onSuccessValidation);
        address.checkValidity(onErrorValidation, onSuccessValidation);
        capacity.checkValidity(onErrorValidation, onSuccessValidation);
        let validityItems = [title.validity, price.validity, address.validity, capacity.validity];
        let validity = true;
        validityItems.forEach(function(item) {
            if (item === false) validity = false;
        })
        if (validity) return true
    }

    const onTitleInput = window.lib.debounce(function () {
        title.checkValidity(onErrorValidation, onSuccessValidation);
    })

    const onPriceInput = window.lib.debounce(function () {
        price.checkValidity(onErrorValidation, onSuccessValidation);
    })

    const onAddressInput = window.lib.debounce(function () {
        address.checkValidity(onErrorValidation, onSuccessValidation);
    })

    const onCapacityInput = window.lib.debounce(function () {
        capacity.checkValidity(onErrorValidation, onSuccessValidation);
    })

    window.form.disableNoticeFieldsets();
    addNoticeEventListeners();
    noticeButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        if(checkValidityItems()) window.backend.save(new FormData(noticeForm), console.log, console.log);
    });
})()