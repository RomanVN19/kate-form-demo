import React, { Component } from 'react';

import { KateForm, withKateForm } from 'kate-form';

import { Elements } from 'kate-form-material-kit-react';


const kateFormPath = 'cardsForm';

class CardsForm extends Component {
  componentWillMount() {
    const { kateFormInit, kateFormContent } = this.props;

    const elements = [
      {
        id: 'card1',
        title: 'Card 1',
        type: Elements.CARD,
        elements: [
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
        ],
      },
      {
        id: 'card2',
        title: 'Card with actions',
        type: Elements.CARD,
        elements: [
          {
            id: 'input3',
            type: Elements.INPUT,
            title: 'Plain input',
            onChange: this.inputChange,
          },
          {
            id: 'input4',
            type: Elements.INPUT,
            title: 'Plain input with error',
            error: true,
            onChange: this.inputChange,
          },
          {
            id: 'cardActions',
            type: Elements.CARD_ACTIONS,
            elements: [
              {
                type: Elements.BUTTON,
                title: 'Button 1',
              },
              {
                type: Elements.BUTTON,
                title: 'Button 2',
              },
            ],
          },
        ],
      },
    ];
    kateFormInit(elements);
    this.content = kateFormContent;
  }
  inputChange = (value, element) => {
    this.content.label.text = JSON.stringify(value);
    this.content.label.author = element.id;
  }
  render() {
    return (
      <KateForm path={kateFormPath} />
    );
  }
}

export default withKateForm(CardsForm, kateFormPath);
