<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-08
 * Time: 15:16
 */

/**
 * Implements hook_token_info().
 */
function marvel_token_info() {
  $type = [
    'name' => 'Marvel',
    'description' => 'Tokens related to the Marvel module'
  ];

  $tokens['salutation'] = [
    'name' => 'Salutation',
    'description' => 'Marvel salutation value',
  ];

  return [
    'types' => ['marvel' => $type],
    'tokens' => ['marvel' => $tokens],
  ];
}

/**
 * Implements hook_tokens().
 */
function marvel_tokens($type, $tokens, array $data, array $options, \Drupal\Core\Render\BubbleableMetadata $bubbleable_metadata)
{
  $replacements = [];

  if ($type == 'marvel') {
    foreach ($tokens as $name => $original) {
      switch ($name) {
        // Basic user account information.
        case 'salutation':
          // In the case of hook user_presave uid is not set yet.
          $replacements[$original] = \Drupal::service('marvel.salutation')->getSalutation();
          $config = \Drupal::config('marvel.custom_salutation');
          $bubbleable_metadata->addCacheableDependency($config);

          break;
      }
    }
  }

  return $replacements;
}