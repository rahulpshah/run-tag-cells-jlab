import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

// import { INotebookTracker } from '@jupyterlab/notebook';

import { IMainMenu 
} from '@jupyterlab/mainmenu'
import { Menu } from '@lumino/widgets';

/**
 * Initialization data for the run-tag-cells-jlab extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'run-tag-cells-jlab',
  autoStart: true,
  requires: [IMainMenu],
  activate: (app: JupyterFrontEnd, mainmenu: IMainMenu) => {
    let {commands} = app;
    const menu = new Menu({ commands });
    commands.addCommand('run-tag-cells', {
      label: 'Run tag A',
      execute: (args) => {
        console.error('This is the arguments I am getting');
        console.error(JSON.stringify(args));
        console.error('Run tag A executed');
      }
    });
    menu.title.label = 'Run Tagged Cells';
    menu.addItem({
      command: 'run-tag-cells'
    });
    mainmenu.addMenu(menu, { rank: 60 }); 
  }
};



export default extension;
