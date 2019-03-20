/* ************************************ Template for progressing story board ******************************************


$('').click(function ({
    $('').slideUp(1000, function (){
        $('').slideDown(1000, function (){
            $('').show();
        })
    })
})


*/
//---------------------------------------------------------------------------------------------------------------------------------------
console.log ('Start program');
//Start button

$('#startButton').click(function () {
    alert('The place is here, the time is now...');
    $('#jumboText').slideUp(1000, function(){
        $('#mb-s1').slideDown(1000, function(){
            $('#mb-s1').show();
        })
    })
})

//Question 1:
$('#continueButtonS1').click(function () {
    $('#mb-s1').slideUp(1000, function(){
        $('#mb-q1').slideDown(1000, function(){
            $('#mb-q1').show();
        })
    })
})
