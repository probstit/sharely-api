import {EventEmitter} from 'events';

// import {consoleRedirect} from './consoleRedirect';

/**
 * Class managing node process.
 *
 * @author Dragos Sebestin
 */
export class ProcessManager extends EventEmitter {

  /**
   * Class constructor.
   */
  constructor () {
    super();
  }

  /**
   * Initializes the service and emits the Start event.
   */
  init (defaultConfigPath: string) {
    // redirect output and error streams before writting anyting to the console
    // consoleRedirect(nconf.get('console:stdout'), nconf.get('console:stderr'));

    // Logger.get().write('loaded ' + (nconf.get('configFile') || '(default)') + ' configuration file');

    process.on('SIGINT', this.shutdown.bind(this));
    process.on('SIGTERM', this.shutdown.bind(this));
    process.on('SIGQUIT', this.shutdown.bind(this));

    this.emit('start');
  }

  /**
   * Emits the Stop event when the process has to close.
   */
  private shutdown () {
    this.emit('stop');
  }
}
