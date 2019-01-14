<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-11
 * Time: 15:40
 */
namespace Drupal\sports\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Connection;
use Symfony\Component\DependencyInjection\ContainerInterface;

class SportsController extends ControllerBase
{
  private $database;

  public function __construct(Connection $database)
  {
    $this->database = $database;
  }

  public static function create(ContainerInterface $container)
  {
    return new static($container->get('database'));
  }

  public function content() {
    $db = \Drupal::database();
    $result = $db->query("SELECT p.id, p.name as player_name, t.name as
   team_name, t.description as team_description, p.data 
        FROM {players} p
        JOIN {teams} t 
        ON t.id = p.team_id
        WHERE p.id = :id",
      [':id' => 1]
    );

    foreach ($result->fetchAll() as $row) {
      dsm($row, "Standard query");
    }

    $query = $db->select('players', 'p');
    $query->join('teams', 't');
    $query->addField('p', 'name', 'player_name');
    $query->addField('t', 'name', 'team_name');
    $query->addField('t', 'description', 'team_description');
    $altResult = $query
      ->fields('p', ['id', 'data'])
      ->condition('p.id', 1)
      ->execute();
    $records = $altResult->fetchAll();

    dsm($records);

    return [
      '#markup' => "Sports controller"
    ];
  }

  public function players() {
    $header = ['name'];
    $rows = [];

    //_insertPlayers();
    //$teamsBuild = _$this->displayPlayers($header, $rows);

    $this->updateTeams();

    $teamsBuild = $this->displayTeams($header, $rows);



    return $teamsBuild;

//    return [
//      '#markup' => __FUNCTION__,
//    ];
  }

  public function updateTeams() {
    $update = $this->database->update('teams')
      ->fields(['name' => 'Arsenal fc'])
      ->condition('id', 2)
      ->execute();

    dsm($update, 'Update team');

  }

  public function displayPlayers($header, $rows) {
    $result = $this->database->select('players', 'p')
      ->fields('p')
      ->execute();

    $result = $result->fetchAll();

    dsm($result, __FUNCTION__);


    foreach ($result as $row) {
      $rows[] = [$row->name];
    }
    dsm($rows, "rows");

    $build = [];
    $build[] = [
      '#theme' => 'table',
      '#header' => $header,
      '#rows' => $rows,
    ];

    return $build;

  }

  public function displayTeams($header, $rows) {
    // remove $rows values
    $rows = [];


    $limit = 2;
    $teamResults = $this->database->select('teams', 't')
      ->fields('t')
      ->extend('Drupal\Core\Database\Query\PagerSelectExtender')
      ->limit($limit)->execute()->fetchAll();

    dsm($teamResults);
    foreach ($teamResults as $team) {
      $rows[] = [$team->name];
    }

    $build = [];
    $build[] = [
      '#theme' => 'table',
      '#header' => $header,
      '#rows' => $rows,
    ];

    $build[] = [
      '#type' => 'pager'
    ];

    return $build;
  }

  public function _insertPlayers() {
    $playersList[] =[
      'team_id' => 1,
      'name' => 'Robertson',
      'data' => serialize(['Scotland captain']),
    ];
    $playersList[] =[
      'team_id' => 1,
      'name' => 'Virgil VD',
      'data' => serialize(['MVP defender']),
    ];

    foreach ($playersList as $player) {
      $insertPLayers = $this->database->insert('players')
        ->fields($player)
        ->execute();
      dpm($insertPLayers, $player['name']);
    }
  }
}