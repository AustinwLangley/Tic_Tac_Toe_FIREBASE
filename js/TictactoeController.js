angular
    .module("tictactoeApp")
    .controller("TictactoeController", TictactoeController);

    TictactoeController.$inject = ['$firebaseObject'];

    function TictactoeController($firebaseObject){
        var self = this;
        //This function call initiates the game
        self.game = syncGameWithFirebase(); 
        //sets functions as properties of the controller
        self.playerMove = playerMove; 
        self.playerOneTurn = playerOneTurn;
        self.playerTwoTurn = playerTwoTurn;
        //sets variables as properties of the controller
        self.resetScore = resetScore;
        self.resetGame = resetGame;
        
        function syncGameWithFirebase(){
            var ref = new Firebase('https://tictactoewdi.firebaseio.com/');
            var gameObject = $firebaseObject(ref);

		   //initialize values in the gameObject once it's loaded..."Promise"
            gameObject.$loaded(function(){
                gameObject.squares = [];
                gameObject.winner = "";
                gameObject.playerTurn = "one";
                gameObject.showWinner = false;
                gameObject.playerOneWinnerCount = 0;
                gameObject.playerTwoWinnerCount = 0;

                //populates array values
                for(var i = 0; i < 9; i++){
                    gameObject.squares.push({image:"", hasPlayer: false, playerOne: false, playerTwo: false});
           		} //closes for-loop
                gameObject.$save();  //synchronizes local game changes back to the Firebase server.
            }); // closes $loaded function
            return gameObject;
        }//closes the syncGameWithFirebase function

        //this function executes when a click is detected on a square
        function playerMove($index){
                //the following condition will allow the game to end once a winner is declared. So no more moves can be played.
                if (self.game.winner === ""){ 
                    if (self.game.playerTurn === "one"){
                        playerOneTurn($index);
                    }
                    else {
                        playerTwoTurn($index);
                    }
                }
        };
        //This function executes if it is player one's turn
        function playerOneTurn($index){
                if (self.game.squares[$index].hasPlayer === false){
                    self.game.squares[$index].image = "./Tic_Tac_Toe_Images/Zealot_small.jpg"  
                    self.game.squares[$index].hasPlayer = true;
                    self.game.squares[$index].playerOne = true;
                    self.game.playerTurn = "two";
                    winnerCheck();
                if (self.game.winner === "The Winner is player one"){
                    self.game.playerOneWinnerCount ++; 
                }
                if (self.game.winner === "The Winner is player two"){
                    self.game.playerTwoWinnerCount ++; 
                }
                if (self.game.winner === "The Winner is player one" || 
                    self.game.winner === "The Winner is player two" || 
                    self.game.winner === "Cat's game"){
                    self.game.showWinner = true;
                }
                    self.game.$save(); //synchronizes local game changes back to the Firebase server.
                }
        };   
        //this function executes if it is player two's turn
        function playerTwoTurn($index){
                if (self.game.squares[$index].hasPlayer === false){
                    self.game.squares[$index].image = "./Tic_Tac_Toe_Images/marauder_small.jpg" 
                    self.game.squares[$index].hasPlayer = true;
                    self.game.squares[$index].playerTwo = true;
                    self.game.playerTurn = "one"
                    winnerCheck();
                    if (self.game.winner === "The Winner is player one"){
                        self.game.playerOneWinnerCount ++; 
                    }
                    if (self.game.winner === "The Winner is player two"){
                        self.game.playerTwoWinnerCount ++; 
                    }
                    if (self.game.winner === "The Winner is player one" || 
                        self.game.winner === "The Winner is player two" || 
                        self.game.winner === "Cat's game"){
                        self.game.showWinner = true;
                    }
                    self.game.$save(); //synchronizes local game changes back to the Firebase server.
                }           
            }; 
        //This function executes if the reset score button is clicked.  It resets the score board.
        function resetScore(){
                self.game.playerOneWinnerCount = 0;
                self.game.playerTwoWinnerCount = 0;
                self.game.$save();
        }
        //This function executes if the play again button is clicked.  It resets the game board to false values and player turn to player one.
        function resetGame(){
                self.game.showWinner = false;
                self.game.winner = "";
                self.game.playerTurn = "one";
                for(var i = 0; i < 9; i++){
                    self.game.squares[i].hasPlayer = false;
                    self.game.squares[i].image = "" ;
                    self.game.squares[i].hasPlayer = false;
                    self.game.squares[i].playerOne = false;
                    self.game.squares[i].playerTwo = false;
                } //closes for-loop
                self.game.$save(); //synchronizes local game changes back to the Firebase server.
        }

        //This function runs after every player turn to see if a winner can be declared.
        function winnerCheck(){
                if (self.game.squares[0].playerOne === true && self.game.squares[1].playerOne === true && self.game.squares[2].playerOne === true && self.game.winner!== "The Winner is player one" &&
                    self.game.winner !== "The Winner is player two"){
                    self.game.winner = "The Winner is player one";
                }
                if 
                   (self.game.squares[3].playerOne === true && self.game.squares[4].playerOne === true &&self.game.squares[5].playerOne === true && self.game.winner!== "The Winner is player one" && self.game.winner !== "The Winner is player two"){
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


        
