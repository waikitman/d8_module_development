<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-03
 * Time: 23:17
 */
namespace Drupal\marvel\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Marvel\MarvelSalutation;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * System checks if ContainerInjectionInterface is implemented by controller.
 * (ControllerBase implements ContainerInjectionInterface)
 * This controller does so it gets instantiated with create()
 * A new object MarvelController now contains a member $salutation with the MarvelSalutation service object.
 * Note: It's static so object is persistent for this session. $salutation can be reused later when content() is called.
 */

class MarvelController extends ControllerBase
{
  /**
   * @var MarvelSalutation
   */
  protected $salutation;

  /**
   * MarvelController constructor.
   * @param MarvelSalutation $salutation
   */
  public function __construct(MarvelSalutation $salutation) {
    $this->salutation = $salutation;
  }

  /**
   * @param ContainerInterface $container
   * @return ControllerBase|MarvelController
   */
  public static function create(ContainerInterface $container) {
    return new static($container->get('marvel.salutation'));
  }

  /**
   * @param string $param
   * @return array
   */
  function content($param = '') {
    dpm(\Drupal::currentUser()->getAccountName());
    //$character = (string)$param;
    $output = $this->salutation->getSalutation();
    
    return [
      '#markup' => $output,
    ];
  }
}