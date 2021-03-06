"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageDownloader = require('image-downloader');
const sizeOf = require('image-size');
const sharp = require('sharp');
const config = require('./config');
/** picks config.tagsCount random tags from config.tags list
 * @return {string} Stringified list of random tags */
function pickRandomTags() {
    const tags = config.tags.sort((a, b) => Math.random() > 0.5 ? 1 : -1);
    let res = '';
    for (let i = 0; i < config.tagsCount; ++i) {
        res += `#${tags[i]} `;
    }
    return res.trim();
}
/** appends a random list of tags to the input string
 * @param {string} text Text to append tags to
 * @return {string} text with tags appended */
function appendRandomTags(text) {
    return `${text} ${pickRandomTags()}`;
}
exports.appendRandomTags = appendRandomTags;
/** saves the image to config.imageName
 * @param url THe url to download an image from
 * @return {Promise<string>} image name */
function saveImage(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            url: url,
            dest: `${__dirname}/../cache/temp.${url.split('.').pop()}`,
        };
        const { filename } = yield imageDownloader.image(options);
        return filename;
    });
}
exports.saveImage = saveImage;
/**
 * Pads an image and makes it square and outputs it to postimage.png
 * @param fileName The file to add padding to make square
 * @return {Promise<string>} The filepatah of the square image */
function squareImage(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dimensions = yield sizeOf(fileName);
            const maxDimension = Math.max(dimensions.height, dimensions.width);
            yield sharp(fileName)
                .resize(maxDimension, maxDimension)
                .background({ r: 255, g: 255, b: 255, alpha: 1 })
                .embed()
                .toFormat('png')
                .toFile(`${__dirname}/../cache/postimage.png`);
        }
        catch (error) {
            throw error;
        }
        return `${__dirname}/../cache/postimage.png`;
    });
}
exports.squareImage = squareImage;
