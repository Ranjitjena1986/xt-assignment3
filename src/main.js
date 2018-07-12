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

            window.editList = (key)=>{
                board.editList(key);
            }

            board.loadBoards();  
            jQuery('#loginModal').on('hidden.bs.modal', function (e) {
                board.cleanMemory();
            });          
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

            window.editBoardList = (key)=>{
                list.editBoardList(key);
            }

            window.cancelList = ()=>{
                list.cancelList();
            }

            window.deleteList =  (key)=>{
                let result = confirm("Want to delete ?");
                if (result) {
                    list.deleteList(key);
                }              
            }

            window.editCard = (cardkey)=>{
                list.editCard(cardkey);
            }

            window.cleanCard = (cardkey)=>{
                list.cleanCard(cardkey);
            }

            list.createLists();
            jQuery("#listboard" ).sortable({ 
                connectWith: "#listboard", 
                handle: ".list-header"               
            });   
            
            window.allowDrop = (ev) => {
                ev.preventDefault();
            }
            
            window.drag = (ev) => {
                ev.dataTransfer.setData("text", ev.target.id);
            }
            
            window.drop = (ev)=> {
                ev.preventDefault();
                let data = ev.dataTransfer.getData("text");                
                list.dragdrop(ev.target.id,data);
            }
            
        break;
        default:
        break;
    }
};







