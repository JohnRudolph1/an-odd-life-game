/* ************************************ Template for progressing story board ******************************************


$('#').click(function (){
    $('#').slideUp(1000, function (){
        $('#').slideDown(1000, function (){
            $('#').show();
        })
    })
})

<!-- DISPLAY ON ALL DIVS SET TO :NONE, REFER TO js/oddlife.js FOR ANIMATIONS -->
      <!-- DIV WIKI: 
         q#= question number
         b#= branch number
         a#= answer number
         e#= ending number
         s#= statement number
                    -->


*/
//---------------------------------------------------------------------------------------------------------------------------------------
console.log ('Start program');

//Start button

$('#startButton').click(function () {
    alert('The place is here, the time is now...');
    $('#jumboText').fadeOut(1000, function(){
        $('#mb-s1').fadeIn(1000, function(){
            $('#mb-s1').show();
        })
    })
})

//mb-q1
$('#continueButtonS1').click(function () {
    $('#mb-s1').fadeOut(500, function(){
        $('#mb-q1').fadeIn(500, function(){
            $('#mb-q1').show();
        })
    })
})
    //b1-q1
    $('#b1-button').click(function (){
        $('#mb-q1').fadeOut(500, function (){
            $('#b1-q1').fadeIn(500, function (){
                $('#b1-q1').show();
            })
        })
    })
       //b1-b1-s1
        $('#b1-q1-button1').click(function (){
            $('#b1-q1').fadeOut(500, function (){
                $('#b1-b1-s1').fadeIn(500, function (){
                    $('#b1-b1-s1').show();
                })
            })
        })
       //b1-b1-s2
        $('#b1-b1-continuebutton').click(function (){
            $('#b1-b1-s1').fadeOut(500, function (){
                $('#b1-b1-s2').fadeIn(500, function (){
                    $('#b1-b1-s2').show();
                })
            })
        })
       //b1-b1-q1
        $('#b1-b1-continuebutton2').click(function (){
            $('#b1-b1-s2').fadeOut(500, function (){
                $('#b1-b1-q1').fadeIn(500, function (){
                    $('#b1-b1-q1').show();
                })
            })
        })
            //b1-b1-b1-s1
            $('#b1-b1-q1-button1').click(function (){
                $('#b1-b1-q1').fadeOut(500, function (){
                    $('#b1-b1-b1-s1').fadeIn(500, function (){
                        $('#b1-b1-b1-s1').show();
                    })
                })
            })
            //b1-b1-b2-s1
            $('#b1-b1-q1-button2').click(function (){
            $('#b1-b1-q1').fadeOut(500, function (){
                $('#b1-b1-b2-s1').fadeIn(500, function (){
                    $('#b1-b1-b2-s1').show();
                })
            })
        })
            //b1-b1-b2-s2
            $('#b1-b1-b2-s1-continuebutton').click(function (){
                $('#b1-b1-b2-s1').fadeOut(500, function (){
                    $('#b1-b1-b2-s2').fadeIn(500, function (){
                        $('#b1-b1-b2-s2').show();
                    })
                })
            })
            //b1-b1-b1-e1
            $('#restart').click(function (){
                $('#b1-b1-b1-s1').fadeOut(500, function (){
                    $('#mb-s1').fadeIn(500, function (){
                        $('#mb-s1').show();
                    })
                })
            })
            //b1-b1-b2-e1
            $('#restart2').click(function (){
                $('#b1-b1-b2-s2').fadeOut(500, function (){
                    $('#mb-s1').fadeIn(500, function (){
                        $('#mb-s1').show();
                    })
                })
            })
                //b1-b2-s1
                $('#b1-q1-button2').click(function (){
                    $('#b1-q1').fadeOut(500, function (){
                        $('#b1-b2-s1').fadeIn(500, function (){
                            $('#b1-b2-s1').show();
                        })
                    })
                })
                //b1-b2-e1
                $('#restart3').click(function (){
                    $('#b1-b2-s1').fadeOut(500, function (){
                        $('#mb-s1').fadeIn(500, function (){
                            $('#mb-s1').show();
                        })
                    })
                })
                    //b1-b3-s1
                    $('#b1-q1-button3').click(function (){
                        $('#b1-q1').fadeOut(500, function (){
                            $('#b1-b3-s1').fadeIn(500, function (){
                                $('#b1-b3-s1').show();
                            })
                        })
                    })
                    //b1-b3-transfer
                    $('#b1-b3-s1-transfer').click(function (){
                        $('#b1-b3-s1').fadeOut(500, function (){
                            $('#b1-b1-s2').fadeIn(500, function (){
                                $('#b1-b3-s2').show();
                            })
                        })
                    })