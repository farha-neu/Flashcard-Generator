var inquirer = require("inquirer");
var chalkPipe = require("chalk-pipe");
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");

//10 question objects - basic and cloze cards combined
var firstQ = new BasicCard("Which is the biggest state in United States?","Alaska");
var secondQ = new ClozeCard("The Mt. Rushmore Monument is in South Dakota","South Dakota");
var thirdQ = new ClozeCard("The USA is a federal union of 50(number) independent states","50");
var fourthQ = new BasicCard("Which is the most recent state to join the union was?","Hawaii");
var fifthQ = new ClozeCard("George Washington was the first president of USA","George Washington");
var sixthQ = new BasicCard("Who was the second person to walk on the moon?","Buzz Aldrin");
var seventhQ = new ClozeCard("The smallest city in the USA in terms of area is Rhode Island","Rhode Island");
var eighthQ = new ClozeCard("You can visit Monument Valley in Arizona.","Arizona");
var ninethQ = new BasicCard("In which year, the declaration of independence of USA was signed?","1776");
var tenthQ = new ClozeCard("Pearl Harbor attack occured in the year of 1941","1941");


var questionArray = [firstQ,secondQ,thirdQ,fourthQ,fifthQ,sixthQ,seventhQ,eighthQ,ninethQ,tenthQ];

// randomly generate questions 
function randomQuestionGenerator(){
    questionArray = questionArray.sort(function() { return 0.5 - Math.random() });
}

var i = 0;
var mastered = 0;

function askQuestion(front,back){
    var questions = [
        {
          type: 'input',
          name: 'answer',
          message: cau(questionArray[i]),
          validate: function(input){
              if(input) {
                return true;
              }
              return "Please enter your answer";
          }
        }
      ];
      
      inquirer.prompt(questions).then(answers => {
        if(answers["answer"].toLowerCase()===back.toLowerCase()){
            console.log(chalkPipe('green')("\nYou are correct!\n"));
            mastered++;
            console.log("|| Cards mastered: "+ mastered+"/"+questionArray.length+" ||\n");
            recall();
        }
        else{
            console.log(chalkPipe('red')("\nWrong Answer!\n"));
            console.log("|| Cards mastered: "+ mastered+"/"+questionArray.length+" ||\n");
            inquirer
            .prompt([
                {
                type: 'list',
                name: 'nextActivity',
                message: 'Do you want to',
                choices: [
                    'Try again?',
                    'Flip the card?'
                ]}
           ])
            .then(answers => {
                if(answers.nextActivity === "Flip the card?"){
                    console.log(chalkPipe('orange')("\nAnswer: "+back+"\n"));
                    console.log("|| Cards mastered: "+ mastered+"/"+questionArray.length+" ||\n");
                    recall();
                    
                }
                else{
                        askQuestion(front,back);
                    
                    
                }
            });
        }
        


      });
}
function recall(){
        i++;
        if(i < questionArray.length){
            if(questionArray[i] instanceof BasicCard){
                askQuestion(questionArray[i].front,questionArray[i].back);
            }
            else{
                askQuestion(questionArray[i].text,questionArray[i].cloze);
            }  
        }
        else{
            if(mastered === questionArray.length){
                console.log(chalkPipe('green')("WELL DONE!"));
            }
            console.log("\n");
            inquirer
            .prompt([
                {
                type: 'list',
                name: 'next',
                message: 'What do you want to do next?',
                choices: [
                    'Start Over',
                    'Exit'
                ]}
           ])
            .then(answers => {
                //console.log(JSON.stringify(answers, null, '  '));
                if(answers.next === "Start Over"){
                    i=0;
                    mastered = 0;
                    randomQuestionGenerator();
                    if(questionArray[0] instanceof BasicCard){
                        askQuestion(questionArray[0].front,questionArray[0].back);
                    }
                    else{
                        askQuestion(questionArray[0].text,questionArray[0].cloze); 
                    }
                      
                }
                else{
                    console.log("Program Exited");
                    return;   
                }
            });

        }
}
askQuestion(questionArray[0].front,questionArray[0].back);

function cau(ques){
    if(ques instanceof ClozeCard){
        // var text = chalkPipe('magentaBright')("-------------------------------------------------------------------------------------------------------------\n")+
        //                 "Question "+(i+1)+". "+ques.partial+"\n"+
        //                 chalkPipe('magentaBright')("---------------------------------------------------------------------------------------------------------------\n");
        var text3 = "Question "+(i+1)+". "+ques.partial;
        var text2="";
        for(var j = 0; j <text3.length;j++){
            text2+=chalkPipe('magentaBright')("-");
        }
        var text = text2+"\n"+text3+"\n"+text2+chalkPipe('magentaBright')("--")+"\n";
    }
    else{
        var text3 = "Question "+(i+1)+". "+ques.front;
        var text2="";
        for(var j = 0; j <text3.length;j++){
            text2+=chalkPipe('magentaBright')("-");
        }
        var text = text2+"\n"+text3+"\n"+text2+chalkPipe('magentaBright')("--")+"\n";
      
    }
    return text+"Type your answer: ";
}