'use strict'

const popupMenu = document.querySelector('.popup-menu'),
    body = document.querySelector('body')

let closestItemByClass = function (item, className) {
    let node = item
    while (node) {
        if (node.classList.contains(className)) {
            return node
        }
        node = node.parentElement
    }
    return null
}

let closestAttr = function (item, attr) {
    let node = item
    while (node) {
        let attrValue = node.getAttribute(attr)
        if (attrValue) {
            return attrValue
        }
        node = node.parentElement
    }
    return null
}

const showPopup = target => {
    target.classList.add('popup-active')
}

const closePopup = target => {
    target.classList.remove('popup-active')
}

let toggleScroll = () => {
    body.classList.toggle('no-scroll')
}

body.addEventListener('click', event => {
    const target = event.target
    const popupClass = closestAttr(target, 'data-popup')
    if (popupClass === null) {
        return 
    }
    event.preventDefault()
    let popup = document.querySelector('.' + popupClass)
    if (popup) {
        showPopup(popup)
        toggleScroll()
    }
})

body.addEventListener('click', event => {
    let target = event.target
    if (target.classList.contains('popup-close') ||
    target.classList.contains('popup-inner')) {
        let popup = closestItemByClass(target, 'popup')
        closePopup(popup)
        toggleScroll()
    }
})

body.addEventListener('keydown', event => {
   if(event.keyCode !== 27) {
       return
   }

   let popup = document.querySelector('.popup-active')
   if(popup){
        closePopup(popup)
        toggleScroll()
   }
})

let scroll = target => {
    let targetTop = target.getBoundingClientRect().top
    let scrollTop = window.pageYOffset
    let targetOffsetTop = targetTop + scrollTop
    let headerOffset = document.querySelector('.header').clientHeight
    window.scrollTo(0, targetOffsetTop - headerOffset)
}

body.addEventListener('click', event => {
    let target = event.target
    let scrollToItemClass = closestAttr(target, 'data-scroll-to')
    if(scrollToItemClass === null){
        return
    }
    event.preventDefault()
    let scrollToItem = document.querySelector('.' +scrollToItemClass)
    if(scrollToItem){
        scroll(scrollToItem)
    } 
})

const cards = document.querySelector('.cards')
let catalogFilter = document.querySelector('.catalog-filter')
let card = document.querySelectorAll('.card')


const filter = () => {
    if (cards === null) {
        return
    }
}

filter()

let removeChildren = item => {
    while (item.firstChild) {
        item.removeChild(item.firstChild)
    }
}

let updateChildren = (item, children) => {
    removeChildren(item)
    for (let i = 0; i < children.length; i++) {
        item.appendChild(children[i])  
    }
}

catalogFilter.addEventListener('click', event => {
    let target = event.target
    let item = closestItemByClass(target, 'catalog-filter-btn')
    if (item === null || item.classList.contains('filter-active')) {
        return
    }

    event.preventDefault()
    let filterValue = item.getAttribute('data-filter')
    let previousBtnActive = catalogFilter.querySelector('.catalog-filter-btn.filter-active')

    previousBtnActive.classList.remove('filter-active')
    item.classList.add('filter-active')
    
    if (filterValue === 'all') {
        updateChildren(cards, card)
        return
    }

    let filterItems = []

    for (let i = 0; i < card.length; i++) {
        let current = card[i]
        if (current.getAttribute('data-category') === filterValue) {
            filterItems.push(current)
        }
    }

    updateChildren(cards, filterItems)
})

let changeProductSize = target => {
    let product = closestItemByClass(target, 'card')
    let previousBtnActive = product.querySelector('.card-footer-filter-size.size-active')
    previousBtnActive.classList.remove('size-active')
    target.classList.add('size-active')
}

let changeProductOrderInfo = target => {
    let product = closestItemByClass(target, 'card')
    let order = document.querySelector('.popup-order')

    let productTitle = product.querySelector('.card-title').textContent
    let productSize = product.querySelector('.card-footer-filter-size.size-active').textContent
    let productPrice = product.querySelector('.card-footer-bottom-price').textContent
    let productImg = product.querySelector('.card-img').getAttribute('src')

    order.querySelector('.order-info-title').setAttribute('value', productTitle)
    order.querySelector('.order-info-price').setAttribute('value', productPrice)
    order.querySelector('.order-info-size').setAttribute('value', productSize)
    
    order.querySelector('.order-card-title').textContent = productTitle
    order.querySelector('.order-card-price').textContent = productPrice
    order.querySelector('.order-pizza-size').textContent = productSize
    order.querySelector('.order-img').setAttribute('src', productImg)
}

cards.addEventListener('click', event => {
    let target = event.target
    if (target.classList.contains('card-footer-filter-size') && 
        !target.classList.contains('size-active')) {
        event.preventDefault()
        changeProductSize(target)
    }

    if (target.classList.contains('card-footer-bottom-buy')) {
        event.preventDefault()
        changeProductOrderInfo(target)
    }
})


ymaps.ready(function () {
    if (typeof ymaps === 'undefined') {
        return
    }

    var myMap = new ymaps.Map('ymap', {
            center: [55.794887, 37.712812],
            zoom: 11
        }, {
            searchControlProvider: 'yandex#search'
        }),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            balloonContent: 'г. Москва, Преображенская площадь, 8'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/pizza-slice-map.svg',
            iconImageSize: [40, 63],
            iconImageOffset: [-5, -38]
        });

    myMap.geoObjects.add(myPlacemark)
});

let forms = document.querySelector('.form-send')

let formChecker = () => {
    if (forms.length === 0) {
        return
    }
}

formChecker()

let formSend = form => {
    console.log(form);
}

for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', event => {
        event.preventDefault()
        let form = event.currentTarget
        formSend(form)
    })
    
}