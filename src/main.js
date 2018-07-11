import './styles/main.scss';

import jQuery from '../node_modules/jquery/dist/jquery';
import '../node_modules/jquery-ui/ui/widgets/sortable';
import '../node_modules/bootstrap/dist/js/bootstrap';

window.boardObj = JSON.parse(localStorage.getItem("board")) || {};

import { Board } from './js/board';
import { List } from './js/list';

const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

window.onload = () => {
    let pathname = window.location.pathname;
    switch (pathname) {
        case '/':
            let board = new Board(jQuery);
            window.getBoardObj = () => {
                board.openBoardWindow();
            }

            document.querySelector('#addboard').addEventListener('click', () => {
                board.addBoard();
            });

            window.deleteBoard = (key) => {
                let result = confirm("Want to delete ?");
                if (result) {
                    board.deleteBoard(key);
                }
            };

            window.loadList= (key) =>{
                window.location = "./board.html?boardname=" + key;
            }
            board.loadBoards();
        break;
        case '/board.html':
            let path = getUrlParameter('boardname');
            let list = new List(jQuery,path);

            jQuery("#boardtitle").html(path);

            window.addList  = () => {
                list.addList();
            }           

            window.closeList = () => {
                list.closeList();
            }

            window.saveList = () =>{
                list.saveList();
            }

            window.addCard = (key) =>{
                list.addCard(key);
            }

            window.closeCard = (key) =>{
                list.closeCard(key);
            }

            window.saveCard = (key) =>{
                list.saveCard(key);
            }
            list.createLists();
            jQuery("#listboard" ).sortable({ 
                connectWith: "#listboard", 
                handle: ".list-header", 
                start: function (event, ui) {
                    ui.item.addClass('tilt');
                },
                stop: function (event, ui) {
                    ui.item.removeClass("tilt");                  
                } 
            });         
        break;
        default:
        break;
    }
};







