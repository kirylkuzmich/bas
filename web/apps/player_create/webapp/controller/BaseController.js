sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("player_create.controller.BaseController", {
        getApp: function () {
            return this.getView().getParent();
        }
    });
});