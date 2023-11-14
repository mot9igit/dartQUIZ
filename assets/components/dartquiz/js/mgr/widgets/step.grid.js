dartQUIZ.grid.Step = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'dartquiz-grid-step';
    }
    Ext.applyIf(config, {
        baseParams: {
            action: 'mgr/quiz_step/getlist',
            sort: 'id',
            dir: 'asc',
            quiz_id: config.record.id
        },
        stateful: true,
    });
    dartQUIZ.grid.Step.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(dartQUIZ.grid.Step, dartQUIZ.grid.Default, {
    getListeners: function () {
        return {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateQuizStep(grid, e, row);
            },
        };
    },

    disableQuizStep: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/quiz_step/disable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        })
    },

    enableQuizStep: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/quiz_step/enable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        })
    },


    createQuizStep: function (btn, e) {
        var w = Ext.getCmp('dartquiz-window-step-create');
        if (w) {
            w.hide().getEl().remove();
        }

        w = MODx.load({
            xtype: 'dartquiz-window-step-create',
            id: 'dartquiz-window-step-create',
            record: this.menu.record,
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.fp.getForm().reset();
        w.fp.getForm().setValues({
            quiz_id: this.config.record.id,
            active: true
        });
        w.show(e.target);
    },

    updateQuizStep: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }

        var w = Ext.getCmp('dartquiz-window-step-update');
        if (w) {
            w.close();
        }
        w = MODx.load({
            xtype: 'dartquiz-window-step-update',
            id: 'dartquiz-window-step-update',
            record: this.menu.record,
            title: this.menu.record['name'],
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.fp.getForm().reset();
        w.fp.getForm().setValues(this.menu.record);
        w.show(e.target);
    },

    removeQuizStep: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('dartquiz_quiz_steps_remove')
                : _('dartquiz_quiz_step_remove'),
            text: ids.length > 1
                ? _('dartquiz_quiz_steps_remove_confirm')
                : _('dartquiz_quiz_step_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/quiz_step/remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },

    getFields: function () {
        return ['id', 'name', 'description', 'active', 'img', 'content', 'type', 'blocking', 'rank', 'quiz_id', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('dartquiz_quiz_id'),
            dataIndex: 'id',
            sortable: true,
            width: 50
        },{
            header: _('dartquiz_quiz_rank'),
            dataIndex: 'rank',
            sortable: true,
            width: 50
        },{
            header: _('dartquiz_quiz_name'),
            dataIndex: 'name',
            sortable: true,
            width: 100
        },{
            header: _('dartquiz_quiz_description'),
            dataIndex: 'description',
            sortable: true,
            width: 200
        },{
            header: _('dartquiz_quiz_active'),
            dataIndex: 'active',
            renderer: dartQUIZ.utils.renderBoolean,
            sortable: true,
            width: 50,
        }, {
            header: _('dartquiz_grid_actions'),
            dataIndex: 'actions',
            renderer: dartQUIZ.utils.renderActions,
            sortable: false,
            width: 100,
            id: 'actions'
        }];
    },

    getTopBar: function () {
        return [{
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('dartquiz_quiz_step_create'),
            handler: this.createQuizStep,
            scope: this
        }, '->', {
            xtype: 'dartquiz-field-search',
            width: 250,
            listeners: {
                search: {
                    fn: function (field) {
                        this._doSearch(field);
                    }, scope: this
                },
                clear: {
                    fn: function (field) {
                        field.setValue('');
                        this._clearSearch();
                    }, scope: this
                },
            }
        }];
    },
});
Ext.reg('dartquiz-grid-step', dartQUIZ.grid.Step);