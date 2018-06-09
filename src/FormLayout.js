import React, { Component } from 'react';

import { KateForm, withKateForm, Elements, getValues } from 'kate-form';

const kateFormPath = 'formLayout';

class FormLayout extends Component {
  constructor(props) {
    super(props);
    const { kateFormInit, kateFormContent } = this.props;

    const elements = [
      {
        type: Elements.GROUP,
        layout: 'horizontal',
        elements: [
          {
            type: Elements.BUTTON,
            title: 'Send notification',
            onClick: this.showEMail,
          },
          {
            id: 'email',
            type: Elements.INPUT,
            placeholder: 'e-mail',
            hidden: true,
          },
        ],
      },
      {
        type: Elements.GROUP,
        elements: [
          {
            id: 'password2_1',
            type: Elements.INPUT,
            placeholder: 'Password',
            inputType: 'password',
            onChange: this.checkPasswords,
          },
          {
            id: 'password2_2',
            type: Elements.INPUT,
            placeholder: 'Retype password',
            inputType: 'password',
            onChange: this.checkPasswords,
          },
          {
            id: 'passwordsMatchText',
            type: Elements.LABEL,
            title: 'Passwords match',
            style: { color: '#ff0000' },
          },
          {
            type: Elements.BUTTON,
            title: 'log values',
            onClick: this.logValues,
          },
        ],
      },
    ];

    kateFormInit(elements);
    this.content = kateFormContent;
  }

  showEMail = () => {
    this.content.email.hidden = !this.content.email.hidden;
  }
  checkPasswords = () => {
    if (this.content.password2_1.value !== this.content.password2_2.value) {
      this.content.passwordsMatchText.title = 'Passwords do not match';
    } else {
      this.content.passwordsMatchText.title = 'Passwords match';
    }
  }
  logValues = () => {
    console.log(getValues(this.props.data));
  }
  render() {
    return (
      <KateForm path={kateFormPath} />
    );
  }
}

export default withKateForm(FormLayout, kateFormPath);
