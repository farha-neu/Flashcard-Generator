var inquirer = require("inquirer");

var ClozeCard = function(text,cloze){
    this.text = text;  //full text
    this.cloze = cloze;  //only right answer
    if(this.text.search(cloze)===-1){
      console.log("Error occured");
    }
    else{
      this.partial = this.text.replace(cloze, "____________"); 
    }    
}

module.exports = ClozeCard;