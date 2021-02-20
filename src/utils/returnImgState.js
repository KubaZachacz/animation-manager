import { sample } from 'lodash';
import isColor from './isColor'

function returnImgState(imgData, presetState) {

    const newImgState = {};

    for (let rootElement of imgData.elements) {
        
        if (rootElement) {
            const rootElementState = {}

            for (let subElement of rootElement.elements) {
                const subElementName = subElement.selector;

                if (subElement.style === "fill") {
                    let subElementValues = [];

                    if (Array.isArray(subElement.values)) {
                        subElementValues = subElement.values;
                    } else {
                        subElementValues = imgData.swatches[subElement.values];
                    }

                    let subElementColor = "";
                    console.log(presetState)
                    if (
                        presetState &&
                        presetState[rootElement.selector] &&
                        presetState[rootElement.selector][subElementName]
                    ) {
                        const subModuleSettingsValue =
                        presetState[rootElement.selector][subElementName];

                        if (isColor(subModuleSettingsValue)) {
                          subElementColor = subModuleSettingsValue;
                        }
                    }
                    else {
                        subElementColor = sample(subElementValues);
                    }

                    rootElementState[subElementName] = subElementColor;
                    // const subElementDomElems = rootElementDom.querySelectorAll(
                    //     `.${subElementName}`
                    // );

                    // for (let elem of subElementDomElems) {
                    //     elem.style.fill = subElementColor;
                    // }
                }
            }

            newImgState[rootElement.selector] = rootElementState;
        }
    }

    return newImgState;
}

export default returnImgState;