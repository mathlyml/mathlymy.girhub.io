//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];

function setQuestion()
{
    var ans;
    var vars = getRandom(1, 9, 5);
    var quest;
    var alph = ["A", "B", "C", "D", "E", "F", "G", "H", "K", "L", "P", "R", "S", "T", "W", "X", "Y", "Z"];
    alph = shuffle(alph);
    var options;
    switch(questionNum)
    {
        case 0:
	    equationNum = 0;
	    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Please use the <b>reflexive<b> property to fill in the blank.";
	    break;
        case 1:
	    equationNum = 1;
	    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Please use the <b>symmetric<b> property to fill in the blanks.";
	    break;
        case 2:
	    equationNum = 2;
	    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Please use the <b>transitive<b> property to fill in the blanks.";
	    break;
        case 3:
	    equationNum = 3;
            var w = Math.min(window.innerWidth, window.innerHeight, 400);
	    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Given that AC = AB + AB, prove that AB = BC. The proof is given on the left. Please select the reasons on the right.<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
            initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
            addText([-4,0], "A");
            addText([0,0], "B");
            addText([4,0], "C");
	    plotData([-4,4], [0,0]);
	    options = "<option value=''>Select</option><option value='Given'>Given</option><option value='Reflexive Property of Equality'>Reflexive Property of Equality</option><option value='Symmetric Property of Equality'>Symmetric Property of Equality</option><option value='Transitive Property of Equality'>Transitive Property of Equality</option><option value='Segment Addition Postulate'>Segment Addition Postulate</option><option value='Addition Property of Equality'>Addition Property of Equality</option><option value='Subtraction Property of Equality'>Subtraction Property of Equality</option>";
	    break;
    }

    equations = [["", alph[0]+" = <input type='text' class='mathinput' id='i0' />", [[alph[0]]]],
	        ["", "If "+alph[0]+" = <input type='text' class='mathinput' id='i0' />, then "+alph[1]+" = <input type='text' class='mathinput' id='i0' />", [[alph[1], alph[0]]]],
	        ["", "If "+alph[0]+" = "+alph[1]+" and "+alph[1]+" = "+alph[2]+", then <input type='text' class='mathinput' id='i0' /> = <input type='text' class='mathinput' id='i0' />", [[alph[0], alph[2]]]],
		["", "<table border='0'><tr><td>AC = AB + AB</td><td>&nbsp;&nbsp;&nbsp;</td><td><select class='mathinput' id='i0'>"+options+"</select></td></tr>"
		    +"<tr><td>AB + BC = AC</td><td>&nbsp;&nbsp;&nbsp;</td><td><select class='mathinput' id='i0'>"+options+"</select></td></tr>"
		    +"<tr><td>AB + BC = AB + AB</td><td>&nbsp;&nbsp;&nbsp;</td><td><select class='mathinput' id='i0'>"+options+"</select></td></tr>"
		    +"<tr><td>BC = AB</td><td>&nbsp;&nbsp;&nbsp;</td><td><select class='mathinput' id='i0'>"+options+"</select></td></tr>"
		    +"<tr><td>AB = BC</td><td>&nbsp;&nbsp;&nbsp;</td><td><select class='mathinput' id='i0'>"+options+"</select></td></tr>", [["Given", "Segment Addition Postulate", "Transitive Property of Equality", "Subtraction Property of Equality", "Symmetric Property of Equality"]]]];
}

function step1(ifResetScrolling)
{
    endLoading();
    currentStep = 2;

    document.getElementById("step").innerHTML = "";
    document.getElementById("math").innerHTML = equations[equationNum][1];
    /*document.getElementById('i2').style.width = '22em';
    document.getElementById('i5').style.width = '22em';
    document.getElementById('i8').style.width = '22em';*/
	
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

function signNumber(theNumber)
{
    if(theNumber > 0){
        return "+" + theNumber;
    }else{
        return theNumber.toString();
    }
}

function addOrSub(num)
{
	return (num>0)?"Addition Property of Equality":"Subtraction Property of Equality";

}

var numQuestions = 2;
