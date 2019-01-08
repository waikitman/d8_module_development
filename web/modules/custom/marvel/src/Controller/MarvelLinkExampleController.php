<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-07
 * Time: 15:10
 */

namespace Drupal\marvel\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

class MarvelLinkExampleController extends ControllerBase
{
  public function content() {
    $urlA = Url::fromRoute('marvel.content', ['param' => 'machine_name_of_form']);
    $linkA = \Drupal::service('link_generator')->generate('Link generator service', $urlA);

    $urlB = Url::fromRoute('marvel.greeting_form');
    $linkB = Link::fromTextAndUrl('Link class', $urlB);

    $output = "<p>$linkA</p>";
    $output .= "<p>". \Drupal::service('link_generator')->generateFromLink($linkB) ."</p>";
    $output .= "<p>". \Drupal::service('link_generator')->generate('RTE', Url::fromRoute('marvel.responseTextExample')) ."</p>";
    $output .= "<p>". \Drupal::service('link_generator')->generate('RRE', Url::fromRoute('marvel.redirectResponseExample')) ."</p>";

    return [
      '#markup' => $output
    ];
  }

  public function responseTextExample() {
    // bypass majority of theming from Drupal.
    return new Response("Response text");
  }

  public function redirectResponseExample() {
    return new RedirectResponse("marvel.content"); // node/1
  }

  public function restrictExample() {
    return new Response("Response text");
    // bypass majority of theming from Drupal.
//    return [
//      '#markup' => "Restricted area",
//    ];
  }
}