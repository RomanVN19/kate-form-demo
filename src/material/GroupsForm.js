import React, { Component } from 'react';

import { KateForm, withKateForm } from 'kate-form';

import { Elements } from 'kate-form-material-kit-react';

const kateFormPath = 'groupsForm';

const contentStyle = { backgroundColor: '#fff', padding: 30 };

class GroupsForm extends Component {
  componentWillMount() {
    const { kateFormInit, kateFormContent } = this.props;

    const elements = [
      {
        type: Elements.LABEL,
        title: 'Default grid',
        tag: 'h2',
      },
      {
        id: 'grid1',
        type: Elements.GRID,
        elements: [
          {
            id: 'input1',
            type: Elements.INPUT,
            title: 'Plain input',
          },
          {
            id: 'input2',
            type: Elements.INPUT,
            title: 'Plain input',
          },
          {
            id: 'input3',
            type: Elements.INPUT,
            title: 'Plain input',
          },
          {
            id: 'input4',
            type: Elements.INPUT,
            title: 'Plain input',
          },
        ],
      },
      {
        type: Elements.LABEL,
        title: 'Custom grid',
        tag: 'h2',
      },
      {
        id: 'grid2',
        type: Elements.GRID,
        elements: [
          {
            id: 'input1',
            type: Elements.INPUT,
            title: 'Plain input',
            cols: 2,
          },
          {
            id: 'input2',
            type: Elements.INPUT,
            title: 'Plain input',
            cols: 3,
          },
          {
            id: 'input3',
            type: Elements.INPUT,
            title: 'Plain input',
            cols: 5,
          },
          {
            id: 'input4',
            type: Elements.INPUT,
            title: 'Plain input',
            cols: 2,
          },
        ],
      },
      {
        type: Elements.LABEL,
        title: 'Grid with groups',
        tag: 'h2',
      },
      {
        id: 'grid3',
        type: Elements.GRID,
        elements: [
          {
            id: 'input1',
            type: Elements.INPUT,
            title: 'Plain input',
            cols: 2,
          },
          {
            id: 'input2',
            type: Elements.GROUP,
            cols: 3,
            elements: [
              {
                id: 'input1',
                type: Elements.INPUT,
                title: 'Plain input',
              },
              {
                id: 'input2',
                type: Elements.INPUT,
                title: 'Plain input',
              },
              {
                id: 'input3',
                type: Elements.INPUT,
                title: 'Plain input',
              },
            ]
          },
          {
            id: 'input3',
            type: Elements.GROUP,
            cols: 5,
            elements: [
              {
                id: 'input1',
                type: Elements.INPUT,
                title: 'Plain input',
              },
              {
                id: 'input2',
                type: Elements.INPUT,
                title: 'Plain input',
              },
            ],
          },
          {
            id: 'input4',
            type: Elements.INPUT,
            title: 'Plain input',
            cols: 2,
          },
        ],
      },
    ];
    kateFormInit(elements);
    this.content = kateFormContent;
  }
  render() {
    return (
      <div>
        <h3>Groups connectors</h3>
        <div style={contentStyle}>
          <KateForm path={kateFormPath} />
        </div>
      </div>
    );
  }
}

export default withKateForm(GroupsForm, kateFormPath);
