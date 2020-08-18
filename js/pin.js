'use strict';
(function(){
    window.pin = {
        renderMapPins: function(data){
            let fragment = document.createDocumentFragment();
            for (let i = 0; i < data.length; i++){
                let setupPin = fragment.appendChild(window.data.mapPinTemplate.cloneNode(true));
                let setupPinAvatar = setupPin.querySelector('img');
                let correctPinLocationX = data[i].location.x - window.data.PIN_SIZE.correctX;
                let correctPinLocationY = data[i].location.y - window.data.PIN_SIZE.height / 2 - window.data.TAIL_HEIGHT;
                setupPin.style.cssText = 'left: ' + correctPinLocationX + 'px; top: ' + correctPinLocationY + 'px;';
                setupPinAvatar.src = data[i].author.avatar;
                setupPinAvatar.alt = data[i].offer.title;   
            }
            window.data.setupMapList.appendChild(fragment);
            var setupMapPins = window.data.setupMap.querySelectorAll('.map__pin:not(.map__pin--main)');
            listenPinsEvents(setupMapPins);
        }
    }
    var listenPinsEvents = function(pins) {
        let i = 0;
        pins.forEach(pin => {
            pin.addEventListener('click', onPinsClick.bind(null, pin.querySelector('img')));
            ++i;
        });
    }
    var onPinsClick = function(pinDetails, event){
        window.card.renderMapCard(pinDetails);
        var mapCardPopupClose = data.setupMap.querySelector('.popup__close');
        mapCardPopupClose.addEventListener('click', window.card.onMapCardPopupCloseClick);
    }
})()