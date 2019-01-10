<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-09
 * Time: 12:15
 */

/**
 * Example of a factory class.
 *
 * Class Car
 */
class Car
{
  const TRIM = "Sport";
  private $make;
  private $model;
  private $trim = self::TRIM;

  public function __construct(String $make, String $model)
  {
    $this->make = $make;
    $this->model = $model;
  }

  public function setTrim(String $type) {
    $this->trim = $type;
  }

  public function __toString()
  {
    return sprintf("%s : %s : %s", $this->make, $this->model, $this->trim);
  }
}

class CarFactory {

  public static function create(String $make, String $model, String $trim = '') {
    $car = new Car($make, $model);

    if (isset($trim) && $trim) {
      $car->setTrim($trim);
    }

    return $car;
  }

}
$standardCar = CarFactory::create("Mazda", "CX5");
print($standardCar . PHP_EOL);

$topCar = CarFactory::create("Mazda", "CX5", "Azure");
print($topCar . PHP_EOL);