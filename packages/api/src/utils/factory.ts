import type { AppContext } from "#/types";
import { createFactory } from "hono/factory";

export default createFactory<AppContext>();
