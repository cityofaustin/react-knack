import React, { Component } from 'react';
import Select from 'react-select';

import { FIELDS } from './formConfig';
import api from '../../queries/api';

export default class AddInventoryItemsFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsOptions: [],
      conditionOptions: [],
    };
  }

  componentDidMount() {
    this.getItemOptions();
    this.getConditionOptions();
  }

  getItemOptions = () => {};

  getConditionOptions = () => {};

  render() {
    return <></>;
  }
}