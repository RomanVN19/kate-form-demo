import React, { Component } from 'react';

import { KateForm, withKateForm } from 'kate-form';

import { Elements } from 'kate-form-material-kit-react';

import Card from 'material-kit-react/dist/components/Card/Card';
import CardBody from 'material-kit-react/dist/components/Card/CardBody';

import moment from 'moment';

const kateFormPath = 'tablesForm';

class TablesForm extends Component {
  componentWillMount() {
    const { kateFormInit, kateFormContent } = this.props;

    const elements = [
      {
        type: Elements.LABEL,
        title: 'Plain table',
        tag: 'h2',
      },
      {
        id: 'tablePlain',
        type: Elements.TABLE,
        rowClick: this.rowClick,
        columns: [
          { title: 'Default', dataPath: 'col1' },
          { title: 'Fixed width', dataPath: 'col2', width: 80 },
          { title: 'Object', dataPath: 'col3.title' },
          { title: 'Format', dataPath: 'col4', format: val => moment(val, 'YYYY.MM.DD').format('DD-MM-YYYY') },
        ],
        value: [
          { col1: 'come string 1', col2: 123.45, col3: { id: 1, title: 'some object' }, col4: '2018.06.29' },
          { col1: 'come string 2', col2: 123.45, col3: { id: 1, title: 'some object' }, col4: '2018.06.30' },
          { col1: 'come string 3', col2: 123.45, col3: { id: 1, title: 'some object' }, col4: '2018.01.01' },
          { col1: 'come string 4', col2: 123.45, col3: { id: 1, title: 'some object' } },
        ],
      },
      {
        id: 'clickedLabel',
        type: Elements.LABEL,
      },
      {
        type: Elements.LABEL,
        title: 'Editable table',
        tag: 'h2',
      },
      {
        type: Elements.BUTTON,
        title: 'Add row',
        onClick: this.addRow,
      },
      {
        id: 'tableEditable',
        type: Elements.TABLE_EDITABLE,
        title: 'Table title',
        rowClick: this.rowClick,
        columns: [
          { title: 'Default', dataPath: 'col1', type: Elements.INPUT },
          {
            id: 'srcNumber',
            title: 'Type number > 50',
            dataPath: 'col2',
            type: Elements.INPUT,
            format: val => Number(val.replace(/\D/g, '')),
            width: 100,
            onChange: this.setDestNumber,
          },
          {
            id: 'destNumber',
            title: 'Disabled',
            dataPath: 'col5',
            type: Elements.INPUT,
            disabled: true,
          },
          { title: 'Object', dataPath: 'col3.title', type: Elements.INPUT },
          { title: 'Date', dataPath: 'col4', type: Elements.DATE },
        ],
        value: [
          { col1: 'come string 1', col2: 123, col3: { id: 1, title: 'some object' }, col4: '2018.06.29' },
          { col1: 'come string 5', col2: 123, col3: { id: 1, title: 'some object' } },
        ],
      },
      {
        id: 'button',
        type: Elements.BUTTON,
        title: 'Get values',
        onClick: this.logValues,
      },
      {
        id: 'valuesLabel',
        type: Elements.LABEL,
      },
    ];
    kateFormInit(elements);
    this.content = kateFormContent;
  }
  setDestNumber = (row) => {
    row.destNumber.value = row.srcNumber.value * 2;
    row.destNumber.error = row.destNumber.value > 100;
    row.srcNumber.success = row.srcNumber.value > 50;
  }
  addRow = () => {
    this.content.tableEditable.addRow({ col1: 'added' });
  }
  rowClick = (item, index) => {
    this.content.clickedLabel.title = `Clicked on ${index} row with data ${JSON.stringify(item)}`;
  }
  logValues = () => {
    this.content.valuesLabel.title = JSON.stringify(this.content.tableEditable.value);
  }
  render() {
    return (
      <div>
        <h3>Table connectors</h3>
        <Card>
          <CardBody>
            <KateForm path={kateFormPath} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withKateForm(TablesForm, kateFormPath);
