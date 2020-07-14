'use strict';
(function(){
    window.renderMapPins = function(){
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < data.flats.length; i++){
            let setupPin = fragment.appendChild(data.mapPinTemplate.cloneNode(true));
            let setupPinAvatar = setupPin.querySelector('img');
            let correctPinLocationX = data.flats[i].location.x - data.PIN_SIZE.correctX;
            let correctPinLocationY = data.flats[i].location.y - data.PIN_SIZE.height / 2 - data.TAIL_HEIGHT;
            setupPin.style.cssText = 'left: ' + correctPinLocationX + 'px; top: ' + correctPinLocationY + 'px;';
            setupPinAvatar.src = data.flats[i].author.avatar;
            setupPinAvatar.alt = data.flats[i].offer.title;   
        }
        data.setupMapList.appendChild(fragment);
    }    
})()