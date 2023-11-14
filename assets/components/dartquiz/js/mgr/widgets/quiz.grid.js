dartQUIZ.grid.Quiz = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'dartquiz-grid-quiz';
    }
    Ext.applyIf(config, {
        baseParams: {
            action: 'mgr/quiz/getlist',
            sort: 'id',
            dir: 'asc'
        },
        stateful: true,
    });
    dartQUIZ.grid.Quiz.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(dartQUIZ.grid.Quiz, dartQUIZ.grid.Default, {
    getListeners: function () {
        return {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateQUIZ(grid, e, row);
            },
        };
    },

    disableQuiz: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/quiz/disable',
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

    enableQuiz: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/quiz/enable',
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


    createQUIZ: function (btn, e) {
        var w = Ext.getCmp('dartquiz-window-quiz-create');
        if (w) {
            w.hide().getEl().remove();
        }

        w = MODx.load({
            xtype: 'dartquiz-window-quiz-create',
            id: 'dartquiz-window-quiz-create',
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
        w.show(e.target);
    },

    updateQUIZ: function (btn, e, row) {
        // TODO: WINDOW or PAGE??
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }

        var w = Ext.getCmp('dartquiz-window-quiz-update');
        if (w) {
            w.close();
        }
        w = MODx.load({
            xtype: 'dartquiz-window-quiz-update',
            id: 'dartquiz-window-quiz-update',
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

    removeQuiz: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('dartquiz_quizs_remove')
                : _('dartquiz_quiz_remove'),
            text: ids.length > 1
                ? _('dartquiz_quizs_remove_confirm')
                : _('dartquiz_quiz_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/quiz/remove',
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
        return ['id', 'name', 'description', 'active', 'progress', 'content', 'btn_next', 'btn_prev', 'btn_submit', 'btn_start', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('dartquiz_quiz_id'),
            dataIndex: 'id',
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
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('dartquiz_quiz_create'),
            handler: this.createQUIZ,
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
Ext.reg('dartquiz-grid-quiz', dartQUIZ.grid.Quiz);