import { ReactWidget } from '@jupyterlab/apputils';

import React from 'react';
import { INotebookModel } from '@jupyterlab/notebook';
import {getTags} from './util';

// import {Button} from '@jupyterlab/ui-components'
export interface IRunTagState {
  tags: string[]
}

export interface IRunTagProps {
  model: INotebookModel
}
/**
 * React component for a counter.
 *
 * @returns The React component
 */
class RunTagCell extends React.Component<IRunTagProps, IRunTagState> {
  constructor(props: IRunTagProps) {
    super(props);
    this.state = {tags: ['no tags']};
  }
  render() {
    const tagOptions = [];
    for (var i = 0; i < this.state.tags.length; i++) {
        tagOptions.push(<option key={i} value={this.state.tags[i]}>{this.state.tags[i]}</option>);
    }
    return (
        <select>{tagOptions}</select>
    );
  }

  componentDidMount() {
    const { model } = this.props;
    model.contentChanged.connect((sender, args) => {
      this.setState({tags: getTags(sender)})
    });
  }
};
/**
 * A RunTagCell Lumino Widget that wraps a RunTagCellComponent.
 */
export class RunTagCellWidget extends ReactWidget {
  /**
   * Constructs a new RunTagCellWidget.
   */
  private _model: INotebookModel;
  constructor(model: INotebookModel) {
    super();
    this._model = model;
    this.addClass('jp-Notebook-toolbarCellType');
    this.addClass('jp-Notebook-toolbarCellTypeDropdown');
    this.addClass('jp-HTMLSelect');
    this.addClass('jp-ReactWidget');
  }
  render(): JSX.Element {
    return <RunTagCell model={this._model} />;
  }
}