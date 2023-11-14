dartQUIZ.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'dartquiz-panel-home',
            renderTo: 'dartquiz-panel-home-div'
        }]
    });
    dartQUIZ.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(dartQUIZ.page.Home, MODx.Component);
Ext.reg('dartquiz-page-home', dartQUIZ.page.Home);