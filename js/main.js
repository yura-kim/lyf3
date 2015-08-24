/* PREVENT HIGHLIGHTING */
var omitformtags=["input", "textarea", "select"],
	omitformtags=omitformtags.join("|");

function disableselect(e){
	if (omitformtags.indexOf(e.target.tagName.toLowerCase())==-1) {
		return false
	}
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



/* READ COOKIES */
// First load ?
if(localStorage.length == 0) {
    localStorage.theme = "light";
    defaultStats();
}
// Stats
loadStats();
// Theme
if (localStorage.theme == "dark") {
    $('link[href="css/lightstyle.css"]').attr('href','css/darkstyle.css');
}

function defaultStats() {
    localStorage.age = Number(15);
    localStorage.energy = Number(0);
    localStorage.intelligence = Number(0);
    localStorage.appearance = Number(0);
    localStorage.job = "None";
    localStorage.money = Number(0);
}

function saveStats() {
    localStorage.age = Number(document.getElementById("age").innerHTML);
    localStorage.energy = Number(document.getElementById("energy").innerHTML);
    localStorage.intelligence = Number(document.getElementById("intelligence").innerHTML);
    localStorage.appearance = Number(document.getElementById("appearance").innerHTML);
    localStorage.job = document.getElementById("job").innerHTML;
    localStorage.money = Number(document.getElementById("money").innerHTML);
}

function loadStats() {
    document.getElementById("age").innerHTML = Number(localStorage.age);
    document.getElementById("energy").innerHTML = Number(localStorage.energy);
    document.getElementById("intelligence").innerHTML = Number(localStorage.intelligence);
    document.getElementById("appearance").innerHTML = Number(localStorage.appearance);
    document.getElementById("job").innerHTML = localStorage.job;
    document.getElementById("money").innerHTML = Number(localStorage.money);
}



/* TABS */
$(document).ready(function() {
    $('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        $('.tabs ' + currentAttrValue).fadeIn(300).siblings().hide();
 
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
    });
});



/* EVENTS LOGGER */
var events = document.getElementById("events"),
	EVENT_MAX = 1000;
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
    AGE_INTERVAL = 30000,
	ENERGY_INREASE_RATE = 1,
	ENERGY_INCREASE_INTERVAL = 1000,
    SAVE_INTERVAL = 10000;
// Age increment
setInterval(function () {
    age.change(age.getValue() + 1);
}, AGE_INTERVAL);
// Energy Increment
setInterval(function () {
    energy.change(energy.getValue() + ENERGY_INREASE_RATE);
}, ENERGY_INCREASE_INTERVAL);
// Save Increment
setInterval(function() {
    console.log("Auto-save");
    saveStats();
}, SAVE_INTERVAL);



/* BUTTONS */
// Save button
$('button#save').click(function() {
    saveStats();
})
// Reset button
$('button#reset').click(function() {
    if(confirm("Reset all game stats and achievements?")) {
        defaultStats();
        loadStats();
    }
})
// Theme button
$('button#theme').click(function () {
    if (localStorage.theme == "dark") {
        $('link[href="css/darkstyle.css"]').attr('href','css/lightstyle.css');
        this.innerHTML = "Dark Theme";
        localStorage.theme = "light";
    } else {
        $('link[href="css/lightstyle.css"]').attr('href','css/darkstyle.css');
        this.innerHTML = "Light Theme";
        localStorage.theme = "dark";
    }
});