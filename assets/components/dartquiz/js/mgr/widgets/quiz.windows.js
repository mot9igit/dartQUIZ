dartQUIZ.window.CreateQuiz = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        title: _('dartquiz_quiz_create'),
        width: 900,
        baseParams: {
            action: 'mgr/quiz/create',
        },
    });
    dartQUIZ.window.CreateQuiz.superclass.constructor.call(this, config);
};
Ext.extend(dartQUIZ.window.CreateQuiz, dartQUIZ.window.Default, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id'
        }, {
            xtype: 'textfield',
            fieldLabel: _('dartquiz_quiz_name'),
            name: 'name',
            anchor: '99%',
            id: config.id + '-name',
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
                boxLabel: _('dartquiz_quiz_progress'),
                name: 'progress',
                id: config.id + '-progress',
                anchor: '99%',
                checked: config.record ? config.record['progress'] : false,
            }]
        },{
            layout: 'column',
            items: [{
                columnWidth: .5,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('dartquiz_quiz_btn_prev'),
                    name: 'btn_prev',
                    anchor: '99%',
                    id: config.id + '-btn_prev'
                },{
                    xtype: 'textfield',
                    fieldLabel: _('dartquiz_quiz_btn_start'),
                    name: 'btn_start',
                    anchor: '99%',
                    id: config.id + '-btn_start'
                }]
            },{
                columnWidth: .5,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('dartquiz_quiz_btn_next'),
                    name: 'btn_next',
                    anchor: '99%',
                    id: config.id + '-btn_next'
                },{
                    xtype: 'textfield',
                    fieldLabel: _('dartquiz_quiz_btn_submit'),
                    name: 'btn_submit',
                    anchor: '99%',
                    id: config.id + '-btn_submit'
                }]
            }]
        }];
    },
});
Ext.reg('dartquiz-window-quiz-create', dartQUIZ.window.CreateQuiz);


dartQUIZ.window.UpdateQuiz = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        baseParams: {
            title: _('shoplogistic_quiz_update'),
            width: 900,
            action: 'mgr/quiz/update',
        },
        bodyCssClass: 'tabs',
    });
    dartQUIZ.window.UpdateQuiz.superclass.constructor.call(this, config);
};
Ext.extend(dartQUIZ.window.UpdateQuiz, dartQUIZ.window.CreateQuiz, {

    getFields: function (config) {
        return [{
            xtype: 'modx-tabs',
            items: [{
                title: _('dartquiz_quiz_update'),
                layout: 'form',
                items: dartQUIZ.window.CreateQuiz.prototype.getFields.call(this, config),
            }, {
                title: _('dartquiz_quiz_steps'),
                items: [{
                    xtype: 'dartquiz-grid-step',
                    record: config.record,
                }]
            }]
        }];
    }

});
Ext.reg('dartquiz-window-quiz-update', dartQUIZ.window.UpdateQuiz);