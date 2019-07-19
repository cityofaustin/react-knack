import axios from "axios";
import Cookies from "js-cookie";
import { APP_ID } from "../constants/api";

const keys = {
  allMyWorkOrders: { sceneId: "scene_88", viewId: "view_813" },
  allWorkOrders: {
    sceneId: "scene_243",
    viewId: "view_713",
  },
  editWorkOrder: {
    sceneId: "scene_384",
    viewId: "view_1082",
    formViewId: "view_2474",
    technicianId: "field_909",
  },
  editNewWorkOrder: {
    sceneId: "scene_328",
    detailsViewId: "view_962",
    formViewId: "view_958",
    assignToSelfId: "field_1752",
    technicianId: "field_1754",
    csrFieldId: "field_1235",
    taskOrderId: "field_2634",
  },
  submitWorkoder: {
    sceneId: "scene_450",
    viewId: "view_1280",
  },
  newWorkOrder: {
    sceneId: "scene_979",
    viewId: "view_2466",
    cameraFieldId: "field_1862",
    schoolZoneFieldId: "field_1871",
    signalFieldId: "field_1060",
    hazardFlasherFieldId: "field_1864",
    dmsFieldId: "field_1859",
    sensorFieldId: "field_1863",
  },
  newCsrNumber: {
    sceneId: "scene_328",
    viewId: "view_1115",
  },
  timeLog: {
    sceneId: "scene_297",
    viewId: "view_1252",
    technicianFieldId: "field_1753",
    vehicleFieldId: "field_1427",
  },
  addImage: {
    sceneId: "scene_255",
    viewId: "view_2234",
  },
  workOrderDetails: { sceneId: "scene_297", viewId: "view_961" },
  workOrderImages: { sceneId: "scene_255", viewId: "view_2234" },
  workOrderInventory: { sceneId: "sscene_297", viewId: "view_885" },
  workOrderTimeLogs: { sceneId: "scene_297", viewId: "view_1251" },
  workOrderTitle: { sceneId: "scene_297", viewId: "view_910" },
  assets: {
    details: { sceneId: "scene_446", viewId: "view_1261" },
    cameras: { sceneId: "scene_446", viewId: "view_1291" },
    workOrders: { sceneId: "scene_446", viewId: "view_1550" },
    serviceRequests: { sceneId: "scene_446", viewId: "view_1701" },
    preventativeMaint: { sceneId: "scene_446", viewId: "view_1282" },
  },
};

// images
// https://us-api.knack.com/v1/scenes/scene_297/views/view_922/records?format=both&page=1&rows_per_page=25&my-work-order-details2_id=5bb3b798b7748a2d06a4e87b&sort_field=field_1044&sort_order=asc&_=1538676399108

const api = {
  csrNumber() {
    return {
      new: data =>
        axios.post(
          `https://us-api.knack.com/v1/scenes/${
            keys.newCsrNumber.sceneId
          }/views/${keys.newCsrNumber.viewId}/records`,
          data,
          getHeaders()
        ),
    };
  },
  myWorkOrders() {
    return {
      getAll: () =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.allMyWorkOrders.sceneId
          }/views/${keys.allMyWorkOrders.viewId}/records/`,
          getHeaders()
        ),
    };
  },
  allWorkOrders() {
    return {
      getAll: () =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.allWorkOrders.sceneId
          }/views/${keys.allWorkOrders.viewId}/records/`,
          getHeaders()
        ),
      searchAll: (searchValue, pageNumber) =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.allWorkOrders.sceneId
          }/views/${
            keys.allWorkOrders.viewId
          }/records?rows_per_page=100&page=${pageNumber}&filters=[{"value":"${searchValue}","operator":"contains","field":"field_904"}]`,
          getHeaders()
        ),
    };
  },
  workOrder() {
    return {
      technicians: data =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.editWorkOrder.sceneId
          }/views/${keys.editWorkOrder.formViewId}/connections/${
            keys.editWorkOrder.technicianId
          }?rows_per_page=2000&filters=[{"value":"profile_65","operator":"contains","field":"field_171"}]`,
          getHeaders()
        ),
      csr: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.editNewWorkOrder.sceneId
          }/views/${keys.editNewWorkOrder.formViewId}/connections/${
            keys.editNewWorkOrder.csrFieldId
          }?rows_per_page=2000&filters=[{"field":"field_1887","operator":"contains","value":"${searchValue}"}]`,
          getHeaders()
        ),
      taskOrder: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.editNewWorkOrder.sceneId
          }/views/${keys.editNewWorkOrder.formViewId}/connections/${
            keys.editNewWorkOrder.taskOrderId
          }?rows_per_page=2000&filters=[{"field":"field_2633","operator":"is","value":"Yes"},{"field":"field_1278","operator":"contains","value":"${searchValue}"}]`,
          getHeaders()
        ),
      new: data =>
        axios.post(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/records`,
          data,
          getHeaders()
        ),
      edit: (id, data) =>
        axios.put(
          `https://us-api.knack.com/v1/scenes/${
            keys.editWorkOrder.sceneId
          }/views/${keys.editWorkOrder.viewId}/records/${id}`,
          data,
          getHeaders()
        ),
      getEditPageDetails: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.editWorkOrder.sceneId
          }/views/${keys.editWorkOrder.viewId}/records/${id}`,
          getHeaders()
        ),
      submit: (id, data) =>
        axios.put(
          `https://us-api.knack.com/v1/scenes/${
            keys.submitWorkoder.sceneId
          }/views/${keys.submitWorkoder.viewId}/records/${id}`,
          data,
          getHeaders()
        ),
      editNewWorkOrder: (id, data) =>
        axios.put(
          `https://us-api.knack.com/v1/scenes/${
            keys.editNewWorkOrder.sceneId
          }/views/${keys.editNewWorkOrder.formViewId}/records/${id}`,
          data,
          getHeaders()
        ),
      getEditNewWorkOrderDetails: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.editNewWorkOrder.sceneId
          }/views/${keys.editNewWorkOrder.detailsViewId}/records/${id}`,
          getHeaders()
        ),
      getTitle: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderTitle.sceneId
          }/views/${keys.workOrderTitle.viewId}/records/${id}`,
          getHeaders()
        ),
      getDetails: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderDetails.sceneId
          }/views/${keys.workOrderDetails.viewId}/records/${id}`,
          getHeaders()
        ),
      getTimeLogs: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderTimeLogs.sceneId
          }/views/${
            keys.workOrderTimeLogs.viewId
          }/records?my-work-order-details_id=${id}`,
          getHeaders()
        ),
      newTimeLog: (id, data) =>
        axios.post(
          `https://us-api.knack.com/v1/scenes/${keys.timeLog.sceneId}/views/${
            keys.timeLog.viewId
          }/records/`,
          data,
          getHeaders()
        ),
      getTimeLogTechnicianOptions: () =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${keys.timeLog.sceneId}/views/${
            keys.timeLog.viewId
          }/connections/${
            keys.timeLog.technicianFieldId
          }?rows_per_page=2000&filters=[{"value":"profile_65","operator":"contains","field":"field_171"}]`,
          getHeaders()
        ),
      getVehicleOptions: () =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${keys.timeLog.sceneId}/views/${
            keys.timeLog.viewId
          }/connections/${
            keys.timeLog.vehicleFieldId
          }?rows_per_page=2000&filters=[{"field":"field_2360","operator":"is","value":"ARTERIAL MANAGEMENT"}]`,
          getHeaders()
        ),
      getInventory: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.workOrderInventory.sceneId
          }/views/${
            keys.workOrderInventory.viewId
          }/records?my-work-order-details2_id=${id}`,
          getHeaders()
        ),
      getImages: id =>
        axios.get(
          `https://api.knack.com/v1/scenes/${keys.addImage.sceneId}/views/${
            keys.addImage.viewId
          }/records?work-order-details_id=${id}`,
          getHeaders()
        ),
      schoolZones: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.schoolZoneFieldId
          }?rows_per_page=2000`,
          getHeaders()
        ),
      signals: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.signalFieldId
          }?rows_per_page=2000&filters=[{"value":"PRIMARY","operator":"is","field":"field_208"},{"field":"field_1058","operator":"contains","value":"${searchValue}"}]`,
          getHeaders()
        ),
      cameras: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.cameraFieldId
          }?rows_per_page=2000&filters=[{"field":"field_1514","operator":"contains","value":"${searchValue}"}]`,
          getHeaders()
        ),
      hazardFlashers: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.hazardFlasherFieldId
          }?rows_per_page=2000&filters=[]&limit_return=true`,
          getHeaders()
        ),
      dmses: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.dmsFieldId
          }?rows_per_page=2000&filters=[]&limit_return=true`,
          getHeaders()
        ),
      sensors: searchValue =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.newWorkOrder.sceneId
          }/views/${keys.newWorkOrder.viewId}/connections/${
            keys.newWorkOrder.sensorFieldId
          }?rows_per_page=2000&filters=[]&limit_return=true`,
          getHeaders()
        ),
      addImage: (form, id) =>
        axios
          .post(
            `https://api.knack.com/v1/applications/${APP_ID}/assets/image/upload`,
            form,
            getImageHeaders()
          )
          .then(response => {
            const imageId = response.data.id;
            const data = {
              field_1047: imageId,
              field_1045: id, // Add work order id to post data to associate the image with work order record
            };
            axios
              .post(
                `https://api.knack.com/v1/scenes/${
                  keys.addImage.sceneId
                }/views/${keys.addImage.viewId}/records?work-order_id=${id}`,
                data,
                getHeaders()
              )
              .then(response => {
                console.log(response);
              });
          }),
    };
  },
  assets() {
    return {
      details: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.assets.details.sceneId
          }/views/${keys.assets.details.viewId}/records/${id}`,
          getHeaders()
        ),
      cameras: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.assets.cameras.sceneId
          }/views/${
            keys.assets.cameras.viewId
          }/records?signal-details_id=${id}`,
          getHeaders()
        ),
      workOrders: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.assets.workOrders.sceneId
          }/views/${
            keys.assets.workOrders.viewId
          }/records?signal-details_id=${id}`,
          getHeaders()
        ),
      serviceRequests: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.assets.serviceRequests.sceneId
          }/views/${
            keys.assets.serviceRequests.viewId
          }/records?signal-details_id=${id}`,
          getHeaders()
        ),
      preventativeMaint: id =>
        axios.get(
          `https://us-api.knack.com/v1/scenes/${
            keys.assets.preventativeMaint.sceneId
          }/views/${
            keys.assets.preventativeMaint.viewId
          }/records?signal-details_id=${id}`,
          getHeaders()
        ),
    };
  },
};

function getHeaders() {
  return {
    headers: {
      "X-Knack-Application-Id": APP_ID,
      "X-Knack-REST-API-KEY": "knack",
      Authorization: Cookies.get("knackUserToken"),
      "content-type": "application/json",
    },
  };
}

function getImageHeaders() {
  return {
    processData: false,
    contentType: false,
    mimeType: `multipart/form-data`,
    headers: {
      "X-Knack-Application-Id": APP_ID,
      "X-Knack-REST-API-KEY": "knack",
    },
  };
}

export default api;
