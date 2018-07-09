import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';

import cx from 'classnames';

import customInputStyle from 'material-kit-react/dist/assets/jss/material-kit-react/components/customInputStyle';

customInputStyle.popover = {
  position: 'absolute',
  zIndex: 100,
};

const MIN_SEARCH_LENGTH = 3;

class Select extends Component {
  state = {
    menuOpened: false,
    inputText: 'qwe',
    options: [],
  }
  componentWillMount() {
    const { value, options } = this.props;
    this.setState({
      inputText: (value && value.title) || '',
      options: options || [],
    });
    this.MIN_SEARCH_LENGTH = MIN_SEARCH_LENGTH;
  }
  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    const { value: newValue } = nextProps;
    if (value !== newValue) {
      this.setState({ inputText: newValue.title || '' });
    }
  }
  inputRef = (ref) => {
    this.input = ref;
  }
  handleInputChange = async (e) => {
    const inputText = e.target.value;
    const { options, getOptions } = this.props;
    if (getOptions) {
      if (inputText.length < this.MIN_SEARCH_LENGTH) {
        this.setState({ inputText });
        return;
      }

      const optionsGet = await getOptions(inputText);
      console.log('get opt', optionsGet);
      this.setState({
        inputText,
        options: optionsGet,
        selected: 0,
        menuOpened: true,
      });
    } else {
      const filteredOptions = options.filter(item =>
        item.title.toUpperCase().indexOf(inputText.toUpperCase()) > -1);
      this.setState({
        inputText,
        options: filteredOptions,
        selected: 0,
      });
      if (inputText.length >= this.MIN_SEARCH_LENGTH) {
        this.handleOpen();
      }
    }
  }
  handleKeyDown = (e) => {
    const { selected, options } = this.state;
    switch (e.keyCode) {
      case 38: // key down
        if (selected > 0) {
          this.setState({
            selected: selected - 1,
          });
        }

        e.preventDefault();
        e.stopPropagation();
        break;
      case 40: // key up
        if (selected < options.length - 1) {
          this.setState({
            selected: selected + 1,
          });
        }

        e.preventDefault();
        e.stopPropagation();
        break;
      case 13: // enter
        this.handleSelectOption(options[selected]);
        break;
      case 27: // esc
        this.setState({
          menuOpened: false,
          inputText: '',
        });
        break;
      default:
    }
  }
  handleOpen = () => this.setState({ menuOpened: true });
  handleClose = () => this.setState({ menuOpened: false });
  handleSwitch = () => this.setState({ menuOpened: !this.state.menuOpened });
  handleSelectOption = (value) => {
    this.props.onChange(value);
    this.setState({
      inputText: (value && value.title) || '',
    });
    this.handleClose();
  }
  handleBlur = () => {
    const { selected, options } = this.state;
    console.log('handleBlur');
    this.handleSelectOption(options[selected]);
  }
  render() {
    const {
      classes,
      formControlProps,
      labelText,
      id,
      labelProps,
      inputProps,
      error,
      success,
      inputRootCustomClasses,
      white,
    } = this.props;

    const {
      options,
      inputText,
      selected,
      menuOpened,
    } = this.state;

    const labelClasses = cx({
      [classes.labelRootError]: error,
      [classes.labelRootSuccess]: success && !error,
    });
    const underlineClasses = cx({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true,
      [classes.whiteUnderline]: white,
    });
    const marginTop = cx({
      [classes.marginTop]: labelText === undefined,
      [inputRootCustomClasses]: inputRootCustomClasses !== undefined
    });
    const inputClasses = cx({
      [classes.input]: true,
      [classes.whiteInput]: white,
    });
    const formControlClasses = cx({
      [classes.formControl]: true,
      [classes.formControlLabel]: labelText !== undefined,
      [formControlProps.className]: formControlProps.className !== undefined,
    });
    return (
      <Fragment>
        <FormControl
          {...formControlProps}
          className={formControlClasses}
          onBlur={this.handleBlur}
        >
          {labelText !== undefined ? (
            <InputLabel
              className={`${classes.labelRoot} ${labelClasses}`}
              htmlFor={id}
              {...labelProps}
            >
              {labelText}
            </InputLabel>
          ) : null}
          <Input
            classes={{
              input: inputClasses,
              root: marginTop,
              disabled: classes.disabled,
              underline: underlineClasses,
            }}
            id={id}
            inputRef={this.inputRef}
            value={inputText}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            {...inputProps}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  onClick={this.handleSwitch}
                >
                  <KeyboardArrowDown />
                </IconButton>
              </InputAdornment>
            }
          />
          {error ? (
            <Clear className={`${classes.feedback} ${classes.labelRootError}`} />
          ) : success ? (
            <Check className={`${classes.feedback} ${classes.labelRootSuccess}`} />
          ) : null}
        </FormControl>
        {
          menuOpened && (
            <div className={classes.popover}>
              <Paper
                id="simple-menu"
              >
                <MenuList>
                  {
                    options.map((option, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => this.handleSelectOption(option)}
                        selected={index === selected}
                      >
                        {option.title}
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </Paper>
            </div>
          )
        }
      </Fragment>
    );
  }
}

export default withStyles(customInputStyle)(Select);
