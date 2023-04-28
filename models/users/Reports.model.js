const { Schema, model } = require("mongoose");

const reportSchema = new Schema(
  {
    tranId: {
    type: String,
    required: true,
    },
    itemId: {
    type: String,
    required: true,
    },
    itemType: {
    type: String,
    required: true,
    },
    userId: {type: Schema.Types.ObjectId, ref: "Users"},
    reason: {
        type: String,
        required: true,
    },
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Reports = model("Reports", reportSchema);

module.exports = Reports;