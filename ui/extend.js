Element.prototype.parents = function(selector) {
    let elements = [],
        el = this,
        hasSelector = selector !== undefined;

    if (!hasSelector || el.matches(selector)) {
        elements.push(el);
    }

    while ((el = el.parentElement) !== null) {
        if (!hasSelector || el.matches(selector)) {
            elements.push(el);
        }
    }

    return elements;
};
