"use strict";

module.exports = function transform(el, context) {
    let showOnlyInStage = el.getAttribute("show-only-in-stage");
    if (!showOnlyInStage || !showOnlyInStage.argument) {
        return;
    }

    // Remove the attribute so that it is not rendered to the HTML output
    el.removeAttribute("show-only-in-stage");

    var stage = context.builder.parseExpression(showOnlyInStage.argument);

    if (process.env.STAGE !== stage.value) {
        el.detach();
    }
};
