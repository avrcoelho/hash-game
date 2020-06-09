import { celebrate, Segments, Joi } from 'celebrate';

export const validationStore = celebrate({
  [Segments.BODY]: {
    player: Joi.string().required(),
    position: Joi.number().required(),
    type: Joi.string().pattern(/x|o/).required(),
  },
});
