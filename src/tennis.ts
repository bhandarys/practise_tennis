const gameInterval = .5;
const sets = 3;
const minsets = Math.ceil(sets/2);
let interval = Math.random() * gameInterval * 1000;

let players = [{
    name: "Player 1",
    sets: 0,
    games: 0,
    points: "0",
    serve: false
},
{
    name: "Player 2",
    sets: 0,
    games: 0,
    points: "0",
    serve: false
}]
let serve = Math.round(Math.random());
players[serve].serve = true;

const addElement = (id: string, val: string) => document.getElementById(id).innerHTML = val;

addElement('player1', `${players[0].name}`);
addElement('player2', `${players[1].name}`);

if(players[0].serve) {
    document.getElementById("player1").style.fontWeight = "bold";
    document.getElementById("player2").style.fontWeight = "normal";
} else{
    document.getElementById("player1").style.fontWeight = "normal";
    document.getElementById("player2").style.fontWeight = "bold";
}
document.getElementById("score1").innerHTML = `${players[0].sets}:${players[0].games}:${players[0].points}`;
document.getElementById("score2").innerHTML = `${players[1].sets}:${players[1].games}:${players[1].points}`;

let time = 0;
let match = 0;
document.getElementById("timmer").innerHTML = time.toString();
document.getElementById("matcher").innerHTML = new Date(match * 1000).toISOString().substr(11, 8);

const mi = setInterval(() => {
    time++;
    document.getElementById("timmer").innerHTML = time.toString();    
    match++;
    document.getElementById("matcher").innerHTML = new Date(match * 1000).toISOString().substr(11, 8);
}, 1000)

function addGames(players: any, winner: number) {
    let other = winner == 0 ? 1 : 0;
    players[winner].games++;
    players[winner].serve = !players[winner].serve;
    players[other].serve = !players[other].serve;

    if(players[winner].games >= 6 && (players[winner].games - players[other].games) >= 2) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(`${players[winner].name} wins ${players[winner].games}-${players[other].games}`);
        node.appendChild(textnode);
        document.getElementById("sets").appendChild(node);

        players[winner].games = 0;
        players[other].games = 0;
        players[winner].sets++;

        if(players[winner].sets == minsets) {
            clearInterval(mi);
            clearInterval(si);
            document.getElementById("winner").innerHTML = `Winner is ${players[winner].name}`;
        }
    }
}
function addToString(str: string, points: number) {
    let num = +str;
    num += points;
    return num.toString();
}
function addPoints(players: any, winner: number) {
    switch(players[winner].points) {
        case "0": {
            players[winner].points = addToString(players[winner].points, 15);
            break;
        }
        case "15": {
            players[winner].points = addToString(players[winner].points, 15);
            break;
        }
        case "30": {

            let other = winner == 0 ? 1 : 0;

            if(players[other].points == "40") {
                players[other].points = "D";
                players[winner].points = "D";
            } else {
                players[winner].points = addToString(players[winner].points, 10);
            }
            break;
        }
        case "40": {

            addGames(players, winner);
            let other = winner == 0 ? 1 : 0;
            players[winner].points = "0";
            players[other].points = "0";
            break;
        }
        case "D": {
            let other = winner == 0 ? 1 : 0;
            if(players[other].points == "A") {
                players[other].points = "D";
            } else {
                players[winner].points = "A";
            }
            break;
        }
        case "A": {
            players[winner].points = "0";
            addGames(players, winner);
            let other = winner == 0 ? 1 : 0;
            players[other].points = "0";
            break;
        }
    }
}


const si = setInterval(() => {
    
    let interval = Math.round(Math.random() * gameInterval * 1000);
    let winner = Math.round(Math.random());
    addPoints(players, winner);
    console.log(`Interval is ${interval}`);

    if(players[0].serve) {
        document.getElementById("player1").style.fontWeight = "bold";
        document.getElementById("player2").style.fontWeight = "normal";
    } else{
        document.getElementById("player1").style.fontWeight = "normal";
        document.getElementById("player2").style.fontWeight = "bold";
    }
    
    document.getElementById("score1").innerHTML = `${players[0].sets}:${players[0].games}:${players[0].points}`;
    document.getElementById("score2").innerHTML = `${players[1].sets}:${players[1].games}:${players[1].points}`;
    
    
    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode(`${players[winner].name} wins ${players[winner].sets}:${players[winner].games}:${players[winner].points}`);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    document.getElementById("history").appendChild(node);     // Append <li> to <ul> with id="myList" 

    time = 0;

}, interval);

function submitPlayer1() {
    addPoints(players, 0);
    document.getElementById("score1").innerHTML = `${players[0].sets}:${players[0].games}:${players[0].points}`;
    document.getElementById("score2").innerHTML = `${players[1].sets}:${players[1].games}:${players[1].points}`;
}
function submitPlayer2() {
    addPoints(players, 1);
    document.getElementById("score1").innerHTML = `${players[0].sets}:${players[0].games}:${players[0].points}`;
    document.getElementById("score2").innerHTML = `${players[1].sets}:${players[1].games}:${players[1].points}`;
}

document.getElementById("player1").onclick = function () {
    submitPlayer1();
}
document.getElementById("player2").onclick = function () {
    submitPlayer2();
}
