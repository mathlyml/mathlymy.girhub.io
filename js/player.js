var ifVideo = 0; // Did the student watch the video?

function startVideo()
{
    practice = false;
    ifVideo = 1;
    initInterface();
    document.getElementById("playerFrame").style.display = "inline";

    var w = Math.min(window.innerWidth, 640);
    document.getElementById("playerSpan").innerHTML = "<iframe width='"+w+"' height='"+(w*39/64)+"' src='https://www.youtube.com/embed/"+lessons[course][lessonId][0]+"?autoplay=1'></iframe>";
}

function readyForQuiz()
{
        swal({title: "Moving on",
          text: "What would you like to do next?",
          icon: "info",
          buttons: {
            practice: {
              text: "Practice",
              value: "practice",
            },
            quiz: {
              text: "I'm ready to take the quiz",
              value: "quiz",
            },
            cancel: true
          }
        })
        .then(function(value) {
          switch (value) {
            case "practice":
              quiz(true);
              break;

            case "quiz":
              quiz(false);
              break;
          }
        });
}
