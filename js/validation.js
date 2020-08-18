'use strict';
(function () {
    class InputValue {
        constructor (options) {
            this.getValue = options.getValue
            this.fieldsetElement = options.fieldsetElement
            this.required = options.required || true
            this.validity = NaN
            this.bannedSymbols = options.bannedSymbols
        }

        isInputEmpty(onError) {
            if (this.validity === true && this.required && this.getValue() === '') {
                let message = 'Поле не может быть пустым'
                onError(message, this.fieldsetElement);
                this.validity = false
            }
        }

        checkValidity(onError, onSuccess) {
            this.validity = true;
            if (this.required) this.isInputEmpty(onError)
            if (this.validity === true) onSuccess(this.fieldsetElement)
        }
    }

    class InputText extends InputValue {
        constructor (options) {
            super(options)
            this.minLength = options.minLength
            this.maxLength = options.maxLength
        }

        tooShort(onError) {
            if (this.validity === true && this.minLength && this.getValue().length <= this.minLength) {
                let message = 'Введите более ' + this.minLength + ' символов. Текущее количество символов - ' + this.getValue().length;
                onError(message, this.fieldsetElement);
                this.validity = false;
            }
        }

        tooLong(onError) {
            if (this.validity === true && this.maxLength && this.getValue().length >= this.maxLength) {
                let message = 'Введите менее ' + this.maxLength + ' символов. Текущее количество символов - ' + this.getValue().length;
                onError(message, this.fieldsetElement);
                this.validity = false;
            }
        }

        checkValidity(onError, onSuccess) {
            this.validity = true;
            super.isInputEmpty(onError);
            this.tooShort(onError);
            this.tooLong(onError);
            if (this.validity === true) onSuccess(this.fieldsetElement)
        }
    }

    class InputNumber extends InputValue {
        constructor (options) {
            super(options)
            this.minNumber = options.minNumber
            this.maxNumber = options.maxNumber
        }

        tooSmall(onError) {
            if (this.validity === true && this.minNumber && this.getValue() <= this.minNumber) {
                let message = 'Число не может быть меньше ' + this.minNumber
                onError(message, this.fieldsetElement);
                this.validity = false;
            }
        }

        tooBig(onError) {
            if (this.validity === true && this.maxNumber && this.getValue() >= this.maxNumber) {
                let message = 'Число не может быть больше ' + this.maxNumber
                onError(message, this.fieldsetElement);
                this.validity = false
            }
        }

        checkValidity(onError, onSuccess) {
            this.validity = true;
            super.isInputEmpty(onError)
            this.tooSmall(onError);
            this.tooBig(onError);
            if (this.validity === true) onSuccess(this.fieldsetElement)
        }
    }

    class InputCapacity extends InputNumber {
        constructor (options) {
            super(options);
            this.getRooms = options.getRooms 
        }

        checkCapacity(onError){
            let rooms = parseInt(this.getRooms(), 10);
            let people = parseInt(this.getValue(), 10);
            if (rooms < people) {
                let message = 'Гости не поместятся в такое количество комнат';
                onError(message, this.fieldsetElement);
                this.validity = false
            }
        }

        checkValidity(onError, onSuccess){
            this.validity = true;
            super.isInputEmpty(onError);
            this.checkCapacity(onError);
            if (this.validity === true) onSuccess(this.fieldsetElement)
        }
    }

    window.validation = {
        InputValue: InputValue,
        InputText: InputText,
        InputNumber: InputNumber,
        InputCapacity: InputCapacity
    }
})()