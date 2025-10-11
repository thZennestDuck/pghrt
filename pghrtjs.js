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