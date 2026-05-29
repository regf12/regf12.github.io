let lang = 'en';
let locale = {
  es: window.locale?.es || null,
  en: window.locale?.en || null,
};

/* ------------------------------------------------------------------------ */

(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict

/* ------------------------------------------------------------------------ */

function getLang() {
  try {
    let elementos = document.querySelectorAll('[data-key]');
  
    actualizarTextos(locale[lang], elementos);
  } catch (error) {
    // 
  }
}

function actualizarTextos(json, elementos) {
  if (!elementos) {
    return;
  }

  for (let elemento of elementos) {
    if (elemento?.dataset?.key && json[elemento.dataset.key]) {
      elemento.textContent = json[elemento.dataset.key];
    }
  }
}

/* ------------------------------------------------------------------------ */

function switchLang(newLang) {
  lang = newLang;
  try {
    localStorage.setItem('selectedLanguage', lang);
  } catch (e) {}

  // Actualizar el valor de todos los selectores de idioma de la interfaz
  $('.select-lang').val(lang);

  let prefix = window.assetPrefix || '';
  let docName = `Rafael Guzman Developer (${lang || 'en'}).pdf`;
  $('#link-cv').attr('href', `${prefix}docs/${docName}`);
  $('#link-cv').attr('download', docName);

  if (locale[lang]) {
    getLang();
  } else if (window.locale && window.locale[lang]) {
    locale[lang] = window.locale[lang];
    getLang();
  } else {
    fetch(`${prefix}locale/${lang}.json`)
      .then(response => response.json())
      .then(data => {
        locale[lang] = data;
        getLang();
      })
      .catch(error => {
        console.log('Locale not loaded:', error);
        getLang();
      });
  }
}

$(document).ready(function () {
  try {
    let savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && ['es', 'en'].includes(savedLang)) {
      lang = savedLang;
    } else {
      lang = navigator.language.split('-')[0];
      if (!['es', 'en'].includes(lang)) {
        lang = 'en';
      }
    }
  } catch (error) {
    lang = 'en';
  }

  // Vincular evento al cambio de select de idioma
  $('.select-lang').change(function () {
    switchLang($(this).val());
  });

  // Carga inicial
  switchLang(lang);
});