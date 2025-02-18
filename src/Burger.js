class Burgers {
    constructor() {
        this.headerBurger = document.querySelector('.header-burger__svg');
        this.headerMenu = document.querySelector('.mobile__header-nav');
        this.mainBurger = document.querySelector('.main-burger__svg');
        this.mainMenu = document.querySelector('.mobile__sorting-list');
        this.isHeaderActive = 'false';
        this.isMainActive = 'false';
    }

    burgerListener() {
        this.headerBurger.addEventListener('click', () => {
            if(this.isHeaderActive === 'false') {
                this.headerMenu.style.display = 'flex';
                this.isHeaderActive = 'true';
            } else {
                this.headerMenu.style.display = 'none';
                this.isHeaderActive = 'false';
            }
        });
        this.mainBurger.addEventListener('click', () => {
            if(this.isMainActive === 'false') {
                this.mainMenu.style.display = 'block';
                this.isMainActive = 'true';
            } else {
                this.mainMenu.style.display = 'none';
                this.isMainActive = 'false';
            }
        });
    }

} export default Burgers;