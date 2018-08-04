"use strict";

module.exports = function transform(el, context) {
    let showOnlyInEnv = el.getAttribute("show-only-in-env");
    if (!showOnlyInEnv || !showOnlyInEnv.argument) {
        return;
    }

    // Remove the attribute so that it is not rendered to the HTML output
    el.removeAttribute("show-only-in-env");

    var environment = context.builder.parseExpression(showOnlyInEnv.argument);

    if (process.env.NODE_ENV !== environment.value) {
        el.detach();
    }
};
