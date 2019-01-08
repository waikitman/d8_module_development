<?php

namespace Drupal\marvel;

use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Config\ConfigFactoryInterface;
use Psr\Container\ContainerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

/**
 * Prepares salutation to all marvel fans
 */
class MarvelSalutation {
  use StringTranslationTrait;

  protected $configFactory;
  protected $eventDispatcher;

  public function __construct(ConfigFactoryInterface $config_factory, EventDispatcherInterface $event)
  {
    $this->configFactory = $config_factory;
    $this->eventDispatcher = $event;
  }

//  public function create(ContainerInterface $container) {
//    return new static($container->get('config.factory'));
//  }

  /**
   * Returns the salutation
   */
  public function getSalutation() {
    $config = $this->configFactory->get('marvel.custom_salutation');
    //dpm($config->get('salutation'), __FUNCTION__);

    // Fetches the value of $_GET['user'] and returns 'nobody'
    // if it does not exist.
    //$username = $_GET['user'] ?? 'nobody';

    $salutation = $config->get('salutation') ?? '';

    if ($salutation) {
      $event = new SalutationEvent();
      $event->setValue($config->get('salutation'));

      $this->eventDispatcher->dispatch(SalutationEvent::EVENT, $event);

      return $event->getValue();
    }

    $time = new \DateTime();
    if ((int) $time->format('H') >= 06 && (int) $time->format('H') < 12) {
      return $this->t('Good morning world');
    }
    if ((int) $time->format('H') >= 12 && (int) $time->format('H') < 18) {
      return $this->t('Good afternoon world');
    }
    if ((int) $time->format('H') >= 18) {
      return $this->t('Good evening world');
    }
  }

}