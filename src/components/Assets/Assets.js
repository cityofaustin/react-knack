import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";

import api from "../../queries/api";
import { workOrderFields } from "../../queries/fields";
import { signalsWorkOrderStatuses } from "../../constants/statuses";
import { getAllAssets } from "../WorkOrder/helpers";

const fields = workOrderFields.baseFields;
const statuses = signalsWorkOrderStatuses;

class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetsData: [],
      assetOptions: [],
      loading: false,
      location: "",
      currentPage: 1,
      lastPage: 1,
      updatedFormData: {},
      signal: "",
    };

    this.renderItem = (item, isHighlighted) => (
      <div
        key={item.id}
        style={{
          background: isHighlighted ? "lightgray" : "white",
          padding: "2px 5px",
        }}
      >
        {item.identifier}
      </div>
    );

    this.shouldItemRender = (item, value) =>
      item.identifier.toLowerCase().indexOf(value.toLowerCase()) > -1;

    this.inputProps = field => {
      return {
        className: "form-control",
        name: "asset",
        placeholder: "Type to search...",
      };
    };
  }

  componentDidMount() {
    getAllAssets().then(data => {
      this.setState({
        assetOptions: data.signalOptions, // Keep naming of options from imported helper
      });
    });
  }

  handleChange = event => {
    this.setState({
      location: event.target.value,
    });
  };

  handleSearch = event => {
    event.preventDefault();
    this.setState({ allWorkOrdersData: [], loading: true });
    api
      .allWorkOrders()
      .searchAll(this.state.location, 1)
      .then(res => {
        this.setState({
          allWorkOrdersData: res.data.records,
          loading: false,
          lastPage: res.data.total_pages,
          currentPage: 1,
        });
      });
  };

  updatePage = pageNumber => {
    this.setState({
      allWorkOrdersData: [],
      loading: true,
      currentPage: pageNumber,
    });
    api
      .allWorkOrders()
      .searchAll(this.state.location, pageNumber)
      .then(res => {
        this.setState({
          allWorkOrdersData: res.data.records,
          lastPage: res.data.total_pages,
          loading: false,
        });
      });
    window.scrollTo(0, 0);
  };

  prevPage = event => {
    event.preventDefault();
    // if currentPage !== 1, API call for prev page
    if (this.state.currentPage !== 1) {
      const prevPage = this.state.currentPage - 1;
      this.updatePage(prevPage);
    }
  };

  nextPage = event => {
    event.preventDefault();
    // if currentPage === lastPage, nothing, else API call for next page
    if (this.state.currentPage !== this.state.lastPage) {
      const nextPage = this.state.currentPage + 1;
      this.updatePage(nextPage);
    }
  };

  handleAutocompleteChange = (assetTypeString, e) => {
    e.persist();
    let data = this.state.updatedFormData;

    this.setState({ [assetTypeString]: e.target.value, updatedFormData: data });
  };

  onAssetSelect = (value, item) => {
    // TODO API call for signal data
    console.log(value, item);
    this.setState({ signal: item.identifier });
  };

  render() {
    // make sure the data is not an empty object `{}`
    const isJobsDataLoaded = this.state.assetsData.length > 0;
    const allWorkOrdersData = isJobsDataLoaded ? this.state.assetsData : [];
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Assets
        </h1>
        <form onSubmit={this.handleSearch}>
          {this.state.assetOptions.length > 0 && (
            <div className="form-group row">
              <label htmlFor={"Asset"}>{"Asset"}</label>
              <Autocomplete
                getItemValue={item => item.id}
                items={this.state.assetOptions}
                inputProps={this.inputProps("Type to search...")}
                wrapperStyle={this.wrapperStyle}
                menuStyle={this.menuStyle}
                renderItem={(item, isHighlighted) =>
                  this.renderItem(item, isHighlighted)
                }
                shouldItemRender={(item, value) =>
                  this.shouldItemRender(item, value)
                }
                value={this.state.signal}
                onChange={this.handleAutocompleteChange.bind(this, "signal")}
                onSelect={(value, item) => this.onAssetSelect(value, item)}
              />

              <input type="submit" value="Search" className="btn btn-primary" />
            </div>
          )}
        </form>
        {this.state.loading ? (
          <FontAwesomeIcon icon={faSpinner} size="2x" className="atd-spinner" />
        ) : (
          ""
        )}
        <ul className="list-group list-group-flush">
          {isJobsDataLoaded &&
            allWorkOrdersData.map(item => (
              <Link to={`/work-orders/${item.id}`} key={item.id}>
                <li
                  className="list-group-item d-flex row"
                  style={{
                    backgroundColor:
                      statuses[item[fields.status]].backgroundColor,
                    color: statuses[item[fields.status]].textColor,
                  }}
                >
                  {/* Location */}
                  <div className="col-12">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                    <span>{item[fields.locationAll]}</span>
                  </div>
                  {/* Status */}
                  <div className="col-6">
                    <FontAwesomeIcon
                      icon={
                        item[fields.status] &&
                        statuses[item[fields.status]].icon
                      }
                    />
                    <span> {item[fields.status]}</span>
                  </div>
                  {/* Modified at Datetime */}
                  <div className="col-6">
                    <span>{item[fields.modified]}</span>
                  </div>
                </li>
              </Link>
            ))}
        </ul>
        <form>
          <br />
          {this.state.assetsData.length > 0 && (
            <div className="form-group row justify-content-center">
              <div className="col-auto">
                <button className="btn btn-primary" onClick={this.prevPage}>
                  Prev. Page
                </button>
              </div>
              <div className="col-auto">
                Page {this.state.currentPage} of {this.state.lastPage}
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" onClick={this.nextPage}>
                  Next Page
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Assets;
