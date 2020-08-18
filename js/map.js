'use strict';
(function(){
    var renderMapError = function (error) {
        let fragment = document.createDocumentFragment();
        let popup = fragment.appendChild(window.data.mapErrorTemplate.cloneNode(true));
        popup.querySelector('.error__description').innerHTML = error;
        window.data.setupMap.appendChild(fragment);
    }
    var setupMapMainPin = window.data.setupMap.querySelector('.map__pin--main');
    var activateMap = function(){
        setupMapMainPin.addEventListener('mousedown', onSetupMapMainPinMouseDown);
    }
    var onSetupMapMainPinMouseDown = function(evt){
        var mainPinLocation = {
            x:evt.clientX,
            y:evt.clientY
        }
        var onSetupMapMainPinMouseMove = function(moveEvt){
            moveEvt.preventDefault();
            var shift = {
                x: mainPinLocation.x - moveEvt.clientX,
                y: mainPinLocation.y - moveEvt.clientY
            }
            mainPinLocation = {
                x:moveEvt.clientX,
                y:moveEvt.clientY
            }
            setupMapMainPin.style.top = (setupMapMainPin.offsetTop - shift.y) + 'px';
            setupMapMainPin.style.left = (setupMapMainPin.offsetLeft - shift.x) + 'px';
            }
        var onSetupMapMainPinMouseUp = function(){
            for (let i = 0; i < data.setupMap.classList.length; i ++){
                if (data.setupMap.classList[i] === 'map--faded') {
                    window.form.enableNoticeFieldsets();
                    // window.pin.renderMapPins(window.data.flats);
                    window.backend.load(function (data) {
                        window.pin.renderMapPins(data);
                        window.data.flats = data;
                    }, renderMapError);
                    // var setupMapPins = data.setupMap.querySelectorAll('.map__pin:not(.map__pin--main)');
                    // listenPinsEvents(setupMapPins);
                    data.setupMap.classList.remove('map--faded');
                }    
            }
            // console.log(setupMapPins);
            data.setupMap.removeEventListener('mouseup', onSetupMapMainPinMouseUp);    
            document.removeEventListener('mousemove', onSetupMapMainPinMouseMove);
        }
        document.addEventListener('mousemove', onSetupMapMainPinMouseMove);
        data.setupMap.addEventListener('mouseup', onSetupMapMainPinMouseUp);
    }
    activateMap();
})()