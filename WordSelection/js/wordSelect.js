var answers = ['endocrine', 'chemical', 'hormones', 'slowly']
var studentAnswers = [null, null, null, null]

function question(num, event) {
    var ans = event.target.textContent;
    if (studentAnswers[num] != null) {
        document.getElementById(studentAnswers[num]).classList.toggle("selected");
    }
    studentAnswers[num] = ans;
    document.getElementById(ans).classList.toggle("selected");
}

function submit() {
    if (JSON.stringify(answers) == JSON.stringify(studentAnswers)) {
        alert('correct')
    } else {
        alert('incorrect');
    }
}
