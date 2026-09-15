const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, default: "Misc" },
    time: { type: String, default: "" },
    space: { type: String, default: "" },
    tags: { type: [String], default: [] },
    code: { type: String, required: true },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

// Send `id` instead of `_id`/`__v` so the frontend doesn't need to change shape
TemplateSchema.set("toJSON", {
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

module.exports = mongoose.model("Template", TemplateSchema);
