dartQUIZ.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'dartquiz-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('dartquiz') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('dartquiz_quizs'),
                layout: 'anchor',
                items: [{
                    html: _('dartquiz_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'dartquiz-grid-quiz',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    dartQUIZ.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(dartQUIZ.panel.Home, MODx.Panel);
Ext.reg('dartquiz-panel-home', dartQUIZ.panel.Home);
