import { celebrate, Segments, Joi } from 'celebrate';

export const validationStore = celebrate({
  [Segments.BODY]: {
    player_1: Joi.string().required(),
  },
});

export const validationUpdate = celebrate({
  [Segments.BODY]: {
    player_2: Joi.string().required(),
  },
});
