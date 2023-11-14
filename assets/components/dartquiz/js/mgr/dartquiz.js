var dartQUIZ = function (config) {
    config = config || {};
    dartQUIZ.superclass.constructor.call(this, config);
};
Ext.extend(dartQUIZ, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('dartquiz', dartQUIZ);

dartQUIZ = new dartQUIZ();