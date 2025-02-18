import firstSlide from '../images/black-friday-banner.jpg';
import secondSlide from '../images/top10-banner.jpg';
import thirdSlide from '../images/book-collection-banner.jpg';

class Slider {
    constructor() {
        this.slides = [firstSlide, secondSlide, thirdSlide];
        this.switchers = Array.from(document.querySelectorAll('.switcher'));
        this.banner = document.querySelector('.slider-banner');
        this.currentSlide = 0;
        this.startSwitch = null;
    }

    autoSwitcher() {
        clearInterval(this.startSwitch);

        this.startSwitch = setInterval(() => {
            this.updateSlide((this.currentSlide + 1) % this.slides.length);
        }, 5000);
    }

    updateSlide(slideIndex) {
        this.currentSlide = slideIndex;

        this.banner.style.backgroundImage = `url(${this.slides[slideIndex]})`;

        this.switchers.forEach((switcher, index) => {
            if(index === slideIndex) {
                switcher.style.backgroundColor = '#9E98DC';
            } else {
                switcher.style.backgroundColor = '#EFEEF6';
            }
        });
    }

    addSwitchListeners() {
        this.switchers.forEach((switcher, index) => {
            switcher.addEventListener('click', () => {
                this.updateSlide(index);
                this.autoSwitcher();
            });
        });
    }
}

export default Slider;
