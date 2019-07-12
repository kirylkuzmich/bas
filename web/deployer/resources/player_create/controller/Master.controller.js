sap.ui.define([
    "player_create/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel) {
    "use strict";
    
    return BaseController.extend("player_create.controller.Main", {
        onInit: function () {
            //For local development. Start your NodeJS server.
            // this.host = "http://localhost:3000";
            //For cloud router. So... router will see prefix /api and will forward request to NodeJS in cloud
            this.host = "/api";
            //For directly NodeJS. So request will be sent directly to NodeJS in cloud (replace with your uri)
            // this.host = "p2001339017trial-trial-dev-kuz-srv.cfapps.eu10.hana.ondemand.com";

            this.oDataModel = new JSONModel({});
            this.getView().setModel(this.oDataModel, "data");

            jQuery.ajax({
                type: "GET",
                url: this.host + "/team",
                success: function(data){
                    var oPlayer = {
                        team: data
                    };
                    this.oDataModel.setData(oPlayer);
                    this.getApp().setBusy(false);
                },
                error: function(oError) {
                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Error get data");
                }
            });
        },
        onSave: function () {
            var oData = this.oDataModel.getData();
            oData.tmid = this.byId("team").getSelectedItem().getKey();
            this.getApp().setBusy(true);
            jQuery.ajax({
                type: "POST",
                url: this.host + "/player",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(oData),
                success: function(data){
                    sap.m.MessageBox.success("Player Created");
                    this.oDataModel.setData(data);
                    this.getApp().setBusy(false);
                },
                error: function(oError) {
                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Creating failed");
                }
            });
        },
        onCancel: function () {
            this.oDataModel.setData();
        }
    });
});