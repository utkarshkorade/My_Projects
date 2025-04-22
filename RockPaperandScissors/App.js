let userScore=0;
let compScore=0;

const choices= document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");

const genCompChoice=()=>{
    const options=["rock","paper","scissors"];
        //rock,paper,scissors
       const randIdx= Math.floor(Math.random()*3);
       return options[randIdx];
}
const drawGame=()=>{
    console.log("Game was Draw !!");
    msg.innerText="Game was Draw Play Again....";
    msg.style.backgroundColor= "#081b31";
}

const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        console.log("YOU WIN");
        msg.innerText=`Heyyyy You Win! Your ${userChoice} beats ${compChoice} `
        msg.style.backgroundColor="green";
    }else{
        compScore++;
        compScorePara.innerText=compScore;
        console.log("Computer Win");
        msg.innerText=`SORRY ! YOU LOSE ${compChoice} beats Your ${userChoice} `;
        msg.style.backgroundColor="red";
    }
}

const playGame=(userChoice)=>{

    console.log("user choice = ",userChoice);
    // generate computer choice
    const compChoice=genCompChoice();
    console.log("comp choice = ",compChoice);

    if(userChoice === compChoice){
        //draw game
        drawGame();
    }else{
        let userWin=true;
        if(userChoice === "rock"){
        // soremainning choices of computer are paper and scissor
        userWin = compChoice === "paper" ? false : true;
        }else if(userChoice === "paper"){
            //computer choices are rock and scissore
            userWin= compChoice === "scissors" ? false : true;
        }else{
            //computer choice  rock or paper
            userWin= compChoice === "rock" ? false :true;
        }
        showWinner(userWin,userChoice,compChoice);
    }

};

choices.forEach((choice)=>{
    // console.log(choice);
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id"); // to get id of the choice class which you give in index.html
        
        // console.log("choice was clicked",userChoice);
        playGame(userChoice);
    });
});
