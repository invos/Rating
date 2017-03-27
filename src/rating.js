class Rating {
    constructor(config) {
        this.noOfStar = (typeof config.noOfStar === 'undefined') ? 5 : config.noOfStar;
        this.rating = (typeof config.rating === 'undefined') ? 0 : config.rating;
        this.containerElem = (typeof config.containerElem === 'undefined') ? 'div' : config.containerElem;
        this.ratingClass = (typeof config.ratingClass === 'undefined') ? 'rating' : config.ratingClass;
        this.starEle = (typeof config.starEle === 'undefined') ? 'div' : config.starEle;
        this.starClass = (typeof config.starClass === 'undefined') ? 'star' : config.starClass;
        this.starSelectedClass = (typeof config.starSelectedClass === 'undefined') ? 'selected' : config.starSelectedClass;
        this.recentSelctedStarClass = (typeof config.recentSelctedStarClass === 'undefined') ? 'recent-selected-star' : config.recentSelctedStarClass;
        this.onChange = (typeof config.onChange === 'undefined') ? function() {} : config.onChange;
    }

    updateStyle() {
        const containerElem = document.querySelector('#' + this.parentDomId + ' > ' + this.containerElem);
        const childNodes = containerElem.childNodes;
        let flag = true;
        for (var i = 0; i < childNodes.length; i++) {
            if (flag) {
                childNodes[i].classList.add(this.starSelectedClass);
            } else {
                childNodes[i].classList.remove(this.starSelectedClass);
            }
            if (flag && childNodes[i].classList.contains(this.recentSelctedStarClass)) {
                childNodes[i].classList.remove(this.recentSelctedStarClass);
                flag = !flag;
                this.rating = i + 1;
            }
        }
    }

    render(id, replaceExiting) {
        let that = this;

        const removeExistingRatingDom = function() {
            let existingRatingDom = parentDom.querySelector('.' + that.ratingClass);
            if (existingRatingDom) {
                existingRatingDom.parentNode.removeChild(existingRatingDom);
            }
        };

        this.parentDomId = id;
        const parentDom = document.querySelector('#' + this.parentDomId);
        if (replaceExiting) {
            removeExistingRatingDom();
        }
        const containerElem = document.createElement(this.containerElem);
        containerElem.classList.add(this.ratingClass);
        let totalStars = this.noOfStar;

        const addStars = function() {
            let star = document.createElement(that.starEle);
            star.classList.add(that.starClass);
            if (--totalStars > 0) {
                addStars();
            }
            containerElem.appendChild(star);
        };

        const attachEvent = function() {
            let that = this;
            containerElem.addEventListener('mouseover', function(evt) {
                if (evt.target.classList && evt.target.classList.contains(that.starClass)) {
                    evt.target.classList.add(that.recentSelctedStarClass);
                    that.updateStyle();
                    that.onChange();
                }
            });
        };

        if (containerElem) {
            (addStars.bind(this))();
            (attachEvent.bind(this))();
            parentDom.appendChild(containerElem);
            this.setRating(this.rating);
        } else {
            throw 'Parent is not defined..';
        }
    }

    setRating(rating) {
        this.rating = rating;
        if (this.rating > 0 && this.rating <= this.noOfStar) {
            const containerElem = document.querySelector('#' + this.parentDomId + ' > ' + this.containerElem);
            containerElem.querySelector('.' + this.starClass + ':nth-child(' + this.rating + ')').classList.add(this.recentSelctedStarClass);
            this.updateStyle();
            this.onChange();
        }
    }

    static getRatingObj(config) {
        return new Rating(config);
    }
}
