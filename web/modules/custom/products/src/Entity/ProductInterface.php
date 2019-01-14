<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-11
 * Time: 10:59
 */
namespace Drupal\products\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;

interface ProductInterface extends ContentEntityInterface , EntityChangedInterface {
  /**
   * Get product name
   *
   * @return string
   */
  public function getName();

  /**
   * Set the product name
   *
   * @param string $name
   *
   * @return \Drupal\products\Entity\ProductInterface
   * The called product entity
   */
  public function setName($name);

  /**
   * Get the product number
   *
   * @return int
   */
  public function getProductNumber();

  /**
   * Set the product number
   *
   * @param int $number
   *
   * @return \Drupal\products\Entity\ProductInterface
   */
  public function setProductNumber($number);

  /**
   * Gets the Product remote ID.
   *
   * @return string
   */
  public function getRemoteId();

  /**
   * Sets the Product remote ID.
   *
   * @param string $id
   *
   * @return \Drupal\products\Entity\ProductInterface
   *   The called Product entity.
   */
  public function setRemoteId($id);

  /**
   * Gets the Product source.
   *
   * @return string
   */
  public function getSource();

  /**
   * Sets the Product source.
   *
   * @param string $source
   *
   * @return \Drupal\products\Entity\ProductInterface
   *   The called Product entity.
   */
  public function setSource($source);

  /**
   * Gets the Product creation timestamp.
   *
   * @return int
   */
  public function getCreatedTime();

  /**
   * Sets the Product creation timestamp.
   *
   * @param int $timestamp
   *
   * @return \Drupal\products\Entity\ProductInterface
   *   The called Product entity.
   */
  public function setCreatedTime($timestamp);

}