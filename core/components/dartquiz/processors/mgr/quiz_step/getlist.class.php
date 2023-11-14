<?php

class dartQUIZStepGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'dartQUIZStep';
    public $classKey = 'dartQUIZStep';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    //public $permission = 'list';


    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $query = trim($this->getProperty('query'));
		$quiz_id = trim($this->getProperty('quiz_id'));
        if ($query) {
            $c->where([
                'name:LIKE' => "%{$query}%",
                'OR:description:LIKE' => "%{$query}%",
            ]);
        }
		if($quiz_id){
			$c->where([
				'quiz_id:=' => $quiz_id,
			]);
		}

        return $c;
    }


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();
        $array['actions'] = [];

        // Edit
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('dartquiz_quiz_step_update'),
            //'multiple' => $this->modx->lexicon('dartquiz_items_update'),
            'action' => 'updateQuizStep',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('dartquiz_quiz_step_enable'),
                'multiple' => $this->modx->lexicon('dartquiz_quiz_steps_enable'),
                'action' => 'enableQuizStep',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('dartquiz_quiz_step_disable'),
                'multiple' => $this->modx->lexicon('dartquiz_quiz_steps_disable'),
                'action' => 'disableQuizStep',
                'button' => true,
                'menu' => true,
            ];
        }

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('dartquiz_quiz_step_remove'),
            'multiple' => $this->modx->lexicon('dartquiz_quiz_steps_remove'),
            'action' => 'removeQuizStep',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'dartQUIZStepGetListProcessor';