/* ************************************ Template for progressing story board ******************************************


$('#').click(function (){
    $('#').fadeOut(500, function (){
        $('#').fadeIn(500, function (){
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
    //alert('The place is here, the time is now...');
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
    //Branch 1
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
    /************************************* Template for progressing story board ******************************************
    $('#').click(function (){
        $('#').fadeOut(500, function (){
            $('#').fadeIn(500, function (){
                $('#').show();
            })
        })
    })
    */
    //Branch 2
    //b2-q1
    $('#b2-button').click(function (){
        $('#mb-q1').fadeOut(500, function (){
            $('#b2-q1').fadeIn(500, function (){
                $('#b2-q1').show();
            })
        })
    })
        //b2-b1 transfer
        $('#b2-q1-button1').click(function (){
            $('#b2-q1').fadeOut(500, function (){
                $('#b1-q1').fadeIn(500, function (){
                    $('#b1-q1').show();
                })
            })
        })
            //b2-b2-s1
            $('#b2-q1-button2').click(function (){
                $('#b2-q1').fadeOut(500, function (){
                    $('#b2-b2-s1').fadeIn(500, function (){
                        $('#b2-b2-s1').show();
                    })
                })
            })
            //b2-b2-q1
            $('#b2-b2-s1-continuebutton').click(function (){
                $('#b2-b2-s1').fadeOut(500, function (){
                    $('#b2-b2-q1').fadeIn(500, function (){
                        $('#b2-b2-q1').show();
                    })
                })
            })
                //b2-b2-b1-s1
                $('#b2-b2-q1-button1').click(function (){
                    $('#b2-b2-q1').fadeOut(500, function (){
                        $('#b2-b2-b1-s1').fadeIn(500, function (){
                            $('#b2-b2-b1-s1').show();
                        })
                    })
                })
                //b2-b2-b1-b3-e1
                $('#b2-b2-b1-q1-button3').click(function (){
                    $('#b2-b2-b1-q1').fadeOut(500, function (){
                        $('#b2-b2-b1-b3-e1').fadeIn(500, function (){
                            $('#b2-b2-b1-b3-e1').show();
                        })
                    })
                })
                $('#restart10').click(function (){
                    $('#b2-b2-b1-b3-e1').fadeOut(500, function (){
                        $('#mb-s1').fadeIn(500, function (){
                            $('#mb-s1').show();
                        })
                    })
                })
                //b2-b2-b1-s2
                $('#b2-b2-b1-s1-continue').click(function (){
                    $('#b2-b2-b1-s1').fadeOut(500, function (){
                        $('#b2-b2-b1-s2').fadeIn(500, function (){
                            $('#b2-b2-b1-s2').show();
                        })
                    })
                })
                //b2-b2-b1-s3
                $('#b2-b2-b1-s2-continue').click(function (){
                    $('#b2-b2-b1-s2').fadeOut(500, function (){
                        $('#b2-b2-b1-s3').fadeIn(500, function (){
                            $('#b2-b2-b1-s3').show();
                        })
                    })
                })
                //b2-b2-b1-q1
                $('#b2-b2-b1-s3-continue').click(function (){
                    $('#b2-b2-b1-s3').fadeOut(500, function (){
                        $('#b2-b2-b1-q1').fadeIn(500, function (){
                            $('#b2-b2-b1-q1').show();
                        })
                    })
                })
                    //b2-b2-b1-b1-e1
                    $('#b2-b2-b1-q1-button1').click(function (){
                        $('#b2-b2-b1-q1').fadeOut(500, function (){
                            $('#b2-b2-b1-b1-e1').fadeIn(500, function (){
                                $('#b2-b2-b1-b1-e1').show();
                            })
                        })
                    })
                    $('#restart4').click(function (){
                        $('#b2-b2-b1-b1-e1').fadeOut(500, function (){
                            $('#mb-s1').fadeIn(500, function (){
                                $('#mb-s1').show();
                            })
                        })
                    })
                    //b2-b2-b1-b2-e2 
                    $('#b2-b2-b1-q1-button2').click(function (){
                        $('#b2-b2-b1-q1').fadeOut(500, function (){
                            $('#b2-b2-b1-b2-q1').fadeIn(500, function (){
                                $('#b2-b2-b1-b2-q1').show();
                            })
                        })
                    })
                    $('#restart5').click(function (){
                        $('#b2-b2-b1-b2-q1').fadeOut(function (){
                            $('#mb-s1').fadeIn(1500, function (){
                                $('#mb-s1').show();
                            })
                        })
                    })
                    //b2-b2-b1-b1-e2
                    $('#b2-b2-b1-b2-q1-button2').click(function (){
                        $('#b2-b2-b1-b2-q1').fadeOut(500, function (){
                            $('#b2-b2-b1-b1-e2').fadeIn(500, function (){
                                $('#b2-b2-b1-b1-e2').show();
                            })
                        })
                    })
                    $('#restart6').click(function (){
                        $('#b2-b2-b1-b1-e2').fadeOut(function (){
                            $('#mb-s1').fadeIn(1500, function (){
                                $('#mb-s1').show();
                            })
                        })
                    })
            //b2-b2-b2-e1
            $('#b2-b2-q1-button2').click(function (){
                $('#b2-b2-q1').fadeOut(500, function (){
                    $('#b2-b2-b2-e1').fadeIn(500, function (){
                        $('#b2-b2-b2-e1').show();
                    })
                })
            })
            $('#restart7').click(function (){
                $('#b2-b2-b2-e1').fadeOut(function (){
                    $('#mb-s1').fadeIn(1500, function (){
                        $('#mb-s1').show();
                    })
                })
            })
            //b2-b2-b3-q1
            $('#b2-b2-q1-button3').click(function (){
                $('#b2-b2-q1').fadeOut(500, function (){
                    $('#b2-b2-b3-q1').fadeIn(500, function (){
                        $('#b2-b2-b3-q1').show();
                    })
                })
            })
                //b2-b2-b3-e1
                $('#b2-b2-b3-q1-button1').click(function (){
                    $('#b2-b2-b3-q1').fadeOut(500, function (){
                        $('#b2-b2-b3-e1').fadeIn(500, function (){
                            $('#b2-b2-b3-e1').show();
                        })
                    })
                })
                $('#restart8').click(function (){
                    $('#b2-b2-b3-e1').fadeOut(function (){
                        $('#mb-s1').fadeIn(1500, function (){
                            $('#mb-s1').show();
                        })
                    })
                })
                //b2-b2-b3-e2
                $('#b2-b2-b3-q1-button2').click(function (){
                    $('#b2-b2-b3-q1').fadeOut(500, function (){
                        $('#b2-b2-b3-e2').fadeIn(500, function (){
                            $('#b2-b2-b3-e2').show();
                        })
                    })
                })
                $('#restart9').click(function (){
                    $('#b2-b2-b3-e2').fadeOut(function (){
                        $('#mb-s1').fadeIn(1500, function (){
                            $('#mb-s1').show();
                        })
                    })
                })
            //b2-b3-e1
            $('#b2-q1-button3').click(function (){
                $('#b2-q1').fadeOut(500, function (){
                    $('#b2-b3-e1').fadeIn(500, function (){
                        $('#b2-b3-e1').show();
                    })
                })
            })
            $('#restart11').click(function (){
                $('#b2-b3-e1').fadeOut(function (){
                    $('#mb-s1').fadeIn(1500, function (){
                        $('#mb-s1').show();
                    })
                })
            })
            /************************************* Template for progressing story board ******************************************
    $('#').click(function (){
        $('#').fadeOut(500, function (){
            $('#').fadeIn(500, function (){
                $('#').show();
            })
        })
    })
    */
    //Branch 3
    //b3-s1
    $('#b3-button').click(function (){
        $('#mb-q1').fadeOut(500, function (){
            $('#b3-s1').fadeIn(500, function (){
                $('#b3-s1').show();
            })
        })
    })
    //b3-q1
    $('#b3-s1-button1').click(function (){
        $('#b3-s1').fadeOut(500, function (){
            $('#b3-q1').fadeIn(500, function (){
                $('#b3-q1').show();
            })
        })
    })
        //b3-b1-e1
        $('#b3-q1-button1').click(function (){
            $('#b3-q1').fadeOut(500, function (){
                $('#b3-b1-e1').fadeIn(500, function (){
                    $('#b3-b1-e1').show();
                })
            })
        })
        $('#restart12').click(function (){
            $('#b3-b1-e1').fadeOut(500, function (){
                $('#mb-q1').fadeIn(500, function (){
                    $('#mbq1').show();
                })
            })
        })
        //b3-b2 tranfer mb-s1
        $('#b3-q1-button2').click(function (){
            $('#b3-q1').fadeOut(500, function (){
                $('#mb-q1').fadeIn(500, function (){
                    $('#mb-q1').show();
                })
            })
        })
/************************************* Template for progressing story board ******************************************
    $('#').click(function (){
        $('#').fadeOut(500, function (){
            $('#').fadeIn(500, function (){
                $('#').show();
            })
        })
    })
    */
        //Branch Four
        $('#b4-button').click(function (){
            $('#mb-q1').fadeOut(500, function (){
                $('#b4-q1').fadeIn(500, function (){
                    $('#b4-q1').show();
                })
            })
        })
            //b4-b1-q1
            $('#b4-button1').click(function (){
                $('#b4-q1').fadeOut(500, function (){
                    $('#b4-b1-q1').fadeIn(500, function (){
                        $('#b4-b1-q1').show();
                    })
                })
            })
            //b4-b1-e1
            $('#b4-q1-button1').click(function (){
                $('#b4-b1-q1').fadeOut(500, function (){
                    $('#b4-b1-e1').fadeIn(500, function (){
                        $('#b4-b1-e1').show();
                    })
                })
            })
            //restart
            $('#restart13').click(function (){
                $('#b4-b1-e1').fadeOut(500, function (){
                    $('#mb-s1').fadeIn(500, function (){
                        $('#mb-s1').show();
                    })
                })
            })
            //b4-b1-b2
            $('#b4-q1-button2').click(function (){
                $('#b4-b1-q1').fadeOut(500, function (){
                    $('#b4-b2-e1').fadeIn(500, function (){
                        $('#b4-b2-e1').show();
                    })
                })
            })
             //b4-b2-e1
             $('#b4-button2').click(function (){
                $('#b4-q1').fadeOut(500, function (){
                    $('#b4-b2-e1').fadeIn(500, function (){
                        $('#b4-b2-e1').show();
                    })
                })
            })
             $('#restart14').click(function (){
                $('#b4-b2-e1').fadeOut(500, function (){
                    $('#mb-s1').fadeIn(500, function (){
                        $('#mb-s1').show();
                    })
                })
            })
        console.log("End Load")