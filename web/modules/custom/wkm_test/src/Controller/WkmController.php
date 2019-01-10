<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-08
 * Time: 16:09
 */
namespace Drupal\wkm_test\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;

class WkmController extends ControllerBase
{

  public function content() {
    $links = [
      [
        'title' => 'Link 1',
        'url' => URL::fromRoute("<front>")
      ],
      [
        'title' => 'Link 2',
        'url' => URL::fromRoute("marvel.examples")
      ],
    ];



//    $url = URL::fromRoute("<front>");
//    $link = \Drupal::linkGenerator()->generate("Test link", $url);
//    dsm($link->__toString());
//
//
//    $link2 = \Drupal::service('link_generator')->generate('Test link 2', Url::fromRoute('<front>'));
//    dsm($link2->__toString());

//    return [
//      '#markup' => "WKM example"
//    ];

    return [
      '#theme' => 'links',
      '#links' => $links,
      '#set_active_class' => true,
    ];
  }

  public function state_example() {

    // Set single state variable
    \Drupal::state()->set('wkm_test.game', 'Overwatch');
    $title = \Drupal::state()->get('wkm_test.game');

    // Set multiple values
    \Drupal::state()->setMultiple(['wkm_test.reaper' => 'attack', 'wkm_test.mercy' => 'support']);
    $characters = \Drupal::state()->getMultiple(['wkm_test.reaper', 'wkm_test.mercy']);
    dpm($characters);

    $hanzo = \Drupal::state()->get('wkm_test.hanzo');
    dsm($hanzo);
    \Drupal::state()->delete('wkm_test.hanzo');
    $hanzo = \Drupal::state()->get('wkm_test.hanzo');
    dsm($hanzo);


    return [
      '#theme' => 'wkm_test_state_example',
      '#title' => $title,
      '#characters' => $characters,
    ];
  }

  public function tempstore_example() {
    $factory = \Drupal::service('user.private_tempstore');
    $store = $factory->get('wkm_test.my_collection');
    $store->set('first_name', 'Wai');
    $store->set('last_name', 'Man');
//    $store->delete('name');
//    $store->delete('type');
    dpm($store->getMetadata('first_name'));

    return[
      '#markup' =>
        "Example of tempstore<br>" .
        "Stored value is {$store->get('first_name')} {$store->get('last_name')}"
      ,
    ];
  }
}