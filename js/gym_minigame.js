
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