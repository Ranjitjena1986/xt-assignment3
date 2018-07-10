import './styles/main.scss';

import jQuery from  '../node_modules/jquery/dist/jquery';
import '../node_modules/bootstrap/dist/js/bootstrap';

window.boardObj = {};       

import { Board } from './js/board';

let board = new Board(jQuery);

window.getBoardObj= () => {
    board.openBoardWindow();
}

document.querySelector('#addboard').addEventListener('click', ()=>{
    board.addBoard();
});







