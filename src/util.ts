import { INotebookModel } from "@jupyterlab/notebook";

export function getTags(sender: INotebookModel) {
  const cells = sender.cells;
  let tags: string[] = [];
  var set = new Set<string>();
  for(let i = 0; cells && i <= cells.length; i += 1) {
    const cell = cells.get(i);
    if(cell) {
        let currentTags = cell.metadata.get('tags');
        if(currentTags) {
          for(let e of currentTags.toString().split(',')) {
            set.add(e);
          }
        }
    }
  }
  for(let ele of set) {
    tags.push(ele);
  }
  return tags;
}
