<?php

class dartQUIZStepDisableProcessor extends modObjectProcessor
{
    public $objectType = 'dartQUIZStep';
    public $classKey = 'dartQUIZStep';
    public $languageTopics = ['dartquiz'];
    //public $permission = 'save';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('dartquiz_quiz_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var dartQUIZItem $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('dartquiz_quiz_err_nf'));
            }

            $object->set('active', false);
            $object->save();
        }

        return $this->success();
    }

	/**
	 * @return bool|string
	 */
	public function beforeSave()
	{
		$this->object->set('updatedby', $this->modx->user->get('id'));
		$this->object->set('updatedon', time());
		return parent::beforeSave();
	}

}

return 'dartQUIZStepDisableProcessor';
