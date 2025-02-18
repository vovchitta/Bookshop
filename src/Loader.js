class Loader {
    constructor() {}

    loadMoreBooks() {
        const container = document.querySelector('.book-cards__container');
            for(let i = 0; i < 6; i++) {
                container.insertAdjacentHTML('beforeend', `
                <div class="book-card">
                    <div class="book-card__cover"></div>
                    <div class="book-card__filling">
                        <div class="book-card__autor"></div>
                        <div class="book-card__name"></div>
                        <div class="book-card__review">
                            <svg class="star" sequence-number="1" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5"/>
                                </svg>
                                <svg class="star" sequence-number="2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5"/>
                                </svg>
                                <svg class="star" sequence-number="3" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5"/>
                                </svg>
                                <svg class="star" sequence-number="4" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5"/>
                                </svg>
                                <svg class="star" sequence-number="5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5"/>
                                </svg>
                            <div class="book-card__text"></div>
                        </div>
                        <div class="book-card__description"></div>
                        <div class="book-card__price"></div>
                        <button class="book-card__buy-btn btn">buy now</button>
                    </div>
                </div>`)
            }
    }

} export default Loader;