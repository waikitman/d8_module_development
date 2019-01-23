<?php

function getRandomNumber($max = 10) {
  return rand(0, $max);
}

$first = getRandomNumber();
$second = getRandomNumber();

$result = $first === $second ? true : false;

var_dump($result);