<?php

/**
 * @file
 *  Helper functions for preprocess and other hooks in nrma theme.
 */

/**
 * Extract absolute url from media field inside a paragraph.
 * @param
 *  $paragraph: Paragraph object
 * @param
 *  $mfield: Name of the media field
 */
function _nrma_extract_media_image_url($paragraph, $mfield) {
  $field = $paragraph->get($mfield)->getValue();
  $target_id = isset($field['0']) ? $field['0']['target_id'] : '';
  if ($target_id != '') {
    return _nrma_get_media_image_url($target_id);
  }
}

/**
 * Get absolute url of media type 'image' from media id.
 * @param
 *  $id: Media id.
 */
function _nrma_get_media_image_url($id) {
  
  $entity = \Drupal::entityTypeManager()->getStorage("media")->load($id);
  
  $image_array = array();
  $image_array['uri'] = '';
  $image_array['url'] = '';
  $image_array['alt'] = '';
  $image_array['title'] = '';
  
  if (isset($entity->field_media_image->entity)) {
    $image_array['url'] = $entity->field_media_image->entity->url();
  }
  if(isset($entity->field_media_image_1->entity)){
    $image_array['url'] = $entity->field_media_image_1->entity->url();
  }
  
  
  if(isset($entity->field_media_image_2->entity)){
    $image_uri = '';
    $image_array = array();
    $image_array = $entity->field_media_image_2->entity->uri->getValue();
    
    $image_url = $entity->field_media_image_2->entity->url();
    $image_url = isset($image_url)? $image_url : '';
    
    if(!empty($image_array)) {
      $image_uri = $image_array[0]['value'];
    }
    
    $image_attributes = $entity->field_media_image_2->getValue();
    $image_alt = '';
    $image_title = '';
    
    if(isset($image_attributes)) {
      $image_alt = $image_attributes[0]['alt'];
      $image_title = $image_attributes[0]['title'];
    }
    $image_array['uri'] = $image_uri;
    $image_array['url'] = $image_url;
    $image_array['alt'] = $image_alt;
    $image_array['title'] = $image_title;
  }
  return $image_array;
}

/**
 * @param $bytes
 * @param int $precision
 *
 * @return string
 */
function _nrma_format_bytes($bytes, $precision = 2) {
  $units = array('B', 'KB', 'MB', 'GB', 'TB');

  $bytes = max($bytes, 0);
  $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
  $pow = min($pow, count($units) - 1);

  // Uncomment one of the following alternatives
  $bytes /= pow(1024, $pow);
  // $bytes /= (1 << (10 * $pow));

  return round($bytes, $precision) . ' ' . $units[$pow];
}

/**
 * Get the site tracking value from menu
 */

function _nrma_set_site_tracking_phrase(&$variables) {
  foreach($variables['items'] as $key => $item) { // traversing the main menu items        
    $content = $item['content']['#menu_link_content'];
    if(isset($content->field_site_tracking_phrase)){ // preprocess the Site tracking field
      $variables['items'][$key]['site_tracking_phrase'] = $content->get('field_site_tracking_phrase')->value;
    }
    if(isset($content->field_accessibility_label)){ // preprocess the Accessibility Label field
      $variables['items'][$key]['aria_label'] = $content->get('field_accessibility_label')->value;
    }
  }
}

/**
 * Get the id for sticky anchor.
 */
function _nrma_get_id_for_sticky_anchor($paragraph) {
  // Check the Subnav settings
  $subnav_title = $paragraph->get('field_sticky_subnav_title')->getValue();
  if (!empty($subnav_title)) {
    return Drupal\Component\Utility\Html::getId($subnav_title[0]['value']);
  }
  return $paragraph->get('id')->getValue()[0]['value'];
}

/**
 * Get different image presets
 */
function _nrma_get_image_by_presets($presets, $image_array, &$variables) {
  
  if(!empty($presets)) {
    
    foreach($presets as $key => $aPreset) {
      $style = \Drupal::entityTypeManager()->getStorage('image_style')->load($aPreset);
      if(!empty($image_array['uri'])) {
        $img_url = $style->buildUrl($image_array['uri']);
        $variables[$key] = $img_url;
      }
    }
    if(!empty($image_array['alt'])) {
      $variables['img_alt'] = $image_array['alt'];
    }
    if(!empty($image_array['title'])) {
      $variables['img_title'] = $image_array['title'];
    }
    
  }
  
}
