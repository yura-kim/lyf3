var events = document.getElementById("events");

function logEvent(string) {
	var newEvent = document.createElement("p");
	newEvent.innerHTML = string;
	events.insertBefore(newEvent, events.childNodes[0]);
}

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
// Stats
var age = new MyCtor(document.getElementById("age"), 0),
	job = new MyCtor(document.getElementById("job"), 0),
	money = new MyCtor(document.getElementById("money"), 0),
	energy = new MyCtor(document.getElementById("energy"), 0),
	ENERGY_INREASE_RATE = 1,
	ENERGY_INCREASE_INTERVAL = 1000;
// Age increment
setInterval(function () {
    age.change(age.getValue() + 1);
}, 10000);
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
// Variables
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
    isDarkMode = !isDarkMode;
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
    isDarkMode = !isDarkMode;
});