<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-07
 * Time: 17:04
 */
namespace Drupal\marvel;

use Symfony\Component\EventDispatcher\Event;

/**
 * TODO Use the event. Page 84 of book.
 * Class SalutationEvent
 * @package Drupal\marvel
 */
class SalutationEvent extends Event
{
  const EVENT = 'marvel.salutation_event';

  /**
   * The salutation message.
   */
  protected $message;

  public function getValue() {
    return $this->message;
  }

  public function setValue($message) {
    $this->message = (string)$message;
  }
}