'use strict';
(function(){
    var setupMapMainPin = data.setupMap.querySelector('.map__pin--main');
    var activateMap = function(){
        setupMapMainPin.addEventListener('mousedown', onSetupMapMainPinMouseDown);
    }
    var listenPinsEvents = function(pins) {
        let i = 0;
        pins.forEach(pin => {
            pin.addEventListener('click', onPinsClick.bind(null, pin.querySelector('img')));
            ++i;
        });
    }
    var onPinsClick = function(pinDetails, event){
        renderMapCard(pinDetails);
        var mapCardPopupClose = data.setupMap.querySelector('.popup__close');
        mapCardPopupClose.addEventListener('click', onMapCardPopupCloseClick);
    }
    var onMapCardPopupCloseClick = function(setupMapCard) {
        var setupMapCard = data.setupMap.querySelector('.map__card, .popup');
        var mapCardPopupClose = setupMapCard.querySelector('.popup__close');
        setupMapCard.remove();
        mapCardPopupClose.removeEventListener('click', onMapCardPopupCloseClick);
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
                    form.enableNoticeFieldsets();
                    renderMapPins();
                    var setupMapPins = data.setupMap.querySelectorAll('.map__pin:not(.map__pin--main)');
                    listenPinsEvents(setupMapPins);
                    data.setupMap.classList.remove('map--faded');
                }    
            }
            data.setupMap.removeEventListener('mouseup', onSetupMapMainPinMouseUp);    
            document.removeEventListener('mousemove', onSetupMapMainPinMouseMove);
        }
        document.addEventListener('mousemove', onSetupMapMainPinMouseMove);
        data.setupMap.addEventListener('mouseup', onSetupMapMainPinMouseUp);
    }
    activateMap();
})()