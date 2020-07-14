'use strict';
(function(){
    var mapCardTemplate = data.mapElementsTemplate.content.querySelector('.map__card');
    var apartmentTypeNames = {'flat': 'Квартира', 'bungalo': 'Бунгало', 'house': 'Дом', 'palace': 'Дворец'};
    var searchPin = function(pinDetails){
        for (let i = 0; i < data.flats.length; i ++){
            if (data.flats[i].offer.title === pinDetails.alt){
                return i;
            }
        }
    }
    window.renderMapCard = function(pinDetails){
        let pinNumber = searchPin(pinDetails);
        let elementBefore = data.setupMap.querySelector('.map__filters-container');
        if (data.setupMap.querySelector('.map__card') === null){
            var setupCard = data.setupMap.insertBefore(mapCardTemplate.cloneNode(true), elementBefore);
        }
        else{
            var setupCard = data.setupMap.querySelector('.map__card');
        }
        setupCard.querySelector('.popup__avatar').src = data.flats[pinNumber].author.avatar;
        setupCard.querySelector('.popup__title').textContent = data.flats[pinNumber].offer.title;
        setupCard.querySelector('.popup__text--address').textContent = data.flats[pinNumber].offer.address;
        setupCard.querySelector('.popup__price').textContent = data.flats[pinNumber].offer.price + '₽/ночь';
        setupCard.querySelector('.popup__type').textContent = apartmentTypeNames[data.flats[pinNumber].offer.type];
        setupCard.querySelector('.popup__text--capacity').textContent = data.flats[pinNumber].offer.rooms + ' комнаты для ' + data.flats[pinNumber].offer.guests + ' гостей';
        setupCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.flats[pinNumber].offer.checkin + ', выезд до ' + data.flats[pinNumber].offer.checkout;     
        let featuresList = setupCard.querySelector('.popup__features');
        while (featuresList.firstChild){
            featuresList.removeChild(featuresList.firstChild);
        }
        for (let i = 0; i < data.flats[pinNumber].offer.features.length; i ++){
            let className = 'feature feature--' + data.flats[pinNumber].offer.features[i];
            let featureItem = document.createElement('li');
            featureItem.classList = className;
            featuresList.appendChild(featureItem);
        }
        setupCard.querySelector('.popup__description').textContent = data.flats[pinNumber].offer.description;
        let picturesList = setupCard.querySelector('.popup__pictures')
        while (picturesList.firstChild){
            picturesList.removeChild(picturesList.firstChild);
        }
        for (let i = 0; i < data.flats[pinNumber].offer.photos.length; i ++){
            let ulItem = document.createElement('li');
            let liItem = document.createElement('img');
            picturesList.appendChild(ulItem);
            ulItem.appendChild(liItem);
            liItem.src = data.flats[pinNumber].offer.photos[i];
            liItem.classList = 'popup__picture';
        }
        setupCard = null;
    }    
})()