<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-10
 * Time: 16:49
 */

namespace Drupal\products\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Field\BaseFieldDefinition;
/**
 * Defines the product entity
 *
 * @ContentEntityType(
 *  id = "product",
 *  label = @Translation("Product"),
 *  handlers = {
 *    "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *    "list_builder" = "Drupal\prodcuts\ProductListBuilder",
 *    "form" = {
 *      "default" = "Drupal\products\Form\ProductForm",
 *      "add" = "Drupal\products\Form\ProductForm",
 *      "edit" = "Drupal\products\Form\ProductForm",
 *      "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm",
 *    },
 *
 *    "route_provider" = {
 *      "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider"
 *    }
 *  },
 *  base_table = "product",
 *  admin_permission = "administer site configuration",
 *  entity_keys = {
 *   "id" = "id",
 *   "label" = "name",
 *   "uuid" = "uuid",
 *  },
 *  links = {
 *   "canonical" = "/admin/structure/product/{product}",
 *   "add-form" = "/admin/structure/product/add",
 *   "edit-form" = "/admin/structure/product/edit",
 *   "delete-form" = "/admin/structure/product/delete",
 *   "collection" = "/admin/structure/product",
 *  }
 * )
 */
class Product extends ContentEntityBase implements ProductInterface
{
  use EntityChangedTrait;

  public static function baseFieldDefinitions(EntityTypeInterface $entity_type)
  {
    // inherit base fields of parent class
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Name'))
      ->setDescription(t('The name of the Product.'))
      ->setSettings([
        'max_length' => 255,
        'text_processing' => 0,
      ])
      ->setDefaultValue('')
      ->setDisplayOptions('view', [
        'label' => 'hidden',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['number'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Number'))
      ->setDescription(t('The Product number.'))
      ->setSettings([
        'min' => 1,
        'max' => 10000
      ])
      ->setDefaultValue(NULL)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'number_unformatted',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'number',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['remote_id'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Remote ID'))
      ->setDescription(t('The remote ID of the Product.'))
      ->setSettings([
        'max_length' => 255,
        'text_processing' => 0,
      ])
      ->setDefaultValue('');

    $fields['source'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Source'))
      ->setDescription(t('The source of the Product.'))
      ->setSettings([
        'max_length' => 255,
        'text_processing' => 0,
      ])
      ->setDefaultValue('');

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'));

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the entity was last edited.'));

    return $fields;
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return $this->get('name')->value;
  }
  /**
   * {@inheritdoc}
   */
  public function setName($name) {
    $this->set('name', $name);
    return $this;
  }
  /**
   * {@inheritdoc}
   */
  public function getProductNumber() {
    return $this->get('number')->value;
  }
  /**
   * {@inheritdoc}
   */
  public function setProductNumber($number) {
    $this->set('number', $number);
    return $this;
  }
  /**
   * {@inheritdoc}
   */
  public function getRemoteId() {
    return $this->get('remote_id')->value;
  }

  /**
  * {@inheritdoc}
  */
  public function setRemoteId($id) {
    $this->set('remote_id', $id);
    return $this;
  }
  /**
   * {@inheritdoc}
   */
  public function getSource() {
    return $this->get('source')->value;
  }
  /**
   * {@inheritdoc}
   */
  public function setSource($source) {
    $this->set('source', $source);
    return $this;
  }
  /**
   * {@inheritdoc}
   */
  public function getCreatedTime() {
    return $this->get('created')->value;
  }
  /**
   * {@inheritdoc}
   */
  public function setCreatedTime($timestamp) {
    $this->set('created', $timestamp);
    return $this;
  }

  public function getChangedTime()
  {
    // TODO: Implement getChangedTime() method.
  }

  public function setChangedTime($timestamp)
  {
    // TODO: Implement setChangedTime() method.
  }

  public function getChangedTimeAcrossTranslations()
  {
    // TODO: Implement getChangedTimeAcrossTranslations() method.
  }

}