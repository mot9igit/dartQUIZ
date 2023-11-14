<?php

class dartQUIZRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'dartQUIZForm';
    public $classKey = 'dartQUIZForm';
    public $languageTopics = ['dartquiz'];
    //public $permission = 'remove';


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

            $object->remove();
        }

        return $this->success();
    }

}

return 'dartQUIZRemoveProcessor';