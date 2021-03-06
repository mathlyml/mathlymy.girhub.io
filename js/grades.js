var studentGrades;

function initGrades()
{
    loadJS("google", "?student="+encodeURIComponent(name)+"&course="+course+"&password="+password+(ifStudent?"&getStudentGrades=1":"&getParentGrades=1"));
}

function displayGrades(grades)
{
    endLoading();
    
    if(grades==false)
    {
        swal("Request could not be completed", "Your request could not be completed due to a temporary security concern. Please try again later or ask Mr. Naudus for help.", "warning");
        return false;
    }
    studentGrades = grades;

    initInterface();
    document.getElementById("gradesFrame").style.display = "inline";
    document.getElementById("welcome").style.display = "inline";
    if(ifStudent)
    {
        document.getElementById("welcome").innerHTML = name;
        document.getElementById("welcome2").innerHTML = name;
    } else
    {
        document.getElementById("welcome").innerHTML = "Parent of "+name;
        document.getElementById("welcome2").innerHTML = "Parent of "+name;
    }

    var html = "<table border='1'>";

    var maxWeight = grades[1].max();
    var secondMaxWeight = secondMax(grades[1], maxWeight);

    for(var i=0; i<grades[0].length; i++)
    {
        html += "<tr><td>";
        if(grades[1][i] < secondMaxWeight)
        {
            html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        if(grades[1][i] < maxWeight)
        {
            html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        html += grades[0][i]+"</td>";
        if(grades[2][i]==null)
        {
            html += "<td><input id='g"+i+"' type='text' size='1' />%</td></tr>";
        } else
        {
            html += "<td>"+Math.round(grades[2][i]*100)+"%</td></tr>";
        }
    }

    document.getElementById("grades").innerHTML = html;
    document.getElementById("progressGrade").innerHTML = "Progress Grade: "+Math.round(grades[3]*100)+"%";
}

function whatIfGrade()
{
    var newGrade = 0;
    var maxGrade = 0;
    var textField;

    for(var i=0; i<studentGrades[0].length; i++)
    {
        textField = document.getElementById('g'+i);
        if(!textField)
        {
            newGrade += studentGrades[1][i]*studentGrades[2][i];
            maxGrade += studentGrades[1][i];
        } else if(!isNaN(parseFloat(textField.value)))
        {
            newGrade += studentGrades[1][i]*parseFloat(textField.value)/100;
            maxGrade += studentGrades[1][i];
        }
    }
    document.getElementById("progressGrade").innerHTML = "What-If Grade: "+Math.round(newGrade*100/maxGrade)+"%";
}

function secondMax(array, max)
{
    var newArray = array.concat().sort().reverse();
    for(var i=0; i<newArray.length; i++)
    {
        if(newArray[i] < max)
        {
            return newArray[i];
        }
    }
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
