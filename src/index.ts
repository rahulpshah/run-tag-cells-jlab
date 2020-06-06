import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { INotebookTracker } from '@jupyterlab/notebook';

import { IMainMenu 
} from '@jupyterlab/mainmenu'
import { Menu } from '@lumino/widgets';
import { CommandRegistry } from '@lumino/commands';

/**
 * Initialization data for the run-tag-cells-jlab extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'run-tag-cells-jlab',
  autoStart: true,
  requires: [IMainMenu, INotebookTracker],
  activate: (app: JupyterFrontEnd, mainmenu: IMainMenu, tracker: INotebookTracker) => {
    function runTagCells(args: any) {
      console.log(`Run cells with tag ${args['tag']}`);
    }

    function updateMenu(menu: Menu, tags: string[]) {
      console.log(`Updating menu with tags: ${tags}`);
      menu.clearItems();
      tags.forEach((tag: string) => {
        if(!menu.commands.hasCommand(`run-tag-cells-${tag}`)) {
          menu.commands.addCommand(`run-tag-cells-${tag}`, {
            label: `Run Cell with Tag '${tag}'`,
            execute: runTagCells
          });
        }
        menu.addItem({
          command: `run-tag-cells-${tag}`,
          args: {tag}
        });
      });
    }
    const commands: CommandRegistry = new CommandRegistry();
    const menu = new Menu({ commands });
    menu.title.label = 'Run Tagged Cells';
    mainmenu.addMenu(menu, { rank: 60 }); 

    tracker.currentChanged.connect((sender, args) => {
      const notebook = tracker.currentWidget;
      // If notebook is added
      if(notebook) {
        const cells = notebook.content.model.cells;
        let tags: string[] = [];
        for(let i = 0; i <= cells.length; i += 1) {
          const cell = cells.get(i);
          if(cell) {
            tags = tags.concat(cell.metadata.keys());
          }
        }
        updateMenu(menu, tags);
      }
    });
  }
}

export default extension;
