import i18n from "i18n"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 i18n.configure({
locales : ['en' , 'ar'],
directory:path.join(__dirname,"../Locales"),
defaultLocale:"en",
queryParameter:"lang",
  autoReload: true,
  syncFiles: true,
  objectNotation: true,
})
export default i18n