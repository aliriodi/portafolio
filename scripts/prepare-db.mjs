import "dotenv/config";
import {mkdirSync, openSync, closeSync} from "node:fs";
import {dirname} from "node:path";
const url = process.env.DATABASE_URL;
if (!url?.startsWith("file:")) throw new Error("DATABASE_URL must start with file:");
const path = url.slice(5);
mkdirSync(dirname(path), {recursive:true});
closeSync(openSync(path,"a"));
