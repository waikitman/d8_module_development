<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-04
 * Time: 18:13
 */

namespace Drupal\marvel\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Logger\LoggerChannelInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Configuration form definition for the salutation message.
 */
class SalutationConfigurationForm extends ConfigFormBase
{
  protected $logger;

  public function __construct(ConfigFactoryInterface $config_factory, LoggerChannelInterface $logger)
  {
    $this->logger = $logger;
    parent::__construct($config_factory);
  }

  public static function create(ContainerInterface $container)
  {
    return new static(
      $container->get('config.factory'),
      $container->get('marvel.logger.channel.salutation')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames()
  {
    // Think of this as the machine name of the config object that stores all the form variables.
    // Stored in the config table.
    // Load up our editable configuration object from the Drupal 8 configuration factory
    return ['marvel.custom_salutation'];
  }

  public function getFormId()
  {
    // Think of this as the (display name) form id that is rendered on the page. Different to machine name.
    //declare form id
    return 'salutation_configuration_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state)
  {
    $config = $this->config('marvel.custom_salutation');
    // https:/​/​api.​drupal.​org/​api/​drupal/​elements/​8.​2.​x
    $form['salutation'] = array(
      '#type' => 'textfield',
      '#title' => t('Salutation'),
      '#description' => $this->t("Provide your own custom salutation. Enter bye to see an error message."),
      '#default_value' => $config->get('salutation'),
    );

    return parent::buildForm($form, $form_state);
  }

  public function validateForm(array &$form, FormStateInterface $form_state)
  {
    if ($form_state->getValue('salutation') === "bye") {
      $form_state->setErrorByName('salutation', 'That is not a greeting');
    }

    parent::validateForm($form, $form_state); // TODO: Change the autogenerated stub
  }

  public function submitForm(array &$form, FormStateInterface $form_state)
  {
    // $config is provided by config.factory service (ConfigFormBase). Used reading and storing config values
    $this->config('marvel.custom_salutation')
      ->set('salutation', $form_state->getValue('salutation'))
      ->save();

    $this->logger->info('The marvel salutation has been changed to @message', ['@message' => $form_state->getValue('salutation')]);

    parent::submitForm($form, $form_state);
  }

}
