import Vue from "vue";

import dragDialog from "./dragDialog/dragDialog.js";
import permission from "./permission/permission.js";

Vue.directive("dragDialog", dragDialog);
Vue.directive("permission", permission);