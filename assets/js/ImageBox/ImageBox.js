/*!
    ImageBox.js
    Copyright (c) 2016 Jan Novak <novakj4@gmail.com> and Benedikt Bitterli <benedikt.bitterli@gmail.com>
    Released under the MIT license

    Permission is hereby granted, free of charge, to any person obtaining a copy of this 
    software and associated documentation files (the "Software"), to deal in the Software 
    without restriction, including without limitation the rights to use, copy, modify, 
    merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
    permit persons to whom the Software is furnished to do so, subject to the following 
    conditions:

    The above copyright notice and this permission notice shall be included in all copies 
    or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    The wheelzoom class is based on code written by Jack Moore.
    The original source code is released under the MIT license 
    and can be found at http://www.jacklmoore.com/wheelzoom.
*/

var imageBoxSettings = {
    zoom: 0.1,
	width: 1280,
	height: 720
};

window.wheelzoom = (function(){

    let widthBoxCar = 0;

    if (window.innerWidth >= 1600) {
        widthBoxCar = 0.6;
    } else if (window.innerWidth >= 1200) {
        widthBoxCar = 0.8;
    } else if (window.innerWidth >= 992) {
        widthBoxCar = 0.85;
    } else if (window.innerWidth >= 768) {
        widthBoxCar = 0.9; 
    } else {
        widthBoxCar = 1;
    }

    const widthBox = window.innerWidth * widthBoxCar;

    var canvas = document.createElement('canvas');

    var main = function(img, settings){
        if (!img || !img.nodeName || img.nodeName !== 'IMG') { return; }

        var width;
        var height;
        var previousEvent;
        var cachedDataUrl;

        function setSrcToBackground(img) {
            img.style.backgroundImage = 'url("'+img.src+'")';
            img.style.backgroundRepeat = 'no-repeat';
            canvas.width = settings.width;
            canvas.height = Math.max(settings.height, img.naturalHeight);
            cachedDataUrl = canvas.toDataURL();
            img.src = cachedDataUrl;

            img.style.backgroundPosition = img.bgPosX+'px '+img.bgPosY+'px';
        }

        function updateBgStyle() {
            if (img.bgPosX > 0) {
                img.bgPosX = 0;
            } else if (img.bgPosX < img.imWidth - img.bgWidth) {
                img.bgPosX = img.imWidth - img.bgWidth;
            }

            if (img.bgPosY > 0) {
                img.bgPosY = 0;
            } else if (img.bgPosY < height - img.bgHeight) {
                img.bgPosY = height - img.bgHeight;
            }

            img.style.backgroundSize = img.bgWidth+'px '+img.bgHeight+'px';
            img.style.backgroundPosition = img.bgPosX+'px '+img.bgPosY+'px';
        }

        function reset() {
            img.bgWidth = widthBox
            img.bgHeight = img.imHeight;
            img.bgPosX = img.bgPosY = 0;
            updateBgStyle();
        }

        function onwheel(e) {
            var deltaY = 0;

            e.preventDefault();

            if (e.deltaY) { // FireFox 17+ (IE9+, Chrome 31+?)
                deltaY = e.deltaY;
            } else if (e.wheelDelta) {
                deltaY = e.wheelDelta;
            }

            // As far as I know, there is no good cross-browser way to get the cursor position relative to the event target.
            // We have to calculate the target element's position relative to the document, and subtrack that from the
            // cursor's position relative to the document.
            var rect = img.getBoundingClientRect();
            var offsetX = e.pageX - rect.left - window.pageXOffset;
            var offsetY = e.pageY - rect.top - window.pageYOffset;

            // Record the offset between the bg edge and cursor:
            var bgCursorX = offsetX - img.bgPosX;
            var bgCursorY = offsetY - img.bgPosY;
            
            // Use the previous offset to get the percent offset between the bg edge and cursor:
            var bgRatioX = bgCursorX/img.bgWidth;
            var bgRatioY = bgCursorY/img.bgHeight;

            // Update the bg size:
            if (deltaY < 0) {
                img.bgWidth += img.bgWidth*settings.zoom;
                img.bgHeight += img.bgHeight*settings.zoom;
            } else {
                img.bgWidth -= img.bgWidth*settings.zoom;
                img.bgHeight -= img.bgHeight*settings.zoom;
            }

            // Take the percent offset and apply it to the new size:
            img.bgPosX = offsetX - (img.bgWidth * bgRatioX);
            img.bgPosY = offsetY - (img.bgHeight * bgRatioY);

            // Prevent zooming out beyond the starting size
            if (img.bgWidth <= widthBox || img.bgHeight <= (img.bgWidth/img.imWidth) * img.imHeigh) {
                reset();
            } else {
                updateBgStyle();
            }
        }

        function drag(e) {
            e.preventDefault();
            img.bgPosX += (e.pageX - previousEvent.pageX);
            img.bgPosY += (e.pageY - previousEvent.pageY);
            previousEvent = e;
            updateBgStyle();
        }

        function removeDrag() {
            document.removeEventListener('mouseup', removeDrag);
            document.removeEventListener('mousemove', drag);
        }

        // Make the background draggable
        function draggable(e) {
            e.preventDefault();
            previousEvent = e;
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', removeDrag);
        }

        function load() {
            if (img.src === cachedDataUrl) return;

            img.imWidth = widthBox;
            img.imHeight = (img.imWidth/img.naturalWidth) * img.naturalHeight;

            img.bgWidth = img.imWidth;
            img.bgHeight = img.imHeight;
            img.bgPosX = 0;
            img.bgPosY = 0;

            img.style.backgroundSize = img.bgWidth+'px '+img.bgHeight+'px';
            img.style.backgroundPosition = img.bgPosX+' '+img.bgPosY;

            setSrcToBackground(img);

            img.addEventListener('wheelzoom.reset', reset);
            img.addEventListener('wheel', onwheel);
            img.addEventListener('mousedown', draggable);
        }

        var destroy = function (originalProperties) {
            img.removeEventListener('wheelzoom.destroy', destroy);
            img.removeEventListener('wheelzoom.reset', reset);
            img.removeEventListener('load', load);
            img.removeEventListener('mouseup', removeDrag);
            img.removeEventListener('mousemove', drag);
            img.removeEventListener('mousedown', draggable);
            img.removeEventListener('wheel', onwheel);

            img.style.backgroundImage = originalProperties.backgroundImage;
            img.style.backgroundRepeat = originalProperties.backgroundRepeat;
            img.src = originalProperties.src;
        }.bind(null, {
            backgroundImage: img.style.backgroundImage,
            backgroundRepeat: img.style.backgroundRepeat,
            src: img.src
        });

        img.addEventListener('wheelzoom.destroy', destroy);

        if (img.complete) {
            load();
        }

        img.addEventListener('load', load);
    };

    // Do nothing in IE8
    if (typeof window.getComputedStyle !== 'function') {
        return function(elements) {
            return elements;
        };
    } else {
        return function(elements, settings) {
            if (elements && elements.length) {
                Array.prototype.forEach.call(elements, main, settings);
            } else if (elements && elements.nodeName) {
                main(elements, settings);
            }
            return elements;
        };
    }
}());

var ImageBox = function(parent, config, title, imageBoxWidth, imageBoxHeight) {
    var self = this;

	imageBoxSettings.width = imageBoxWidth;
	imageBoxSettings.height = imageBoxHeight;

    var box = document.createElement('div');

    //var h1 = document.createElement('h1');
    //h1.className = "title";
    //h1.appendChild(document.createTextNode(title));
    //back = h1.appendChild(document.createElement("a"));
    //backText = document.createTextNode("[back]");
    //back.appendChild(backText);
    //back.setAttribute('href', "../");        
    //box.appendChild(h1);

    //var help = document.createElement('div');
    //help.appendChild(document.createTextNode("Use mouse wheel to zoom in/out, click and drag to pan. Press keys [1], [2], ... to switch between individual images."));
    //help.className = "help";
    //box.appendChild(help);

    this.tree = [];
    this.selection = [];
    this.buildTreeNode(config, 0, this.tree, box);

    for (var i = 0; i < this.selection.length; ++i) {
        this.selection[i] = 0;
    }
    this.showContent(0, 0);
    parent.appendChild(box);
    
    document.addEventListener("keypress", function(event) { self.keyPressHandler(event); });
}

ImageBox.prototype.buildTreeNode = function(config, level, nodeList, parent) {

    var self = this;

    var selectorGroup = document.createElement('div'); 
    selectorGroup.className = "selector-group";

    parent.appendChild(selectorGroup);

    var insets = [];

    var imageContainer;
    if (!parent.querySelector('.image-container')) {
        imageContainer = document.createElement('div');
        parent.appendChild(imageContainer);
    } else {
        imageContainer = parent.querySelector('.image-container');
    }

    for (var i = 0; i < config.length; i++) {
        // Create tab
        var selector = document.createElement('div');
        selector.className = "selector selector-primary";
        
        selector.addEventListener("click", function(l, idx, event) {
            this.showContent(l, idx);
        }.bind(this, level, i));
        
        // Add to tabs
        selectorGroup.appendChild(selector);

        // Create content
        var contentNode = {};
        contentNode.children = [];
        contentNode.selector = selector;

        var content;
        if (typeof(config[i].elements) !== 'undefined') {
            // Recurse
            content = document.createElement('div');
            this.buildTreeNode(config[i].elements, level+1, contentNode.children, content);
            selector.appendChild(document.createTextNode(config[i].title));
        } else {
            // Create image
            content = document.createElement('img'); 
            content.className = "pixelated center-block";
            content.src = config[i].image;
			
            wheelzoom(content, imageBoxSettings);
            var key = '';
            if (i < 9)
                key = i+1 + ": ";
            else if (i == 9)
                key = "0: ";

            selector.appendChild(document.createTextNode(key + config[i].title));
            this.selection.length = Math.max(this.selection.length, level+1);

            // Create inset
            var inset = document.createElement('img');
            inset.className = "inset pixelated";
            inset.style.backgroundImage = "url('" + config[i].image + "')";
            inset.style.backgroundRepeat = "no-repeat";
            inset.style.border = "0px solid black";
            inset.style.width  = (imageBoxSettings.width / config.length-4) + "px";
            inset.style.height = (imageBoxSettings.width / config.length-4) + "px";
            inset.name = config[i].title;
            var canvas = document.createElement("canvas");
            cachedDataUrl = canvas.toDataURL();
            inset.src = cachedDataUrl;
            insets.push(inset);

            content.addEventListener("mousemove", function(content, insets, event) {
                this.mouseMoveHandler(event, content, insets);
            }.bind(this, content, insets));
            content.addEventListener("wheel", function(content, insets, event) {
                this.mouseMoveHandler(event, content, insets);
            }.bind(this, content, insets));

        }
        content.style.display = 'none';
        content.className = "element pixelated";
        imageContainer.appendChild(content);
        contentNode.content = content;
        nodeList.push(contentNode);
    }

    if (insets.length > 0) {
        var insetGroup = document.createElement('table');
        insetGroup.className = "insets d-none d-xl-block";
        insetGroup.width = imageBoxSettings.width;
        var tr = document.createElement('tr');
        tr.className = "insets";
        insetGroup.appendChild(tr);

        for (var i = 0; i < insets.length; ++i) {
            var auxDiv = document.createElement('td');
            auxDiv.className = "insets";
            auxDiv.style.width = (imageBoxSettings.width / insets.length) + "px";
            auxDiv.appendChild(document.createTextNode(insets[i].name));
            auxDiv.appendChild(insets[i]);
            tr.appendChild(auxDiv);
        }
        imageContainer.appendChild(insetGroup);
    }

    if (imageContainer.firstElementChild && imageContainer.firstElementChild.tagName.toLowerCase() === 'img') {
        imageContainer.classList.add('image-container');
    }
}

ImageBox.prototype.showContent = function(level, idx) {
    // Hide
    var bgWidth = 0;
    var bgHeight = 0;
    var bgPosX = 0;
    var bgPosY = 0;
    var bgOffset = 0;
    var l = 0;
    var node = {};
    node.children = this.tree;
    while (node.children.length > 0 && node.children.length > this.selection[l]) {
        node = node.children[this.selection[l]];
        node.selector.className = 'selector selector-primary';
        node.content.style.display = 'none';
        if (l == this.selection.length-1) {
            bgWidth =   node.content.bgWidth;
            bgHeight =  node.content.bgHeight;
            bgPosX =    node.content.bgPosX;
            bgPosY =    node.content.bgPosY;
            bgOffset =  node.content.bgOffset;
        }
        l += 1;
    }

    this.selection[level] = Math.max(0, idx);

    // Show
    l = 0;
    node = {};
    node.children = this.tree;
    while (node.children.length > 0) {
        if (this.selection[l] >= node.children.length)
            this.selection[l] = node.children.length - 1;
        node = node.children[this.selection[l]];
        node.selector.className = 'selector selector-primary active';
        node.content.style.display = 'block';
        if (l == this.selection.length-1) {
            node.content.bgWidth = bgWidth;
            node.content.bgHeight = bgHeight;
            node.content.bgPosX = bgPosX;
            node.content.bgPosY = bgPosY;
            node.content.bgOffset = bgOffset;
            node.content.style.backgroundSize = bgWidth+'px '+bgHeight+'px';
            node.content.style.backgroundPosition = bgOffset + bgPosX+'px '+bgPosY+'px';
        }
        l += 1;
    }
}

ImageBox.prototype.keyPressHandler = function(event) {
    if (parseInt(event.charCode) == "0".charCodeAt(0)) {
        var idx = 9;
        this.showContent(this.selection.length-1, idx);
    } else {
        var idx = parseInt(event.charCode) - "1".charCodeAt(0);
        this.showContent(this.selection.length-1, idx);
    }
}

ImageBox.prototype.mouseMoveHandler = function(event, image, insets) {
    var rect = image.getBoundingClientRect();
    var xCoord = ((1.51515 * event.clientX - rect.left) - image.bgOffset - image.bgPosX)   / (image.bgWidth  / image.imWidth);
    var yCoord = ((1.51515 * event.clientY - rect.top)  - image.bgPosY)                    / (image.bgHeight / image.imHeight);
	
	//console.log(xCoord);
	//console.log(yCoord);
	
	var rectClient = event.target.getBoundingClientRect();
	xCoord = event.clientX - rectClient.left;
	yCoord = event.clientY - rectClient.top;

    var scale = 2;
    for (var i = 0; i < insets.length; ++i) {
        insets[i].style.backgroundSize = (image.imWidth * scale) + "px " + (image.imHeight*scale) + "px";
        insets[i].style.backgroundPosition = (insets[i].width/2  - xCoord*scale) + "px " 
                                           + (insets[i].height/2 - yCoord*scale) + "px";
    }
}
