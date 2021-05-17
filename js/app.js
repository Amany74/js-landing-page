/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sectionListId = 0; // counter of sections Number
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



//new section button  > create element(button) and adding it to the DOM by appending to the main heading then adding an event listener with adding new section function
const mainHeading = document.getElementById('title');
const button = document.createElement('button');
button.innerHTML = 'Add Section';
mainHeading.appendChild(button);
button.addEventListener('click',addNewSection);


//function to Add new Section
/*
 1- create new section
 2- adding id and class
  3- adding the inner content of the section 
   4- appending to the (article) 
   5- passing id of the section to addToNav function for Adding the section link to nav bar
   6 - incrementing the index of sections
   */
function addNewSection (){
      const mainArticle = document.getElementById('article');
      const sec = document.createElement('section');
      sec.setAttribute("id",`section${sectionListId+1}`)
      sec.setAttribute("class",`Section${sectionListId+1}`)
      sec.innerHTML = `<div class="landing__container"><h2>Section ${sectionListId+1}</h2><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis ex nobis odio quam tenetur vel velit quis distinctio dolorum sint dignissimos laudantium mollitia praesentium corporis esse placeat, nihil laboriosam veritatis!</p><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis ex nobis odio quam tenetur vel velit quis distinctio dolorum sint dignissimos laudantium mollitia praesentium corporis esse placeat, nihil laboriosam veritatis!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis ex nobis odio quam tenetur vel velit quis distinctio dolorum sint dignissimos laudantium mollitia praesentium corporis esse placeat, nihil laboriosam veritatis!</p><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis ex nobis odio quam tenetur vel velit quis distinctio dolorum sint dignissimos laudantium mollitia praesentium corporis esse placeat, nihil laboriosam veritatis Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis ex nobis odio quam tenetur vel velit quis distinctio dolorum sint dignissimos laudantium mollitia praesentium corporis esse placeat, nihil laboriosam veritatis!</p><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis ex nobis odio quam tenetur vel velit quis distinctio dolorum sint dignissimos laudantium mollitia praesentium corporis esse placeat, nihil laboriosam veritatis</p>`;
      mainArticle.appendChild(sec);
      let id = `section${sectionListId+1}`;
      addToNav(id);
      sectionListId++;
      highlightSectionLink();

}

// at least 3 sections on start 
addNewSection();
addNewSection();
addNewSection();
addNewSection();

// function to add section link to the nav bar
/*
 creating li element and adding
 a child anchor with section name
  then appending to the navbar__list
*/
function addToNav(id){
      //add the docs
      const ulList = document.getElementById('navbar__list');
      const navlink = document.createElement('li');
      navlink.setAttribute("class", id)
      navlink.innerHTML = `<a href=#${id} >Section ${sectionListId+1} </a>`;
      ulList.appendChild(navlink);
    
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// Add class 'active' to section when near top of viewport



// to top button
const toTopOfThePage = document.querySelector(".arrow");
//adding an event listener on scroll to show and hide the to-top arrow 
window.addEventListener("scroll", () => {
      if (window.pageYOffset > 200) {
        toTopOfThePage.classList.add("arrow");
      } else {
        toTopOfThePage.classList.remove("arrow");
      }
})






/**
 * End Main Functions
 * Begin Events
 * 
*/


// Set sections as active
// function to activate the current section and add class "your active class" 
//adding background color to active section and  remove the background color from the last section
const addActiveClass = (conditional, section) => {
  if(conditional){
      section.classList.add('your-active-class');
      section.style.cssText = "background-color: rgb(60,97,150);";
};
};

  // remove the active class with specific section parameter
  const removeActiveClass = (section) => {
      section.classList.remove('your-active-class');
      section.style.cssText = "background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%)";
  };

//function to disable the last active section  without  parameters
function disable(){
      const section = document.querySelector('.your-active-class');
      section.classList.remove('your-active-class');
      section.style.background = "";
}


//   //this is an Event to add highlight on Scroll effect to Sections
// /*
// - quering to the navbar__menu to add events to the links 
//  - if a link is clicked we will get the target index fromm the inner html text   >> if it is not possible later we can get it with id or class 
// 3-
// */
document.querySelector(".navbar__menu").addEventListener("click", function (evt) {  
      let sectionClassName = `.Section${evt.target.innerHTML[8]}`; //coverting the section index to the section class name (unique to each section)
      const nextActiveSection = document.querySelector(sectionClassName) // quering with sectionClassName to get the next active section
      addActiveClass(true,nextActiveSection) // calling activate to highlight section
      disable() // disable the last active section

})

  
  //implementating the actual function for adding active class dynamically  > //highlighting section in viewport without clicking the link
  
  const activateCurrentSection = () => {
    let sections = Array.from(document.querySelectorAll('section'));
    const offset = (section) => {
          return section.getBoundingClientRect().top;
      };
    sections.forEach(section => {
              const elementTop = offset(section);
              removeActiveClass(section);
              addActiveClass(elementTop < 165 && elementTop >= -150 ,section);
    });
  };
  
  window.addEventListener('scroll' ,activateCurrentSection);
  


  
//highlightin section link

function highlightSectionLink() {
let links = Array.from(document.querySelectorAll('a')); // selecting all links
links = links.slice(0,links.length-1)
// Loop through the links and add the active class to the current/clicked button
//default active link is the first link
  links.forEach(link => link.addEventListener("click", function activateLink() {
   links.forEach(link => link.classList.remove('active')); // remove active class from all links and add it only to the clicked link
   this.classList.add('active')
})
        )};
highlightSectionLink();
