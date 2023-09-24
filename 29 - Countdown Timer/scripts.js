let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = (now + seconds * 1000);
    showChanges(seconds);
    showEndTime(then);

    countdown = setInterval(function() {
        const remainingSeconds = Math.round((then - Date.now()) / 1000);
        if(remainingSeconds < 0) {
            clearInterval(countdown);
            return;
        }
        showChanges(remainingSeconds);
    } , 1000)
}

function showChanges(seconds) {
    const mins = Math.floor(seconds / 60);
    seconds = seconds % 60;
    timerDisplay.innerHTML = `${mins}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function showEndTime(seconds) {
    const date = new Date(Date.now() + seconds * 1000);
    const hrs = date.getHours();
    const adjustedHour = hrs > 12 ? hrs - 12 : hrs;
    const mins = date.getMinutes();
    endTime.innerHTML = `Be back at ${adjustedHour}:${mins < 10 ? '0' : ''}${mins}`;
}

function startTimer(e) {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer))
document.customForm.addEventListener("submit", function(e) {
    e.preventDefault();
    timer(this.minutes.value * 60);
    this.reset();
})