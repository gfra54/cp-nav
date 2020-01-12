<?php
namespace verbb\cpnav;

use verbb\cpnav\base\PluginTrait;

use Craft;
use craft\base\Plugin;
use craft\events\PluginEvent;
use craft\events\RegisterCpNavItemsEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\helpers\UrlHelper;
use craft\services\Plugins;
use craft\web\UrlManager;
use craft\web\twig\variables\Cp;

use yii\base\Event;
use yii\web\User;

class CpNav extends Plugin
{
    // Public Properties
    // =========================================================================

    public $schemaVersion = '2.0.0';
    public $hasCpSettings = true;
    

    // Traits
    // =========================================================================

    use PluginTrait;


    // Public Methods
    // =========================================================================

    public function init()
    {
        parent::init();

        self::$plugin = $this;

        $this->_setPluginComponents();
        $this->_setLogging();
        $this->_registerCpRoutes();
        $this->_registerCpNavItems();
        $this->_registerEventHandlers();
    }

    public function getSettingsResponse()
    {
        return Craft::$app->getResponse()->redirect(UrlHelper::cpUrl('cp-nav'));
    }


    // Private Methods
    // =========================================================================

    private function _registerCpRoutes()
    {
        Event::on(UrlManager::class, UrlManager::EVENT_REGISTER_CP_URL_RULES, function(RegisterUrlRulesEvent $event) {
            $event->rules = array_merge($event->rules, [
                'cp-nav' => 'cp-nav/navigation/index',
                'cp-nav/navigation/get-hud-html' => 'cp-nav/navigation/getHudHtml',
                'cp-nav/layouts' => 'cp-nav/layout/index',
                'cp-nav/layouts/get-hud-html' => 'cp-nav/layouts/getHudHtml',
            ]);
        });
    }

    private function _registerCpNavItems()
    {
        $request = Craft::$app->getRequest();

        // if ($request->isCpRequest && strstr($request->url, 'cpnav-test')) {
        if ($request->isCpRequest) {
            Event::on(Cp::class, Cp::EVENT_REGISTER_CP_NAV_ITEMS, function(RegisterCpNavItemsEvent $event) {
                $this->getService()->generateNavigation($event);
            });
        }
    }

    private function _registerEventHandlers()
    {
        Event::on(Plugins::class, Plugins::EVENT_AFTER_INSTALL_PLUGIN, [$this->getService(), 'afterPluginInstall']);
        Event::on(Plugins::class, Plugins::EVENT_AFTER_UNINSTALL_PLUGIN, [$this->getService(), 'afterPluginUninstall']);

        Event::on(Plugins::class, Plugins::EVENT_AFTER_ENABLE_PLUGIN, [$this->getService(), 'afterPluginInstall']);
        Event::on(Plugins::class, Plugins::EVENT_AFTER_DISABLE_PLUGIN, [$this->getService(), 'afterPluginUninstall']);

        Event::on(User::class, User::EVENT_AFTER_LOGIN, [$this->getService(), 'afterUserLogin']);
        Event::on(User::class, User::EVENT_AFTER_LOGOUT, [$this->getService(), 'afterUserLogout']);
    }

}
