function isColor(string) {
    var s = new Option().style;
    s.color = string;
    return s.color.length > 0;
}

export default isColor;