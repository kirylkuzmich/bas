jQuery.sap.registerPreloadedModules({version:"2.0",name:"player_create/Component-preload",modules:{"player_create/Component.js":'sap.ui.define(["sap/ui/core/UIComponent"],function(t){"use strict";return t.extend("player_create.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});',"player_create/controller/BaseController.js":'sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("player_create.controller.BaseController",{getApp:function(){return this.getView().getParent()}})});',"player_create/controller/Master.controller.js":'sap.ui.define(["player_create/controller/BaseController","sap/ui/model/json/JSONModel","sap/m/MessageBox"],function(e,t){"use strict";return e.extend("player_create.controller.Main",{onInit:function(){this.host="/api",this.oDataModel=new t({}),this.getView().setModel(this.oDataModel,"data"),jQuery.ajax({type:"GET",url:this.host+"/team",success:function(e){var t={team:e};this.oDataModel.setData(t),this.getApp().setBusy(!1)},error:function(e){this.getApp().setBusy(!1),jQuery.sap.log.error(e),sap.m.MessageBox.error("Error get data")}})},onSave:function(){var e=this.oDataModel.getData();e.tmid=this.byId("team").getSelectedItem().getKey(),this.getApp().setBusy(!0),jQuery.ajax({type:"POST",url:this.host+"/player",dataType:"json",contentType:"application/json",data:JSON.stringify(e),success:function(e){sap.m.MessageBox.success("Player Created"),this.oDataModel.setData(e),this.getApp().setBusy(!1)},error:function(e){this.getApp().setBusy(!1),jQuery.sap.log.error(e),sap.m.MessageBox.error("Creating failed")}})},onCancel:function(){this.oDataModel.setData()}})});',"player_create/view/App.view.xml":'<mvc:View\r\n\txmlns="sap.m"\r\n\txmlns:mvc="sap.ui.core.mvc"\r\n\tdisplayBlock="true"><App id="app" busyIndicatorDelay="0"/></mvc:View>',"player_create/view/Master.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:f="sap.ui.layout.form" xmlns:core="sap.ui.core"\r\n    controllerName="player_create.controller.Master"><Page showHeader="false"><f:SimpleForm title="Player Create" editable="true" layout="ResponsiveGridLayout" labelSpanXL="12"\r\n            labelSpanL="12" labelSpanM="12" labelSpanS="12" adjustLabelSpan="false" emptySpanXL="0" emptySpanL="0"\r\n            emptySpanM="0" emptySpanS="0" columnsXL="3" columnsL="3" columnsM="3" singleContainerFullSize="false"><f:content><core:Title text="Player" /><VBox><Label text="{i18n>plid}" /><Input value="{data>/plid}" enabled="false" /><Label text="{i18n>name}" /><Input maxLength="70" value="{data>/name}" /><Label text="{i18n>position}" /><Input maxLength="70" value="{data>/position}" /></VBox><core:Title text="Team" /><VBox><ComboBox items="{data>/team}" id="team"><core:Item key="{data>TMID}" text="{data>NAME}" /></ComboBox></VBox></f:content></f:SimpleForm><footer><OverflowToolbar visible="{config>/isEdit}"><ToolbarSpacer /><Button type="Accept" text="Save" press="onSave"><layoutData><OverflowToolbarLayoutData priority="NeverOverflow" /></layoutData></Button><Button type="Reject" text="Cancel" press="onCancel"><layoutData><OverflowToolbarLayoutData priority="NeverOverflow" /></layoutData></Button></OverflowToolbar></footer></Page></mvc:View>',"player_create/i18n/i18n.properties":"plid=Player ID\r\nname=Player Name\r\nposition=Player Position","player_create/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"player_create","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"html5moduletemplates.basicSAPUI5ApplicationProjectModule","version":"1.40.12"},"dataSources":{"odata":{"uri":"../api/odata/","type":"OData","settings":{"odataVersion":"4.0"}},"local_odata":{"uri":"http://localhost:3000/odata/","type":"OData","settings":{"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"intent1":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"cur_create","action":"manage"}}}},"sap.platform.cf":{"oAuthScopes":["HiMTAmag!t15321.himta.view","HiMTAmag!t15321.himta.edit"]},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_belize"]},"sap.ui5":{"rootView":{"viewName":"user_display.view.App","type":"XML"},"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{},"sap.ushell":{},"sap.collaboration":{},"sap.ui.comp":{},"sap.uxap":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"user_display.i18n.i18n"}},"":{"dataSource":"odata","settings":{"operationMode":"Server","synchronizationMode":"None"},"preload":true}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","controlId":"app","controlAggregation":"pages","viewPath":"user_display.view","bypassed":{"target":"NotFound"}},"routes":[{"pattern":"","name":"master","target":"Master"}],"targets":{"Master":{"viewType":"XML","viewName":"Master"}}}}}'}});