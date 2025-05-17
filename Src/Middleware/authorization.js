import { AppError } from "../Utils/AppError.js";
import { messages } from "../Utils/constant/messages.js";
import i18n from "../Utils/I18n/i18n.js";

export const isAuthorization = (roles = []) => {
  return (req, res, next) => {
    //lang
     const lang = req.query.lang || "en";
        i18n.setLocale(lang);
    if (!req.authUser) {
      return next(new AppError(i18n.__(messages.user.notAuthenticated), 401));
    }
    if (!roles.includes(req.authUser.role)) {
      return next(new AppError(i18n.__(messages.user.notAuthorized), 401));
    }
    next();
  };
};
