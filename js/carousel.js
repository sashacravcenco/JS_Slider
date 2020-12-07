class Carousel {

    constructor(s) {
        let initConfig = (obj) => {
            const settings = {
                containerID: '#carousel',
                interval: 5000,
                slideID: '.slide',
            };

            if (obj !== undefined) {
                settings.containerID = obj.containerID || '#carousel';
                settings.interval = obj.interval || 5000;
                settings.slideID = obj.slideID || '.slide';
            }

            return settings;
        };

        let settings = initConfig(s);


        this.container = document.querySelector(settings.containerID);
        this.slides = this.container.querySelectorAll(settings.slideID);


        this.interval = settings.interval;
    }

    _initProps() {
        this.slidesCount = this.slides.length;
        this.currentSlide = 0;
        this.isPlaying = true;

        this.SPACE = ' ';
        this.LEFT_ARROW = 'ArrowLeft';
        this.RIGHT_ARROW = 'ArrowRight';
        this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
        this.FA_PLAY = '<i class="far fa-play-circle"></i>';
        this.FA_PREV = '<i class="fas fa-angle-left"></i>';
        this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
    }

    _initControls() {
        let controls = document.createElement('div');
        const PAUSE = `<span id="pause-btn" class="control-pause">${this.FA_PAUSE}</span>`;
        const PREV = `<span id="prev-btn" class="control-prev">${this.FA_PREV}</span>`;
        const NEXT = `<span id="next-btn" class="control-next">${this.FA_NEXT}</span>`;

        controls.setAttribute('class', 'controls');
        controls.setAttribute('id', 'controls-container');
        controls.innerHTML = PAUSE + PREV + NEXT;

        this.container.appendChild(controls);

        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');
        this.nextBtn = this.container.querySelector('#next-btn');
    }

    _initIndicators() {
        let indicators = document.createElement('div');
        indicators.setAttribute('class', 'indicators');
        indicators.setAttribute('id', 'indicators-container');


        for (let i = 0; i < this.slidesCount; i++) {
            let indicator = document.createElement('div');
            indicator.setAttribute('class', 'indicator');
            i === 0 && indicator.classList.add('active');
            indicator.dataset.slideTo = `${i}`;
            indicators.appendChild(indicator);
        }

        this.container.appendChild(indicators);

        this.indContainer = this.container.querySelector('#indicators-container');
        this.indItems = this.indContainer.querySelectorAll('.indicator');
    }

    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indContainer.addEventListener('click', this.indicate.bind(this));
        document.addEventListener('keydown', this._pressKey.bind(this));
    }

    _gotoNth(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indItems[this.currentSlide].classList.toggle('active');
        this.currentSlide = (this.slidesCount + n) % this.slidesCount;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indItems[this.currentSlide].classList.toggle('active');
    }

    _gotoPrev() {
        this._gotoNth(this.currentSlide - 1);
    }

    _gotoNext() {
        this._gotoNth(this.currentSlide + 1);
    }

    _play() {
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.isPlaying = !this.isPlaying;
        this.timerID = setInterval(this._gotoNext.bind(this), this.interval);
    }

    _pause() {
        if (this.isPlaying) {
            this.pauseBtn.innerHTML = this.FA_PLAY;
            this.isPlaying = !this.isPlaying;
            clearInterval(this.timerID);
        }
    }

    indicate(e) {
        let target = e.target;

        if (target.classList.contains('indicator')) {
            this._pause();
            this._gotoNth(+target.getAttribute('data-slide-to'));
        }
    }

    _pressKey(e) {
        if (e.key === this.SPACE) this.pausePlay();
        if (e.key === this.RIGHT_ARROW) this.next();
        if (e.key === this.LEFT_ARROW) this.prev();
    }

    pausePlay() {
        if (this.isPlaying) this._pause();
        else this._play();
    }

    prev() {
        this._pause();
        this._gotoPrev();
    }

    next() {
        this._pause();
        this._gotoNext();
    }


    init() {
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();
        this.timerID = setInterval(() => this._gotoNext(), this.interval);
    }
}

class SwipeCarousel extends Carousel {
    _initListeners() {
        super._initListeners();
        this.container.addEventListener('touchstart', this._swipeStart.bind(this));
        this.container.addEventListener('touchend', this._swipeEnd.bind(this));
    }

    _swipeStart(e) {
        this.swipeStartX = e.changedTouches[0].pageX;
    }

    _swipeEnd(e) {
        this.swipeEndX = e.changedTouches[0].pageX;
        if (this.swipeStartX - this.swipeEndX > 100) this.next();
        if (this.swipeStartX - this.swipeEndX < -100) this.prev();
    }
}