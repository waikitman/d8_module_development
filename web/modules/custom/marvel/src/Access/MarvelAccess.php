<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-14
 * Time: 12:15
 */
namespace Drupal\marvel\Access;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Routing\Access\AccessInterface;
use Drupal\Core\Session\AccountInterface;

class MarvelAccess implements AccessInterface
{
  protected $configFactory;

  public function __construct(ConfigFactoryInterface $configFactory)
  {
    $this->configFactory = $configFactory;
  }

  public function access(AccountInterface $account) {

    $salutation = $this->configFactory->get('marvel.custom_salutation')->get('salutation');
    dsm($salutation);

    //dsm(in_array('editor', $account->getRoles()));

    if (empty($salutation)) {
      dsm("Salutation empty");
      return AccessResult::allowed();
    }

    dsm("Salutation not empty");
    return AccessResult::forbidden();
  }
}