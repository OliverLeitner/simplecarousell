/**
 * an extended image carousell
 * ready for the 21st century
 *
 * author: Oliver Leitner <never@neverslair-blog.net>
 * license: MIT
 */
"use strict";
/**
 * the actual class that handles the
 * image carousell
 */
var simpleGallery = /** @class */ (function () {
    function simpleGallery(config) {
        this.iter = 1;
        this.elemNumber = 1;
        this.imgSources = [];
        // defaulting the config...
        this.config = {
            maxWidth: 300,
            maxHeight: 200,
            curImgId: "slide_img",
            outputId: "my_gallery",
            animationType: "slider",
            animationDirection: "right",
            timeOut: 4800,
            images: {
                1: "images/1.jpg",
                2: "images/2.jpg",
                3: "images/3.jpg",
            },
        };
        // if possible, load config
        if (config) {
            this.config = config;
        }
        // run stuff
        this.carousellBuilder(this.config.images);
    }
    simpleGallery.prototype.carousellBuilder = function (images) {
        var _this = this;
        Object.keys(images).forEach(function (element) {
            _this.imgSources[element] = images[element];
        });
        this.elemNumber = this.imgSources.length - 1;
        this.slideImage(this.iter);
    };
    simpleGallery.prototype.slideImage = function (iter) {
        var _this = this;
        // mark the existing image as old
        var oldImage = document.getElementById(this.config.curImgId + "_old");
        // process the new image
        this.showImage(this.imgSources[iter]);
        // remove the old image AFTER loading the new one
        if (oldImage) {
            oldImage.parentNode.removeChild(oldImage);
        }
        setTimeout(function () {
            if (_this.iter < _this.elemNumber) {
                iter = _this.iter++;
            }
            else {
                _this.iter = 1;
            }
            _this.slideImage(_this.iter);
        }, this.config.timeOut);
    };
    simpleGallery.prototype.showImage = function (imgSrc) {
        //mark old as old
        this.removeOldImage();
        // new image builder
        var image = new Image();
        image.useMap = imgSrc;
        var imgElement = document.createElement("img");
        imgElement.setAttribute("src", image.useMap);
        // setting some sane params
        imgElement.setAttribute("style", "max-width:" +
            this.config.maxWidth + "px;max-height:" +
            this.config.maxHeight + "px;");
        imgElement.setAttribute("id", this.config.curImgId);
        imgElement.setAttribute("class", this.config.animationType + "_" + this.config.animationDirection);
        // push the new img to the output element
        document.getElementById(this.config.outputId).appendChild(imgElement);
    };
    simpleGallery.prototype.removeOldImage = function () {
        var oldImage = document.getElementById(this.config.curImgId);
        if (oldImage) {
            oldImage.setAttribute("id", this.config.curImgId + "_old");
        }
    };
    return simpleGallery;
}());
//# sourceMappingURL=script.js.map