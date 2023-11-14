<?php

class dartQUIZCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'dartQUIZForm';
    public $classKey = 'dartQUIZForm';
    public $languageTopics = ['dartquiz'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('dartquiz_quiz_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name])) {
            $this->modx->error->addField('name', $this->modx->lexicon('dartquiz_quiz_err_ae'));
        }

        return parent::beforeSet();
    }

	/**
	 * @return bool|string
	 */
	public function beforeSave()
	{
		$this->object->set('createdby', $this->modx->user->get('id'));
		$this->object->set('createdon', time());
		return parent::beforeSave();
	}

}

return 'dartQUIZCreateProcessor';