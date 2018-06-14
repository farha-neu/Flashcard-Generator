var inquirer = require("inquirer");
var chalkPipe = require("chalk-pipe");
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");

//10 GK question objects - basic and cloze cards combined
var firstQ = new BasicCard("Which is the biggest state in United States?","Alaska");
var secondQ = new ClozeCard("The Mt. Rushmore Monument is in South Dakota(state).","South Dakota");
var thirdQ = new ClozeCard("The USA is a federal union of 50(number) independent states.","50");
var fourthQ = new BasicCard("Which is the most recent state to join the union?","Hawaii");
var fifthQ = new ClozeCard("George Washington was the first president of USA.","George Washington");
var sixthQ = new BasicCard("Who was the second person to walk on the moon?","Buzz Aldrin");
var seventhQ = new ClozeCard("The smallest state in the USA in terms of area is Rhode Island.","Rhode Island");
var eighthQ = new ClozeCard("Abraham Lincoln was the first president to free the slaves.","Abraham Lincoln");
var ninethQ = new BasicCard("In which year, the declaration of independence of USA was signed?","1776");
var tenthQ = new ClozeCard("Pearl Harbor attack occured in the year of 1941.","1941");


var questionArray = [firstQ,secondQ,thirdQ,fourthQ,fifthQ,sixthQ,seventhQ,eighthQ,ninethQ,tenthQ];

// randomly generate questions 
function randomQuestionGenerator(){
    questionArray = questionArray.sort(function() { return 0.5 - Math.random() });
}

//question array index
var i = 0;
//number of cards mastered
var mastered = 0;

function askQuestion(answer){
    var questions = [
        {
          type: 'input',
          name: 'answer',
          message: displayQuestion(questionArray[i]),
          validate: function(input){
              if(input) {
                return true;
              }
              return "Please enter your answer";
          }
        }
      ];     
      inquirer.prompt(questions).then(answers => {
        if(answers["answer"].toLowerCase()===answer.toLowerCase()){
            console.log(chalkPipe('green')("\nYou are correct!\n"));
            mastered++;
            console.log("*Cards mastered: "+ mastered+"/"+questionArray.length+"*\n");
            recall();
        }
        else{
            console.log(chalkPipe('red')("\nWrong Answer!\n"));
            console.log("*Cards mastered: "+ mastered+"/"+questionArray.length+"*\n");
            promptAfterWrongAns(answer);
        }
      });
}

function promptAfterWrongAns(answer){
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
            console.log(chalkPipe('orange')("\nCorrect Answer: "+answer+"\n"));
            console.log("*Cards mastered: "+ mastered+"/"+questionArray.length+"*\n");
            recall();
            
        }
        else{
            askQuestion(answer);          
        }
    });
}

function recall(){
        i++;
        if(i < questionArray.length){
            checkObjectInstance(i);
        }
        else{
            if(mastered === questionArray.length){
                console.log(chalkPipe('green')("WELL DONE!!\nYou just mastered all "+questionArray.length+" cards!"));
            }
            else{
                console.log("Nice Work!\nYou just studied "+questionArray.length+" cards");
            }
            console.log("\n");
            gameOverPrompt();

        }
}

function gameOverPrompt(){
    inquirer
            .prompt([
                {
                type: 'list',
                name: 'next',
                message: 'What do you want to do next?',
                choices: [
                    'Shuffle and Start Over',
                    'Exit'
                ]}
           ])
            .then(answers => {
                if(answers.next === "Shuffle and Start Over"){
                    i=0;
                    mastered = 0;
                    randomQuestionGenerator();
                    checkObjectInstance(i);       
                }
                else{
                    console.log("See you!");
                    return;   
                }
            });
}

//generate questions randomly
randomQuestionGenerator();
//ask first question
checkObjectInstance(0);

function checkObjectInstance(i){
    if(i===0){
        console.log("\n~~~~~~~~~~Flash Cards on US General Knowledge~~~~~~~~~~\n");
    }
    if(questionArray[i] instanceof BasicCard){
        askQuestion(questionArray[i].back);
    }
    else{
        askQuestion(questionArray[i].cloze); 
    }
}

function displayQuestion(question){
    var text = "";
    if(question instanceof ClozeCard){
        text = "Question "+(i+1)+". "+question.partial;
    }
    else{
        text = "Question "+(i+1)+". "+question.front;
    }
    var separator = "";
    for(var j = 0; j < text.length; j++){
        separator+=chalkPipe('magentaBright')("-");
    }
    text = separator+"\n"+text+"\n"+separator+chalkPipe('magentaBright')("--")+"\nType your answer: ";
    return text;
}