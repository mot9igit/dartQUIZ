<?php

class dartQUIZStepUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'dartQUIZStep';
    public $classKey = 'dartQUIZStep';
    public $languageTopics = ['dartquiz'];
    //public $permission = 'save';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }
		$this->object->set('updatedby', $this->modx->user->get('id'));
		$this->object->set('updatedon', time());
		return parent::beforeSave();
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $id = (int)$this->getProperty('id');
        $name = trim($this->getProperty('name'));
        if (empty($id)) {
            return $this->modx->lexicon('dartquiz_quiz_step_err_ns');
        }

        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('dartquiz_quiz_step_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name, 'id:!=' => $id])) {
            $this->modx->error->addField('name', $this->modx->lexicon('dartquiz_quiz_step_err_ae'));
        }

        return parent::beforeSet();
    }
}

return 'dartQUIZStepUpdateProcessor';
