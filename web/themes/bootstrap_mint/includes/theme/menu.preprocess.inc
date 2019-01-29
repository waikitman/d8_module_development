<?php

/**
 * @file
 *  Preprocess Menu
 */

/**
 * Implements hook_preprocess_menu().
 */
function nrma_preprocess_menu(array &$variables) {
  

  switch ($variables['menu_name']) {

    // Get the keys for the social media icon
    case 'social-media' :
      foreach($variables['items'] as $key => $item) {
        $content = $item['content']['#menu_link_content'];
        $icon = $content->get('field_menu_social_icon')->getValue()[0]['value'];
        $variables['items'][$key]['icon_class'] = $icon;
        if(isset($content->field_site_tracking_phrase)){ // preprocess the Site tracking field
          $variables['items'][$key]['site_tracking_phrase'] = $content->get('field_site_tracking_phrase')->value;
        }
        if(isset($content->field_accessibility_label)){ // preprocess the Accessibility Label field
          $variables['items'][$key]['aria_label'] = $content->get('field_accessibility_label')->value;
        }
        
      }
      break;
    // Preprocess Main navigation menu
    case 'main' :
      // Set the logo from the system
      $variables['logo'] = '';
      $logo = '';
      $logo = theme_get_setting('logo.url');
      if($logo != '') {
        $variables['logo'] = $logo;
      }
      
      $menu_service = \Drupal::service('nrma_services.menu_render');
      $action_menu_html = $menu_service->menuRender('action-menu');
      $variables['action_menu_html'] = $action_menu_html;
      $mobile_utility_menu_html = $menu_service->menuRender('mobile-utility-menu');
      $variables['mobile_utility_menu_html'] = $mobile_utility_menu_html;
      
      foreach($variables['items'] as $key => $item) { // traversing the main menu items        
        if(isset($item['below'])){
          foreach($item['below'] as $child_key => $child_item) {
            //Site Tracking tag
            $child_content = $child_item['content']['#menu_link_content'];
            if(isset($child_content->field_site_tracking_phrase)){ // preprocess the Site tracking field
              $variables['items'][$key]['below'][$child_key]['site_tracking_phrase'] = $child_content->get('field_site_tracking_phrase')->value;
            }
            if(isset($child_content->field_accessibility_label)){ // preprocess the Accessibility Label field
              $variables['items'][$key]['below'][$child_key]['aria_label'] = $child_content->get('field_accessibility_label')->value;
            }
            
            if(isset($child_item['below'])){                
              foreach($child_item['below'] as $grand_child_key => $grand_child_item) {
                //Site Tracking tag
                $grand_child_content = $grand_child_item['content']['#menu_link_content'];
                if(isset($grand_child_content->field_site_tracking_phrase)){ // preprocess the Site tracking field
                  $variables['items'][$key]['below'][$child_key]['below'][$grand_child_key]['site_tracking_phrase'] = $grand_child_content->get('field_site_tracking_phrase')->value;
                }
                if(isset($grand_child_content->field_accessibility_label)){ // preprocess the Site tracking field
                  $variables['items'][$key]['below'][$child_key]['below'][$grand_child_key]['aria_label'] = $grand_child_content->get('field_accessibility_label')->value;
                }
                
                $menu_disp_type = '';
                if(isset($grand_child_item['content']['#menu_link_content']) && !empty($grand_child_item['content']['#menu_link_content']->get('field_mm_item_disp_type')->getValue())) {
                  $menu_disp_type = $grand_child_item['content']['#menu_link_content']->get('field_mm_item_disp_type')->getValue()[0]['value'];
                }
                if($menu_disp_type == 'link') {
                  $menu_disp_type = 'view-all';
                }
                $variables['items'][$key]['below'][$child_key]['below'][$grand_child_key]['item_disp_type'] = $menu_disp_type;                  
              }
            }
          }
        }
        $content = $item['content']['#menu_link_content'];
        if(isset($content->field_main_menu_spotlight_image->entity)){ // preprocess the spotlight image field
          $spotlight_image = $content->field_main_menu_spotlight_image->entity->url();
          $variables['items'][$key]['spotlight'] = $spotlight_image;
          $spotlight_alt = $content->field_main_menu_spotlight_image->alt;
          $variables['items'][$key]['spotlight_alt'] = $spotlight_alt;          
        }
        if(isset($content->field_main_menu_spotlight_title)){ // preprocess the spotlight title field
          $variables['items'][$key]['spotlight_title'] = $content->get('field_main_menu_spotlight_title')->value;
        }
        if(isset($content->field_main_menu_spotlight_desc)){ // preprocess the spotlight description field
          $variables['items'][$key]['spotlight_desc'] = $content->get('field_main_menu_spotlight_desc')->value;
        }
        if(isset($content->field_mm_spotlight_btn_text) && isset($content->field_mm_spotlight_btn_link)){ // preprocess the spotlight button label and link fields
          $variables['items'][$key]['spotlight_btn_label'] = $content->get('field_mm_spotlight_btn_text')->value;
          $variables['items'][$key]['spotlight_btn_link'] = $content->get('field_mm_spotlight_btn_link')->value;
        }
        if(isset($content->field_spotlight_access_label)){ // preprocess the Spotlight Accessibility Label field
          $variables['items'][$key]['spotlight_aria_label'] = $content->get('field_spotlight_access_label')->value;
        }
        if(isset($content->field_site_tracking_phrase)){ // preprocess the Site tracking field
          $variables['items'][$key]['site_tracking_phrase'] = $content->get('field_site_tracking_phrase')->value;
        }
        
        if(isset($content->field_sptlight_site_track_phrase)){ // preprocess the Spotlight Site tracking field
          $variables['items'][$key]['spotlight_site_tracking_phrase'] = $content->get('field_sptlight_site_track_phrase')->value;
        }
        if(isset($content->field_accessibility_label)){ // preprocess the Accessibility Label field
          $variables['items'][$key]['aria_label'] = $content->get('field_accessibility_label')->value;
        }
      }
      break;
      
      // Get the keys for the quicklinks icon
      case 'quicklinks' :
        foreach($variables['items'] as $key => $item) {
          $content = $item['content']['#menu_link_content'];
          $menu_type = '';
          $button_icon = '';
          if(!empty($content->get('field_ql_item_disp_type'))) {
            $menu_type_array = $content->get('field_ql_item_disp_type')->getValue();
            if($menu_type_array){
              $menu_type = $menu_type_array[0]['value'];
            }
          }
          if(!empty($content->get('field_ql_button_icon')->getValue())) {
            $button_icon_array = $content->get('field_ql_button_icon')->getValue();
            if($button_icon_array){
              $button_icon = $button_icon_array[0]['value'];
            }
          }
          $variables['items'][$key]['menu_type'] = $menu_type;
          $variables['items'][$key]['button_icon'] = 'fa fa-' . $button_icon;
          if(isset($content->field_site_tracking_phrase)){ // preprocess the Site tracking field
            $variables['items'][$key]['site_tracking_phrase'] = $content->get('field_site_tracking_phrase')->value;
          } 
          if(isset($content->field_accessibility_label)){ // preprocess the Accessibility Label field
            $variables['items'][$key]['aria_label'] = $content->get('field_accessibility_label')->value;
          }
        }
      break;
      
      // Get the keys for the action-menu icon
      case 'action-menu' :
        foreach($variables['items'] as $key => $item) {
          $content = $item['content']['#menu_link_content'];
          $menu_type = '';
          $button_icon = '';
          if(!empty($content->get('field_ql_item_disp_type'))) {
            $menu_type_array = $content->get('field_ql_item_disp_type')->getValue();
            if($menu_type_array){
              $menu_type = $menu_type_array[0]['value'];
            }
          }
          if(!empty($content->get('field_fa_icon')->getValue())) {
            $button_icon_array = $content->get('field_fa_icon')->getValue();
            if($button_icon_array){
              $button_icon = $button_icon_array[0]['value'];
            }
          }
          $variables['items'][$key]['menu_type'] = $menu_type;
          $variables['items'][$key]['button_icon'] = 'fa ' . $button_icon;
          if(isset($content->field_site_tracking_phrase)){ // preprocess the Site tracking field
            $variables['items'][$key]['site_tracking_phrase'] = $content->get('field_site_tracking_phrase')->value;
          }
          if(isset($content->field_accessibility_label)){ // preprocess the Accessibility Label field
            $variables['items'][$key]['aria_label'] = $content->get('field_accessibility_label')->value;
          }
        }
      break;
      // Preprocess Utility Menu, Footer NRMA Menu, Footer Product Menu, Footer Quicklinks Menu
      case 'utility-menu' :        
      // Preprocess Footer NRMA Menu
      case 'footer-nrma' :
      // Preprocess Footer Product Menu
      case 'footer-products' :
      // Preprocess Footer Quicklinks Menu
      case 'footer-quicklinks' :
        // Set the site tracking data
        _nrma_set_site_tracking_phrase($variables);
      break; 
      
      // Get the keys for the mobile-utility-menu icon
      case 'mobile-utility-menu' :
        foreach($variables['items'] as $key => $item) {
          $content = $item['content']['#menu_link_content'];
          if(isset($content->field_site_tracking_phrase)){ // preprocess the Site tracking field
            $variables['items'][$key]['site_tracking_phrase'] = $content->get('field_site_tracking_phrase')->value;
          }
          if(isset($content->field_accessibility_label)){ // preprocess the Accessibility Label field
            $variables['items'][$key]['aria_label'] = $content->get('field_accessibility_label')->value;
          }
        }
      break;
  }
}
