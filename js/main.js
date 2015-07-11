// Test
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
    this.element.value = value;
};
MyCtor.prototype.getValue = function () {
	return parseInt(this.element.value);
}

var energy = new MyCtor(document.getElementById("energy"), 0);

var ENERGY_INREASE_RATE = 1;
setInterval(function () {
    energy.change(energy.getValue() + ENERGY_INREASE_RATE);
}, 100);