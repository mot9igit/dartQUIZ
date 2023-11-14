<?php

/**
 * The home manager controller for dartQUIZ.
 *
 */
class dartQUIZHomeManagerController extends modExtraManagerController
{
    /** @var dartQUIZ $dartQUIZ */
    public $dartQUIZ;


    /**
     *
     */
    public function initialize()
    {
		$corePath = $this->modx->getOption('dartquiz_core_path', array(), $this->modx->getOption('core_path') . 'components/dartquiz/');
        $this->dartQUIZ = $this->modx->getService('dartQUIZ', 'dartQUIZ', $corePath . 'model/');
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return ['dartquiz:default'];
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('dartquiz');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->dartQUIZ->config['cssUrl'] . 'mgr/main.css');
        $this->addJavascript($this->dartQUIZ->config['jsUrl'] . 'mgr/dartquiz.js');
        $this->addJavascript($this->dartQUIZ->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->dartQUIZ->config['jsUrl'] . 'mgr/misc/combo.js');
		$this->addJavascript($this->dartQUIZ->config['jsUrl'] . 'mgr/misc/default.grid.js');
		$this->addJavascript($this->dartQUIZ->config['jsUrl'] . 'mgr/misc/default.windows.js');
        $this->addJavascript($this->dartQUIZ->config['jsUrl'] . 'mgr/widgets/quiz.grid.js');
        $this->addJavascript($this->dartQUIZ->config['jsUrl'] . 'mgr/widgets/quiz.windows.js');
		$this->addJavascript($this->dartQUIZ->config['jsUrl'] . 'mgr/widgets/step.grid.js');
		$this->addJavascript($this->dartQUIZ->config['jsUrl'] . 'mgr/widgets/step.windows.js');
        $this->addJavascript($this->dartQUIZ->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->dartQUIZ->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('<script type="text/javascript">
        dartQUIZ.config = ' . json_encode($this->dartQUIZ->config) . ';
        dartQUIZ.config.connector_url = "' . $this->dartQUIZ->config['connectorUrl'] . '";
        Ext.onReady(function() {MODx.load({ xtype: "dartquiz-page-home"});});
        </script>');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        $this->content .= '<div id="dartquiz-panel-home-div"></div>';

        return '';
    }
}