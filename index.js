export class CSSSlider {
    constructor (slider, { arrow, slide, autoplay, content, button, replay }) {
        this.slider = slider
        this.autoplay = autoplay
        this.sliderContent = this.slider.querySelector(content)
        this.arrowLocator = arrow
        this.arrows = [...this.slider.querySelectorAll(arrow) || []]
        this.slides = slider.querySelectorAll(slide)
        this.buttons = this.slider.querySelectorAll(button) || []
        this.replay = !!replay
        this.bind()
    }

    bind () {
        this.bindScrollEvents()
        this.bindArrowsEvent()
        this.bindAutoPlay()
        this.bindButtons()
    }

    getNextSlide (direction) {
        const nextIndex = this.activeIndex + (direction === 'left' ? 0 : 2)
        if (nextIndex <= this.slides.length) {
            return nextIndex
        }
        if (this.replay) {
            return 1
        }
        return this.activeIndex + 1
    }

    onScroll () {
        this.activeIndex = this.getActiveSlide()
        this.removeActiveClass(this.slides)
        this.slides[this.activeIndex].classList.add('is-active')
        this.activeButton(this.buttons)
        this.toggleArrows()
    }

    getActiveSlide () {
        const slidesLength = this.slides.length
        const scrolled = this.sliderContent.scrollLeft
        const totalScroll = this.sliderContent.scrollWidth

        return Math.floor(scrolled / (totalScroll / slidesLength))
    }

    scrollToElement (index) {
        const slideWith = this.slides[index - 1].scrollWidth
        const targetScroll = slideWith * (index - 1)
        this.sliderContent.scrollLeft = targetScroll > this.sliderContent.scrollWidth ? 0 : targetScroll
    }

    bindScrollEvents () {
        this.sliderContent.addEventListener('scroll', this.onScroll.bind(this))
        this.onScroll()
    }

    onClickArrow ({ target }) {
        const arrow = target.closest(this.arrowLocator)
        const nextSlide = this.getNextSlide(arrow.dataset.direction)
        this.scrollToElement(nextSlide)
    }

    onClickButton ({ target }) {
        this.scrollToElement(parseInt(target.dataset.index))
    }

    bindButtons () {
        this.buttons.forEach((button, index) => {
            button.setAttribute('data-index', index + 1)
            button.addEventListener('click', this.onClickButton.bind(this))
        })
    }

    bindArrowsEvent () {
        this.arrows.forEach((arrow) => {
            arrow.addEventListener('click', this.onClickArrow.bind(this))
        })
    }

    removeActiveClass (elements) {
        [...elements].filter((e) => e.classList.contains('is-active')).forEach((e) => {
            e.classList.remove('is-active')
        })
    }

    bindAutoPlay () {
        if (this.autoplay) {
            setInterval(() => {
                this.scrollToElement(this.getNextSlide('right'))
            }, parseInt(this.autoplay))
        }
    }

    activeButton (buttons) {
        this.removeActiveClass(buttons);
        if (this.buttons[this.activeIndex]) {
            buttons[this.activeIndex].classList.add('is-active')
        }
    }

    toggleArrows () {
        if (!this.arrows.length) return;
        this.arrows.forEach((arrow) => {
            arrow.style.display = 'inherit'
        })
        if (this.activeIndex === 0) {
            this.arrows.find(({ dataset }) => dataset.direction === 'left').style.display = 'none'
        }
        if (this.activeIndex === this.slides.length - 1 && !this.replay) {
            this.arrows.find(({ dataset }) => dataset.direction === 'right').style.display = 'none'
        }
    }
}

export const SliderDefaultLocator = '.bs_slider'
