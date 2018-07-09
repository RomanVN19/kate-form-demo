import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';

import Delete from '@material-ui/icons/Delete';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

import Card from 'material-kit-react/dist/components/Card/Card';
import CardBody from 'material-kit-react/dist/components/Card/CardBody';
import CardHeader from 'material-kit-react/dist/components/Card/CardHeader';
import Button from 'material-kit-react/dist/components/CustomButtons/Button';

import { KateForm, getIn, createContent } from 'kate-form';

import tableStyle from './tableStyle';

class CustomTableEditable extends Component {
  componentWillMount() {
    this.mapRows(this.props.tableData || []);
    this.props.setData('getRow', this.getRow);
    this.props.setData('addRow', this.addRow);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.tableData !== nextProps.tableData) {
      this.mapRows(nextProps.tableData || []);
    }
  }
  shouldComponentUpdate(nextProps) {
    if (!nextProps.tableRows || !nextProps.tableData || nextProps.tableRows.length !== nextProps.tableData.length) return false;
    return true;
  }

  getRow = index => createContent(this.getRowData(index), this.setRowData(index))
  getRowData = index => () => (this.props.tableRows[index]);
  setRowData = index => (path, value) => {
    this.props.setData(`rows.${index}.${path}`, value);
    const paths = path.split('.');
    if (paths[1] === 'value') {
      const columns = this.props.tableHead;
      this.props.setData(`value.${index}.${columns[paths[0]].dataPath}`, value);
    }
  }

  mapRows = (data) => {
    const { tableHead: columns, setData } = this.props;
    const rows = data.map((row, rowIndex) =>
      columns.map(({ dataPath, title, onChange, ...rest }, colIndex) => ({
        value: getIn(row, dataPath),
        onChange: value => this.rowChange(rowIndex, dataPath, value, colIndex, onChange),
        ...rest,
      })));
    setData('rows', rows);
  }
  rowChange = (rowIndex, field, value, colIndex, onChange) => {
    this.props.setData(`value.${rowIndex}.${field}`, value);
    // if (this.props.rowChange) this.props.rowChange(rowIndex, field, value);
    if (onChange) {
      onChange(this.getRow(rowIndex), colIndex);
    }
  }
  addRow = (value = {}) => {
    const { tableData, setData } = this.props;
    setData('value', [...tableData, value]);
  }
  moveUp = (index) => {
    const { tableData, setData } = this.props;
    tableData.splice(index - 1, 0, tableData.splice(index, 1)[0]);
    setData('value', [...tableData]);
  }
  moveDown = (index) => {
    const { tableData, setData } = this.props;
    tableData.splice(index + 1, 0, tableData.splice(index, 1)[0]);
    setData('value', [...tableData]);
  }
  delete = (index) => {
    const { tableData, setData } = this.props;
    tableData.splice(index, 1);
    setData('value', [...tableData]);
  }
  render() {
    const { classes, tableHead, tableRows, tableHeaderColor, path } = this.props;
    return (
      <div className={classes.tableEditable}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[`${tableHeaderColor}TableHeader`]}>
              <TableRow>
                {tableHead.map(({ title, width }, key) => {
                  return (
                    <TableCell
                      className={`${classes.tableCell} ${classes.tableHeadCell}`}
                      key={key}
                      width={width}
                    >
                      {title}
                    </TableCell>
                  );
                })}
                <TableCell className={classes.actionCell} />
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {(tableRows || []).map((prop, rowIndex) => {
              return (
                <TableRow key={rowIndex} >
                  {tableHead.map((column, columnIndex) => {
                    return (
                      <TableCell className={classes.tableCell} key={columnIndex}>
                        {/* column.title */}
                        <KateForm path={`${path}.rows.${rowIndex}.${columnIndex}`} />
                      </TableCell>
                    );
                  })}
                  <TableCell className={classes.actionCell}>
                    <IconButton
                      onClick={() => this.moveUp(rowIndex)}
                      disabled={rowIndex === 0}
                    >
                      <ArrowUpward />
                    </IconButton>
                    <IconButton
                      onClick={() => this.moveDown(rowIndex)}
                      disabled={rowIndex === tableRows.length - 1}
                    >
                      <ArrowDownward />
                    </IconButton>
                    <IconButton
                      onClick={() => this.delete(rowIndex)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}


CustomTableEditable.defaultProps = {
  tableHeaderColor: 'gray',
};

export default withStyles(tableStyle)(CustomTableEditable);
