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
    function runTagCells(args: any) {
      console.error(`Run cells with tag ${args['tag']}`);
    }

    menu.title.label = 'Run Tagged Cells';
    const tags = ['a', 'b', 'c'];
    tags.forEach((tag: string) => {
      commands.addCommand(`run-tag-cells-${tag}`, {
        label: `Run Cell with Tag '${tag}'`,
        execute: runTagCells
      });
      menu.addItem({
        command: `run-tag-cells-${tag}`,
        args: {tag}
      });
    });    
    mainmenu.addMenu(menu, { rank: 60 }); 
  }
};



export default extension;
