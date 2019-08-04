# css-slider
A Simple, Lightweight and Powerful CSS Slider

## How to install
```BASH
npm install css-slider
```

## How to use

### HTML Way
```HTML
<div class="js-css-slider" data-autoplay="5000" data-content=".js-css-slider__content" data-slide=".js-css-slider__slide" data-replay="true" data-arrow=".js-css-slider__arrow">
    <div class="js-css-slider__content">
        <div class="js-css-slider__slide">1</div>
        <div class="js-css-slider__slide">2</div>
        <div class="js-css-slider__slide">3</div>
        <div class="js-css-slider__slide"> You can add your content here</div>
    </div>
    <div class="js-css-slider__arrow js-css-slider__arrow--left" data-direction="left">[LEFT]</div>
    <div class="js-css-slider__arrow js-css-slider__arrow--right" data-direction="right">[RIGHT]</div>
</div>
```

#### JS to HTML Way
```javascript
import { CssSlider } from './slider/index';
(() => {
    [...document.querySelectorAll('.js-css-slider')].forEach((slider) => {
        new CssSlider(slider, slider.dataset);
    });
})();

```

### JS Way
```javascript
import { CssSlider } from './slider/index';

var instance = new CssSlider(slider, {
    content: '.js-css-slider__content', /* Mandatory */
    slide: '.js-css-slider__slide', /* Mandatory */
    autoplay: '5000', /* Optional */
    replay: true, /* Optional */
    button: '.js-css-slider__button', /* Optional */
    arrow: '.js-css-slider__arrow' /* Optional (Add direction to HTML) */
});
```

### Basic Styles
````SCSS
.js-css-slider {
  overflow: hidden;

  &__content {
    display: grid;
    grid-auto-flow: column;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track {
      display: none;
    }
  }

  &__slide {
    width: 100vw;
    scroll-snap-align: start;
  }
}
````
