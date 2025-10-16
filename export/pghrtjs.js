// this function adds the + and functionality to the toc so that it is less scary 
// it's still pretty scary ngl it's a giant toc but at least it starts hidden
function initTocOnClick() {
	var coll = document.querySelectorAll(".ltx_tocentry.ltx_tocentry_section > .ltx_ref");
	var i;

	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function () {
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			if (content) {
				if (content.style.maxHeight) {
					content.style.maxHeight = null;
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
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}

// source: https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting
// ty jimmy banks <3
// determines if the user has a set theme or a stored theme on load
function detectColorScheme(){
    var theme="light";    //default to light
	localStorage.setItem('theme', 'light'); // not technically required
    //local storage is used to override OS theme settings
    if(localStorage.getItem("theme")){
        if(localStorage.getItem("theme") == "dark"){
            var theme = "dark";
        }
    } else if(!window.matchMedia) {
        //matchMedia method not supported
        return false;
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        var theme = "dark";
    }

    //dark theme preferred, set document with a `data-theme` attribute
    if (theme=="dark") {
         document.documentElement.setAttribute("data-theme", "dark");
		  localStorage.setItem('theme', 'dark');
		// now honestly not to criticize this code i am copying too much but like
		// why not reuse the theme var here? surely it's more error prone this way?
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

// run da functions
initTocOnClick();
detectColorScheme();
initThemeToggle();
initFontToggle();