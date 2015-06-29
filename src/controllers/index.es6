class IndexPage {

    constructor() {
        $.index.open();
        Alloy.createController('addInfo').getView().open();

        $.add.addEventListener('click', () => {
            Alloy.createController('addInfo').getView().open();
        });
    }
}
var page = new IndexPage();


