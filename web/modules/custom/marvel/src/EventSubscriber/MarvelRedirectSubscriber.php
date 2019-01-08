<?php
/**
 * Created by PhpStorm.
 * User: waiwai
 * Date: 2019-01-07
 * Time: 16:02
 */
namespace Drupal\marvel\EventSubscriber;

use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Url;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Subscribes to the Kernel Request event and redirects to the homepage
 * when the user has the "non_grata" role.
 */
class MarvelRedirectSubscriber implements EventSubscriberInterface
{
  protected $currentUser;

  public function __construct(AccountProxyInterface $currentUser)
  {
    $this->currentUser = $currentUser;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents()
  {
    $events[KernelEvents::REQUEST][] = ['onRequest', 0];

    return $events;
  }

  /**
   * Handler for the kernel request event
   *
   * @param GetResponseEvent $event
   */
  public function onRequest(GetResponseEvent $event) {
    //$route_name = $this->currentRouteMatch->getRouteName();

    $request = $event->getRequest();

    //dpm($request->get('_route'), __FUNCTION__);
    $path = $request->getPathInfo();
    //dpm($path, "path");

    if ($path !== '/restrict') {
      return;
    }
    else {
      dsm("User is accessing /restrict");
    }

    $roles = $this->currentUser->getRoles();
    if (!in_array('allow_restricted', $roles)) {
      $url = Url::fromUri('internal:/');
      $event->setResponse(new RedirectResponse($url->toString()));
      dsm("Changed event response");
    }
  }
}