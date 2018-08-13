//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];

function setQuestion()
{
    var ans;
    var vars = getRandom(1, 9, 4);
    switch(questionNum)
    {
        case 0:
        case 1:
        case 2:
	    var statement = (trueFalse[0]==0)?onePlaneTrue[vars[0]]:onePlaneFalse[vars[0]];
	    ans = (trueFalse[0]==0)?"true":"false";
            quest = "Please determine whether this statement is true or false for the diagram shown below:<br /><b>"+statement+"</b><br />Please enter <b>true</b> or <b>false</b><br /><img src='/lessons/geo/2.4/oneplane.png' />";
	    equationNum = 0;
	    break;
        case 3:
        case 4:
        case 5:
	    var statement = (trueFalse[0]==0)?twoPlanesTrue[vars[0]]:twoPlanesFalse[vars[0]];
	    ans = (trueFalse[0]==0)?"true":"false";
            quest = "Please determine whether this statement is true or false for the diagram shown below:<br /><b>"+statement+"</b><br />Please enter <b>true</b> or <b>false</b><br /><img src='/lessons/geo/2.4/twoplanes.png' />";
	    equationNum = 0;
	    break;
    }
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Please fill in the steps to solve the equation while giving reasons for each step.";

    options = "<option value='add'>Addition Property of Equality</option><option value='sub'>Subtraction Property of Equality</option><option value='mult'>Multiplication Property of Equality</option><option value='div'>Division Property of Equality</option>";
    equations = [["", "<table border='0'><tr><td>"+(-vars[0]+vars[1])+"x</td><td>+"+vars[2]+"</td><td>=</td><td>"+vars[1]+"x</td><td>+"+((vars[0]*vars[3])+vars[2])+"</td><td>&nbsp;&nbsp;&nbsp;</td><b>Given</b></td></tr>"
	              +"<tr><td><input type='text' class='mathinput' id='i0' /></td><td></td><td></td><td><input type='text' class='mathinput' id='i1' /></td><td></td><td></td><td></td><td><select class='mathinput' id='i2'>"+options+"</select></td>", [[ans]]]];
}

function step1(ifResetScrolling)
{
    endLoading();
    currentStep = 2;

    document.getElementById("step").innerHTML = "";
    document.getElementById("math").innerHTML = equations[equationNum][1];

    addInputEventListeners();

    if(ifResetScrolling) window.scrollTo(0, 0);
    enableDisableButtons();
}

function giveHint()
{
    if(currentStep==1)
    {
        swal("Use the first equation if you are given two points and cannot see the graph of the line. Use the second equation if you are given the graph of the line. Use the third equation if you are confident in your ability to apply the Pythagorean Theorem in your head.");
    } else
    {
        var numCorrect = new Array();
        var studentSolution, input, sol;

        for(var i=0; i<equations[equationNum][2].length; i++)
        {
            numCorrect[i] = testSolution(i);
        }
        studentSolution = indexOfMax(numCorrect);

        sol = equations[equationNum][2][studentSolution];
        for(var i=0; i<sol.length; i++)
        {
            input = document.getElementById("i"+i);
            if(input.value != sol[i])
            {
                input.value = sol[i];
                break;
            }
        }
        checkChanged(input);
    }
}

var numQuestions = 6;