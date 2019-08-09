import { Navigation } from "pencil.js";

import { screensBuilders } from "./screen-manager";

Navigation.prepareScenes(screensBuilders, document.getElementById("canvas"));
