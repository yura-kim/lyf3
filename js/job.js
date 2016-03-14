// Variables
var job_id = -1,
    days = document.getElementById("days").innerHTML,
    job = document.getElementById("job").innerHTML,
	job_pay = document.getElementById("job_pay").innerHTML,
	job_cost = document.getElementById("job_cost").innerHTML,
    intelligence = document.getElementById("intelligence").innerHTML,
    energy = document.getElementById("energy").innerHTML,
    money = document.getElementById("money").innerHTML,
    experience = 0;



// Job Ladder
// [title, energy cost, money gain, experience requirement]
var restaurant_jobs = [
    ["Dish-Washer",10,7,0],
    ["Busser",10,8,5],
    ["Wait Staff",10,8,10],
    ["Bartender",10,10,20],
    ["Kitchen Staff",10,15,50]
];



// Load the job
$(document).ready(function() {
    if (job != "None") {
        document.getElementById('promotion').innerHTML = "Ask for a promotion";
        for (x in restaurant_jobs) {
            if (restaurant_jobs[x][0] == job) {
                job_id = Number(x);
                job_cost = restaurant_jobs[x][1];
                job_pay = restaurant_jobs[x][2];
                experience = restaurant_jobs[x][3];
            }
        }
    }
});



// Work button
$('button#work').click(function () {
    if (job_id == -1) {                                         // No job
        logEvent("You don't have a job.");
    } else if (energy < job_cost) {       // Not enough energy
        logEvent("You don't have enough energy to work.");
    } else {                                                    // Work
        energy = Number(energy) - job_cost;
        document.getElementById("energy").innerHTML = energy;
        money = Number(money) + job_pay;
        document.getElementById("money").innerHTML = money;
        experience = experience + 1;
        message = "";
        message = message.concat("You spent ", job_cost, " energy and made $", job_pay, ".");
        logEvent(message);
    }
});


// Promotion function
function job_promotion(id) {                                    // job_id of new job
    job_id = id;
    job = restaurant_jobs[id][0];
    document.getElementById('job').innerHTML = job;
    job_cost = restaurant_jobs[id][1];
    job_pay = restaurant_jobs[id][2];
    var message = "";
    message = message.concat("You got a job as a ", job);
    logEvent(message);
}

// Promotion button
$('button#promotion').click(function () {
    if (job_id == -1) {
        job_promotion(job_id+1);                            // Got a job
        this.innerHTML = "Ask for a promotion";
    } else if (job_id+1 == restaurant_jobs.length) {            // No more promotions available
        logEvent("You're already at the top of the ladder.");
    } else if (experience < restaurant_jobs[job_id+1][3]) {     // Not enough experience
        logEvent("You were denied a promotion.");
    } else {                                                    // Got the promotion
            job_promotion(job_id+1);
    }
});