/**
 * an extended image carousell
 * ready for the 21st century
 *
 * author: Oliver Leitner <never@neverslair-blog.net>
 * license: MIT
 */
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * the actual class that handles the
 * image carousell
 */
var simpleGallery = /** @class */ (function () {
    function simpleGallery(config) {
        this.iter = 0;
        this.elemNumber = 0;
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
            images: [
                { "title": "first image", "image": "images/1.jpg" },
                { "title": "second image", "image": "images/2.jpg" },
                { "title": "third image", "image": "images/3.jpg" },
            ]
        };
        // if possible, load config
        if (config) {
            this.config = __assign({}, this.config, config);
        }
        // run stuff
        this.carousellBuilder(this.config.images);
    }
    simpleGallery.prototype.stringCleaner = function (text) {
        //cleanup a string...
        var matches = ["<", ">"];
        matches.forEach(function (match) {
            text.replace("/" + match + "/", "");
        });
        return text;
    };
    simpleGallery.prototype.carousellBuilder = function (images) {
        var _this = this;
        images.forEach(function (element) {
            _this.imgSources.push(element);
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
            if (iter < _this.elemNumber) {
                iter = _this.iter++;
            }
            else {
                _this.iter = 0;
            }
            _this.slideImage(_this.iter);
        }, this.config.timeOut);
    };
    simpleGallery.prototype.showImage = function (img) {
        //mark old as old
        this.markOldImage();
        // new image builder
        var image = new Image();
        image.useMap = img.image;
        var imgElement = document.createElement("img");
        imgElement.setAttribute("src", this.stringCleaner(image.useMap));
        // setting some sane params
        imgElement.setAttribute("style", "max-width:" +
            this.config.maxWidth + "px;max-height:" +
            this.config.maxHeight + "px;");
        imgElement.setAttribute("id", this.stringCleaner(this.config.curImgId));
        imgElement.setAttribute("class", this.stringCleaner(this.config.animationType) +
            "_" + this.stringCleaner(this.config.animationDirection));
        // push the new img to the output element
        document.getElementById(this.config.outputId).appendChild(imgElement);
    };
    simpleGallery.prototype.markOldImage = function () {
        var oldImage = document.getElementById(this.stringCleaner(this.config.curImgId));
        if (oldImage) {
            oldImage.setAttribute("id", this.stringCleaner(this.config.curImgId) + "_old");
        }
    };
    return simpleGallery;
}());
//# sourceMappingURL=script.js.map