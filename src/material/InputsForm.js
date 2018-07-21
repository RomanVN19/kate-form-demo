import React, { Component } from 'react';

import { KateForm, withKateForm, getValues } from 'kate-form';

import { Elements } from 'kate-form-material-kit-react';


const kateFormPath = 'inputsForm';

const contentStyle = { backgroundColor: '#fff', padding: 30 };

class InputsForm extends Component {
  componentWillMount() {
    const { kateFormInit, kateFormContent } = this.props;

    const elements = [
      {
        id: 'button',
        type: Elements.BUTTON,
        title: 'Show alert',
        onClick: this.showAlert,
      },
      {
        id: 'input',
        type: Elements.INPUT,
        title: 'Plain input',
        onChange: this.inputChange,
      },
      {
        id: 'input2',
        type: Elements.INPUT,
        title: 'Plain input with error',
        error: true,
        onChange: this.inputChange,
      },
      {
        id: 'inputNumbers',
        type: Elements.INPUT,
        title: 'Number input',
        format: val => Number(val.replace(/\D/g, '')),
        onChange: this.inputChange,
      },
      {
        id: 'selectInput',
        type: Elements.SELECT,
        title: 'Select input (type "opt" or click icon at the right)',
        options: [
          { title: 'Option 1' },
          { title: 'Option 2' },
          { title: 'Other option 1' },
          { title: 'Other option 2' },
        ],
        onChange: this.inputChange,
      },
      {
        id: 'autocompleteInput',
        type: Elements.SELECT,
        title: 'Autocomplete input (type "opt")',
        getOptions: this.getOptions,
        onChange: this.inputChange,
      },
      {
        id: 'inputDate',
        type: Elements.DATE,
        title: 'Date input',
        timeFormat: false,
        onChange: this.inputChange,
      },
      {
        id: 'switchInput',
        type: Elements.SWITCH,
        title: 'Switch',
        value: false,
        onChange: this.inputChange,
      },
      {
        id: 'label_header',
        type: Elements.LABEL,
        tag: 'h4',
        title: 'Current typed value',
      },
      {
        id: 'label',
        type: Elements.LABEL,
        tag: 'quote',
        author: 'none',
      },
      {
        id: 'allValues',
        type: Elements.LABEL,
        title: 'All values:',
      },
    ];

    kateFormInit(elements);
    this.content = kateFormContent;
  }
  // eslint-disable-next-line arrow-body-style
  getOptions = (searchString) => {
    // example of async querying autocomplete
    return new Promise((resolve) => {
      resolve([
        { title: 'Option 1' },
        { title: 'Option 2' },
        { title: 'Other option 1' },
        { title: 'Other option 2' },
      ].filter(item => item.title.toUpperCase().indexOf(searchString.toUpperCase()) > -1));
    });
  }
  inputChange = (value, element) => {
    const { data } = this.props;
    this.content.label.text = JSON.stringify(value);
    this.content.label.author = element.id;
    this.content.allValues.title = `All values: ${JSON.stringify(getValues(data))}`;
  }
  showAlert = () => {
    // example user showAlert func provided by MainLayout
    this.props.showAlert({
      type: 'info',
      title: 'INFO',
      desciption: 'info alert',
      timeout: 1,
    });
    this.props.showAlert({
      type: 'success',
      title: 'INFO',
      desciption: 'success alert',
      timeout: 2,
    });
    this.props.showAlert({
      type: 'warning',
      title: 'INFO',
      desciption: 'warning alert',
      timeout: 3,
    });
  }
  render() {
    return (
      <div>
        <h3>Inputs connectors</h3>
        <div style={contentStyle}>
          <KateForm path={kateFormPath} />
        </div>
      </div>
    );
  }
}

export default withKateForm(InputsForm, kateFormPath);
