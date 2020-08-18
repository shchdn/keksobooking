'use strict';
(function(){
    var mapCardTemplate = window.data.mapElementsTemplate.content.querySelector('.map__card');
    var apartmentTypeNames = {'flat': 'Квартира', 'bungalo': 'Бунгало', 'house': 'Дом', 'palace': 'Дворец'};
    var searchPin = function(pinDetails){
        for (let i = 0; i < window.data.flats.length; i ++){
            if (window.data.flats[i].offer.title === pinDetails.alt){
                return i;
            }
        }
    }
    
    window.card = {
        renderMapCard: function(pinDetails){
            let pinNumber = searchPin(pinDetails);
            let elementBefore = window.data.setupMap.querySelector('.map__filters-container');
            if (window.data.setupMap.querySelector('.map__card') === null){
                var setupCard = window.data.setupMap.insertBefore(mapCardTemplate.cloneNode(true), elementBefore);
            }
            else{
                var setupCard = window.data.setupMap.querySelector('.map__card');
            }
            setupCard.querySelector('.popup__avatar').src = window.data.flats[pinNumber].author.avatar;
            setupCard.querySelector('.popup__title').textContent = window.data.flats[pinNumber].offer.title;
            setupCard.querySelector('.popup__text--address').textContent = window.data.flats[pinNumber].offer.address;
            setupCard.querySelector('.popup__price').textContent = window.data.flats[pinNumber].offer.price + '₽/ночь';
            setupCard.querySelector('.popup__type').textContent = apartmentTypeNames[window.data.flats[pinNumber].offer.type];
            setupCard.querySelector('.popup__text--capacity').textContent = window.data.flats[pinNumber].offer.rooms + ' комнаты для ' + data.flats[pinNumber].offer.guests + ' гостей';
            setupCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.data.flats[pinNumber].offer.checkin + ', выезд до ' + data.flats[pinNumber].offer.checkout;     
            let featuresList = setupCard.querySelector('.popup__features');
            while (featuresList.firstChild){
                featuresList.removeChild(featuresList.firstChild);
            }
            for (let i = 0; i < window.data.flats[pinNumber].offer.features.length; i ++){
                let className = 'feature feature--' + window.data.flats[pinNumber].offer.features[i];
                let featureItem = document.createElement('li');
                featureItem.classList = className;
                featuresList.appendChild(featureItem);
            }
            setupCard.querySelector('.popup__description').textContent = window.data.flats[pinNumber].offer.description;
            let picturesList = setupCard.querySelector('.popup__pictures')
            while (picturesList.firstChild){
                picturesList.removeChild(picturesList.firstChild);
            }
            for (let i = 0; i < window.data.flats[pinNumber].offer.photos.length; i ++){
                let ulItem = document.createElement('li');
                let liItem = document.createElement('img');
                picturesList.appendChild(ulItem);
                ulItem.appendChild(liItem);
                liItem.src = window.data.flats[pinNumber].offer.photos[i];
                liItem.classList = 'popup__picture';
            }
            setupCard = null;
        },
        onMapCardPopupCloseClick: function(setupMapCard) {
            var setupMapCard = data.setupMap.querySelector('.map__card, .popup');
            var mapCardPopupClose = setupMapCard.querySelector('.popup__close');
            setupMapCard.remove();
            mapCardPopupClose.removeEventListener('click', window.card.onMapCardPopupCloseClick);
        }
        
    }
})()