<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-08
 * Time: 13:53
 */
namespace Drupal\marvel\Plugin\Mail;
use Drupal\Core\Mail\MailFormatHelper;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Mail\MailInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * @Mail(
 *  id = "marvel_mail",
 *  label = @Translation("Marvel Mailer"),
 *  description = "Send mail via external API"
 * )
 */
class MarvelMail implements MailInterface, ContainerFactoryPluginInterface
{
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition)
  {
    return new static();
  }

  public function mail(array $message)
  {
    dpm(__CLASS__);
    $message['body'] = implode("\n\n", $message['body']);

    // Convert any HTML to plaintext
    $message['body'] = MailFormatHelper::htmlToText($message['body']);

    // Wrap the mail body before sending
    $message['body'] = MailFormatHelper::wrapMail($message['body']);

    return $message;
  }

  public function format(array $message)
  {
    // Use external API to send the email based on the message array constructed
    // via the hook_mail implementations
  }
}