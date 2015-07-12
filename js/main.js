/* PREVENT HIGHLIGHTING */
var omitformtags=["input", "textarea", "select"],
	omitformtags=omitformtags.join("|");

function disableselect(e){
if (omitformtags.indexOf(e.target.tagName.toLowerCase())==-1)
return false
}

function reEnable(){
return true
}

if (typeof document.onselectstart!="undefined")
document.onselectstart=new Function ("return false")
else{
document.onmousedown=disableselect
document.onmouseup=reEnable
}





/* EVENTS LOGGER */
var events = document.getElementById("events"),
	EVENT_MAX = 5;
// log events
function logEvent(message) {
	var newEvent = document.createElement("div");
	newEvent.innerHTML = message;
	events.insertBefore(newEvent, events.childNodes[0]);
	// If we have too many children, delete the last one
	if (events.childNodes.length > EVENT_MAX) {
		events.removeChild(events.lastChild);
	}
}





/* MYCTOR */
function MyCtor(element, data) {
    this.data = data;
    this.element = element;
    element.value = data;
    element.addEventListener("change", this, false);
}

MyCtor.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "change":
            this.change(this.element.value);
    }
};

MyCtor.prototype.change = function (value) {
    this.data = value;
    this.element.innerHTML = value;
};
MyCtor.prototype.getValue = function () {
    return parseInt(this.element.innerHTML, 10);
};





/* STATS */
var age = new MyCtor(document.getElementById("age"), 0),
	job = new MyCtor(document.getElementById("job"), 0),
	money = new MyCtor(document.getElementById("money"), 0),
	energy = new MyCtor(document.getElementById("energy"), 0),
	ENERGY_INREASE_RATE = 1,
	ENERGY_INCREASE_INTERVAL = 1000;
// Age increment
setInterval(function () {
    age.change(age.getValue() + 1);
}, 30000);
// Energy Increment
setInterval(function () {
    energy.change(energy.getValue() + ENERGY_INREASE_RATE);
}, ENERGY_INCREASE_INTERVAL);
// Theme change
var isDarkMode = false;
$('button#theme').click(function () {
    if (isDarkMode) {
        $('link[href="css/darkstyle.css"]').attr('href','css/lightstyle.css');
        this.innerHTML = "Dark Theme";
    } else {
        $('link[href="css/lightstyle.css"]').attr('href','css/darkstyle.css');
        this.innerHTML = "Light Theme";
    }
    isDarkMode = !isDarkMode;
});