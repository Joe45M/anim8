var throttle = require('./modularize/throttle');

export class Anim8 {
    constructor(element, params) {
        this.default_params = {
            direction: 'down',
        }

        this.configured_params = {...this.default_params, ...params};
        console.log(this.configured_params);
        this.target_element = document.querySelector(element);
        this.viewport = document.querySelector('body').getBoundingClientRect();
        this.client_height = document.documentElement.clientHeight;
        this.target_element_position = this.target_element.getBoundingClientRect();
        this.percent_scrolled = {};

        /**
         * We need to prepare the opacity for scrolling.
         */
        if(this.target_element.style.opacity == "") {
            this.target_element.style.opacity = (this.configured_params.direction == 'down' ? 1 : 0 );
        }

        /**
         * initiate the callback.
         */
        this.scroll = () => {
            this.target_element_position = this.target_element.getBoundingClientRect();
            console.log(this.target_element_position.top);

            // If the element is inside of the viewport.
            if(this.target_element_position.top <= 0 && // top of viewport
               this.target_element_position.top + this.target_element.offsetHeight >= 0 ) { // Bottom

                this.viewport_data(); // Update viewport data.

                // Direction
                if(this.configured_params.direction == 'down') {
                    this.target_element.style.opacity = 1 - this.percent_scrolled.shifted; // Update element style
                } else {
                    this.target_element.style.opacity = 0 + this.percent_scrolled.shifted; // Update element style

                }
            }
        };

        // Attach the event.
        this.event = document.addEventListener('scroll', this.callback = throttle(this.scroll, 5));
    }

    /**
     * Configure the scroll data.
     */
    viewport_data() {

        // Inside the viewport, we need to set up the scrolled to calculate a percentage
        // to update the opacity of the element.
        let scrolled                  = Math.abs(this.target_element_position.top);
        this.percent_scrolled.full    = scrolled*100/this.target_element.offsetHeight;
        this.percent_scrolled.fixed   = this.percent_scrolled.full.toFixed(3);
        this.percent_scrolled.shifted =  (this.percent_scrolled.fixed / 100).toFixed(2);
    }

    /**
     * Remove the listener
     */
    destroy_listener() {
        document.removeEventListener('scroll', this.callback);
    }
}

