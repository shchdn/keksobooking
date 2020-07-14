'use strict';
(function(){
    var setupMap = document.querySelector('.map');
    var mapElementsTemplate = document.querySelector('#map-pins-template');
    var mapPinTemplate = mapElementsTemplate.content.querySelector('.map__pin');
    var setupMapList = setupMap.querySelector('.map__pins');
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
    window.data = {
        setupMap: setupMap,
        setupMapList: setupMapList,
        mapElementsTemplate: mapElementsTemplate,
        mapPinTemplate: mapPinTemplate,
        TAIL_HEIGHT: 18,
        PIN_SIZE: getPinSize(),
        flats: [],
    }
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
                let number = getNumber();
                var nextTitle = mapTitles[number];
                mapTitles.splice(number, 1);
                for(let i = 0; i < usedTitles.length; i ++){
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
            let number = getNumber();
            var nextTitle = mapTitles[number]
            usedTitles.push(titles[number]);
            mapTitles.splice(number, 1);
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
                let number = getNumber();
                for(let i = 0; i < avatarPathUsed.length; i ++){
                    if(number === avatarPathUsed[i]){
                        avatarCheck = false;
                    }
                }
                if(avatarCheck === true){
                    avatarPathUsed.push(number);
                    return avatarPathMessage(number);
                }
            }
        }
        else if(avatarPathUsed.length === 0){
            let number = getNumber();
            avatarPathUsed.push(number);
            return avatarPathMessage(number);
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
    

    var MAP_WIDTH = document.querySelector('.map').offsetWidth;
    var getLocationX = function(){
        return Math.round(Math.random() * MAP_WIDTH);
    }
    var getLocationY = function(correctPin){
        let min = 130;
        let max =  630;
        return Math.floor(min + Math.random() * (max - min + 1));
    }    
    var getMapData = function(){
        let mapDataAmount = 8;
        for(let i = 0; i < mapDataAmount; i++){
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
            data.flats.push(flatParameters);
        }
    }
    getMapData();    
})()
