'use strict'

var widget = (function () {
    var _getJson = function (callback) {
        var response = "";

        function reqListener() {
            var response = JSON.parse(this.responseText);
            if(Array.isArray(response)) {
                callback(response[0].data);
            } 
            else {
                callback(response.data);
            }
        };

        function reqError(err) {
            console.log('Fetch Error :-S', err);
        };

        var oReq = new XMLHttpRequest();
        oReq.onload = reqListener;
        oReq.onerror = reqError;
        oReq.open('get', './api/produtos.json', true);
        oReq.send();   
    };


    var _getRecomendationProduct = function () {
        var _recommendationProduct = _getJson(function(response) {
           var sizeWidget = response.widget.size;
           var products = response.recommendation;
           for(var i = 0; i < sizeWidget; i++) {
               console.log(products[i].name);
           }
        });
    };

    var _getReferenceProduct = function() {
        var _referenceProduct = _getJson(function(response) {
            var plots, pricePlot, formattedPricePlot;
            var paymentConditions = response.reference.item.productInfo.paymentConditions;
            plots = paymentConditions.substr(11, 2); 
            pricePlot = paymentConditions.substr(36, 5);
            formattedPricePlot = pricePlot.replace('.',',');
            document.getElementById('product-item').innerHTML = '<a class="product-item" href="'+ response.reference.item.detailUrl +'" target="_blank">'+
                            '<figure class="product-item-image">'+
                            '<img src="'+ response.reference.item.imageName +'" alt="">'+
                            '</figure>'+
                            '<p class="product-item-name">' + response.reference.item.name + '</p>'+
                            '<p class="product-item-price">Por: <span class="product-item-price-value">R$ '+ response.reference.item.price +'</span></p>'+
                            '<p class="product-item-old-price">ou <span class="product-item-old-price-value">'+ plots +'x de R$'+ formattedPricePlot +'</span> sem juros</p>'+
                            '<button class="button">adicionar ao carrinho <i class="icon-cart-plus"></i></button>'+
                            '</a>';
        });
    };


    return {
        getRecomendationProduct : _getRecomendationProduct,
        getReferenceProduct : _getReferenceProduct
    };
}());

//window.onload = function() {
    //document.getElementById('product-item').innerHTML = 'lalala';
//}

widget.getReferenceProduct();