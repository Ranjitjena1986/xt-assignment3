export class List {
    constructor(jQuery, path) {
        this.jQuery = jQuery;
        this.path = path;
        this.oldListName = "";
        this.oldCardName = "";
    }

    addList() {
        this.jQuery("#listid").addClass('d-none');
        this.jQuery("#addlist").removeClass('d-none');
    }

    closeList() {
        this.jQuery("#addlist").addClass('d-none');
        this.jQuery("#listid").removeClass('d-none');
    }

    saveList() {
        let listtitle = '';
        if(this.oldListName===""){
            listtitle = this.jQuery('#listtitle').val();
        }else{
            listtitle = this.jQuery('#editlist-'+this.oldListName).val();
        }
        
        if (listtitle === '' || listtitle === 'undefined') {
            this.jQuery("#listHelp").html('Please enter list title.');
            this.jQuery("#listHelp").removeClass("d-none");
        } else {
            let objKeys = Object.keys(window.boardObj['' + this.path]);
            if (objKeys.indexOf(listtitle) === -1) {
                this.jQuery('#listtitle').val('');
                this.jQuery("#listHelp").addClass("d-none");
                this.closeList();
                if(this.oldListName!==""){
                    let data = window.boardObj['' + this.path][''+this.oldListName];
                    window.boardObj['' + this.path]['' + listtitle] = {};
                    window.boardObj['' + this.path]['' + listtitle] =data;
                    delete window.boardObj['' + this.path][''+this.oldListName];
                    this.cancelList();
                    this.oldListName = "";
                }else{
                    window.boardObj['' + this.path]['' + listtitle] = {};
                }
                localStorage.setItem("board", JSON.stringify(window.boardObj));
            } else {
                this.jQuery("#listHelp").html(listtitle + ' list title already exist,try another title!');
                this.jQuery("#listHelp").removeClass("d-none");
            }
        }
        this.createLists();
    }

    addCard(key) {
        this.jQuery("#add-card-" + key).addClass('d-none');
        this.jQuery("#card-composer-" + key).removeClass('d-none');
    }

    closeCard(key) {
        this.jQuery("#add-card-" + key).removeClass('d-none');
        this.jQuery("#card-composer-" + key).addClass('d-none');
    }

    saveCard(key) {
        let card = '';         
        if(this.oldCardName===''){
            card = this.jQuery('#card-text-' + key).val();
        }else{
            card = this.jQuery('#edit-card-text-'+this.oldCardName).val();
        }

        if (card === '' || card === 'undefined') {
            this.jQuery("#cardHelp-" + key).html('Please enter card.');
            this.jQuery("#cardHelp-" + key).removeClass("d-none");
        } else {
            var objKeys = Object.keys(window.boardObj['' + this.path]['' + key]);
            if (objKeys.indexOf(card) === -1) {
                this.jQuery('#card-text-' + key).val('');
                this.closeCard(key)
                this.jQuery("#cardHelp-" + key).addClass("d-none");
                if(this.oldCardName===''){
                    window.boardObj['' + this.path]['' + key]['' + card] = {};
                }else{
                    let data = window.boardObj['' + this.path]['' +key]['' + this.oldCardName];
                    window.boardObj['' + this.path]['' + key]['' + card] = {};
                    window.boardObj['' + this.path]['' + key]['' + card] = data;
                    delete window.boardObj['' + this.path]['' +key]['' + this.oldCardName];
                    cleanCard(this.oldCardName);
                    this.oldCardName = "";
                }
                localStorage.setItem("board", JSON.stringify(window.boardObj));
            } else {
                this.jQuery("#cardHelp-" + key).html(card + ' already exist,try another title!');
                this.jQuery("#cardHelp-" + key).removeClass("d-none");
            }
        }
        this.createCards(card, key);
    }

    createCards(id, list) {
        let cards = "";
        let listid = list.replace(" ", "-");
        for (let keys of Object.keys(window.boardObj['' + this.path]['' + list])) {
            
            let keyid = keys.replace(" ", "-");

            cards += `<div class="my-1 list-card px-1 py-1" id="drag-${keyid}-${listid}" data-list="${list}" data-card="${keys}" draggable="true" ondragstart="drag(event)">
                <div id="card-${keys}" class="row">
                    <div class="col-9 card-head"  type="card" data-list="${list}" data-card="${keys}" id="id-${listid}-${keyid}">
                         ${keys}
                    </div>
                    <div class="col-2" onclick="editCard('${keys}')">
                        <i class="far fa-edit"></i>
                    </div>
                    
                </div>  
                <div id="edit-card-${keys}" class="row d-none">
                    <div class="col-12">
                        <textarea class="form-control" id="edit-card-text-${keys}" rows="2"></textarea>
                        <button type="button" class="btn btn-primary mt-1" id="savecard" onclick="saveCard('${list}')">Add Card</button>
                        <button type="button" class="close pt-2" data-dismiss="alert" aria-label="Close" onclick="cleanCard('${keys}')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>              
            </div>`;
        }
        if (id === '') {
            return cards;
        } else {
            this.jQuery('#cards-' + listid).html(cards);
        }
    }

    createLists() {
        let lists = "";
        for (let keys of Object.keys(window.boardObj['' + this.path])) {
            let cards = this.createCards('', keys);
            let keyid = keys.replace(" ","-");
            lists += `<div class="col-12 col-md-3 list py-2 mr-3 mt-3">
            <div class="list-header col-12 pl-0 pr-0" id="header-${keys}">
                <div class="row" id="boardlist-${keys}">
                    <h4 class="col-8">${keys}</h4>
                    <div class="col-2 pointer pull-right pt-2" onclick="editBoardList('${keys}')"><i class="far fa-edit"></i></div>
                    <button type="button" class="col-1 close" data-dismiss="alert" aria-label="Close" onclick="deleteList('${keys}')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="row d-none" id="editboardlist-${keys}">
                    <div class="col-8"><input type="text" class="form-control" id="editlist-${keys}" aria-describedby="editlist-${keys}" placeholder="Enter List title" data-toggle="tooltip"
                    data-placement="right" title="Enter List title"></div>
                    <span class="col-2 pt-2" onclick="saveList()"> <i class="fas fa-save"></i></span>                    
                    <button type="button" class="close pt-0" data-dismiss="alert" aria-label="Close" onclick="cancelList()">
                        <span aria-hidden="true">&times;</span>
                    </button>

                </div>
            </div>
            <div class="col-12 pl-0 pr-0 listofcards" type="list" id="cards-${keyid}" data-list="${keys}" ondrop="drop(event)" ondragover="allowDrop(event)">
                ${cards}
            </div>
            <div class="col-12 pl-0 pr-0">
                <div id="card-composer-${keys}" class="col-12 pl-0 d-none">
                    <textarea class="form-control" id="card-text-${keys}" rows="2"></textarea>
                    <small id="cardHelp-${keys}" class="form-text text-danger d-none"></small>
                    <button type="button" class="btn btn-primary mt-1" id="savecard" onclick="saveCard('${keys}')">Add Card</button>
                    <button type="button" class="close pt-2" data-dismiss="alert" aria-label="Close" onclick="closeCard('${keys}')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="add-card-${keys}" class="addcard py-1 px-1" onclick="addCard('${keys}')">
                    + Add Card
                </div>
            </div>
        </div>`;
        }
        this.jQuery('#listboard').html(lists);
    }
    
    editBoardList(key){
        this.jQuery('#editlist-'+key).val(key);
        this.oldListName = key;
        this.jQuery("#boardlist-"+key).addClass('d-none');
        this.jQuery("#editboardlist-"+key).removeClass('d-none');
    }

    cancelList(){        
        this.jQuery("#boardlist-"+this.oldListName).removeClass('d-none');
        this.jQuery("#editboardlist-"+this.oldListName).addClass('d-none');
        this.jQuery('#editlist-'+this.oldListName).val('');
        this.oldListName = "";
    }

    deleteList(key){
        delete window.boardObj['' + this.path]['' + key];
        localStorage.setItem("board", JSON.stringify(window.boardObj));
        this.createLists();
    }

    editCard(cardkey){
        this.jQuery("#card-"+cardkey).addClass('d-none');
        this.jQuery("#edit-card-"+cardkey). removeClass('d-none');
        this.jQuery('#edit-card-text-'+cardkey).val(cardkey);
        this.oldCardName = cardkey;
    }

    cleanCard(cardkey){
        this.jQuery("#card-"+cardkey).removeClass('d-none');
        this.jQuery("#edit-card-"+cardkey).addClass('d-none');
        this.jQuery('#edit-card-text-'+cardkey).val('');
        this.oldCardName = "";
    }

    dragdrop(dropid, dragid){
        //let dropType = document.getElementById(dropid).getAttribute('type');
        let dropDataList = document.getElementById(dropid).getAttribute('data-list');

        let dragList = document.getElementById(dragid).getAttribute('data-list');
        let dragCard = document.getElementById(dragid).getAttribute('data-card');
        
        window.boardObj[''+this.path][''+dropDataList][''+dragCard] = {};
        delete window.boardObj[''+this.path][''+dragList][''+dragCard];
        
        localStorage.setItem("board", JSON.stringify(window.boardObj));
        this.createLists();
    }
}