/**
 * Define Global Variables
 * 
*/

//get function access to all the DOM element
const get = element => document.getElementById(element); 

const navLinks = document.querySelectorAll('.nav__link');
const navList = document.querySelector('.nav__list');
const sections = [home, services, about, work, contact];
const footer = document.querySelector('.footer-fineprint');

let open = get("menu-btn");
let nav = get("nav");
let exit = get("exit-btn");



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const config = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
}

// Add class 'active' to navigations items and to section when near top of viewport

function handleIntersection(entries) {
    entries.forEach(entry => {
    const navItem = document.querySelector(`.nav__item[data-link='${entry.target.id}']`);
    const section = document.getElementById(entry.target.id);
    
        if (entry && entry.isIntersecting) {
            navItem.classList.add('active')
            section.classList.add('active')
          } else {
              if(navItem.classList.contains('active')) {
                navItem.classList.remove('active')
              }

              if( section.classList.contains('active')) {
                  section.classList.remove('active')
              }
           
            }
    });

}
// IntersectionObserver watch and register callbacks to trigger when elements on a page come into view

const observer = new IntersectionObserver(handleIntersection, config);

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/



// Scroll to section on link click

navList.addEventListener('click', e => {
    e.preventDefault()
    const parent = e.target.hasAttribute('data-link') ? e.target : e.target.parentElement;
    const elementToScrollTo = document.getElementById(parent.dataset.link);
    elementToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth'})
});

// On small screen remove the class "open-nav" when clicking on link

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove("open-nav");
    })
})

// Set the navigation tab active or inactive on small screens

open.addEventListener("click", () => {
    nav.classList.add("open-nav");
})

exit.addEventListener("click", () => {
    nav.classList.remove("open-nav");
})


// Set sections as active

sections.forEach(section => {
    observer.observe(section);  
});


// Updating footer copyright year

footer.innerHTML = `&copy;${new Date().getFullYear() } | Made with <span aria-label="love" role="image">&#128150;</span>by Hugonin`;


