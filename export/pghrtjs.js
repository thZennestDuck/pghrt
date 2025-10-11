var coll = document.querySelectorAll(".ltx_tocentry.ltx_tocentry_section > .ltx_ref");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
	if (content) {
		if (content.style.maxHeight){
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		}
    } else {}
  });
	if (coll[i].nextElementSibling) {} else {
		coll[i].classList.add("del");
	}
}

/* copy on click for section permalinks */
function copyURI(evt) {
	evt.preventDefault();
	/* ensures url is without hash, then add on correct hash */
	navigator.clipboard.writeText(window.location.href.replace(window.location.hash,'') + evt.target.getAttribute('href')).then(() => {
	/* clipboard successfully set */
    }, () => {
	/* clipboard write failed */
    });
	/* toast that i ripped from w3schools. does not nicely handle being spam clicked. w/e*/
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}