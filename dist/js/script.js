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


    var _renderRecomendationProduct = function () {
        var _recommendationProduct = _getJson(function(response) {
           var sizeWidget = response.widget.size;
           var products = response.recommendation;
           var plots, pricePlot, formattedPricePlot, paymentConditions, container;
           var itens = '';
           container = document.getElementById('product-item-carousel');           
           for(var i = 0; i < sizeWidget; i++) {
               paymentConditions = products[i].productInfo.paymentConditions;
               plots = paymentConditions.substr(11, 2); 
               pricePlot = paymentConditions.substr(36, 5);
               formattedPricePlot = pricePlot.replace('.',',');
               itens += '<div class="swiper-slide">'+'<a class="product-item" href="'+ products[i].detailUrl +'" title="'+ products[i].name +'" target="_blank">'+'<figure class="product-item-image">'+'<img src="'+ products[i].imageName +'" alt="'+ products[i].name +'">'+'</figure>'+'<p class="product-item-name">' + products[i].name + '</p>'+'<p class="product-item-price">Por: <span class="product-item-price-value">R$ '+ products[i].price +'</span></p>'+'<p class="product-item-old-price">ou <span class="product-item-old-price-value">'+ plots +'x de R$'+ formattedPricePlot +'</span> sem juros</p>'+'<div class="product-item-button-container"><button class="button">adicionar ao carrinho <i class="icon-cart-plus"></i></button></div>'+'</a>'+'</div>'; 
           }
           container.innerHTML = itens;
        });
    };

    var _renderReferenceProduct = function() {
        var _referenceProduct = _getJson(function(response) {
            var plots, pricePlot, formattedPricePlot;
            var paymentConditions = response.reference.item.productInfo.paymentConditions;
            plots = paymentConditions.substr(11, 2); 
            pricePlot = paymentConditions.substr(36, 5);
            formattedPricePlot = pricePlot.replace('.',',');
            document.getElementById('product-item').innerHTML = '<a class="product-item" href="'+ response.reference.item.detailUrl +'" title="'+ response.reference.item.name +'" target="_blank">'+
                            '<figure class="product-item-image">'+
                            '<img src="'+ response.reference.item.imageName +'" alt="'+ response.reference.item.name +'">'+
                            '</figure>'+
                            '<p class="product-item-name">' + response.reference.item.name + '</p>'+
                            '<p class="product-item-price">Por: <span class="product-item-price-value">R$ '+ response.reference.item.price +'</span></p>'+
                            '<p class="product-item-old-price">ou <span class="product-item-old-price-value">'+ plots +'x de R$'+ formattedPricePlot +'</span> sem juros</p>'+
                            '<div class="product-item-button-container"><button class="button">adicionar ao carrinho <i class="icon-cart-plus"></i></button></div>'+
                            '</a>';
        });
    };


    return {
        renderRecomendationProduct : _renderRecomendationProduct,
        renderReferenceProduct : _renderReferenceProduct
    };
}());

widget.renderReferenceProduct();
widget.renderRecomendationProduct();