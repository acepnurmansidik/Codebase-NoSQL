const crudServices = require("../../helper/crudService");
const globalService = require("../../helper/global-func");
const UsersModel = require("../models/users.model");
const controller = {};

controller.getAllUser = async (req, res, next) => {
  /*
    #swagger.tags = ['USERS / IAM']
    #swagger.summary = 'User'
    #swagger.description = 'untuk referensi group'
    #swagger.parameters['search'] = { default: '', description: 'search by value' }
    #swagger.parameters['limit'] = { default: 10, description: 'limit' }
    #swagger.parameters['page'] = { default: 1, description: 'page' }
  */
  try {
    const query = {};
    const populateField = [
      { path: "role_id", model: "Role", select: "_id name path_access" },
      { path: "auth_id", model: "AuthUser", select: "_id username email" },
    ];
    const { search, type, page, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    if (query.length) query.type = type;
    const arrFilter = [];
    if (search) {
      arrFilter.push({ name: { $regex: search, $options: "i" } });
    }
    if (arrFilter.length) query["$or"] = arrFilter;

    const page_size = await UsersModel.countDocuments(query);
    const result = await crudServices.findAllPagination(UsersModel, {
      query,
      populateField,
      skip,
      limit,
    });
    res.status(200).json({ ...result, page_size, current_page: Number(page) });
  } catch (err) {
    next(err);
  }
};

controller.createUser = async (req, res, next) => {
  try {
    /*
    #swagger.tags = ['USERS / IAM']
    #swagger.summary = 'User'
    #swagger.description = 'untuk referensi group'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create role',
      schema: { $ref: '#/definitions/BodyUserIAMSchema' }
    }
  */
    const payload = req.body;
    payload.name = payload.name.toLowerCase();
    payload.slug = globalService.createSlug(payload.name);

    const result = await crudServices.create(UsersModel, { data: payload });
    res.status(201).json({
      code: 201,
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

controller.updateUser = async (req, res, next) => {
  try {
    /*
    #swagger.tags = ['USERS / IAM']
    #swagger.summary = 'User'
    #swagger.description = 'untuk referensi group'
    #swagger.parameters['id'] = { description: 'id role' }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Update role',
      schema: { $ref: '#/definitions/BodyUserIAMSchema' }
    }
  */
    const { id } = req.params;
    const payload = req.body;
    payload.name = payload.name.toLowerCase();
    payload.slug = globalService.createSlug(payload.value);

    const result = await crudServices.update(UsersModel, {
      id,
      data: payload,
    });
    res.status(200).json({
      code: 200,
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

controller.deleteUser = async (req, res, next) => {
  try {
    /*
    #swagger.tags = ['USERS / IAM']
    #swagger.summary = 'User'
    #swagger.description = 'untuk referensi group'
    #swagger.parameters['id'] = { description: 'id role' }
  */
    const { id } = req.params;
    const result = await crudServices.delete(UsersModel, { id });
    res.status(200).json({
      code: 200,
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
