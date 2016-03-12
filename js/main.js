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



/* TABS */
$(document).ready(function() {
    $('.tabs .tab-links li').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('id');
        $('.tabs ' + currentAttrValue).fadeIn(300).siblings().hide();
        $(this).addClass('active').siblings().removeClass('active');
        e.preventDefault();
    });
    $('#town button').on('click',function(e) {
        var currentAttrValue = jQuery(this).attr('id');
        $('.tabs '+currentAttrValue).fadeIn(300).siblings().hide();
        $('.tabs .tab-links').siblings().removeClass('active');
        e.preventDefault();
    })
});



/* GLOBAL VARIABLES */
var TIME;



/* READ COOKIES */
// First load ?
if(localStorage.length == 0) {
    localStorage.theme = "light";
    defaultStats();
    TIME = 0;
} else {
    loadStats();
}

// Theme
if (localStorage.theme == "dark") {
    $('button#theme').prop("innerHTML","Light Theme");
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
    localStorage.totaltime = Number(TIME);
}

function loadStats() {
    document.getElementById("age").innerHTML = Number(localStorage.age);
    document.getElementById("energy").innerHTML = Number(localStorage.energy);
    document.getElementById("intelligence").innerHTML = Number(localStorage.intelligence);
    document.getElementById("appearance").innerHTML = Number(localStorage.appearance);
    document.getElementById("job").innerHTML = localStorage.job;
    document.getElementById("money").innerHTML = Number(localStorage.money);
    TIME = Number(localStorage.totaltime);
}



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
    AGE_INTERVAL = 30000,               // every 30 seconds
	ENERGY_INREASE_RATE = 1,
	ENERGY_INCREASE_INTERVAL = 1000,    // every second
    SAVE_INTERVAL = 10000;              // every 10 seconds
// Age increment
setInterval(function () {
    age.change(age.getValue() + 1);
}, AGE_INTERVAL);
// Energy Increment
setInterval(function () {
    energy.change(energy.getValue() + ENERGY_INREASE_RATE);
    TIME = Number(TIME) + 1;
}, ENERGY_INCREASE_INTERVAL);
// Save Increment
setInterval(function() {
    saveStats();
}, SAVE_INTERVAL);



/* FUNCTIONS */
function createAlert(text) {
   var alert = document.createElement('div');
   alert.setAttribute("id","alert");
   alert.setAttribute("class","notification");
   alert.innerHTML = text;
   //alert.innerHTML = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + text;
   document.lastChild.appendChild(alert);
   alert.remove();
}



/* BUTTONS */
$('button#source-code').click(function() {
    window.open("https://github.com/San-Toki/lyf3","_blank");
})
$('button#save').click(function() {
    saveStats();
    //createAlert("info","Game saved");
})
$('button#reset').click(function() {
    if(confirm("Reset all game stats and achievements?")) {
        defaultStats();
        loadStats();
    }
})
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

