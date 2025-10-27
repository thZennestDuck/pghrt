// this function adds the + and functionality to the toc so that it is less scary 
// it's still pretty scary ngl it's a giant toc but at least it starts hidden
function initTocOnClick() {
	var coll = document.querySelectorAll(".ltx_tocentry.ltx_tocentry_section > .ltx_ref");
	var i;

	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function (event) {
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			if (content) {
				if (content.style.maxHeight) {
					content.style.maxHeight = null;
					event.preventDefault(); // don't jump when closing 
				} else {
					content.style.maxHeight = content.scrollHeight + "px";
				}
			} else { }
		});
		// don't add the + if there's nothing to expand
		if (coll[i].nextElementSibling) { } else {
			coll[i].classList.add("del");
		}
	}
}

// copy on click for section permalinks
function copyURI(evt) {
	evt.preventDefault();
	// ensures url is without hash, then add on correct hash
	navigator.clipboard.writeText(window.location.href.replace(window.location.hash,'') + evt.target.getAttribute('href')).then(() => {
	// clipboard successfully set
    }, () => {
	// clipboard write failed
    });
	// toast that i ripped from w3schools. does not nicely handle being spam clicked. w/e
	// OKAY understanding more later. why is this replace and not remove? so ugly wow...
	// you're telling me that chatgpt and copilot were trained on obtuse garbage like this!?
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}

// source: https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting
// ty jimmy banks
// determines if the user has a set theme or a stored theme on load
function detectColorScheme() {
	// check if already saved dark
	if (localStorage.getItem("theme")) {
		if (localStorage.getItem("theme") == "dark") {
			document.documentElement.setAttribute("data-theme", "dark");
		}
	} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		// set to dark if OS preferred
		document.documentElement.setAttribute("data-theme", "dark");
		localStorage.setItem('theme', 'dark');
	} else {
		// default light otherwise
		document.documentElement.setAttribute("data-theme", "light");
		localStorage.setItem('theme', 'light');
	}
}

function detectFont(){
    // check if user wants sans
	if (localStorage.getItem("font") == "sans") {
		document.documentElement.setAttribute("data-font", "sans");
		localStorage.setItem('font', 'sans');
	}
	else {
		// otherwise give avec
		document.documentElement.setAttribute("data-font", "avec");
		localStorage.setItem('font', 'avec');
	}
}

// source: https://www.accessibilityfirst.at/posts/dark-and-light-mode-a-simple-guide-for-web-design-and-development
// add onClick to toggle theme between light and dark
function initThemeToggle() {
	document.getElementById('theme-toggle').addEventListener('click', () => {
		document.documentElement.setAttribute(
			'data-theme',
			document.documentElement.getAttribute('data-theme') === 'dark'
				? 'light'
				: 'dark'
		);
		localStorage.setItem(
			'theme',
			document.documentElement.getAttribute('data-theme')
		);
	});
}

// the same function except it's for font toggle
// btw i think i'm a little funny for the var naming
function initFontToggle() {
	document.getElementById('font-toggle').addEventListener('click', () => {
		document.documentElement.setAttribute(
			'data-font',
			document.documentElement.getAttribute('data-font') === 'avec'
				? 'sans'
				: 'avec'
		);
		localStorage.setItem(
			'font',
			document.documentElement.getAttribute('data-font')
		);
	});
}

// saving the scroll position for clicking references or toc
function saveScroll() {
	var coll = document.querySelectorAll(".ltx_ref");
	var i;

	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function () {
			document.getElementById("return").classList.add("show"); // only fires once

			pos = window.scrollY;
			scrollArray = JSON.parse(sessionStorage.getItem('scrollPos'));
			scrollArray.unshift(pos);		
			sessionStorage.setItem('scrollPos', JSON.stringify(scrollArray));
		});
	}
}

// it returns. positions stored in array then will jump back 
function returnScroll() {
	document.getElementById("return").addEventListener("click", function () {

		scrollArray = JSON.parse(sessionStorage.getItem('scrollPos'));
		// check if saved, otherwise goto top and remove back arrow
		if (scrollArray.length > 1) {
			pos = scrollArray.shift();
			sessionStorage.setItem('scrollPos', JSON.stringify(scrollArray));
			window.scroll(0, Number(pos));
		}
		else if (scrollArray.length == 1) {
			this.classList.remove("show");
			pos = scrollArray.shift();
			sessionStorage.setItem('scrollPos', JSON.stringify(scrollArray));
			window.scroll(0, Number(pos));
			// scroll top
		}
		else {
			this.classList.remove("show");
			window.scroll(0, 0);
			// scroll top
		}

	});
}

// run da functions
initTocOnClick();
detectColorScheme();
detectFont();
initThemeToggle();
initFontToggle();
saveScroll();
returnScroll();
// init scoll pos array storage (should this be done elsehow?)
sessionStorage.setItem('scrollPos', JSON.stringify([]));