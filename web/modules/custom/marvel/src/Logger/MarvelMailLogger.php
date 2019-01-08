<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-08
 * Time: 09:30
 */
namespace Drupal\marvel\Logger;

use Drupal\Component\Render\FormattableMarkup;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Logger\LogMessageParserInterface;
use Drupal\Core\Logger\RfcLoggerTrait;
use Psr\Log\LoggerInterface;

/**
 * A logger that sends an email when the log type is error.
 *
 * Class MarvelMailLogger
 * @package Drupal\marvel\LoggerA l
 */
class MarvelMailLogger implements LoggerInterface
{
  use RfcLoggerTrait;

  /**
   * @var LogMessageParserInterface
   */
  protected $parser;

  /**
   * @var ConfigFactoryInterface
   */
  protected $configFactory;

  public function __construct(ConfigFactoryInterface $config_factory, LogMessageParserInterface $parser)
  {
    $this->configFactory = $config_factory;
    $this->parser = $parser;
  }

  public function log($level, $message, array $context = [])
  {
    //dsm($context);
    if ($context['channel']) {
      // https://api.drupal.org/api/drupal/core%21modules%21system%21config%21install%21system.site.yml/8.2.x
//    $to = \Drupal::config('system.site')->get('mail');

      $account = $context['user'];
      $to = $this->configFactory->get('system.site')->get('mail');
      $to = "waimanphp@gmail.com";
      $lang_code = $this->configFactory->get('system.site')->get('langcode');
      $site_name = $this->configFactory->get('system.site')->get('name');
      $variables = $this->parser->parseMessagePlaceholders($message, $context);
      $body = new FormattableMarkup($message, $variables);
      $subject = "$site_name - Test";

      //MailManager.php
      //($module, $key, $to, $langcode, $params = [], $reply = NULL, $send = TRUE)
      $result = \Drupal::service('plugin.manager.mail')->mail(
        'marvel',
        'marvel_log',
        $to,
        $lang_code,
        [
          'message' => $body,
          'subject' => $subject,
          'user' => $account,
        ]
      );

      //dsm($result, "\$result " . __FUNCTION__);
    }
  }
}