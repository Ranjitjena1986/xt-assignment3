export class Board {

    constructor(jQuery) {
        this.jQuery = jQuery;
        this.currentKey = "";
    }

    openBoardWindow() {
        this.jQuery("#loginModal").modal();
        this.jQuery('#boardname').val('');
        this.jQuery("#boardHelp").addClass("d-none");
    }

    addBoard() {
        let boardName = '' + this.jQuery('#boardname').val();
        if (boardName === '' || boardName === 'undefined') {
            this.jQuery("#boardHelp").html('Please enter board name.');
            this.jQuery("#boardHelp").removeClass("d-none");
        } else {
            let objKeys = Object.keys(window.boardObj);
            if (objKeys.indexOf(boardName) === -1) {
                this.jQuery('#boardname').val('');
                this.jQuery("#boardHelp").addClass("d-none");
                if(this.currentKey !==""){
                    let data = window.boardObj['' + this.currentKey];
                    window.boardObj['' + boardName] = {};
                    window.boardObj['' + boardName] = data;
                    delete window.boardObj['' + this.currentKey];
                    this.currentKey = "";
                }else{
                    window.boardObj['' + boardName] = {};
                }                
                localStorage.setItem("board", JSON.stringify(window.boardObj));
                window.location = "./board.html?boardname=" + boardName;
            } else {
                this.jQuery("#boardHelp").html(boardName + ' board already exist,try another name!');
                this.jQuery("#boardHelp").removeClass("d-none");
            }
        }
    }

    loadBoards() {
        let boards = "";
        this.jQuery('#boards').html('');        
        for (let keys of Object.keys(window.boardObj)) {
            boards += `<div class=" col-12 col-md-3 mr-1 mt-1 py-2 btn-primary ">
            <div class="row">
                <div onclick="loadList('${keys}')" class="col-8 pointer">${keys}</div>
                <div onclick="editList('${keys}')" class="col-2 pointer"><i class="far fa-edit"></i></div>
                <button type="button" class="col-2 close" data-dismiss="alert" aria-label="Close" onclick="deleteBoard('${keys}')">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>                 
            </div>`;
        }
        boards += `<div class="col-md-3 mr-1 mt-1 py-3 board-color" onclick="getBoardObj()">Add Board</div>`;
        this.jQuery('#boards').html(boards);
    }

    deleteBoard(key){
        delete window.boardObj[''+key];
        localStorage.setItem("board", JSON.stringify(window.boardObj));
        this.loadBoards();
    }   

    editList(key){
        this.currentKey = key;
        this.openBoardWindow();
        this.jQuery('#boardname').val(key);
    }

    cleanMemory(){
        this.currentKey = ""; 
    }
}