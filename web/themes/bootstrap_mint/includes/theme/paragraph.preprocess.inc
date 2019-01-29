<?php

/**
 * @file
 *  Preprocess Paragraphs
 */

use Drupal\paragraphs\Entity\Paragraph;
use Drupal\taxonomy\Entity\Term;
use Drupal\Component\Utility\Html;
use \Drupal\Core\Url;
use Drupal\media\Entity\Media;

function bootstrap_mint_preprocess_paragraph__wysiwyg(&$variables) {
  dpm(__FUNCTION__);
  if (!array_key_exists('paragraph', $variables)){
    return;
  }

  $paragraph = $variables['paragraph'];
  $text = $paragraph->get('field_text_long')->getValue();
  dpm($text);
  $variables['trimmed_long_text'] = substr($text[0]['value'], 10, 100);


}

function bootstrap_mint_preprocess_paragraph(array &$variables) {

  // If the variables have been deleted, abort.
  if (!array_key_exists('paragraph', $variables)){
    return;
  }

  $paragraph = $variables['paragraph'];
  $bundle = $paragraph->bundle();

  //$function = __FUNCTION__ . '__' . $bundle;
//  if (function_exists($function)) {
//    $function($variables);
//  }


  switch ($bundle) {
    // Preprocess the Loyalty Calculator component.
    case 'component_loyalty_calculator':
      {    
        if (!empty($paragraph->get('field_comp_lc_background_color')->getValue())) {
          $background_color = $paragraph->get('field_comp_lc_background_color')->getValue()[0]['value'];
          $variables['background_color'] = $background_color;
        }  
        break;
      }
    // Preprocess the Card component.
    case 'component_card':
      {
        if (!empty($paragraph->get('field_comp_c_icon')->getValue())) {
          $card_icon = $paragraph->get('field_comp_c_icon')->getValue()[0]['value'];
          $variables['card_icon'] = $card_icon;
        }
        if (!empty($paragraph->get('field_comp_c_background_color')->getValue())) {
          $background_color = $paragraph->get('field_comp_c_background_color')->getValue()[0]['value'];
          $variables['background_color'] = $background_color;
        }
        break;
      }

    // Preprocess the Media Card Callout Row subcomponent.
    // We are creating 3 layouts here - 3 col, 2 col and magazine.
    // 3 col = 3 cards, 2 col = 2 cards, magazine = card/img or img/card.
    case 'subcomponent_mcc_row':
      {
        $col = 'magazine';
        
        $parent_para = $paragraph->getParentEntity();

        try {
          $layout_field = $parent_para->get('field_mcc_layout')->getValue();

          if(!empty($layout_field)) {
            $layout = $layout_field[0]['value'];
            if(!empty($layout)) {
              $col = $layout;
            }
          }
        }
        catch (Exception $e) {
          dsm($e);
        }

        $variables['layout'] = $col;
        break;
      }
      
    // Prepare the anchor menu from anchor components.
    case 'component_anchors':
      {
        // Load our custom service and get all the node contents.
        $pp = \Drupal::service('nrma_state_url.path_processor');
        $node = $paragraph->getParentEntity();
        $contents = $node->get('field_page_content')->getValue();

        // Iterate through the top level paragraphs looking for anchors.
        foreach ($contents as $content) {
          $para = Paragraph::load($content['target_id']);

          if ($para->bundle() == 'wrapper_one_column' ||
            $para->bundle() == 'wrapper_two_columns' ||
            $para->bundle() == 'wrapper_three_columns' ||
            $para->bundle() == 'component_media_grid_wrapper' ||
            $para->bundle() == 'wrapper_two_col_narrow' ||
            $para->bundle() == 'component_narrow_wrapper' ||
            $para->bundle() == 'component_disclaimer_wrapper' || 
            $para->bundle() == 'component_media_card_callout' || 
            $para->bundle() == 'component_media_overlap') {

            $field_states = $para->get('field_states')->getValue();
            // Make the caching context based on URL path.
            $variables['#cache']['contexts'][] = 'url.path';
            // Only add the anchor if it's got the requested state ticked.
            if ($pp->containsRequestedState($field_states)) {
              if(!empty($para->get('field_sticky_subnav_title')->getValue()[0]['value'])){
                $subnav_title = $para->get('field_sticky_subnav_title')->getValue()[0]['value'];
                $anchor_id = Html::getId($subnav_title);
                $site_tracking_phrase = '';
                if(!empty($para->get('field_site_tracking_phrase')->getValue()[0]['value'])){
                  $site_tracking_phrase = $para->get('field_site_tracking_phrase')->getValue()[0]['value'];
                }
                $aria_label = '';
                if(!empty($para->get('field_accessibility_label')->getValue()[0]['value'])){
                  $aria_label = $para->get('field_accessibility_label')->getValue()[0]['value'];
                }
                $anchor = [
                  'id' => $anchor_id,
                  'label' => $subnav_title,
                  'site_tracking_phrase' => $site_tracking_phrase,
                  'aria_label' => $aria_label
                ];
                $variables['anchors'][] = $anchor;
              }
            }
          }
        }
        break;
      }
    // Preprocess the Full Banner component
    case 'component_full_banner':
      {
        // Check if the field is set and if the content is not cleared by the nrma_state_url module.
        if(isset($paragraph->field_comp_fb_bg_image->entity) && !empty($variables['content'])) {
          $variables['content']['full_banner_background_image'] = $paragraph->field_comp_fb_bg_image->entity->url();
        }
        //Get site tracking phrase
        $site_tracking_phrase = $paragraph->get('field_site_tracking_phrase')->getValue();
        if(!empty($site_tracking_phrase[0]['value'])){
          $variables['content']['site_tracking_phrase'] = $site_tracking_phrase[0]['value'];
        }

        break;
      }
    // Preprocess the Accordion component
    case 'component_accordion':
      {
        $accordion_id = Html::getUniqueId('accordion');
        $variables['accordion_id'] = $accordion_id;
        break;
      }
    // Preprocess the Accordion with icon component
    case 'component_accordion_icon':
      {
        $accordion_id = Html::getUniqueId('accordion');
        $variables['accordion_id'] = $accordion_id;
        break;
      }  
    // Preprocess the H1 text component
    case 'comp_heading_block_h1':
      {
        $fluid = FALSE;
        $parent_para = $paragraph->getParentEntity();
        if ($parent_para->bundle() == 'wrapper_two_columns') {
          $layout = $parent_para->get('field_wrapper_tc_layout')->getValue();
          if(isset($layout[0]) && !empty($layout[0])){
            $find_fluid = strpos($layout[0]['value'], 'f');
            if($find_fluid !== FALSE){
              $fluid = TRUE;
            }
          }
        }
        $variables['fluid'] = $fluid;

        break;
      }
    // Preprocess the H1 text component
    case 'comp_heading_block_h2':
      {
        $fluid = FALSE;
        $parent_para = $paragraph->getParentEntity();
        if ($parent_para->bundle() == 'wrapper_two_columns') {
          $layout = $parent_para->get('field_wrapper_tc_layout')->getValue();
          if(isset($layout[0]) && !empty($layout[0])){
            $find_fluid = strpos($layout[0]['value'], 'f');
            if($find_fluid !== FALSE){
              $fluid = TRUE;
            }
          }
        }
        $variables['fluid'] = $fluid;

        break;
      }
    // Preprocess the H1 text component
    case 'component_mh_image':
      {
        $image_array = _nrma_extract_media_image_url($paragraph, 'field_comp_media_crop');

        if(!empty($image_array)) {
          
          $presets['desktop_img'] = 'hero_header_image_desktop';
          $presets['tablet_img'] = 'hero_header_image_tablet';
          $presets['mobile_img'] = 'hero_header_image_mobile';
          _nrma_get_image_by_presets($presets, $image_array, $variables);          
        }
        break;
      }
    // Preprocess the H1 text component
    case 'subcomponent_accordion_items':
      {
        //Get the site tracking field value
        $site_tracking_array = $paragraph->get('field_site_tracking_phrase')->getValue();
        if(isset($site_tracking_array[0]) && !empty($variables['content'])) {
          $variables['content']['site_tracking_phrase'] = $site_tracking_array[0]['value'];
        }
        //Get the accessibility label field value
        $aria_label = $paragraph->get('field_accessibility_label')->getValue();
        if(isset($aria_label[0]) && !empty($variables['content'])) {
          $variables['content']['aria_label'] = $aria_label[0]['value'];
        }
        break;
      }
    // Preprocess the accordion items with icon component
    case 'subcomponent_accordion_items_icn':
      {
      
        //Get the site tracking field value
        $site_tracking_array = $paragraph->get('field_site_tracking_phrase')->getValue();
        if(isset($site_tracking_array[0]) && !empty($variables['content'])) {
          $variables['content']['site_tracking_phrase'] = $site_tracking_array[0]['value'];
        }
        //Get the accessibility label field value
        $aria_label = $paragraph->get('field_accessibility_label')->getValue();
        if(isset($aria_label[0]) && !empty($variables['content'])) {
          $variables['content']['aria_label'] = $aria_label[0]['value'];
        }
        
        //Get the default expanded or collapsed option value
        $default_expanded = $paragraph->get('field_default_expanded')->getValue();
        
        if(isset($default_expanded[0]) && !empty($variables['content'])) {
          $variables['content']['default_expanded_flag'] = $default_expanded[0]['value'];
        }
        break;
        
      }
      
    case 'subcomponent_mg_tiles':
      {
        $site_tracking_array = $paragraph->get('field_site_tracking_phrase')->getValue();
        if(isset($site_tracking_array[0]) && !empty($variables['content'])) {
          $variables['content']['site_tracking_phrase'] = $site_tracking_array[0]['value'];
        }
        
        $image_field = $paragraph->get('field_mg_image')->getValue();
        
        if(!empty($image_field)) {
          $imageUrl = $paragraph->get('field_mg_image')->entity->url();
        }
        
        if(!empty($imageUrl)) {
          $variables['image_url'] = $imageUrl;
          $variables['img_alt'] = $image_field[0]['alt'];
          $variables['img_title'] = $image_field[0]['title'];          
        }
        
        break;
      }
  }

}

/**
 * Implements hook_preprocess_paragraph__component_mt().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_mt(&$variables) {
  // Load our custom service and get all the node contents.
  $state_preprocessor = \Drupal::service('nrma_state_url.path_processor');

  $paragraph = $variables['paragraph'];

  // Get orientation of the items.
  $orientation_field_value = $paragraph->get('field_mt_orientation')->getValue();
  $orientation = isset($orientation_field_value['0']) ?
    $orientation_field_value['0']['value'] : '';

  // Get paragraph title.
  $title_field_value = $paragraph->get('field_mt_title')->getValue();
  $mt_title = isset($title_field_value['0']) ?
    $title_field_value['0']['value'] : '';

  // Media and Text Item Fields.
  $tiles = array();
  $media_text_tiles = $paragraph->get('field_mt_tile')->getValue();
  // Iterate tiles.
  foreach ($media_text_tiles as $media_text_tile) {
    // Load paragraph.
    $target_id = $media_text_tile['target_id'];
    $media_text_tile = Paragraph::load($target_id);

    // State validation.
    $states = $media_text_tile->get('field_states')->getValue();
    if ($state_preprocessor->containsRequestedState($states)) {
      // Get title value.
      $field_mt_item_title_value = $media_text_tile->get('field_mt_item_title')->getValue();
      $tile_title = isset($field_mt_item_title_value['0']) ?
        $field_mt_item_title_value['0']['value'] : '';

      // Get content value.
      $html = '';
      $field_mt_item_content_value = $media_text_tile->get('field_mt_item_content')->getValue();

      $tile_content = isset($field_mt_item_content_value['0']) ?
        $field_mt_item_content_value['0']['value'] : '';
      $result =  array(
        '#markup' => $tile_content,
      );
      $renderer = \Drupal::service('renderer');
      $html = $renderer->render($result);
      $img_array = _nrma_extract_media_image_url($media_text_tile, 'field_mt_item_image');

      if ($tile_title != '') {
        $tiles[$target_id]['title'] = $tile_title;
      }
      if ($html != '') {
        $tiles[$target_id]['content'] = $html;
      }
      if (!empty($img_array)) {
        $tiles[$target_id]['img'] = $img_array['uri'];
        $tiles[$target_id]['alt'] = $img_array['alt'];
        $tiles[$target_id]['title'] = $img_array['title'];
      }
    }
  }

  if (empty($tiles)) {
    return;
  }
  $variables['title'] = $mt_title;
  $variables['orientation'] = $orientation;
  $variables['tiles'] = $tiles;

}

/**
 * Implements hook_preprocess_paragraph__paragraph().
 */
function nrma_preprocess_paragraph__component_media(&$variables) {
  
  $paragraph = $variables['paragraph'];
  
  if ($variables['nrma_state_filter'] == FALSE) {
    
    $image_array = _nrma_extract_media_image_url($paragraph, 'field_comp_media_media');
    if(!empty($image_array)) {
      $variables['image'] = $image_array['url'];
    }
     
    $parent_para = $paragraph->getParentEntity();
    
    if(!empty($image_array)) {
      if($parent_para->bundle() == 'subcomponent_mcc_row') {
        $presets['desktop_img'] = 'media_card_callout_desktab';
        _nrma_get_image_by_presets($presets, $image_array, $variables);        
      }
      if($parent_para->bundle() == 'comp_inc_list_cout_row') {
        $presets['desktop_img'] = 'inclusion_list_callout_desktop';
        $presets['mobile_img'] = 'inclusion_list_callout_mobile';
        _nrma_get_image_by_presets($presets, $image_array, $variables);
      }
    }    
  }
  
}

/**
 * Implements hook_preprocess_paragraph__paragraph().
 */
function nrma_preprocess_paragraph__component_media_overlap(&$variables) {
  $paragraph = $variables['paragraph'];
  // Get the imag url from media entity.
  if ($variables['nrma_state_filter'] == FALSE) {
    
    $image_array = _nrma_extract_media_image_url($paragraph, 'field_comp_mo_image');

    if(!empty($image_array)) {
      $presets['desktop_img'] = 'media_overlap_desktop';
      $presets['tablet_img'] = 'media_overlap_tablet';
      $presets['mobile_img'] = 'media_overlap_mobile';
      _nrma_get_image_by_presets($presets, $image_array, $variables);
    }    
  }
  // Check the Subnav settings
  $subnav_title = $paragraph->get('field_sticky_subnav_title')->getValue();
  if(!empty($subnav_title)) {
    $variables['id'] = Html::getId($subnav_title[0]['value']);
  }
}

/**
 * Implements hook_preprocess_paragraph__wrapper_one_column().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__wrapper_one_column(&$variables) {
  $paragraph = $variables['paragraph'];
  // Check the Subnav settings
  $subnav_title = $paragraph->get('field_sticky_subnav_title')->getValue();
  if(!empty($subnav_title)) {
    $variables['id'] = Html::getId($subnav_title[0]['value']);
  }
  $contents = $paragraph->get('field_wrapper_oc_content')->getValue();
  $orientation = '';
  $para_type = array();
  $full_banner_class = '';
  foreach ($contents as $content) {
    $para = Paragraph::load($content['target_id']);
    if($para->bundle() == 'component_mt') {
      $para_type[] = 'component_mt';
      $orientation = $para->get('field_mt_orientation')->getValue()[0]['value'];
    }
    if($para->bundle() == 'component_full_banner') {
      $para_type[] = 'component_full_banner';
    }
    if($para->bundle() == 'component_popular_links') {
      $variables['popular_link_class'] = ' c-popular-links';
    }
  }
  $variables['para_type'] = $para_type;
  $variables['orientation'] = $orientation;

}

/**
 * Implements hook_preprocess_paragraph__paragraph().
 */
function nrma_preprocess_paragraph__component_mt_item(&$variables) {
  $paragraph = $variables['paragraph'];
  // Get the imag url from media entity.
  if ($variables['nrma_state_filter'] == FALSE) {
    $image_array = _nrma_extract_media_image_url($paragraph, 'field_mt_item_image');
    $variables['image'] = $image_array['uri'];
    $variables['alt'] = $image_array['alt'];
    $variables['title'] = $image_array['title'];
  }
  $variables['orientation'] = &drupal_static('_stacked_media_tiles_orientation');
}

/**
 * Implements hook_preprocess_paragraph__paragraph().
 */
function nrma_preprocess_paragraph__comp_stacked_media_tiles(&$variables) {
  $paragraph = $variables['paragraph'];

  // Get orientation of the items.
  $orientation_field_value = $paragraph->get('field_mt_orientation')->getValue();
  $orientation = isset($orientation_field_value['0']) ?
    $orientation_field_value['0']['value'] : '';
  $variables['orientation'] = $orientation;
  $_stacked_media_tiles_orientation = &drupal_static('_stacked_media_tiles_orientation');
  $_stacked_media_tiles_orientation = $orientation;
}

/**
 * Implements hook_preprocess_paragraph__wrapper_two_columns().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__wrapper_two_columns(&$variables) {
  $paragraph = $variables['paragraph'];
  $layout = $paragraph->get('field_wrapper_tc_layout')->getValue();
  $fluid = false;
  $first_col_width = 'order-md-1 col-md-6';
  $second_col_width = 'order-md-2 col-md-6';
  $container_class = 'container';
  $mobile_stack_order_class_1 = $paragraph->get('field_mobile_stack_order_col_1')->getValue();
  $mobile_stack_order_class_2 = $paragraph->get('field_mobile_stack_order_col_2')->getValue();
  $row_class = 'row';
  // Pass the layout to the template.
  if (isset($layout[0]) && !empty($layout[0])) {
    $find_fluid = strpos($layout[0]['value'], 'f');
    $first_col_width = 'order-md-1 col-md-' . substr($layout[0]['value'], 0, 1);
    $second_col_width = ' order-md-2 col-md-' . substr($layout[0]['value'], 1, 1);

    if($find_fluid !== FALSE){
      $fluid = TRUE;
      $container_class = 'container-fluid';
      $row_class = 'row no-gutters';
    }
  }
  if(isset($mobile_stack_order_class_1[0]) && !empty($mobile_stack_order_class_1[0])) {
    $first_col_width = $mobile_stack_order_class_1[0]['value'] . ' ' . $first_col_width;
  }
  if(isset($mobile_stack_order_class_2[0]) && !empty($mobile_stack_order_class_2[0])) {
    $second_col_width = $mobile_stack_order_class_2[0]['value'] . ' ' . $second_col_width;
  }

  $variables['fluid'] = $fluid;
  $variables['first_col_classes'] = $first_col_width;
  $variables['second_col_classes'] = $second_col_width;
  $variables['container_class'] = $container_class;
  $variables['row_class'] = $row_class;
  $variables['mob_stack_order_1'] = $mobile_stack_order_class_1;
  $variables['mob_stack_order_2'] = $mobile_stack_order_class_2;

  // Check the Subnav settings
  $subnav_title = $paragraph->get('field_sticky_subnav_title')->getValue();

  if(!empty($subnav_title)) {
    $variables['id'] = Html::getId($subnav_title[0]['value']);
  }

  //Preprocess class for the inclusions table when it is in the second column
  $contents = $paragraph->get('field_wrapper_tc_second_column')->getValue();
  foreach ($contents as $content) {
    $para = Paragraph::load($content['target_id']);
    if($para->bundle() == 'component_inclusions_table_wrap') {
      $variables['second_col_classes'] .= ' offset-sm-1';
    }
  }

}

/**
 * Implements hook_preprocess_paragraph__wrapper_three_columns().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__wrapper_three_columns(&$variables) {
  $paragraph = $variables['paragraph'];
  // Check the Subnav settings
  $subnav_title = $paragraph->get('field_sticky_subnav_title')->getValue();
  if(!empty($subnav_title)) {
    $variables['id'] = Html::getId($subnav_title[0]['value']);
  }

}


/**
 * Implements hook_preprocess_paragraph__paragraph().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_policy_document(&$variables) {
  // Main Paragraph.
  $paragraph = $variables['paragraph'];

  // Load categories.
  $categories = array();
  $categories_components = $paragraph->get('field_pd_category_item')->getValue();
  if (empty($categories_components)) {
    return;
  }

  // Iterate tiles.
  foreach ($categories_components as $category_component) {
    // Load paragraph.
    $target_id = $category_component['target_id'];
    $category_paragraph = Paragraph::load($target_id);
    // Get the title of the paragraph.
    $category_paragraph_title = $category_paragraph->get('field_pd_category')->getValue();
    $category_title = isset($category_paragraph_title['0']) ?
      $category_paragraph_title['0']['value'] : '';
    // Get the icon of the paragraph.
    $category_paragraph_icon = $category_paragraph->get('field_pd_icon')->getValue();
    $category_icon = isset($category_paragraph_icon['0']) ?
      $category_paragraph_icon['0']['value'] : '';
    // Get document types.
    $document_type_components = $category_paragraph->get('field_pd_item')->getValue();
    // Iterate tiles.
    $dt_files = array();
    foreach ($document_type_components as $document_type_component) {
      // Load paragraph.
      $document_type_target_id = $document_type_component['target_id'];
      $document_type_paragraph = Paragraph::load($document_type_target_id);
      // Load Document Type Taxonomy.
      $document_type_taxonomy_target_id = $document_type_paragraph->get('field_pd_type')->getValue();
      if (empty($document_type_taxonomy_target_id)) {
        return;
      }
      $document_type_taxonomy_value = Term::load($document_type_taxonomy_target_id[0]['target_id']);
      // Arrays for documents.
      $current_documents = array();
      $previous_documents = array();
      // Load File items.
      $media_file_target_ids = $document_type_paragraph->get('field_pd_file')->getValue();

      foreach ($media_file_target_ids as $media_file_target_id) {
        $entity_media = \Drupal::entityTypeManager()->getStorage("media")->load($media_file_target_id['target_id']);
        // Load our custom service and get all the node contents.
        $state_preprocessor = \Drupal::service('nrma_state_url.path_processor');
        $states = $entity_media->field_pd_states->getValue();
        if ($state_preprocessor->containsRequestedState($states)) {
          $file_info_name = $entity_media->getName();
          $file_info_url = $entity_media->field_media_file_1->entity->url();
          $file_info_size = $entity_media->field_media_file_1->entity->getSize();
          $document_size = _nrma_format_bytes($file_info_size);
          $file_description = $entity_media->field_pd_description->getValue();
          // field_pd_states
          // field_pd_file_status 1: Current Document.
          $file_status = isset($entity_media->field_pd_file_status->getValue()[0]) ?
            $entity_media->field_pd_file_status->getValue()[0]['value'] : 0;

          $file_content = isset($file_description['0']) ?
            $file_description['0']['value'] : '';
          $result =  array(
            '#markup' => $file_content,
          );
          $renderer = \Drupal::service('renderer');
          $html = $renderer->render($result);
          $document_file = array(
            'file_id' => $media_file_target_id['target_id'],
            'name' => $file_info_name,
            'body' => $html,
            'size' => $document_size,
            'url' => $file_info_url
          );
          if ($file_status == 1) {
            $current_documents[] = $document_file;
          } else {
            $previous_documents[] = $document_file;
          }
        }
      }

      $document_type_name = isset($document_type_taxonomy_value) ?
        $document_type_taxonomy_value->getName() : '';
      $document_type_abbr = isset($document_type_taxonomy_value->field_pd_abbreviation->getValue()[0]) ?
        '(' . $document_type_taxonomy_value->field_pd_abbreviation->getValue()[0]['value'] .')' : '';

      if (!empty($current_documents) || !empty($previous_documents)) {
        $dt_files[] = array(
          'document_id' => $document_type_target_id,
          'document_type_name' => $document_type_name,
          'document_type_abbr' => $document_type_abbr,
          'current_documents' => $current_documents,
          'previous_documents' => $previous_documents
        );
      }
    }

    if (!empty($dt_files)) {
      $categories[] = array(
        'id' => $target_id,
        'icon' => $category_icon,
        'title' => $category_title,
        'dt_files' => $dt_files,
      );
    }
  } // End foreach $categories_components.
  $variables['categories'] = $categories;
}

/**
 * Implements hook_preprocess_paragraph__component_popular_links().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_popular_links(&$variables) {

}

/**
 * Implements hook_preprocess_paragraph__header_hero_wrapper().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_header_hero_wrapper(&$variables) {
  $paragraph = $variables['paragraph'];
  $contents = $paragraph->get('field_hhw_content')->getValue();
  // Load our custom service and get all the node contents.
  $pp = \Drupal::service('nrma_state_url.path_processor');
  $counter = 0;

  foreach ($contents as $content) {
    $para = Paragraph::load($content['target_id']);
    $field_states = $para->get('field_states')->getValue();
    // Make the caching context based on URL path.
    $variables['#cache']['contexts'][] = 'url.path';
    // Adding the classes based on the component
    if ($pp->containsRequestedState($field_states)) {
      $order_count = $counter + 1;
      if ($para->bundle() == 'component_mh_image') {

        $variables['order_classes'][$counter] = 'c-hero-header__image-wrapper picturefill-background order-1 order-md-'. $order_count;
      } else {
        $variables['order_classes'][$counter] = 'c-hero-header__content-wrapper order-2 order-md-'. $order_count;
      }
    }
    $counter++;
  }
}

/**
 * Implements hook_preprocess_paragraph__paragraph().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_faq_list(&$variables) {

  $paragraph = $variables['paragraph'];
  $faq_selected_feed = $paragraph->get('field_comp_faq_list_select')->getValue()[0]['value'];
  $btn_txt = empty($paragraph->get('field_comp_faq_txt_btn')->getValue()) ? '' :
    $paragraph->get('field_comp_faq_txt_btn')->getValue()[0]['value'];
  if ($faq_selected_feed) {
    // Individual.
    $faq_ids = $paragraph->get('field_comp_faq_item')->getValue();
    $ids = array();
    foreach ($faq_ids as $faq_id) {
      $ids[] = $faq_id['value'];
    }
    $variables['faq_ids'] = $ids;
  } else {
    // Category.
    if (!empty($paragraph->get('field_comp_faq_list_category')->getValue())) {
      $faq_taxonomy_id = $paragraph->get('field_comp_faq_list_category')->getValue()[0]['target_id'];
      $faq_taxonomy = Term::load($faq_taxonomy_id);
      $faq_category = $faq_taxonomy->field_faq_category->getValue()[0]['value'];
      $variables['faq_category'] = $faq_category;
    }
  }
  $variables['feed'] = $faq_selected_feed;
  $variables['btn_txt'] = $btn_txt;
}

/**
 *  Implements hook_preprocess_paragraph__paragraph().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_button(&$variables) {
  $paragraph = $variables['paragraph'];
  if (empty($paragraph->get('field_comp_btn_link')->getValue())) {
    return;
  }
  $link_element = $paragraph->get('field_comp_btn_link')->getValue()[0];
  // method to get the URL from URI in Link type field
  $url = Url::fromUri($link_element['uri'])->toString();
  $variables['url'] = empty($url) ? '' : $url;
  $variables['title'] = empty($link_element['title']) ? '' : $link_element['title'];
  $variables['target'] = empty($link_element['options']['attributes']['target']) ?
    '' : $link_element['options']['attributes']['target'];
  $variables['aria_label'] = empty($link_element['options']['attributes']['aria-label']) ?
    '' : $link_element['options']['attributes']['aria-label'];
  // Button Style.
  if (!empty($paragraph->get('field_comp_btn_style')->getValue())) {
    $style_tid = $paragraph->get('field_comp_btn_style')->getValue()[0]['target_id'];
    if (!empty($style_tid)) {
      $style_taxonomy = Term::load($style_tid);
      $style_class = $style_taxonomy->field_btn_style_class->getValue()[0]['value'];
      $variables['class'] = $style_class;
      $variables['role'] = 'button';
      // $variables['aria_label'] = $style_taxonomy->getName();
    }
  }
  // Front Icon.
  if (!empty($paragraph->get('field_comp_btn_front_icon')->getValue())) {
    $front_icon = $paragraph->get('field_comp_btn_front_icon')->getValue()[0]['value'];
    $variables['front_icon'] = $front_icon;
  }
  // Rear Icon.
  if (!empty($paragraph->get('field_comp_btn_rear_icon')->getValue())) {
    $rear_icon = $paragraph->get('field_comp_btn_rear_icon')->getValue()[0]['value'];
    $variables['rear_icon'] = $rear_icon;
  }
  // Site Tracking Phrase
  if (!empty($paragraph->get('field_site_tracking_phrase')->getValue())) {
    $site_tracking_phrase = $paragraph->get('field_site_tracking_phrase')->getValue()[0]['value'];
    $variables['site_tracking_phrase'] = $site_tracking_phrase;
  }

}

/**
 * Implements hook_preprocess_paragraph__paragraph().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_inclusions_table(&$variables) {
  $paragraph = $variables['paragraph'];
  $state_preprocessor = \Drupal::service('nrma_state_url.path_processor');
  $states = $paragraph->get('field_states')->getValue();
  $state_preprocessor->containsRequestedState($states);
  // Set the table type variable
  if ($state_preprocessor->containsRequestedState($states)) {
    $table_header_txt = $paragraph->get('field_it_header_text')->getValue();
    if(!empty($table_header_txt)){
      $variables['table_header_txt'] = $table_header_txt[0]['value'];
    }
    $table_footer_txt = $paragraph->get('field_it_footer_text')->getValue();
    if(!empty($table_footer_txt)){
      $variables['table_footer_txt'] = $table_footer_txt[0]['value'];
    }

    $table_items = $paragraph->get('field_it_feature')->getValue();
    if(isset($table_items) && !empty($table_items)){
      $variables['table_items'] = $table_items;
    }

    $table_type = $paragraph->get('field_it_type')->getValue();
    if(!empty($table_type)){
      $variables['table_type'] = $table_type[0]['value'];
    } else {
      $variables['table_type'] = '';
    }
  }

}

/**
 * Implements hook_preprocess_paragraph__paragraph().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__subcomponent_it_feature(&$variables) {
  $paragraph = $variables['paragraph'];
  if(isset($paragraph->get('id')->getValue()[0]['value'])) {
    $variables['feature_id'] = $paragraph->get('id')->getValue()[0]['value'];
  } else {
    $variables['feature_id'] = '';
  }
}

/**
 * Implements hook_preprocess_paragraph__subcomponent_popular_links_items().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__subcomponent_popular_links_items(&$variables) {


  $paragraph = $variables['paragraph'];

  // Load our custom service and get all the node contents.
  $pp = \Drupal::service('nrma_state_url.path_processor');
  $field_states = $paragraph->get('field_states')->getValue();
  // Only add the anchor if it's got the requested state ticked.
  if ($pp->containsRequestedState($field_states)) {
    $site_tracking_array = $paragraph->get('field_site_tracking_phrase')->getValue();
    if(isset($site_tracking_array[0]) && !empty($variables['content'])) {
      $variables['content']['site_tracking_phrase'] = $site_tracking_array[0]['value'];
    }
  }
}

/**
 * Implements hook_preprocess_paragraph__paragraph().
 */
function nrma_preprocess_paragraph__component_download_pds(&$variables) {
  // Get path of pds file from media id.
  $paragraph = $variables['paragraph'];
  if ($paragraph->get('field_com_d_pds_pds')) {
    $mid = $paragraph->get('field_com_d_pds_pds')->getValue();
    if ($mid[0]['target_id']) {
      $entity = \Drupal::entityTypeManager()->getStorage("media")->load($mid[0]['target_id']);
      if ($entity->field_media_file_1->entity) {
        $variables['media_url'] = $entity->field_media_file_1->entity->url();
      }
    }
  }
  // Site Tracking Phrase
  if (!empty($paragraph->get('field_site_tracking_phrase')->getValue())) {
    $site_tracking_phrase = $paragraph->get('field_site_tracking_phrase')->getValue()[0]['value'];
    $variables['site_tracking_phrase'] = $site_tracking_phrase;
  }
  // Accessibility Label
  if (!empty($paragraph->get('field_accessibility_label')->getValue())) {
    $aria_label = $paragraph->get('field_accessibility_label')->getValue()[0]['value'];
    $variables['aria_label'] = $aria_label;
  }
}

/**
 * Implements hook_preprocess_paragraph__paragraph().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_narrow_wrapper(&$variables) {
  $paragraph = $variables['paragraph'];
  // Get node title to print in Media Release Article
  $node = \Drupal::request()->attributes->get('node');
  $node_type = $node->type->entity->label();
  if ($node_type == 'Media Release') {
    $variables['media_release'] = $node_type;
    $variables['node_title'] = $node->getTitle(); 
    // Pull date value from media release node 
    $mediarelease_date = $node->field_mediarelease_date->getValue();
    $date_raw = array();
    foreach ($mediarelease_date as $i => $items) {
      foreach ($items as $key => $value) {        
        $date_raw[$key.'-'.($i+1)] = $value;
      } 
    }
    $trimmed_date = array_filter($date_raw);
    $date_str = implode(',', $trimmed_date);
    $converted_date = str_replace("-", "", $date_str);
    $t_str = strtotime($converted_date);
    $t = date('d F Y',$t_str);
    $variables['date'] = $t;
  }
  // Check the Subnav settings
  $subnav_title = $paragraph->get('field_sticky_subnav_title')->getValue();
  if(!empty($subnav_title)) {
    $variables['id'] = Html::getId($subnav_title[0]['value']);
  }
}

/**
 *  Implements hook_preprocess_paragraph__paragraph().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_quote_btn(&$variables) {
  $paragraph = $variables['paragraph'];
  if (empty($paragraph->get('field_comp_quote_btn_behaviour')->getValue())) {
    return;
  }
  // Load state service.
  $state_preprocessor = \Drupal::service('nrma_state_url.path_processor');
  $current_state = $state_preprocessor->getRequestedState(TRUE);
  $quote_service = \Drupal::service('nrma_quote.quote_service');
  $btn_behaviour = $paragraph->get('field_comp_quote_btn_behaviour')->getValue()[0]['value'];

  // Site Tracking Phrase
  if (!empty($paragraph->get('field_site_tracking_phrase')->getValue())) {
    $site_tracking_phrase = $paragraph->get('field_site_tracking_phrase')->getValue()[0]['value'];
    $variables['site_tracking_phrase'] = $site_tracking_phrase;
  }
  // Accessibility Label.
  if (!empty($paragraph->get('field_accessibility_label')->getValue())) {
    $aria_label = $paragraph->get('field_accessibility_label')->getValue()[0]['value'];
    $variables['aria_label'] = $aria_label;
  }
  $variables['title'] = 'Get a quote';
  // Get variables according behaviour.
  switch ($btn_behaviour) {
    case 'form':
      if (!empty($paragraph->get('field_comp_quote_btn_product')->getValue())) {
        $product_id = $paragraph->get('field_comp_quote_btn_product')->getValue()[0]['target_id'];
        $quote_category = $quote_service->getCategoryIdByProductId($product_id);
        if (!empty($quote_category)) {
          $variables['quote_category_id'] = $quote_category['category_id'];
          $variables['quote_category'] = $quote_category['category'];
          $variables['quote_product'] = $quote_category['product'];
        }
      }
      $variables['link']['url'] = 'iag/get-quote';
      $variables['quote_class'] = 'get-quote-button';
      break;
    case 'link':
      if (empty($paragraph->get('field_comp_quote_btn_product')->getValue())) {
        break;
      }
      $product_id = $paragraph->get('field_comp_quote_btn_product')->getValue()[0]['target_id'];
      $link = $quote_service->getQuoteUrlByProductByState($product_id, strtolower($current_state));
      if (empty($link)) {
        $tel = $quote_service->getPhoneNumberByProductByState($product_id, strtolower($current_state));
        $variables['link']['url'] = 'tel:' . $tel;
        $variables['title'] = 'Call ' . $tel;
        break;
      }
      $target = empty($paragraph->get('field_comp_quote_btn_target')->getValue()) ? '' :
        $paragraph->get('field_comp_quote_btn_target')->getValue()[0]['value'];
      $variables['target'] = $target;
      $variables['link'] = $link;
      break;
  }
}

/**
 * Implements hook_preprocess_paragraph__paragraph().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_media_grid_wrapper(&$variables) {
  $paragraph = $variables['paragraph'];
  // Check the Subnav settings
  $subnav_title = $paragraph->get('field_sticky_subnav_title')->getValue();
  if(!empty($subnav_title)) {
    $variables['id'] = Html::getId($subnav_title[0]['value']);
  }
  // Get Section Title
  $contents = $paragraph->get('field_media_grid')->getValue();
  
  foreach ($contents as $content) {
    $para = Paragraph::load($content['target_id']);
    $section_title = $para->get('field_mg_title')->getValue();
    if(!empty($section_title)) {
      $variables['section_title'] = $section_title[0]['value'];
    }
  }
}

/**
 * Implements hook_preprocess_paragraph__paragraph().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__wrapper_two_col_narrow(&$variables) {
  $paragraph = $variables['paragraph'];
  // Check the Subnav settings
  $subnav_title = $paragraph->get('field_sticky_subnav_title')->getValue();
  if(!empty($subnav_title)) {
    $variables['id'] = Html::getId($subnav_title[0]['value']);
  }
}

/*
 * Implements hook_preprocess_paragraph__paragraph()
 * @param $variables
 */
function nrma_preprocess_paragraph__component_disclaimer_wrapper(&$variables) {

  $paragraph = $variables['paragraph'];
  // Check the Subnav settings
  $subnav_title = $paragraph->get('field_sticky_subnav_title')->getValue();
  if(!empty($subnav_title)) {
    $variables['id'] = Html::getId($subnav_title[0]['value']);
  }
}

 /*
 * Implements hook_preprocess_paragraph__paragraph()
 * @param $variables
 */
 function nrma_preprocess_paragraph__subcomponent_link_list_item(&$variables) {

   $paragraph = $variables['paragraph'];
   //Get the link field values
   if (!empty($paragraph->get('field_subcomp_ll_item')->getValue())) {
    $link_element = $paragraph->get('field_subcomp_ll_item')->getValue()[0];
    // method to get the URL from URI in Link type field
    $url = Url::fromUri($link_element['uri'])->toString();
    $variables['url'] = empty($url) ? '' : $url;
    $variables['title'] = empty($link_element['title']) ? '' : $link_element['title'];
    $variables['target'] = empty($link_element['options']['attributes']['target']) ?
      '' : $link_element['options']['attributes']['target'];
    $variables['aria_label'] = empty($link_element['options']['attributes']['aria-label']) ?
      '' : $link_element['options']['attributes']['aria-label'];
   }
   // Site Tracking Phrase
    if (!empty($paragraph->get('field_site_tracking_phrase')->getValue())) {
      $site_tracking_phrase = $paragraph->get('field_site_tracking_phrase')->getValue()[0]['value'];
      $variables['site_tracking_phrase'] = $site_tracking_phrase;
    }
   
}

/*
 * Implements hook_preprocess_paragraph__paragraph()
 * @param $variables
 */
function nrma_preprocess_paragraph__component_media_card_callout(&$variables) {
  $paragraph = $variables['paragraph'];
  $subnav_title = $paragraph->get('field_sticky_subnav_title')->getValue();
  if(!empty($subnav_title)) {
    $variables['id'] = Html::getId($subnav_title[0]['value']);
  }
  // Get Section Title
  $contents = $paragraph->get('field_comp_mcc_section_heading')->getValue();
  $alignment = 'left';
  foreach ($contents as $content) {
    $para = Paragraph::load($content['target_id']);

    try {
      if($para->bundle() == 'subcomponent_section_heading'){
        $alignment_field = $para->get('field_sh_alignment')->getValue();
        if (!empty($alignment_field)) {
          $alignment = $alignment_field[0]['value'];

        }
      }
    }
    catch (Exception $e) {
      dsm($e);
    }

  }
  $variables['alignment'] = $alignment;
  
}

/**
 * Implements hook_preprocess_paragraph__subcomponent_popular_links_items__quick_links().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__subcomponent_popular_links_items__quick_links(&$variables) {


  $paragraph = $variables['paragraph'];

  // Load our custom service and get all the node contents.
  $pp = \Drupal::service('nrma_state_url.path_processor');
  $field_states = $paragraph->get('field_states')->getValue();
  // Only add the anchor if it's got the requested state ticked.
  if ($pp->containsRequestedState($field_states)) {
    $site_tracking_array = $paragraph->get('field_site_tracking_phrase')->getValue();
    if(isset($site_tracking_array[0]) && !empty($variables['content'])) {
      $variables['content']['site_tracking_phrase'] = $site_tracking_array[0]['value'];
    }
  }
}

/**
 * Implements hook_preprocess_paragraph__component_decision_tree_block().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_decision_tree_block(&$variables) {
  $paragraph = $variables['paragraph'];
    // Load our custom service and get all the node contents.
  $pp = \Drupal::service('nrma_state_url.path_processor');
  $field_states = $paragraph->get('field_states')->getValue();
  // Only add the anchor if it's got the requested state ticked.
  if ($pp->containsRequestedState($field_states)) {
    // Check the Subnav settings
    $subnav_title = $paragraph->get('field_sticky_subnav_title')->getValue();
    if(!empty($subnav_title)) {
      $variables['id'] = Html::getId($subnav_title[0]['value']);
    }
  }
  
}

/*
 * Implements hook_preprocess_paragraph__paragraph()
 * @param $variables
 * @TODO - Refactor -- create one function for all link fields.
 */
function nrma_preprocess_paragraph__subcomp_link_card(&$variables) {
   $paragraph = $variables['paragraph'];
   //Get the link field values
   if (!empty($paragraph->get('field_subcomp_link_card_link')->getValue())) {
    $link_element = $paragraph->get('field_subcomp_link_card_link')->getValue()[0];
    // method to get the URL from URI in Link type field
    $url = Url::fromUri($link_element['uri'])->toString();
    $variables['url'] = empty($url) ? '' : $url;
    $variables['title'] = empty($link_element['title']) ? '' : $link_element['title'];
    $variables['target'] = empty($link_element['options']['attributes']['target']) ?
      '' : $link_element['options']['attributes']['target'];
    $variables['aria_label'] = empty($link_element['options']['attributes']['aria-label']) ?
      '' : $link_element['options']['attributes']['aria-label'];
   }
   // Site Tracking Phrase
    if (!empty($paragraph->get('field_site_tracking_phrase')->getValue())) {
      $site_tracking_phrase = $paragraph->get('field_site_tracking_phrase')->getValue()[0]['value'];
      $variables['site_tracking_phrase'] = $site_tracking_phrase;
    }
   
}

/**
 *  Implements hook_preprocess_paragraph__paragraph().
 *
 * @param $variables
 */
function nrma_preprocess_paragraph__component_live_chat_button(&$variables) {
  
  $paragraph = $variables['paragraph'];
  
  $variables['url'] = '#livechat';
  $variables['chat_online_text'] = 'Chat to us';
  $variables['chat_offline_text'] = 'Chat not available';
  $variables['chat_classes'] = 'chat-online claim-btn c-link c-link--button__secondary';
  
  // Chat Online Text
  if (!empty($paragraph->get('field_lc_online_text')->getValue())) {
    $variables['chat_online_text'] = $paragraph->get('field_lc_online_text')->getValue()[0]['value'];
  }
  // Chat Offline Text
  if (!empty($paragraph->get('field_lc_offline_text')->getValue())) {
    $variables['chat_offline_text'] = $paragraph->get('field_lc_offline_text')->getValue()[0]['value'];
  }
  // Chat Channel
  if (!empty($paragraph->get('field_lc_channel')->getValue())) {
    $variables['chat_classes'] .= ' ' . $paragraph->get('field_lc_channel')->getValue()[0]['value'];
  }
  // Aria Label
  if (!empty($paragraph->get('field_accessibility_label')->getValue())) {
    $aria_label = $paragraph->get('field_accessibility_label')->getValue()[0]['value'];
    $variables['aria_label'] = $aria_label;
  }
  // Site Tracking Phrase
  if (!empty($paragraph->get('field_site_tracking_phrase')->getValue())) {
    $site_tracking_phrase = $paragraph->get('field_site_tracking_phrase')->getValue()[0]['value'];
    $variables['site_tracking_phrase'] = $site_tracking_phrase;
  }

}

function nrma_preprocess_paragraph__subcomponent_section_heading__callout(&$variables) {
  
  $paragraph = $variables['paragraph'];
  $parent_para = $paragraph->getParentEntity();
  // Get Section Title
  $contents = $parent_para->get('field_comp_mcc_section_heading')->getValue();
  $alignment = 'left';
  foreach ($contents as $content) {
    $para = Paragraph::load($content['target_id']);
    
    if($para->bundle() == 'subcomponent_section_heading'){
      $alignment_field = $para->get('field_sh_alignment')->getValue();
      if (!empty($alignment_field)) {
        $alignment = $alignment_field[0]['value'];
        
      }
    }
  }
  $variables['alignment'] = $alignment;
}