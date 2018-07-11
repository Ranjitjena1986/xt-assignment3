export class List {
    constructor(jQuery, path) {
        this.jQuery = jQuery;
        this.path = path;
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
        let listtitle = '' + this.jQuery('#listtitle').val();
        if (listtitle === '' || listtitle === 'undefined') {
            this.jQuery("#listHelp").html('Please enter list title.');
            this.jQuery("#listHelp").removeClass("d-none");
        } else {
            let objKeys = Object.keys(window.boardObj['' + this.path]);
            if (objKeys.indexOf(listtitle) === -1) {
                this.jQuery('#listtitle').val('');
                this.jQuery("#listHelp").addClass("d-none");
                this.closeList();
                window.boardObj['' + this.path]['' + listtitle] = {};
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
        let card = '' + this.jQuery('#card-text-' + key).val();
        if (card === '' || card === 'undefined') {
            this.jQuery("#cardHelp-" + key).html('Please enter card.');
            this.jQuery("#cardHelp-" + key).removeClass("d-none");
        } else {
            var objKeys = Object.keys(window.boardObj['' + this.path]['' + key]);
            if (objKeys.indexOf(card) === -1) {
                this.jQuery('#card-text-' + key).val('');
                this.closeCard(key)
                this.jQuery("#cardHelp-" + key).addClass("d-none");
                window.boardObj['' + this.path]['' + key]['' + card] = {};
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
        for (let keys of Object.keys(window.boardObj['' + this.path]['' + list])) {
            cards += `<div class="my-1 list-card px-1 py-1">
            ${keys}
            </div>`;
        }
        if (id === '') {
            return cards;
        } else {
            this.jQuery('#cards-' + list).html(cards);
        }
    }

    createLists() {
        let lists = "";
        for (let keys of Object.keys(window.boardObj['' + this.path])) {
            let cards = this.createCards('', keys);
            lists += `<div class="col-12 col-md-3 list py-2 mr-3 mt-3">
            <div class="list-header col-12 pl-0 pr-0" id="header-${keys}">
                <h4>${keys}</h4>
            </div>
            <div class="col-12 pl-0 pr-0" id="cards-${keys}">
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
}