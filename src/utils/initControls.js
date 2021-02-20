function initControls(imgData) {
    const initControls = {};
    for (let group of imgData.elements) {
        initControls[group.selector] = {
            active: false,
            visible: true,
        }
    }

    return initControls;
}

export default initControls;