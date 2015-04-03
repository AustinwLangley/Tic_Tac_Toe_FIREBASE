angular
    .module("tictactoeApp")
    .controller("TictactoeController", TictactoeController);

    TictactoeController.$inject = ['$firebaseObject'];

    function TictactoeController($firebaseObject){
        var self = this;
        var playerTurn = "one";

        self.game = syncGameWithFirebase();
        self.playerMove = playerMove; //sets playerMove()function as a property of the controller
        self.playerOneTurn = playerOneTurn;
        self.playerTwoTurn = playerTwoTurn;
        // self.winner = "";

        function syncGameWithFirebase(){
            var ref = new Firebase('https://tictactoewdi.firebaseio.com/');
            var gameObject = $firebaseObject(ref);

		   //initialize values in the gameObject once it's loaded..."Promise"
            gameObject.$loaded(function(){
                gameObject.score = 0;
                gameObject.squares = [];
                gameObject.winner = "";
                //populates array values
                for(var i = 0; i < 9; i++){
                    gameObject.squares.push({image:"", hasPlayer: false, playerOne: false, playerTwo: false});
           		} //closes for-loop
                gameObject.$save();  //Synchronizes local game changes back to the Firebase server.
                
                // changeValueInFirebase();
            
            }); // closes loaded function
            return gameObject;
        }//closes the syncGameWithFirebase function

        // function changeValueInFirebase(){
        //         self.game.squares[3].hasPlayer = true;
        //         self.game.$save();  
        // }

        function playerMove($index){
                if (self.game.winner === ""){ //this condition will allow the game to end once 
                                         // a winner is declared. So no more moves can be played.
                    if (playerTurn === "one"){
                        playerOneTurn($index);
                    }
                    else {
                        playerTwoTurn($index);
                    }
                }
            };
        function playerOneTurn($index){
                if (self.game.squares[$index].hasPlayer === false){
                    self.game.squares[$index].image = "./Tic_Tac_Toe_Images/x.png"  
                    self.game.squares[$index].hasPlayer = true;
                    self.game.squares[$index].playerOne = true;
                    playerTurn = "two";
                    winnerCheck();
                    self.game.$save();
                    return playerTurn;
                }
            };   
        function playerTwoTurn($index){
                if (self.game.squares[$index].hasPlayer === false){
                    self.game.squares[$index].image= "./Tic_Tac_Toe_Images/o.png" 
                    self.game.squares[$index].hasPlayer = true;
                    self.game.squares[$index].playerTwo = true;
                    playerTurn = "one"
                    winnerCheck();
                    self.game.$save();
                    return playerTurn;
                }           
            }; 
function winnerCheck(){
                if (self.game.squares[0].playerOne === true && self.game.squares[1].playerOne === true && self.game.squares[2].playerOne === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two")
                {
                    self.game.winner = "The Winner is player one";
                }
                if 
                   (self.game.squares[3].playerOne === true && self.game.squares[4].playerOne === true &&self.game.squares[5].playerOne === true && self.game.winner!== "The Winner is player one" && self.game.winner !== "The Winner is player two")
                {
                    self.game.winner = "The Winner is player one";
                }
                if  
                    (self.game.squares[6].playerOne === true && self.game.squares[7].playerOne === true && self.game.squares[8].playerOne === true && self.game.winner!== "The Winner is player one" && self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player one";
                }
                if  
                    (self.game.squares[0].playerOne === true && self.game.squares[3].playerOne === true && self.game.squares[6].playerOne === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player one";
                }
                if  
                    (self.game.squares[1].playerOne === true && self.game.squares[4].playerOne === true && self.game.squares[7].playerOne === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player one";
                }
                if  
                    (self.game.squares[2].playerOne === true && self.game.squares[5].playerOne === true && self.game.squares[8].playerOne === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player one";
                }
                if  
                    (self.game.squares[0].playerOne === true && self.game.squares[4].playerOne === true && self.game.squares[8].playerOne === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player one";
                }
                if  
                    (self.game.squares[6].playerOne === true && self.game.squares[4].playerOne === true && self.game.squares[2].playerOne === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player one";
                }


                if (self.game.squares[0].playerTwo === true && self.game.squares[1].playerTwo === true && self.game.squares[2].playerTwo === true && self.game.winner !== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player two";
                }
                if 
                   (self.game.squares[3].playerTwo === true && self.game.squares[4].playerTwo === true && self.game.squares[5].playerTwo === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player two";
                }
                if  
                    (self.game.squares[6].playerTwo === true && self.game.squares[7].playerTwo === true && self.game.squares[8].playerTwo === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player two";

                }
                if  
                    (self.game.squares[0].playerTwo === true && self.game.squares[3].playerTwo === true && self.game.squares[6].playerTwo === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player two";
                }
                if  
                    (self.game.squares[1].playerTwo === true && self.game.squares[4].playerTwo === true && self.game.squares[7].playerTwo === true && self.game.winner !== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player two";
                }
                if  
                    (self.game.squares[2].playerTwo === true && self.game.squares[5].playerTwo === true && self.game.squares[8].playerTwo === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player two";
                }
                if  
                    (self.game.squares[0].playerTwo === true && self.game.squares[4].playerTwo === true && self.game.squares[8].playerTwo === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player two";
                }
                if  
                    (self.game.squares[6].playerTwo === true && self.game.squares[4].playerTwo === true && self.game.squares[2].playerTwo === true && self.game.winner !== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player two";
                }

                if ((self.game.squares[0].hasPlayer === true) &&
                    (self.game.squares[1].hasPlayer === true) &&
                    (self.game.squares[2].hasPlayer === true) &&
                    (self.game.squares[3].hasPlayer === true) &&
                    (self.game.squares[4].hasPlayer === true) &&
                    (self.game.squares[5].hasPlayer === true) &&
                    (self.game.squares[6].hasPlayer === true) && 
                    (self.game.squares[7].hasPlayer === true) &&
                    (self.game.squares[8].hasPlayer === true) &&
                    (self.game.winner !== "The Winner is player one") &&
                    (self.game.winner !== "The Winner is player two")){
                    self.game.winner = "Cat's game";
                }
            } //close winnerCheck function

    }//closes the controller


        
