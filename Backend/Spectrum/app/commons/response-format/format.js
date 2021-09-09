/*
 * Response Format will format the response with status code, message and data
 */

const _ = require('lodash');

/**
 * @param {param} param
 * @param {message} message
 * @param {location} location
 */
const generateErrorObject = (param, message, location) => ({
  param,
  message,
  location,
});

/**
 * @param {errors} errors
 */
const getError = (errors) => {
  if (errors.errors) {
    const res = {
      meta: {
        code: 0,
        message: errors.errors[0].msg,
      },
      data: null,
    };
    return res;
  } else {
    const res = {
      meta: {
        code: 0,
        message: errors.message,
      },
      data: null,
    };
    return res;
  }
};

/* eslint-disable no-unused-vars */
/**
 * @param {statusCode} statusCode
 */
const checkStatusCode = (statusCode) => {
  if (!statusCode) {
    throw new Error('Status code is required');
  }
  if (!_.isNumber(statusCode)) {
    throw new Error('Status code not a number');
  }
};
/* eslint-enable no-unused-vars */

/**
 * @param {req} req
 * @param {res} res
 */
const success = (req, res) => {
  res.body = res.body || {};
  res.status(200);
  res.json(res.body);
};

/**
 * @param {req} req
 * @param {res} res
 */
const created = (req, res) => {
  res.body = res.body || {};
  res.status(200);
  res.json(res.body);
};

/**
 * @param {req} req
 * @param {res} res
 * @param {errors} errors
 */
const badRequest = (req, res, errors) => {
  res.status(200);
  res.json(getError(errors));
};

/**
 * @param {req} req
 * @param {res} res
 * @param {errors} errors
 */
const unAuthorized = (req, res, errors) => {
  res.status(200);
  res.json(getError(errors));
};

/**
 * @param {req} req
 * @param {res} res
 * @param {errors} errors
 */
const notFound = (req, res, errors) => {
  res.status(404);
  res.json(getError(errors));
};

/**
 * @param {req} req
 * @param {res} res
 * @param {errors} errors
 */
const conflict = (req, res, errors) => {
  res.status(401);
  res.json(getError(errors));
};

/**
 * @param {req} req
 * @param {res} res
 * @param {errors} errors
 */
const internalError = (req, res, errors) => {
  res.status(500);
  if (errors && errors.param) {
    res.body = {
      meta: {
        code: 0,
        message: errors.message,
      },
      data: null,
    };
  } else if (errors.stack) {
    const { message, stack } = errors;
    res.body = {
      message,
      stack,
    };
  } else {
    res.body = { message: 'Internal Server Error' };
  }
  res.json(res.body);
};

module.exports = {
  success,
  conflict,
  created,
  internalError,
  badRequest,
  unAuthorized,
  notFound,
  generateErrorObject,
};
