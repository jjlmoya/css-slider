# css-slider
A Simple, Lightweight and Powerful CSS Slider

## How to install
```BASH
npm install css-slider --save-dev 
```

## How to use

### HTML Way
```HTML
<div class="og-slider--simple bs_slider "
     data-autoplay="50000000"
     data-content=".bs_slider_content"
     data-slide=".bs_slide"
     data-arrow=".bs_slider_arrow">
    <div class="og-slider--simple__content bs_slider_content">
        <div class="bs_slide">1</div>
        <div class="bs_slide">2</div>
        <div class="bs_slide">3</div>
        <div class="bs_slide"> You can add your content here</div>
    </div>
    <div class="bs_slider_arrow" direction="left"> [LEFT] </div>
    <div class="bs_slider_arrow" direction="right"> [RIGHT] </div>
</div>
```

### JS Way
```javascript
import {Slider} from 'css-slider';

Slider('.bs_slider', {
    content: '.bs_slider_content',  /* Mandatory */
    slide: '.bs_slide',  /* Mandatory */
    autoplay: '5000', /* Optional */
    arrow: '.bs_slider_arrow' /* Optional (Add direction to HTML)*/
});
```

### Basic Styles
````SCSS
    .og-slider--simple {
      overflow: hidden;
      &__content {
        display:grid;
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
        height: 80vh;
        width: 100vw;
        scroll-snap-align: start;
      }
    }
````