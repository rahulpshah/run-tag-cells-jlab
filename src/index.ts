import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the run-tag-cells-jlab extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'run-tag-cells-jlab',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension run-tag-cells-jlab is activated!');
  }
};

export default extension;
