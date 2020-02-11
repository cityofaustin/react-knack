import Home from "../components/Home";
import WorkOrderDetails from "../components/WorkOrderDetails";
import MyWorkOrders from "../components/MyWorkOrders";
import AllWorkOrders from "../components/AllWorkOrders";
import NewWorkOrder from "../components/WorkOrder/New";
import EditWorkOrder from "../components/WorkOrder/Edit";
import SubmitWorkOrder from "../components/WorkOrder/Submit";
import NewTimeLog from "../components/WorkOrder/NewTimeLog";
import AddImage from "../components/WorkOrder/AddImage";
import Assets from "../components/Assets/Assets";

import {
  faHome,
  faTruck,
  faStreetView,
  faPlus,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const pages = [
  {
    path: "/",
    component: Home,
    exact: true,
    pageTitle: "Home",
    icon: faHome,
  },
  {
    path: "/my-work-orders",
    component: MyWorkOrders,
    mainPage: true,
    pageTitle: "My Work Orders",
    icon: faStreetView,
  },
  {
    path: "/all-work-orders",
    component: AllWorkOrders,
    mainPage: true,
    icon: faTruck,
    pageTitle: "All Work Orders",
    icon: faTruck,
  },
  {
    path: "/work-order/new",
    component: NewWorkOrder,
    mainPage: true,
    pageTitle: "New Work Order",
    icon: faPlus,
  },
  {
    path: "/work-order/edit/:workOrderId",
    component: EditWorkOrder,
  },
  {
    path: "/work-order/submit/:workOrderId",
    component: SubmitWorkOrder,
  },
  {
    path: "/work-order/new-time-log/:workOrderId",
    component: NewTimeLog,
    isEditable: false,
  },
  {
    path: "/work-order/:workOrderId/edit-time-log/:timeLogId",
    component: NewTimeLog,
    isEditable: true,
  },
  {
    path: "/work-order/add-image/:workOrderId",
    component: AddImage,
  },
  {
    path: "/work-orders/:workOrderId",
    exact: true,
    component: WorkOrderDetails,
  },
  {
    path: "/work-orders/:workOrderId/assets/:assetId",
    exact: true,
    component: Assets,
  },
  {
    path: "/assets",
    exact: true,
    component: Assets,
    mainPage: true,
    pageTitle: "Search Signals",
    icon: faMapMarkerAlt,
  },
];

export default pages;
