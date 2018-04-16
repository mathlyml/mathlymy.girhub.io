var lessons = {"alg1": {"1.1": ["92aLiyeQj0w", "Distance Formula", 1],
                        "1.2": ["dw41PMWek6U", "Title A2", 1],
                        "1.3": ["dw41PMWek6U", "Title A3", 1]}, 
              "alg2": {"1.1": ["_7aUxFzTG5w", "TITLE B1", 1]}, 
              "precalc": {"1.1": ["H-E5rlpCVu4", "TITLE P1", 1]}, 
              "calc": {"1.1": ["Ld7Vxb5XV6A", "TITLE C1", 1]}};
var get = {};
var get = {};
var ifCanvas = isCanvasSupported()?1:0;   // Does the user's browser support canvas?
ifInit = false;

function initLesson()
{
    var lessons;
    var promptSelect = document.getElementById("promptSelect");
    if(document.getElementById("name").value=="")
    {
        swal("You forgot to enter your name", "Please enter your name", "warning");
    } else if (typeof get["lessonId"] === "undefined")
    {
        promptSelect.style.fontWeight = "bold";
        promptSelect.style.color = "red";
    } else
    {
        ifInit = true;

        // Load the JS corresponding to this lesson
        loadJS("lessons/"+get["course"]+"/"+get["lessonId"]+"/"+get["lessonId"]+".js");

        initInterface();

        swal({title: "Welcome",
          text:"Welcome, "+document.getElementById("name").value+"! How would you like to proceed?",
          icon: "info",
          buttons: {
            video: {
              text: "Watch a video",
              value: "video",
            },
            practice: {
              text: "Practice",
              value: "practice",
            },
            quiz: {
              text: "I'm ready to take the quiz",
              value: "quiz",
            }
          }
        })
        .then(function(value) {
          switch (value) {
            case "video":
              startVideo();
              break;
         
            case "practice":
              quiz(true);
              break;

            case "quiz":
              quiz(false);
              break;
         
            default:
              init();
          }
        });
    }
}

function completed()
{
    initInterface();
    document.getElementById("completedFrame").style.display = "inline";
    document.getElementById("promptSelect").style.display = "inline";
    var w = Math.min(window.innerWidth/2, 200);
    document.getElementById("completedImg").width = w;
    document.getElementById("completedImg").height = w;
}

function initInterface()
{
    if(lessons != null)
    {
        document.getElementById("form").style.display = "none";

        document.title = "Lesson "+get["lessonId"]+": "+lessons[get["course"]][get["lessonId"]][1] + (practice?" (PRACTICE)":"");
        document.getElementById("welcome").style.display = "none";
        document.getElementById("welcome2").innerHTML = "Lesson "+get["lessonId"]+": "+lessons[get["course"]][get["lessonId"]][1] + (practice?" <span style='color:red'>(PRACTICE)</span>":"");

        promptSelect.style.fontWeight = "normal";
        promptSelect.style.color = "black";
        document.getElementById("promptSelect").style.display = "none";

        document.getElementById("playerSpan").innerHTML = "";
        document.getElementById("playerFrame").style.display = "none";

        document.getElementById("quizFrame").style.display = "none";
        document.getElementById("completedFrame").style.display = "none";
    } else
    {
        setTimeout(function(){ initInterface(); }, 1000);
    }

    window.scrollTo(0, 0);
    $(".navbar-collapse").collapse('hide');
}

window.onload = function()
{
    // Parse the URL so that we can figure out which course and lesson the user wants
    location.search.substr(1).split("&").forEach(function(item) {get[item.split("=")[0]] = item.split("=")[1]});

    if(typeof get["course"] === "undefined")
    {
        // We don't know which course the user wants. Ask.
        document.getElementById("form").style.display = "none";
        document.getElementById("promptSelect").style.display = "none";
        document.getElementById("chooseCourse").style.display = "inline";
        return false;
    } else
    {
        // Propagate options in the select menu
        for(lessonId in lessons[get["course"]])
        {
            var opt = document.createElement("option");
            opt.value = lessonId;
            opt.innerHTML = lessonId + ": "+lessons[get["course"]][lessonId][1];

            document.getElementById("selectLesson").appendChild(opt);
        }
        if(typeof get["lessonId"] !== "undefined")
        {
            document.getElementById("selectLesson").value = get["lessonId"];
        } else
        {
            document.getElementById("selectLesson").value = "select";
        }
    }
}

function loadJS(scriptSrc)
{
    var script = document.createElement("script");
    script.src = scriptSrc;
    script.type = "text/javascript";
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
}

function isCanvasSupported(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

function error(errCode)
{
    //TODO: Display errors to user
}
