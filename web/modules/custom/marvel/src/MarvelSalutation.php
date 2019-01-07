<?php

namespace Drupal\marvel;

use Drupal\Core\Datetime\DateHelper;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Prepares salutation to all marvel fans
 */
class MarvelSalutation {
  use StringTranslationTrait;

  /**
   * Returns the salutation
   */
  public function getSalutation() {
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