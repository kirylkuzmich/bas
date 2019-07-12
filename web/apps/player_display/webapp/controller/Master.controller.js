sap.ui.define([
    "player_display/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("player_display.controller.Main", {
        onInit: function () {
            //For local development. Start your NodeJS server.
            // this.host = "http://localhost:3000";
            //For cloud router. So... router will see prefix /api and will forward request to NodeJS in cloud
            this.host = "/api";
            //For directly NodeJS. So request will be sent directly to NodeJS in cloud (replace with your uri)
            // this.host = "p2001339017trial-trial-dev-kuz-srv.cfapps.eu10.hana.ondemand.com";

            this.oDataModel = new JSONModel({});
            this.getView().setModel(this.oDataModel, "players");

            jQuery.ajax({
                type: "GET",
                url: this.host + "/player",
                success: function(data){
                    this.oDataModel.setData(data);
                    this.getApp().setBusy(false);
                },
                error: function(oError) {
                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Error get data");
                }
            });
        }
    });
});