// this function adds the + and functionality to the toc so that it is less scary 
// it's still pretty scary ngl it's a giant toc but at least it starts hidden
// also this was super cobbled togethered from searches based on the limitations at hand
// i don't know if this should be in like a main() or whatever. idk i don't code
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
// don't add the + if there's nothing to expand
	if (coll[i].nextElementSibling) {} else {
		coll[i].classList.add("del");
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