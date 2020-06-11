import { celebrate, Segments, Joi } from 'celebrate';

export const validationStore = celebrate({
  [Segments.BODY]: {
    position: Joi.number().required(),
  },
});
