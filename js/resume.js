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
  } catch (e) { }

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

/* ------------------------------------------------------------------------ */
// Funciones de Renderizado Dinámico de Secciones
/* ------------------------------------------------------------------------ */

function renderAbout(about) {
  // 1. Redes de contacto
  const contactsContainer = document.getElementById('about-contacts');
  if (contactsContainer && about.contacts) {
    contactsContainer.innerHTML = about.contacts.map(contact => {
      let ariaLabel = '';
      if (contact.title === 'Email') ariaLabel = 'Contact by email';
      else if (contact.title === 'WhatsApp') ariaLabel = 'Contact by WhatsApp';
      else if (contact.title === 'Telegram') ariaLabel = 'Contact by Telegram';
      else if (contact.title === 'LinkedIn') ariaLabel = 'View LinkedIn profile';
      else if (contact.title === 'Workana') ariaLabel = 'View Workana profile';
      else if (contact.title === 'GitHub') ariaLabel = 'View GitHub profile';
      else if (contact.title === 'GitLab') ariaLabel = 'View GitLab profile';
      else ariaLabel = `Contact by ${contact.title}`;

      return `
        <li class="list-inline-item">
          <a href="${contact.link}" target="_blank" rel="noopener noreferrer" aria-label="${ariaLabel}">
            <span class="fa-stack fa-lg" aria-hidden="true">
              <i class="fa fa-circle fa-stack-2x"></i>
              <i class="fa ${contact.icon} fa-stack-1x fa-inverse"></i>
            </span>
          </a>
        </li>
      `;
    }).join('');
  }
}

function renderSkills(skills) {
  const languagesContainer = document.getElementById('skills-languages');
  const toolsContainer = document.getElementById('skills-tools');
  const softContainer = document.getElementById('skills-soft');

  if (!skills) return;

  let languagesHtml = '';
  let toolsHtml = '';
  let softHtml = '';

  let langDelay = 0;
  let toolDelay = 0;
  let softIndex = 1;

  skills.forEach(skill => {
    let imgOrIcon = '';
    if (skill.icon.startsWith('http')) {
      imgOrIcon = `<img src="${skill.icon}" class="skill-icon" alt="${skill.title} logo" loading="lazy" width="56" height="56" />`;
    } else {
      imgOrIcon = `
        <div class="skill-icon d-flex align-items-center justify-content-center" style="height: 56px; margin: 10px 0;">
          <i class="fa ${skill.icon} fa-3x text-secondary" aria-hidden="true"></i>
        </div>
      `;
    }

    if (skill.type === 'PROGRAMMING LANGUAGES AND TOOLS') {
      const delayAttr = langDelay > 0 ? ` data-aos-delay="${langDelay}"` : '';
      languagesHtml += `
        <li class="col-3 col-sm-2 col-md-2 col-lg-1 list-inline-item skill-item flex justify-content-end" data-aos="zoom-in"${delayAttr}>
          ${imgOrIcon}
          <div class="skill-name">${skill.title}</div>
        </li>
      `;
      langDelay += 50;
      if (langDelay > 300) langDelay = 0; // Reset para mantener las animaciones fluidas
    } else if (skill.type === 'TOOLS') {
      const delayAttr = toolDelay > 0 ? ` data-aos-delay="${toolDelay}"` : '';
      toolsHtml += `
        <li class="col-3 col-sm-2 col-md-2 col-lg-1 list-inline-item skill-item flex justify-content-end" data-aos="zoom-in"${delayAttr}>
          ${imgOrIcon}
          <div class="skill-name">${skill.title}</div>
        </li>
      `;
      toolDelay += 50;
      if (toolDelay > 300) toolDelay = 0; // Reset
    } else if (skill.type === 'SOFT SKILLS') {
      softHtml += `
        <li>
          <i class="fa-li fa fa-check"></i>
          <span data-key="skills.softskills${softIndex}">${skill.title}</span>
        </li>
      `;
      softIndex++;
    }
  });

  if (languagesContainer) languagesContainer.innerHTML = languagesHtml;
  if (toolsContainer) toolsContainer.innerHTML = toolsHtml;
  if (softContainer) softContainer.innerHTML = softHtml;
}

function renderPortfolio(awards) {
  const portfolioContainer = document.getElementById('portfolio-list');
  if (!portfolioContainer || !awards) return;

  let delay = 100;
  portfolioContainer.innerHTML = awards.map(project => {
    const delayAttr = ` data-aos-delay="${delay}"`;
    delay += 100;
    if (delay > 600) delay = 100;

    // Generar badges de habilidades asociadas
    const skillsBadges = project.skills ? project.skills.map(skill =>
      `<span class="badge badge-secondary mr-1 mb-1" style="font-size: 0.65rem; font-weight: 500; background-color: #eaecf0; color: #475467; border: 1px solid #d0d5dd;">${skill}</span>`
    ).join('') : '';

    return `
      <div class="col-md-6 col-lg-4 mb-4" data-aos="zoom-in"${delayAttr} role="listitem">
        <article class="card h-100 shadow-sm border-0 project-card bg-light">
          <img src="${project.image}" class="card-img-top" alt="Screenshot of ${project.title}"
            loading="lazy" width="300" height="200">
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="">
              <h3 class="card-title font-weight-bold h5" data-key="portfolio.${project.id}.title">${project.title}</h3>
              <p class="card-text small text-secondary" data-key="portfolio.${project.id}.description">${project.description}</p>
              <div class="project-skills mt-2 mb-3">
                ${skillsBadges}
              </div>
            </div>
            <div class="mt-auto">
              <a href="${project.link}" class="btn btn-primary btn-sm rounded-pill px-3" target="_blank"
                rel="noopener noreferrer" aria-label="View project ${project.title}" data-key="portfolio.${project.id}.button">View Project</a>
            </div>
          </div>
        </article>
      </div>
    `;
  }).join('');
}

function renderExperience(experiences) {
  const experienceContainer = document.getElementById('experience-list');
  if (!experienceContainer || !experiences) return;

  experienceContainer.innerHTML = experiences.map(exp => {
    // Formatear fechas de manera que dependan de data-key de traducción
    let dateHtml = '';
    if (exp.freelance) {
      dateHtml = `<span data-key="experience.type.freelance">Freelance</span>`;
    } else if (exp.date_start && exp.date_end) {
      const startMonthKey = `month.${exp.date_start.month.toLowerCase()}`;
      const endMonthKey = `month.${exp.date_end.month.toLowerCase()}`;
      dateHtml = `
        <span data-key="${startMonthKey}">${exp.date_start.month}</span> ${exp.date_start.year} -
        <span data-key="${endMonthKey}">${exp.date_end.month}</span> ${exp.date_end.year}
      `;
    }

    // Párrafos de descripción
    const descHtml = exp.description.map((line, idx) => {
      const dataKey = `experience.${exp.id}.text${idx + 1}`;
      return `• <span data-key="${dataKey}">${line}</span>`;
    }).join('<br />');

    // Badges de habilidades asociadas
    const skillsBadges = exp.skills ? exp.skills.map(skill =>
      `<span class="badge badge-light mr-1 mb-1" style="font-size: 0.7rem; font-weight: 500; border: 1px solid #e4e7ec; color: #344054;">${skill}</span>`
    ).join('') : '';

    return `
      <div class="resume-item d-flex flex-column mt-4 flex-md-row mb-5">
        <div class="resume-content mr-auto">
          <h3 class="mb-0" data-key="experience.${exp.id}.role">${exp.role}</h3>
          <div class="subheading mb-3">
            ${exp.link ? `<a href="${exp.link}" target="_blank" rel="noopener noreferrer" class="subheading">${exp.bussiness}</a>` : exp.bussiness}
          </div>
          <p>${descHtml}</p>
          <div class="experience-skills mt-3">
            ${skillsBadges}
          </div>
        </div>
        <div class="resume-date text-md-right">
          <span class="text-primary">${dateHtml}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderEducation(educationList) {
  const educationContainer = document.getElementById('education-list');
  if (!educationContainer || !educationList) return;

  educationContainer.innerHTML = educationList.map((edu, index) => {
    const hrHtml = index > 0 ? `<hr class="w-100 my-4" />` : '';

    let dateHtml = '';
    if (edu.date_end) {
      const monthKey = `month.${edu.date_end.month.toLowerCase()}`;
      dateHtml = `<span data-key="${monthKey}">${edu.date_end.month}</span> ${edu.date_end.year}`;
    }

    let descHtml = '';
    if (edu.description && edu.description.length > 0) {
      descHtml = edu.description.map(line => {
        if (line.includes('Certificate:')) {
          const url = line.replace('Certificate:', '').trim();
          return `<p class="mb-0 mt-2"><a href="${url}" target="_blank" rel="noopener noreferrer" data-key="education.certificate">Certificate</a></p>`;
        }
        return `<p class="mb-0">${line}</p>`;
      }).join('');
    }

    return `
      ${hrHtml}
      <div class="resume-item d-flex flex-column mt-4 flex-md-row">
        <div class="resume-content mr-auto">
          <h3 class="mb-0" data-key="education.${edu.id}.title">${edu.title}</h3>
          <div class="subheading mb-3" data-key="education.${edu.id}.university">${edu.university}</div>
          <div>
            <span data-key="education.${edu.id}.type">${edu.career}</span>
          </div>
          ${descHtml}
        </div>
        <div class="resume-date text-md-right">
          <span class="text-primary">${dateHtml}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderResume(data) {
  if (data.about) renderAbout(data.about);
  if (data.skills) renderSkills(data.skills);
  if (data.awards) renderPortfolio(data.awards);
  if (data.experience) renderExperience(data.experience);
  if (data.education) renderEducation(data.education);
}

/* ------------------------------------------------------------------------ */

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

  // Inicialización común del resume
  function initializeResume(data) {
    // 1. Renderizar dinámicamente todo el contenido
    renderResume(data);

    // 2. Ejecutar traducción sobre el contenido inyectado
    switchLang(lang);

    // 3. Inicializar animaciones AOS
    if (window.AOS) {
      window.AOS.init({
        duration: 400,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      });
    }
  }

  // Cargar datos (síncronamente si window.resumeData existe, o asíncronamente vía fetch como fallback)
  if (window.resumeData) {
    initializeResume(window.resumeData);
  } else {
    let prefix = window.assetPrefix || '';
    fetch(`${prefix}assets/data-resume.json`)
      .then(response => response.json())
      .then(data => {
        initializeResume(data);
      })
      .catch(error => {
        console.error('Error cargando assets/data-resume.json:', error);
        // Fallback: aplicar traducción si el fetch falla
        switchLang(lang);
      });
  }
});