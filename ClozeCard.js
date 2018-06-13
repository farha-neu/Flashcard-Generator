var inquirer = require("inquirer");

var ClozeCard = function(text,cloze){
    this.text = text;  //full text
    this.cloze = cloze;  //only right answer

    this.search = function(){
        this.cloze = text.replace(cloze, "____________");  //partial text with .....
        return this.cloze;
    }
}

module.exports = ClozeCard;