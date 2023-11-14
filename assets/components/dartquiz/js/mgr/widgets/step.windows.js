dartQUIZ.window.CreateStep = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        title: _('dartquiz_quiz_step_create'),
        width: 900,
        baseParams: {
            action: 'mgr/quiz_step/create',
        },
    });
    dartQUIZ.window.CreateStep.superclass.constructor.call(this, config);
};
Ext.extend(dartQUIZ.window.CreateStep, dartQUIZ.window.Default, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id'
        },{
            xtype: 'hidden',
            name: 'quiz_id',
            id: config.id + '-quiz_id'
        }, {
            xtype: 'textfield',
            fieldLabel: _('dartquiz_quiz_name'),
            name: 'name',
            anchor: '99%',
            id: config.id + '-name',
            allowBlank: false
        },{
            xtype: 'dartquiz-combo-type',
            fieldLabel: _('dartquiz_quiz_type'),
            hiddenName: 'type',
            name: 'type',
            anchor: '99%',
            id: config.id + '-type',
            allowBlank: false
        },{
            xtype: 'textarea',
            fieldLabel: _('dartquiz_quiz_description'),
            name: 'description',
            anchor: '99%',
            id: config.id + '-description'
        }, {
            xtype: 'checkboxgroup',
            hideLabel: true,
            name: 'checkboxgroup',
            columns: 2,
            items:[{
                xtype: 'xcheckbox',
                boxLabel: _('dartquiz_quiz_active'),
                name: 'active',
                id: config.id + '-active',
                anchor: '99%',
                checked: config.record ? config.record['active'] : false,
            }, {
                xtype: 'xcheckbox',
                boxLabel: _('dartquiz_quiz_blocking'),
                name: 'blocking',
                id: config.id + '-blocking',
                anchor: '99%',
                checked: config.record ? config.record['blocking'] : false,
            }]
        }];
    },
});
Ext.reg('dartquiz-window-step-create', dartQUIZ.window.CreateStep);