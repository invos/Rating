'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rating = function () {
    function Rating(config) {
        _classCallCheck(this, Rating);

        this.noOfStar = typeof config.noOfStar === 'undefined' ? 5 : config.noOfStar;
        this.rating = typeof config.rating === 'undefined' ? 0 : config.rating;
        this.containerElem = typeof config.containerElem === 'undefined' ? 'div' : config.containerElem;
        this.ratingClass = typeof config.ratingClass === 'undefined' ? 'rating' : config.ratingClass;
        this.starEle = typeof config.starEle === 'undefined' ? 'div' : config.starEle;
        this.starClass = typeof config.starClass === 'undefined' ? 'star' : config.starClass;
        this.starSelectedClass = typeof config.starSelectedClass === 'undefined' ? 'selected' : config.starSelectedClass;
        this.recentSelctedStarClass = typeof config.recentSelctedStarClass === 'undefined' ? 'recent-selected-star' : config.recentSelctedStarClass;
        this.onChange = typeof config.onChange === 'undefined' ? function () {} : config.onChange;
    }

    _createClass(Rating, [{
        key: 'updateStyle',
        value: function updateStyle() {
            var containerElem = document.querySelector('#' + this.parentDomId + ' > ' + this.containerElem);
            var childNodes = containerElem.childNodes;
            var flag = true;
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
    }, {
        key: 'render',
        value: function render(id, replaceExiting) {
            var that = this;

            var removeExistingRatingDom = function removeExistingRatingDom() {
                var existingRatingDom = parentDom.querySelector('.' + that.ratingClass);
                if (existingRatingDom) {
                    existingRatingDom.parentNode.removeChild(existingRatingDom);
                }
            };

            this.parentDomId = id;
            var parentDom = document.querySelector('#' + this.parentDomId);
            if (replaceExiting) {
                removeExistingRatingDom();
            }
            var containerElem = document.createElement(this.containerElem);
            containerElem.classList.add(this.ratingClass);
            var totalStars = this.noOfStar;

            var addStars = function addStars() {
                var star = document.createElement(that.starEle);
                star.classList.add(that.starClass);
                if (--totalStars > 0) {
                    addStars();
                }
                containerElem.appendChild(star);
            };

            var attachEvent = function attachEvent() {
                var that = this;
                containerElem.addEventListener('mouseover', function (evt) {
                    if (evt.target.classList && evt.target.classList.contains(that.starClass)) {
                        evt.target.classList.add(that.recentSelctedStarClass);
                        that.updateStyle();
                        that.onChange();
                    }
                });
            };

            if (containerElem) {
                addStars.bind(this)();
                attachEvent.bind(this)();
                parentDom.appendChild(containerElem);
                this.setRating(this.rating);
            } else {
                throw 'Parent is not defined..';
            }
        }
    }, {
        key: 'setRating',
        value: function setRating(rating) {
            this.rating = rating;
            if (this.rating > 0 && this.rating <= this.noOfStar) {
                var containerElem = document.querySelector('#' + this.parentDomId + ' > ' + this.containerElem);
                containerElem.querySelector('.' + this.starClass + ':nth-child(' + this.rating + ')').classList.add(this.recentSelctedStarClass);
                this.updateStyle();
                this.onChange();
            }
        }
    }], [{
        key: 'getRatingObj',
        value: function getRatingObj(config) {
            return new Rating(config);
        }
    }]);

    return Rating;
}();