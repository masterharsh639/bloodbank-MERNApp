const express = require("express");
const userModel = require("../models/userModel");

const createInvertoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return new Error("User not found");
    }
    if (inventoryType == "in" && user.role !== "donar") {
      return new Error("Not a donar account");
    }
    if (inventoryType == "out" && user.role !== "hospital") {
      return new Error("Not a hospital");
    }

    const inventory = new inventoryModel(req.body);
    await inventory.save();

    return res.status(201).send({
      success: true,
      message: "new blood Record Added",
    });
  } catch (error) {
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Error in creating Inventory",
        error,
      });
    }
  }
};
