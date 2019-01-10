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
    // private_tempstore
    $factory = \Drupal::service('user.private_tempstore');
    $privateStore = $factory->get('wkm_test.my_collection');
    $privateStore->set('first_name', 'Wai');
    $privateStore->set('last_name', 'Man');
//    $store->delete('name');
//    $store->delete('type');
    dsm($privateStore->getMetadata('first_name'));

    // shared tempstore
    $sharedFactory = \Drupal::service('tempstore.shared');
    $sharedStore = $sharedFactory->get('wkm_test.my_collection');
    $sharedStore->set('shared_first_name', 'Lucas');
    dsm($sharedStore->getMetadata('shared_first_name'));

    // user data
    /** @var UserDataInterface $userData */
    $userData = \Drupal::service('user.data');
    $userData->set('wkm_test', \Drupal::currentUser()->getAccount()->id(), 'nickname', 'Turbo');
    $userData->set('wkm_test', \Drupal::currentUser()->getAccount()->id(), 'preferences', new \stdClass());
    $nickname = $userData->get('wkm_test', \Drupal::currentUser()->getAccount()->id(), 'nickname');
    dsm($nickname);

    return[
      '#markup' =>
        "Example of tempstore<br>" .
        "Private stored value is {$privateStore->get('first_name')} {$privateStore->get('last_name')}" .
        "Shared stored value is {$sharedStore->get('shared_first_name')}" .
        print_r($sharedStore->getMetadata('shared_first_name'), 1)
      ,
    ];
  }
}