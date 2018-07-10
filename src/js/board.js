export class Board {

    constructor(jQuery) {
        this.jQuery = jQuery;
    }
    
    openBoardWindow() {
        this.jQuery("#loginModal").modal();
    }

    addBoard() {        
        let boardName = ''+this.jQuery('#boardname').val();
        if(boardName==='' || boardName==='undefined'){
            this.jQuery("#boardHelp").html('Please enter board name.');
            this.jQuery("#boardHelp").removeClass("d-none");
        }else{
            var objKeys = Object.keys(window.boardObj);
            if(objKeys.indexOf(boardName)===-1){
                this.jQuery('#boardname').val('');
                this.jQuery("#boardHelp").addClass("d-none");
                
                window.boardObj[''+boardName] ={};
                console.log(window.boardObj); 
            }else{
                this.jQuery("#boardHelp").html(boardName + ' board already exist,try another name!');
                this.jQuery("#boardHelp").removeClass("d-none");
            }
        }        
    }
}