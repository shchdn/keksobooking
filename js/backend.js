'use strict';
(function(){
    var URL = {
        LOAD: 'https://javascript.pages.academy/keksobooking/data',
        UPLOAD: 'https://javascript.pages.academy/keksobooking'
    }
    window.backend = {
        load: function (onLoad, onError) {
            var xhrStatusToErrorMessage = {
                '400': 'Неверный запрос',
                '401': 'Пользователь не авторизован',
                '404': 'Ничего не найдено',
            }
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            var onXhrLoad = function(evt){
                var error;
                if (xhr.status === 200){
                    onLoad(xhr.response);
                }
                else {
                    error = (xhrStatusToErrorMessage[xhr.status] || 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText)
                    onError(error);
                }
            };
            xhr.addEventListener('load', onXhrLoad);
            xhr.open('GET', URL.LOAD);
            xhr.send();
        },
        save: function (data, onLoad, onError) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            var onXhrLoad = function (evt){
                onLoad(xhr.response);
            }
            xhr.addEventListener('load', onXhrLoad);
            xhr.addEventListener('error', onError);
            xhr.open('POST', URL.UPLOAD);
            xhr.send(data);
        }
    }
})()