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
    maxWidth?: number;
    maxHeight?: number;
    outputId?: string;
    curImgId?: string;
    animationType?: string;
    animationDirection?: string;
    timeOut?: number;
    images: Images[];
}

/**
 * actually creating an interface
 * for the images json too...
 */
interface Images {
    title?: string;
    image: string;
}

/**
 * the actual class that handles the
 * image carousell
 */
class simpleGallery {
    private iter: number = 0;
    private elemNumber: number = 0;
    private imgSources: Images[] = [];
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
            this.config = {...<Configuration>this.config, ...<Configuration>config};
        }
        // run stuff
        this.carousellBuilder(<Images[]>this.config.images);
    }

    private carousellBuilder(images: Images[]): void {
        images.forEach((element) => {
            this.imgSources.push(<Images>element);
        });
        this.elemNumber = <number>this.imgSources.length - 1;
        this.slideImage(<number>this.iter);
    }

    private slideImage(iter: number): void {
        // mark the existing image as old
        const oldImage: HTMLElement = <HTMLElement>document.getElementById(this.config.curImgId+"_old");
        // process the new image
        this.showImage(<Images>this.imgSources[<number>iter]);
        // remove the old image AFTER loading the new one
        if (oldImage) {
            oldImage.parentNode.removeChild(oldImage);
        }
        setTimeout(() => {
            if (<number>iter < this.elemNumber) {
                iter = <number>this.iter++;
            } else {
                this.iter = 0;
            }
            this.slideImage(<number>this.iter);
        }, <number>this.config.timeOut);
    }

    private showImage(img: Images): void {
        //mark old as old
        this.markOldImage();
        // new image builder
        const image: HTMLImageElement = <HTMLImageElement>new Image();
        image.useMap = <string>img.image;
        const imgElement: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        imgElement.setAttribute("src", <string>image.useMap);
        // setting some sane params
        imgElement.setAttribute("style", "max-width:"+
        <number>this.config.maxWidth+"px;max-height:"+
        <number>this.config.maxHeight+"px;");
        imgElement.setAttribute("id", <string>this.config.curImgId);
        imgElement.setAttribute("class", <string>this.config.animationType+"_"+<string>this.config.animationDirection);
        // push the new img to the output element
        document.getElementById(<string>this.config.outputId).appendChild(<HTMLImageElement>imgElement);
    }

    private markOldImage(): void {
        const oldImage: HTMLElement = <HTMLElement>document.getElementById(<string>this.config.curImgId);
        if (oldImage) {
            oldImage.setAttribute("id", <string>this.config.curImgId+"_old");
        }
    }
}