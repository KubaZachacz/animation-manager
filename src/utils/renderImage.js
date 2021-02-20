function renderImage(imgData, imgState) {
    if (imgState) {
        const domObject = document.getElementById(imgData.id);
        for (let rootElement of imgData.elements) {
            const rootElementDom = domObject.querySelector(rootElement.selector);

            if (imgState[rootElement.selector]) {
                for (let subElement of rootElement.elements) {
                    const subElementName = subElement.selector;
                    const subElementStyle = imgState[rootElement.selector][subElementName];

                    if (subElementStyle) {
                        const subElementDomElems = rootElementDom.querySelectorAll(subElementName);

                        for (let elem of subElementDomElems) {
                            // Object.assign(elem.style, subElementStyle);
                            elem.style[subElement.style] = subElementStyle;
                        }

                    }

                }
            }
        }
    }

}

export default renderImage;