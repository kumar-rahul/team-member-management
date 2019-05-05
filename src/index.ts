import "reflect-metadata";
import { Container } from "typescript-ioc";

import app from "./app/server";

// tmm: team member management
const tmmApp: app = Container.get(app);
tmmApp.start();
