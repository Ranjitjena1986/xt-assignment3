import './styles/main.scss';

import jQuery from  '../node_modules/jquery/dist/jquery';
import '../node_modules/bootstrap/dist/js/bootstrap';
console.log( typeof localStorage.getItem("board"));
console.log(localStorage.getItem("board"));
window.boardObj = JSON.parse(localStorage.getItem("board")) || {};       

import { Board } from './js/board';
import { List } from './js/list';

let board = new Board(jQuery);
let list = new List(jQuery);

window.getBoardObj= () => {
    board.openBoardWindow();
}

document.querySelector('#addboard').addEventListener('click', ()=>{
    board.addBoard();
});







