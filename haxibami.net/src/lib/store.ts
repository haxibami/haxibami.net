import { createContext } from "react";
import type { LinkWidgetMeta } from "lib/interface";

const init = { state: { metas: [] as LinkWidgetMeta[] } };

const Context = createContext(init);

export default Context;
