import Joi from "joi";

export const profileSchema = Joi.object({
  name: Joi.string().empty(""),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .empty(""),
  birthday: Joi.string().empty(),
  img: Joi.string().empty(),
  oldPassword: Joi.string().empty(""),
  newPassword: Joi.string().min(6).empty(""),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).empty(""),
})
  .with("newPassword", "oldPassword")
  .with("newPassword", "confirmPassword").messages({"object.with":'{{#peer}} is required'})
