<?php

/**
 * @file
 *  Preprocess page
 */

/**
 * Implements hook_preprocess_page()
 */
function nrma_preprocess_page(array &$variables) {
  // Set the logo from the system
  $variables['logo'] = '';
  $logo = '';
  $logo = theme_get_setting('logo.url');
  if($logo != '') {
    $variables['logo'] = $logo;
  }
  // Get current state.
  $state_preprocessor = \Drupal::service('nrma_state_url.path_processor');
  $current_state = $state_preprocessor->getRequestedState(TRUE);
  // Menu service.
  $menu_service = \Drupal::service('nrma_services.menu_render');
  $footer_nrma_html = $menu_service->menuRender('footer-nrma');
  $footer_our_products_html = $menu_service->menuRender('footer-products');
  $quicklinks_html = $menu_service->menuRender('footer-quicklinks');

  $variables['footer_nrma_menu'] = $footer_nrma_html;
  $variables['footer_our_products_menu'] = $footer_our_products_html;
  $variables['footer_quicklinks_menu'] = $quicklinks_html;

  // Get a Quote process.
  $quote_service = \Drupal::service('nrma_quote.quote_service');
  $categories = $quote_service->getProductCategoryByState(strtolower($current_state));
  $variables['quote_current_state'] = $current_state;
  $variables['quote_states'] = $state_preprocessor->getStates();
  $variables['quote_link']['url'] = 'iag/get-quote';
  $variables['quote_categories'] = $categories;

  // Custom disclaimer.
  if (!empty($variables['node'])) {
    // field_page_custom_legal
    $node = $variables['node'];
    if ($node->hasField('field_page_custom_legal')) {
      $disclaimer_service = \Drupal::service('nrma_services.custom_legal');
      $disclaimer = $disclaimer_service->getRenderedDisclaimerByState($node, strtolower($current_state));
      $variables['custom_disclaimer'] = $disclaimer;
    }
  }
}