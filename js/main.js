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
var COMPLAINTS = [
    "the weird smell coming from the hallway.",
    "the new scratch on the side of your car.",
    "the slow internet speed.",
    "not having cable TV.",
];
/* EVENTS LOGGER */
var events = document.getElementById("events"),
    EVENT_MAX = 1000;



/* READ COOKIES */
// First load ?
if(localStorage.length == 0) {
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

// Stats
function defaultStats() {
    var gameState = {
        theme: "light",
        player: {
            intelligence: 0,
            appearance: 0,
            job: "None",
            money: 0,
        },
        day: 0,
        energy: 240,
        totalTime: 0,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
    events.innerHTML = "";
}

function saveStats() {
    var gameState = {
        player: {
            intelligence: $("#intelligence").html(),
            appearance: $("#appearance").html(),
            job: $("#job").html(),
            money: $("#money").html(),
        },
        day: $("#days").html(),
        energy: $("#energy").html(),
        totalTime: TIME,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadStats() {
    var gameState = JSON.parse(localStorage.getItem('gameState'));
    $("#days").html(gameState.day);
    $("#energy").html(gameState.energy);
    $("#intelligence").html(gameState.player.intelligence);
    $("#appearance").html(gameState.player.appearance);
    $("#job").html(gameState.player.job);
    $("#money").html(gameState.player.money);
    TIME = gameState.totalTime;
    days = $("#days").innerHTML,
    job = $("#job").innerHTML,
    money = $("#money").innerHTML,
    energy = $("#energy").innerHTML;
}

// Save every 10 seconds
setInterval(function() {
    saveStats();
}, 10000);



// log events
function logEvent(message) {
	var newEvent = document.createElement("div");
    newEvent.style.paddingBottom = "20px";
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

$('button#mom').click(function() {
    logEvent("You complain to mom about " + COMPLAINTS[Math.floor(Math.random() * COMPLAINTS.length)]);
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
