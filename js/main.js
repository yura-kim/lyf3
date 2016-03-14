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
        if ((currentAttrValue == "#gym") && (Number(document.getElementById("energy").innerHTML) < 10)) {
            currentAttrValue = "#gym-no";
        }
        $('.tabs '+currentAttrValue).fadeIn(300).siblings().hide();
        $('.tabs .tab-links').siblings().removeClass('active');
        e.preventDefault();
    })
});



/* GLOBAL VARIABLES */
var TIME;
/* EVENTS LOGGER */
var events = document.getElementById("events"),
    EVENT_MAX = 1000;



/* READ COOKIES */
// First load ?
if(localStorage.length == 0) {
    localStorage.theme = "light";
    defaultStats();
    loadStats();
} else {
    loadStats();
}



// Theme
if (localStorage.theme == "dark") {
    $('button#theme').prop("innerHTML","Light Theme");
    $('link[href="css/lightstyle.css"]').attr('href','css/darkstyle.css');
}

function defaultStats() {
    localStorage.days = Number(0);
    localStorage.energy = Number(240);
    localStorage.intelligence = Number(0);
    localStorage.appearance = Number(0);
    localStorage.job = "None";
    localStorage.money = Number(0);
    events.innerHTML = "";
}

function saveStats() {
    localStorage.days = Number(document.getElementById("days").innerHTML);
    localStorage.energy = Number(document.getElementById("energy").innerHTML);
    localStorage.intelligence = Number(document.getElementById("intelligence").innerHTML);
    localStorage.appearance = Number(document.getElementById("appearance").innerHTML);
    localStorage.job = document.getElementById("job").innerHTML;
    localStorage.money = Number(document.getElementById("money").innerHTML);
    localStorage.totaltime = Number(TIME);
}

function loadStats() {
    document.getElementById("days").innerHTML = Number(localStorage.days);
    document.getElementById("energy").innerHTML = Number(localStorage.energy);
    document.getElementById("intelligence").innerHTML = Number(localStorage.intelligence);
    document.getElementById("appearance").innerHTML = Number(localStorage.appearance);
    document.getElementById("job").innerHTML = localStorage.job;
    document.getElementById("money").innerHTML = Number(localStorage.money);
    TIME = Number(localStorage.totaltime);
    days = document.getElementById("days").innerHTML,
    job = document.getElementById("job").innerHTML,
    money = document.getElementById("money").innerHTML,
    energy = document.getElementById("energy").innerHTML;
}

// Save every 10 seconds
setInterval(function() {
    saveStats();
}, 10000);



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



/* HOME */
$('button#sleep').click(function() {
    days = Number(days) + 1;
    document.getElementById("days").innerHTML = Number(days);
    energy = 240;
    document.getElementById("energy").innerHTML = Number(energy);
    logEvent("You went to bed.");
});



/* BUTTONS */
$('button#source-code').click(function() {
    window.open("https://github.com/San-Toki/lyf3","_blank");
})
$('button#save').click(function() {
    saveStats();
    //createAlert("info","Game saved");
})
$('button#reset').click(function() {
    if(confirm("Are you sure you want to reset all game stats and achievements?")) {
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
