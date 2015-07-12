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
function logEvent(string) {
	var newEvent = document.createElement("div");
	newEvent.innerHTML = string;
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





/* WORK */
var WORK_COST = 2,
	WORK_PAY = 2,
	work_pay = new MyCtor(document.getElementById("work_pay"), 0),
	work_cost = new MyCtor(document.getElementById("work_cost"), 0);
// Work button
$('button#work').click(function () {
    if (energy.getValue() >= WORK_COST) {
        energy.change(energy.getValue() - WORK_COST);
        money.change(money.getValue() + WORK_PAY);
        var message = ""
        message = message.concat("You spent ", WORK_COST, " energy and made $", WORK_PAY, ".");
        logEvent(message);
    } else {
    	logEvent("You don't have enough energy to work.")
    }
});
// Promotion button
$('button#promotion').click(function () {
    if (job.element.innerHTML == "Dish Washer") {
        job.change("Waiter");
        WORK_PAY = 5;
        work_pay.change(5);
        WORK_COST = 2;
        work_cost.change(2);
        logEvent("You got a promotion!");
    } else {
        logEvent("You did not get a promotion...");
    }
});

var progress = document.getElementById("minigame_progress_bar");
var animation_text = document.getElementById("minigame_animation");
var wasLastKeyRight = true;
function decrementProgress() {
	progress.value = progress.value - 1;
	updateWeightliftingAnimation();
}

function incrementProgress(keyIsRight) {
	// Is the new key different than the last? (e.g. alternate left/right)
	if (!keyIsRight == wasLastKeyRight) {
		progress.value = progress.value + 1;
		wasLastKeyRight = !wasLastKeyRight;
	}

	updateWeightliftingAnimation();
}

function updateWeightliftingAnimation() {
	if (progress.value < 5) {
		animation_text.innerHTML = weightlifting_anim[0];
	} else if (progress.value < 15) {
		animation_text.innerHTML = weightlifting_anim[1];
	} else if (progress.value < 25) {
		animation_text.innerHTML = weightlifting_anim[2];
	} else if (progress.value < 35) {
		animation_text.innerHTML = weightlifting_anim[3];
	} else if (progress.value < 45) {
		animation_text.innerHTML = weightlifting_anim[4];
	} else if (progress.value < 49) {
		animation_text.innerHTML = weightlifting_anim[5];
	} else {
		alert("woohooo!");
	}
}

setInterval(decrementProgress, 150);

// Handle arrow key navigation
$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        incrementProgress(false);

        case 38: // up
        break;

        case 39: // right
        incrementProgress(true);
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

var weightlifting_anim = [
	"\n\n    _._\n   / O \\\n   \\| |/\nO--+=-=+--O",
	"\n\n\n   ,-O-,\nO--=---=--O\n    2\"2",
	"\n\n   ,_O_,\nO--(---)--O\n    >'>\n    - -",
	"\n   ._O_.\nO--<-+->--O\n     X\n    / \\\n   -   -",
	"\nO--=-O-=--O \n    '-'\n     v\n    / )\n   ~  z",
	"O--,---,--O\n   \\ O /\n    - -\n     -\n    / \\\n   =   ="
];