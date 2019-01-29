<?php

/**
 * @file
 *  Preprocess Fields
 */

/**
 * Implements hook_preprocess_field().
 */
function nrma_preprocess_field(array &$variables, $hook) {
  switch ($variables['element']['#field_name']) {
    // Extract link components for the block button field
    case 'field_button_block_button':
      foreach ($variables['items'] as $key => $item) {
        $variables['items'][$key]['title'] = $item['content']['#title'];
        $variables['items'][$key]['url'] = $item['content']['#url']->toString();
      }
      break;
    case 'field_comp_htxt_most_popular':
      if ($variables['items'][0]['content']['#markup'] == 1) {
        $variables['most_popular'] = TRUE;
      }
      break;
    case 'field_disclaimer_disclaimers':
      // Load our custom service and get all the field contents.
      $pp = \Drupal::service('nrma_state_url.path_processor');
      foreach ($variables['items'] as $key => $item) {
        $paragraph = $item['content']['#paragraph'];
        $field_states = $paragraph->get('field_states')->getValue();
        // Make the caching context based on URL path.
        $variables['#cache']['contexts'][] = 'url.path';
        // Remove the items that are not meant for the selected State
        if (!$pp->containsRequestedState($field_states)) {
          unset($variables['items'][$key]);
        }
      }
      break;
    case 'field_mg_read_more':
    case 'field_comp_hht_backlink':
    case 'field_comp_cc_btn':
      foreach ($variables['items'] as $key => $item) {
        $site_tracking_phrase = $variables['element']['#object']->get('field_site_tracking_phrase')->getValue();
        if($site_tracking_phrase) {
          $variables['items'][$key]['site_tracking_phrase'] = $site_tracking_phrase[0]['value'];
        }
      }
      break;
    case 'field_wrapper_tc_n_item':
      $layout = $variables['element']['#object']->get('field_wrapper_tc_n_layout')->getValue();
      foreach ($variables['items'] as $key => $item) {
        if (!empty($layout[0])) {
          $variables['items'][$key]['layout'] = $layout[0]['value'];
        }
      }
      break;
  }
}
