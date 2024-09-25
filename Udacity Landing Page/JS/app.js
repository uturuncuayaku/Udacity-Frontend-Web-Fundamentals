/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES22015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

//Gets all the sections within the homepage
//const section_list = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */


/*
 * getSections_NavLinks - helper function
 * params - none
 *
 * Helps get our sections and navigation list items
 * at the right time when they have been populated 
 * by our buildNav function
 *
 * returns - an array of size two containing html elements of sections and list items
 */ 
function getSections_NavLinks() {
	//Gets sections
	const sections = document.querySelectorAll('section');
	//Gets navigation list elements
	const navList = document.getElementById('navbar__list');
	const navLinks = navList ? navList.querySelectorAll('li'):[];


	return {sections, navLinks};
}

/** 
 * End Helper Functions
 * Begin Main Functions
 *
 */

/*
 * buildNav - function
 * params - none
 * 
 * Builds the navigation bar using plain vanilla javascript. Sets
 * a couple properties as well as returns a data property from the 
 * index.html page. These properties allow us to style in a seperate
 * CSS file the appropriate elements. We also get a 'data-nav' property
 * from the index.html file with the section name to assist in generating
 * helpful attributes and maintain cohesive code structure with other
 * programmers.
 *
 * returns - none
 *
 */ 
function buildNav() {
//	event.preventDefault();
	const ul_navbar = document.getElementById("navbar__list");

	for (let i = 1; i <= 4; ++i){
		
		//Create list element.
		const li_section = document.createElement('li');
		//Create ancher element.
		const anchor_section = document.createElement('a');
		//Variable containing id of next section.
		const section_variable = `section${i}`;
		anchor_section.classList.add('menu__link');
		//Set anchor('a') properties.
		anchor_section.href = "#" + section_variable;

		//Get the string for the custom property 'data-nav'.
		const current_section = document.getElementById(section_variable);
		//Apply this string as the anchor text.
		anchor_section.innerHTML = current_section.getAttribute('data-nav');
		
		//Append anchor to list element.
		li_section.appendChild(anchor_section);

		//Create event listener for a click
		li_section.addEventListener("click", function(){
//			event.preventDefault();
			let current_active = document.querySelector(".your-active-class");
			if (current_active) {
				current_active.classList.remove("your-active-class");
			}
			this.classList.add("your-active-class");
		});

		//Append list to unordered list element.
		ul_navbar.appendChild(li_section);
	}

}

//Once the DOM has loaded we need to create the navigation bar
//because there was interference with loading the page initially
//and creating the navigation bar.
document.addEventListener('DOMContentLoaded', function() {
    buildNav();
});


/*
 * makeActive - function
 * params - none
 *
 * Gets the sections and navbar list items to make each visible section
 * active by highlighting navbar link and triggering animation behind the
 * section.
 *
 * returns - none
 */ 
function makeActive() {

	//Programmatically getting my navbar__list and all the sections
	const {sections, navLinks} = getSections_NavLinks();
	//Getting window height
	const viewportHeight = window.innerHeight;
	//Defining a threshold to create an active state for a section
	const threshold = viewportHeight * 0.5;

	//Boolean variable to allow me to keep track of the logic
	//to manipulate active sections and active navbar links.
	let activeSectionFound = false;

	//Looping through each section
	sections.forEach( (section, index) => {
		//Using a JS function to find the size of the section in relation to the viewport
		const box = section.getBoundingClientRect();

		//Determine if this box is greater than my threshold
		if (box.top <= threshold && box.bottom >= threshold) {
			//If the section is not active
			if (!activeSectionFound) {
				//Now make it active
				section.classList.add('your-active-class');
				//If we have a valid list of links 
				if (navLinks[index]) {
					//Make the navbar list item active
					navLinks[index].classList.add('your-active-class');
				}
				//We only need to go through this once per scroll event
				activeSectionFound = true;
			}
		//The threshold has not been met
		} else {
			//Therefore we need to remove the section as active
			section.classList.remove('your-active-class');
			//If we have a valid list of links
			if (navLinks[index]) {
				//Remove the active state because we have scrolled past the threshold
				navLinks[index].classList.remove('your-active-class');
			}
		}
	});
}

//Creates the event listener for our page and directs
//it to use the make active function.
window.addEventListener('scroll', makeActive);

