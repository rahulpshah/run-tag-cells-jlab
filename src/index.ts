import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { NotebookActions, INotebookTracker } from '@jupyterlab/notebook';

import { IMainMenu 
} from '@jupyterlab/mainmenu'
import { Menu } from '@lumino/widgets';
import { CommandRegistry } from '@lumino/commands';
import {RunTagCellWidget} from './run-tag-widget';
import { getTags } from './util';

import {
  ToolbarButton
} from '@jupyterlab/apputils';


/**
 * Initialization data for the run-tag-cells-jlab extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'run-tag-cells-jlab',
  autoStart: true,
  requires: [IMainMenu, INotebookTracker],
  activate: (app: JupyterFrontEnd, mainmenu: IMainMenu, tracker: INotebookTracker) => {
    function runTagCells(args: any) {
      const tag = args['tag'];
      console.log(`Running cells with tag ${tag}`);
      const panel = tracker.currentWidget;
      const notebook = panel.content;
      let prevIndex = notebook.activeCellIndex;

      notebook.widgets.forEach((child, index) => {
        console.log(`Cell Index: ${index}`);
        let cellTags = child.model.metadata.get('tags') || [];
        cellTags = cellTags.toString().split(',');
        if(cellTags.indexOf(tag) !== -1) {
          console.log("selecting cell with content");
          console.log(child.model.value);
          notebook.select(child);
          notebook.activeCellIndex = index;
        }
      });
      const { context, content } = panel;
      
      return NotebookActions.run(content, context.sessionContext)
        .then(() => {
          notebook.activeCellIndex = prevIndex;
        })
      
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
        const tagWidget = new RunTagCellWidget(notebook.model);
        notebook.toolbar.insertItem(10, 'select-tag-cells', tagWidget);
        let button = new ToolbarButton({
          className: 'runAllCellsButton',
          label: 'Run Tag Cells',
          onClick: () => {
            let selectOption = tagWidget.node.getElementsByTagName('select')[0];
            let currentTag = selectOption.options[selectOption.selectedIndex].value;
            console.error(`Current tag is ${currentTag}`);
            return runTagCells({tag: currentTag});
          },
          tooltip: 'Run Tag Cells'
        });
        notebook.toolbar.insertItem(11, 'run-tag-cells', button);
        notebook.model.contentChanged.connect((sender) => {
          updateMenu(menu, getTags(sender));
        });
      }
    });
  }
}

export default extension;
