export const errorResponse = (res, { message }) => res.status(500).json([message]);
