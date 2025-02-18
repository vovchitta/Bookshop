import '../sass/normalize.scss';
import '../sass/styles.scss';
import Slider from './Slider.js';
import Request from './Request.js';
import Loader from './Loader.js';
import Burgers from './Burger.js';

createDefsLib();

const slider = new Slider();
const request = new Request();
const loader = new Loader();
const burgers = new Burgers();
slider.autoSwitcher();
slider.addSwitchListeners();

const loaderBtn = document.querySelector('.load-more-btn');
const categoryBtns = document.querySelectorAll('.category');
let bookCardCounter = 6;
let currentCategory = 'Architecture';
const books = [];

loadFromLocalStorage();
buyBtnListener();
burgers.burgerListener();

request.getBooks(currentCategory, 36).then(() => {
    useData();
    showAvgRating();
    isBookInCart();
    cartVisualizer();
});

function useData() {
    const cover = document.querySelectorAll('.book-card > .book-card__cover');
    const author = document.querySelectorAll('.book-card > .book-card__filling > .book-card__autor');
    const bookName = document.querySelectorAll('.book-card > .book-card__filling > .book-card__name');
    const averageRating = document.querySelectorAll('.book-card');
    const rating = document.querySelectorAll('.book-card > .book-card__filling > .book-card__review > .book-card__text');
    const description = document.querySelectorAll('.book-card > .book-card__filling > .book-card__description');
    const price = document.querySelectorAll('.book-card > .book-card__filling > .book-card__price');
    cover.forEach((item, index) => {
        const book = request.library[index];
        if (book) {
            if(book.picture) item.style.backgroundImage = `url(${book.picture})`;
        }
    });
    author.forEach((item, index) => {
        const book = request.library[index];
        if (book) {
            item.textContent = book.author;
        }
    });
    bookName.forEach((item, index) => {
        const book = request.library[index];
        if (book) {
            item.textContent = book.bookName;
        }
    });
    averageRating.forEach((item, index) => {
        const book = request.library[index];
        if (book) {
            item.setAttribute('avg-rating', book.averageRating);
        }
    });
    rating.forEach((item, index) => {
        const book = request.library[index];
        if (book) {
            item.textContent = `${book.rating} review`;
        }
    });
    description.forEach((item, index) => {
        const book = request.library[index];
        if (book) {
            item.textContent = book.description;
        }
    });
    price.forEach((item, index) => {
        const book = request.library[index];
        if (book) {
            if(book.price) {
                item.textContent = book.price;
            } else {
                item.remove();
            }
        }
    });
}

loaderBtn.addEventListener('click', () => {
    loader.loadMoreBooks();
    bookCardCounter +=6;
    request.getBooks(currentCategory, 36).then(() => {
        useData();
        buyBtnListener();
        showAvgRating();
        isBookInCart();
    });
    if(bookCardCounter === 36) {
        loaderBtn.disabled = true;
        loaderBtn.style.cursor = 'not-allowed';
        loaderBtn.textContent = 'No more books in this category';
    }
});

categoryBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const target = event.currentTarget;
        currentCategory = target.id;
        request.getBooks(currentCategory, 36).then(() => {
            useData();
            buyBtnListener();
            showAvgRating();
            isBookInCart();
        });
        categoryBtns.forEach((btn) => {
            btn.className = 'category';
        });
        target.className = 'category active';
    });
})


function buyBtnListener() {
    let buyBtns = document.querySelectorAll('.book-card__buy-btn');
    buyBtns.forEach((btn) => {
        btn.removeEventListener('click', createDataForBtns);
        btn.addEventListener('click', createDataForBtns);
    });
}


function createDataForBtns(event) {
    const target = event.currentTarget;
    const filling = target.closest('.book-card__filling');
    const checkAuthor = filling.querySelector('.book-card__autor').textContent;
    const checkName = filling.querySelector('.book-card__name').textContent;
    const bookIndex = books.findIndex(
        (book) => book.author === checkAuthor && book.name === checkName
    );
    const inCart = target.getAttribute('data-in-cart') === 'true';
    if (inCart) {
        if (bookIndex !== -1) {
            books.splice(bookIndex, 1);
        }
        target.textContent = 'buy now';
        target.setAttribute('data-in-cart', 'false');
    } else {
        if (bookIndex === -1) {
            books.push({ author: checkAuthor, name: checkName });
        }
        target.textContent = 'remove from cart';
        target.setAttribute('data-in-cart', 'true');
    }
    saveToLocalStorage();
    cartVisualizer();
}

function isBookInCart() {
    let bookCards = document.querySelectorAll('.book-card__filling');
    bookCards.forEach((card) => {
        let checkAuthor = card.querySelector('.book-card__autor').textContent;
        let checkName = card.querySelector('.book-card__name').textContent;
        let buyBtn = card.querySelector('.book-card__buy-btn');
        let bookIndex = books.findIndex(
            (book) => book.author === checkAuthor && book.name === checkName
        );
        if (bookIndex !== -1) {
            buyBtn.textContent = 'remove from cart';
            buyBtn.setAttribute('data-in-cart', 'true');
        } else {
            buyBtn.textContent = 'buy now';
            buyBtn.setAttribute('data-in-cart', 'false');
        };
    });
    saveToLocalStorage();
}

function showAvgRating() {
    let bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((card) => {
        let avgRating = card.getAttribute('avg-rating');
        let stars = card.querySelectorAll('.star');
        stars.forEach((star) => {
            let counter = star.getAttribute('sequence-number');
            if(avgRating <= counter - 1 || avgRating === 'null') {
                star.querySelector("path").setAttribute('fill', `url(#gradient-${0})`);
            } else if(avgRating >= counter) {
                star.querySelector("path").setAttribute('fill', `url(#gradient-${100})`);
            } else {
                star.querySelector("path").setAttribute('fill', `url(#gradient-${(avgRating - (counter - 1))*100})`);
            }
        })
    });
}

function createDefsLib() {
const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
for (let i = 0; i <= 10; i++) {
    let offset = i * 10;
    let gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", `gradient-${offset}`);
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "0%");
    let stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", `${offset}%`);
    stop1.setAttribute("stop-color", "#F2C94C");
    let stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", `${offset}%`);
    stop2.setAttribute("stop-color", "#EEEDF5");
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    svgDefs.appendChild(gradient);
}
document.querySelector(".star").appendChild(svgDefs);
}

function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(books));
}


function loadFromLocalStorage() {
    books.length = 0;
    books.push(...JSON.parse(localStorage.getItem('cart') || '[]'));
}

function cartVisualizer() {
    const cart = document.querySelector('.cart');
    cart.textContent = books.length;
}
