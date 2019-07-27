const locators = {
    trigger: '.bs_slider',
};

const getNextSlide = (index, direction) => {
    return index + (direction === 'left' ? 0 : 2);
};

const activeButton = (buttons, index) => {
    removeActiveClass(buttons);
    if (buttons[index]) {
        buttons[index].classList.add('is-active');
    }
};

const toggleArrows = (index, slider) => {
    let sliderContent = getSlider(slider);
    let arrows = [...sliderContent.querySelectorAll(sliderContent.dataset.arrow)];
    if (!arrows.length) return;
    arrows.forEach((arrow) => {
        arrow.classList.remove('u-hide');
    });
    if (index === 0) {
        arrows.find(({dataset}) => dataset.direction === 'left').classList.add('u-hide');
    }
    if (index === sliderContent.querySelectorAll(sliderContent.dataset.slide).length - 1) {
        arrows.find(({dataset}) => dataset.direction === 'right').classList.add('u-hide');
    }

};

const getSlider = slider => slider.closest('[data-slide]');

const onScroll = ({target: slider}) => {
    let sliderContent = getSlider(slider);
    let slides = slider.querySelectorAll(sliderContent.dataset.slide),
        activeIndex = getActiveSlider(slides, slider);
    slider.dataset.lastScroll = slider.scrollLeft;
    removeActiveClass(slides);
    slides[activeIndex].classList.add('is-active');
    activeButton(getSliderButtons(slider), activeIndex);
    toggleArrows(activeIndex, slider);
};

const scrollToElement = (slider, index) => {
    let sliderContent = getSlider(slider),
        slideWith = slider.querySelector(sliderContent.dataset.slide).scrollWidth,
        targetScroll = slideWith * (index - 1);
    slider.scrollLeft = targetScroll > slider.scrollWidth ? 0 : targetScroll;
};

const bindScrollEvents = (slider) => {
    let contentSlider = slider.querySelector(slider.dataset.content);
    contentSlider.addEventListener('scroll', onScroll);
    onScroll({target: contentSlider});
};

const onClickArrow = ({target}) => {
    let sliderContent = getSlider(target.dataset.slider ? target : target.parentElement);
    let arrow = target.closest(sliderContent.dataset.arrow);
    let slider = sliderContent.querySelector(sliderContent.dataset.content);
    let slides = slider.querySelectorAll(sliderContent.dataset.slide);
    scrollToElement(slider, getNextSlide(getActiveSlider(slides, slider), arrow.dataset.direction));

};

const bindArrowsEvent = (slider) => {
    let arrows = slider.querySelectorAll(slider.dataset.arrow) || slider.querySelectorAll(slider.dataset.content);
    [...arrows].forEach((arrow) => {
        arrow.addEventListener('click', onClickArrow);
    });
};

const removeActiveClass = elements => {
    [...elements].filter((e) => e.classList.contains('is-active')).forEach((e) => {
        e.classList.remove('is-active');
    });
};

const getSliderButtons = target => {
    let slider = getSlider(target);
    return slider.querySelectorAll(slider.dataset.button) || [];
};

const getActiveSlider = (slides, parent) => {
    const slidesLength = slides.length,
        scrolled = parent.scrollLeft,
        totalScroll = parent.scrollWidth;

    return Math.floor(scrolled / (totalScroll / slidesLength));
};

const bindAutoPlay = (slider, autoplay) => {
    if (autoplay) {
        setInterval(() => {
            let slides = slider.querySelectorAll(slider.dataset.slide);
            let sliderContent = slider.querySelector(slider.dataset.content);
            scrollToElement(sliderContent, getNextSlide(getActiveSlider(slides, sliderContent), 'right'));
        }, parseInt(autoplay));
    }
};

const setSliderReference = (slider, settings) => {
    let content = slider.querySelector(settings.content);
    content.setAttribute('data-slider', settings.self);
    let arrow = slider.querySelectorAll(settings.arrow);
    [...arrow].forEach((arrowElement) => {
        arrowElement.setAttribute('data-slider', settings.self);
    });
};

const setConfigSlider = (slider, settings) => {
    Object.keys(settings).forEach(key => {
        slider.setAttribute(`data-${key}`, settings[key]);
    });
    setSliderReference(slider, settings);
};

export const Slider = (locator, settings) => {
    try {
        let slider = document.querySelector(locator);
        if (settings.slide && settings.content) {
            setConfigSlider(slider, {self: locator, ...settings});
            bindScrollEvents(slider);
            bindArrowsEvent(slider);
            bindAutoPlay(slider, slider.dataset.autoplay);
        } else {
            throw (
                `Parameteres. 
                    Slide: ${slide}, 
                    Content: ${content}`
            );
        }
    } catch (e) {
        console.error(e);
    }
};
(() => {
    [...document.querySelectorAll(locators.trigger)].forEach((slider) => {
        bindScrollEvents(slider);
        bindArrowsEvent(slider);
        bindAutoPlay(slider, slider.dataset.autoplay);
    });
})();