<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/dartQUIZ/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/dartquiz')) {
            $cache->deleteTree(
                $dev . 'assets/components/dartquiz/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/dartquiz/', $dev . 'assets/components/dartquiz');
        }
        if (!is_link($dev . 'core/components/dartquiz')) {
            $cache->deleteTree(
                $dev . 'core/components/dartquiz/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/dartquiz/', $dev . 'core/components/dartquiz');
        }
    }
}

return true;