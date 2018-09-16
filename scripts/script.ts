/**
 * an extended image carousell
 * ready for the 21st century
 *
 * author: Oliver Leitner <never@neverslair-blog.net>
 * license: MIT
 */
"use strict";

/**
 * configuration interface
 *
 * keeps the configuration options
 * for setting up the carousell
 */
interface Configuration {
    maxWidth: number;
    maxHeight: number;
    outputId: string;
    curImgId: string;
    animationType: string;
    animationDirection: string;
    timeOut: number;
    images: object[];
}

/**
 * the actual class that handles the
 * image carousell
 */
class simpleGallery {
    private iter: number = 0;
    private elemNumber: number = 0;
    private imgSources: string[] = [];
    // defaulting the config...
    private config: Configuration = {
        maxWidth: 300,
        maxHeight: 200,
        curImgId: "slide_img",
        outputId: "my_gallery",
        animationType: "slider",
        animationDirection: "right",
        timeOut: 4800,
        images: [
            { "title" : "first image", "image" : "images/1.jpg" },
            { "title" : "second image", "image" : "images/2.jpg" },
            { "title" : "third image", "image" : "images/3.jpg" },
        ]
    };

    constructor(config?: Configuration) {
        // if possible, load config
        if (config) {
            this.config = config;
        }
        // run stuff
        this.carousellBuilder(this.config.images);
    }

    private carousellBuilder(images: any[]): void {
        images.forEach((element, index) => {
            this.imgSources.push(element);
        });
        this.elemNumber = this.imgSources.length - 1;
        this.slideImage(this.iter);
    }

    private slideImage(iter: number): void {
        // mark the existing image as old
        const oldImage = document.getElementById(this.config.curImgId+"_old");
        // process the new image
        this.showImage(this.imgSources[iter]);
        // remove the old image AFTER loading the new one
        if (oldImage) {
            oldImage.parentNode.removeChild(oldImage);
        }
        setTimeout(() => {
            if (iter < this.elemNumber) {
                iter = this.iter++;
            } else {
                this.iter = 0;
            }
            this.slideImage(this.iter);
        }, this.config.timeOut);
    }

    private showImage(img: any): void {
        //mark old as old
        this.removeOldImage();
        // new image builder
        const image = new Image();
        image.useMap = img.image;
        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", image.useMap);
        // setting some sane params
        imgElement.setAttribute("style", "max-width:"+
        this.config.maxWidth+"px;max-height:"+
        this.config.maxHeight+"px;");
        imgElement.setAttribute("id", this.config.curImgId);
        imgElement.setAttribute("class", this.config.animationType+"_"+this.config.animationDirection);
        // push the new img to the output element
        document.getElementById(this.config.outputId).appendChild(imgElement);
    }

    private removeOldImage(): void {
        const oldImage = document.getElementById(this.config.curImgId);
        if (oldImage) {
            oldImage.setAttribute("id", this.config.curImgId+"_old");
        }
    }
}