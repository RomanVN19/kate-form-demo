import React, { Component } from 'react';

import { KateForm, withKateForm, Elements } from 'kate-form';

const kateFormPath = 'formPlain';

class FormPlain extends Component {
  componentWillMount() {
    const { kateFormInit, kateFormContent } = this.props;

    const elements = [
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
      {
        id: 'password',
        type: Elements.INPUT,
        placeholder: 'Password',
        inputType: 'password',
        onChange: this.checkPasswords,
      },
      {
        id: 'password2',
        type: Elements.INPUT,
        placeholder: 'Retype password',
        inputType: 'password',
        onChange: this.checkPasswords,
      },
      {
        id: 'passwordsMatchText',
        type: Elements.LABEL,
        title: 'Passwords match',
      },
    ];

    kateFormInit(elements);
    this.content = kateFormContent;
  }

  showEMail = () => {
    this.content.email.hidden = !this.content.email.hidden;
  }
  checkPasswords = () => {
    if (this.content.password.value !== this.content.password2.value) {
      this.content.passwordsMatchText.title = 'Passwords do not match';
    } else {
      this.content.passwordsMatchText.title = 'Passwords match';
    }
  }
  render() {
    return (
      <KateForm path={kateFormPath} />
    );
  }
}

export default withKateForm(FormPlain, kateFormPath);
