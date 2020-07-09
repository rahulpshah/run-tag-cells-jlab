import { INotebookModel } from '@jupyterlab/notebook';

export function getTags(sender: INotebookModel) {
  const cells = sender.cells;
  const tags: string[] = [];
  const set = new Set<string>();
  for (let i = 0; cells && i <= cells.length; i += 1) {
    const cell = cells.get(i);
    if (cell) {
      const currentTags = cell.metadata.get('tags');
      if (currentTags) {
        for (const e of currentTags.toString().split(',')) {
          set.add(e);
        }
      }
    }
  }
  for (const ele of set) {
    tags.push(ele);
  }
  return tags;
}
