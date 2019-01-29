<?php

/**
 * @file
 *  Contains all the hook_preprocess_HOOK() functions.
 */

use Drupal\Core\Url;

/**
 * Implements hook_preprocess_HOOK() for html.html.twig.
 */
function nrma_preprocess_html(array &$variables) {
  try {
    // Get the metatitle
    $meta = nrma_metatags_get();
    if ($meta['title']) {
      $variables['head_title']['title'] = $variables['head_title']['title']->create($meta['title']);
    }
  }
  catch (Exception $e) {
    return;
  }
	// Make the canonocal link absolute for Sajari indexing.
	if (isset($variables['page']['content']['system_main']['#attached']['html_head_link'][0][0])) {
		$canonical_link = $variables['page']['content']['system_main']['#attached']['html_head_link'][0][0]['href'];
		$variables['page']['content']['system_main']['#attached']['html_head_link'][0][0]['href'] = Url::fromUri('internal:' . $canonical_link, array('absolute' => 1))->toString();
	}
}

/**
 * Implements hook_preprocess_HOOK() for Block document templates.
 */
function nrma_preprocess_block(array &$variables) {}

/**
 * Implements hook_preprocess_node().
 */
function nrma_preprocess_node(array &$variables) {
	$node = $variables['node'];
	$bundle = $node->bundle();
	switch ($bundle) {
	    // Preprocess the Media Release content type.
	    case 'media_release':
	    {
	      if (!empty($node->get('field_mediarelease_date')->getValue())) {
	        $date = date_parse($node->get('field_mediarelease_date')->getValue()[0]['value']);
	        $current_date = date_parse(date('Y-m-d'));
	        $month = intval($date['month']);
	        $current_month = intval($current_date['month']);
	        $six_months_old = $current_month - 6;
	        if ($date['year'] !== $current_date['year'] || $month == $six_months_old) {
    			// This node is 6 months old
	    	} 
	      }
	      break;
	    }
    }	
}

/**
 * Implements hook_preprocess_form().
 */
function nrma_preprocess_form(array &$variables) {}

/**
 * Implements hook_preprocess_select().
 */
function nrma_preprocess_select(array &$variables) {}

/**
 * Implements hook_preprocess_details().
 */
function nrma_preprocess_details(array &$variables) {}