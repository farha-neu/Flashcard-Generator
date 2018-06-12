var inquirer = require("inquirer");
var chalkPipe = require("chalk-pipe");
var BasicCard = require("./BasicCard");

var firstQ = new BasicCard("What's the git command that downloads your repository from GitHub to your computer?","git clone");
var secondQ = new BasicCard("What's the opposite of git clone, instead of downloading your code from GitHub, uploads your changes and code back to GitHub?","git push");
var thirdQ = new BasicCard("How do you check the state of your local git repository since your last commit?","git status");
var fourthQ = new BasicCard("How do you stage files for a commit?","git add");
var fifthQ = new BasicCard("How do you save the current state of your code into the git version control?","git commit");
var sixthQ = new BasicCard("What's a shortcut to staging all the changes you have?","git add .");
var seventhQ = new BasicCard("How do you supply a commit message to a commit?","git commit -m \"I\'m coding\"");
var eighthQ = new BasicCard("What comes first, staging with git add . or committing with git commit?","staging");
var ninethQ = new BasicCard("We've just created a new file called index.html. Which of the following will stage this one file so we can commit it?","git add index.html");
var tenthQ = new BasicCard("Which command will stage your entire directory and every non-empty directory inside your current directory?","git add .");

// console.log(firstQ.front);
// console.log(firstQ.back);

// firstQ.askQuestion();

var questionArray = [firstQ,secondQ,thirdQ,fourthQ,fifthQ,sixthQ,seventhQ,eighthQ,ninethQ,tenthQ];

var i = 0;

function askQuestion(front,back){
    var questions = [
        {
          type: 'input',
          name: 'answer',
          message: front
        }
      ];
      
      inquirer.prompt(questions).then(answers => {
        if(answers["answer"]===back){
            console.log("Correct!");
            recall();
        }
        else{
            console.log("Sorry wrong");
            inquirer
            .prompt([
                {
                type: 'list',
                name: 'nextActivity',
                message: 'What do you want to do?',
                choices: [
                    'Try again',
                    'Flip the card'
                ]}
           ])
            .then(answers => {
                //console.log(JSON.stringify(answers, null, '  '));
                if(answers.nextActivity === "Flip the card"){
                    console.log("Correct answer: "+back);
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
        askQuestion(questionArray[i].front,questionArray[i].back);
    
}
askQuestion(questionArray[0].front,questionArray[0].back);