// Variables
var job_id = -1,
    job = new MyCtor(document.getElementById("job"), 0),
	job_pay = new MyCtor(document.getElementById("job_pay"), 0),
	job_cost = new MyCtor(document.getElementById("job_cost"), 0),
    intelligence = new MyCtor(document.getElementById("intelligence"), 0),
    energy = new MyCtor(document.getElementById("energy"), 0),
    money = new MyCtor(document.getElementById("money"), 0),
    experience = 0;


// Job Ladder
var restaurant_jobs = [["Dish-Washer",3,2,0],["Busser",2,2,5]];


// Work button
$('button#work').click(function () {
    if (job_id == -1) {                          // Does not have a job
        logEvent("You don't have a job.");
    } else if (energy.getValue() < job_cost.getValue()) {   // Not enough energy
        logEvent("You don't have enough energy to work.");
    } else {                                    // Work
        energy.change(energy.getValue() - job_cost.getValue());
        money.change(money.getValue() + job_pay.getValue());
        var message = "";
        experience = experience + 1;
        message = message.concat("You spent ", job_cost.getValue(), " energy and made $", job_pay.getValue(), ".");
        logEvent(message);
    }
});


// Promotion function
function job_promotion(id) {    // job_id of new job
    job_id = id;
    job.change(restaurant_jobs[id][0]);
    job_cost.change(restaurant_jobs[id][1]);
    job_pay.change(restaurant_jobs[id][2]);
    var message = "";
    message = message.concat("You got a job as a ", job.element.innerHTML);
    logEvent(message);
}

// Promotion button
$('button#promotion').click(function () {
    if (job.element.innerHTML == "None") {                      // No job
        job_promotion(job_id+1);
        this.innerHTML = "Ask for a promotion";
    } else if (job_id+1 == restaurant_jobs.length) {            // No more promotions available
        logEvent("You're already at the top of the ladder.");
    } else if (experience < restaurant_jobs[job_id+1][3]) {     // Not enough experience
        console.log(restaurant_jobs[job_id+1][3]);
        logEvent("You were denied a promotion.");
    } else {                                                    // Got the promotion
            job_promotion(job_id+1);
    }
});