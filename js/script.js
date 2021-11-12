;
let isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};;

//!BURGER                            //

const iconMenu = document.querySelector('.menu_icon');
const menuBody = document.querySelector('.menu_body');
if(iconMenu){
    iconMenu.addEventListener("click", function(e){
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
    })
}

//TODO SWIPER.................................///
const swiper = new Swiper('.swiper',{
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,
    autoheight: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints:{
        
        640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          900: {
              slidesPerView: 2,
              spaceBetween: 15,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
      },
});


//!!! POPUP.........................................//

const popupLinks = document.querySelectorAll('.popup_link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 700;

if (popupLinks.length > 0) {
  for( let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e){
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function(e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function (e){
      if (!e.target.closest('.popup_content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if(unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  for(let index = 0; index < lockPadding.length; index++) {
    const el = lockPadding[index];
    el.style.paddingRight = lockPaddingValue;
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function (){
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function(){
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = '0px';
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e){
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});