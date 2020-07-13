var setupMap = document.querySelector('.map');
var setupMapList = setupMap.querySelector('.map__pins');
var setupMapMainPin = setupMap.querySelector('.map__pin--main');
var mapElementsTemplate = document.querySelector('#map-pins-template');
var mapCardTemplate = mapElementsTemplate.content.querySelector('.map__card');
var mapPinTemplate = mapElementsTemplate.content.querySelector('.map__pin');
var noticeSetup = document.querySelector('.notice');
var noticeFieldsetsSetup = noticeSetup.querySelectorAll('fieldset');
var MAP_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var usedTitles = [];
var getTitle = function(titles){
    let mapTitles = Object.assign([], titles);
    let getNumber = function(){
        return Math.floor(Math.random() * mapTitles.length);
    }
    if (titles.length === 0){
        alert('All titlenames are used already');
    }
    else if(0 < usedTitles.length){
        while(true){
            let titleCheck = true;
            let i = getNumber();
            var nextTitle = mapTitles[i];
            mapTitles.splice(i, 1);
            for(title in usedTitles){
                if(nextTitle === usedTitles[title]){
                    titleCheck = false;
                }
            }
            if (titleCheck === true){
                usedTitles.push(nextTitle);
                return nextTitle;
            }
        }
    }
    else if (usedTitles.length === 0){
        let i = getNumber();
        var nextTitle = mapTitles[i]
        usedTitles.push(titles[i]);
        mapTitles.splice(i, 1);
        return nextTitle;
    }
};

var totalAvatarPath = 8;
var avatarPathUsed = [];
var getAvatarPath = function(){
    let avatarPathMessage = function(number){
        return 'img/avatars/user0' + number + '.png';
    }
    let getNumber = function(){
        return Math.ceil(Math.random() * totalAvatarPath);
    }
    if (avatarPathUsed.length === totalAvatarPath){
        alert('All avatars are used already');
    }
    else if(avatarPathUsed.length > 0){
        while(true){
            let avatarCheck = true;
            let i = getNumber();
            for(avatar in avatarPathUsed){
                if(i === avatarPathUsed[avatar]){
                    avatarCheck = false;
                }
            }
            if(avatarCheck === true){
                avatarPathUsed.push(i);
                return avatarPathMessage(i);
            }
        }
    }
    else if(avatarPathUsed.length === 0){
        let i = getNumber();
        avatarPathUsed.push(i);
        return avatarPathMessage(i);
    }
}

var getAddres = function(){
    let getNumber = function(){
        return Math.ceil(Math.random() * 1000);
    }
    return getNumber() + ', ' + getNumber();
}

var getPrice = function(){
    let min = 1000;
    let max = 1000000;
    return Math.floor(min + Math.random() * (max - min + 1));
}

var getType = function(titleName){
    if(titleName.indexOf('домик') !== -1){
        return 'house';
    }
    else if(titleName.indexOf('квартира') !== -1){
        return 'flat';
    }
    else if(titleName.indexOf('дворец') !== -1){
        return 'palace';
    }
    else if(titleName.indexOf('бунгало') !== -1){
        return 'bungalo';
    }
    else{
        return 'error';
    }
}

var getRooms = function(){
    return Math.ceil(Math.random() * 5);
}

var getGuests = function(){
    return Math.ceil(Math.random() * 10);
}

var MAP_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var getFeatures = function(features){
    var usedFeatures = [];
    let getFloorNumber = function(){
        return Math.floor(Math.random() * MAP_FEATURES.length);
    }
    let getRoundNumber = function(){
        return Math.round(Math.random() * MAP_FEATURES.length);
    }
    for(let i = 0; i < getRoundNumber(); i++){
        while(true){
            if (i == 0){
                usedFeatures.push(features[getFloorNumber()]);
                break;
            }
            else if (i > 0){
                let featureCheck = true;
                let nextFeature = features[getFloorNumber()];
                for (let a = 0; a < usedFeatures.length; a++){
                    if (usedFeatures[a].indexOf(nextFeature) === 0){
                        featureCheck = false;
                    }
                }
                if (featureCheck === true){
                    usedFeatures.push(nextFeature);
                    break;
                }
            }
        }
    }
    return usedFeatures;
}

var MAP_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var getPhotos = function(photos){
    let mapPhotos = Object.assign([], photos);
    let getRoundNumber = function(){
        return Math.round(Math.random() * photos.length)
    }
    let getFloorNumber = function(){
        return Math.floor(Math.random() * photos.length)
    }
    for (let i = 0; i < getRoundNumber(); i++){
        let a = getFloorNumber();
        let b = getFloorNumber();
        mapPhotos[a] = [mapPhotos[b], mapPhotos[b] = mapPhotos[a]][0];
    }
    return mapPhotos;
}

var MAP_TIMES = ['12:00', '13:00', '14:00'];
var getCheckTime = function(times){
    return times[Math.floor(Math.random() * times.length)];
}

var getPinSize = function(){
    let oldPinPosition = mapPinTemplate.style.cssText;
    mapPinTemplate.style.cssText = 'left: -1000px; top: -1000px;';
    let setupPin = setupMapList.appendChild(mapPinTemplate.cloneNode(true));
    let pinImg = setupPin.querySelector('img');
    let widthAndHeight = {'width': setupPin.offsetWidth, 'height': setupPin.offsetHeight, 'correctX': pinImg.offsetWidth - setupPin.offsetWidth};
    setupPin.parentNode.removeChild(setupPin);
    mapPinTemplate.style.cssText = oldPinPosition;
    return (widthAndHeight);
}
var MAP_WIDTH = document.querySelector('.map').offsetWidth;
var TAIL_HEIGHT = 18
var PIN_SIZE = getPinSize();
var getLocationX = function(){
    return Math.round(Math.random() * MAP_WIDTH);
}
var getLocationY = function(correctPin){
    let min = 130;
    let max =  630;
    return Math.floor(min + Math.random() * (max - min + 1));
}


var flats = [];

var getMapData = function(){
    let mapDataAmount = 8;
    for(var i = 0; i < mapDataAmount; i++){
        let currentTitle = getTitle(MAP_TITLES);
        var flatParameters = {
            'author': {
                'avatar': getAvatarPath(),
            },
            'offer': {
                'title': currentTitle,
                'address': getAddres(),
                'price': getPrice(),
                'type': getType(currentTitle),
                'rooms': getRooms(),
                'guests': getGuests(),
                'checkin': getCheckTime(MAP_TIMES),
                'checkout': getCheckTime(MAP_TIMES),
                'features': getFeatures(MAP_FEATURES),
                'description': null,
                'photos': getPhotos(MAP_PHOTOS)
            },
            'location': {
                'x': getLocationX(),
                'y': getLocationY()
            }
        };
        flats.push(flatParameters);
    }
}

var apartmentTypeNames = {'flat': 'Квартира', 'bungalo': 'Бунгало', 'house': 'Дом', 'palace': 'Дворец'};

var renderMapPins = function(){
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < flats.length; i++){
        let setupPin = fragment.appendChild(mapPinTemplate.cloneNode(true));
        let setupPinAvatar = setupPin.querySelector('img');
        let correctPinLocationX = flats[i].location.x - PIN_SIZE.correctX;
        let correctPinLocationY = flats[i].location.y - PIN_SIZE.height / 2 - TAIL_HEIGHT;
        setupPin.style.cssText = 'left: ' + correctPinLocationX + 'px; top: ' + correctPinLocationY + 'px;';
        setupPinAvatar.src = flats[i].author.avatar;
        setupPinAvatar.alt = flats[i].offer.title;   
    }
    setupMapList.appendChild(fragment);
}
var searchPin = function(pinDetails){
    for (flat in flats){
        if (flats[flat].offer.title === pinDetails.alt){
            console.log('found');
            return flat;
        }
    }
}
var renderMapCard = function(pinDetails){
    console.log(pinDetails.src);
    console.log(searchPin(pinDetails));
    let pinNumber = searchPin(pinDetails);
    let elementBefore = setupMap.querySelector('.map__filters-container');
    if (setupMap.querySelector('.map__card') === null){
        var setupCard = setupMap.insertBefore(mapCardTemplate.cloneNode(true), elementBefore);
    }
    else{
        var setupCard = setupMap.querySelector('.map__card');
    }
    setupCard.querySelector('.popup__avatar').src = flats[pinNumber].author.avatar;
    setupCard.querySelector('.popup__title').textContent = flats[pinNumber].offer.title;
    setupCard.querySelector('.popup__text--address').textContent = flats[pinNumber].offer.address;
    setupCard.querySelector('.popup__price').textContent = flats[pinNumber].offer.price + '₽/ночь';
    setupCard.querySelector('.popup__type').textContent = apartmentTypeNames[flats[pinNumber].offer.type];
    setupCard.querySelector('.popup__text--capacity').textContent = flats[pinNumber].offer.rooms + ' комнаты для ' + flats[pinNumber].offer.guests + ' гостей';
    setupCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + flats[pinNumber].offer.checkin + ', выезд до ' + flats[pinNumber].offer.checkout;     
    let featuresList = setupCard.querySelector('.popup__features');
    while (featuresList.firstChild){
        featuresList.removeChild(featuresList.firstChild);
    }
    for (feature in flats[pinNumber].offer.features){
        let className = 'feature feature--' + flats[pinNumber].offer.features[feature];
        let featureItem = document.createElement('li');
        featureItem.classList = className;
        featuresList.appendChild(featureItem);
    }
    setupCard.querySelector('.popup__description').textContent = flats[pinNumber].offer.description;
    let picturesList = setupCard.querySelector('.popup__pictures')
    while (picturesList.firstChild){
        picturesList.removeChild(picturesList.firstChild);
    }
    for (photo in flats[pinNumber].offer.photos){
        let ulItem = document.createElement('li');
        let liItem = document.createElement('img');
        picturesList.appendChild(ulItem);
        ulItem.appendChild(liItem);
        liItem.src = flats[pinNumber].offer.photos[photo];
        liItem.classList = 'popup__picture';
    }
    delete setupCard;
}
var activateMap = function(){
    setupMapMainPin.addEventListener('mouseup', onSetupMapMainPinMouseUp);
}
var listenPinsEvents = function(pins) {
    let i = 0;
    pins.forEach(pin => {
        pin.addEventListener('click', onPinsClick.bind(null, pin.querySelector('img')));
        ++i;
        console.log(pin);
    });
}
var getMapCardElements = function(){
    var setupMapCard = setupMap.querySelector('.map__card, .popup');
    var mapCardPopupClose = setupMapCard.querySelector('.popup__close');
}
var onPinsClick = function(pinDetails, event){
    renderMapCard(pinDetails);
    var mapCardPopupClose = setupMap.querySelector('.popup__close');
    mapCardPopupClose.addEventListener('click', onMapCardPopupCloseClick);
}
var onMapCardPopupCloseClick = function(setupMapCard) {
    var setupMapCard = setupMap.querySelector('.map__card, .popup');
    var mapCardPopupClose = setupMapCard.querySelector('.popup__close');
    setupMapCard.remove();
    mapCardPopupClose.removeEventListener('click', onMapCardPopupCloseClick);
}
var onSetupMapMainPinMouseUp = function(){
    enableNoticeFieldsets();
    renderMapPins();
    var setupMapPins = setupMap.querySelectorAll('.map__pin:not(.map__pin--main)');
    listenPinsEvents(setupMapPins);
    setupMap.classList.remove('map--faded');
    setupMapMainPin.removeEventListener('mouseup', onSetupMapMainPinMouseUp);    
}
var disableNoticeFieldsets = function(){
    for (fieldset in noticeFieldsetsSetup){
        noticeFieldsetsSetup[fieldset].disabled = 'disabled';
    }
}
var enableNoticeFieldsets = function(){
    for (fieldset in noticeFieldsetsSetup){
        noticeFieldsetsSetup[fieldset].disabled = false;
    }
}
getMapData();
disableNoticeFieldsets();
activateMap();