import mongoose, { Schema } from "mongoose";

const collegeSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

collegeSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      code: this.code,
      name: this.name,
      url: this.url
    };

    return full
      ? {
          ...view,
          // add properties for a full view
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
        }
      : view;
  }
};

const model = mongoose.model("College", collegeSchema);

export const schema = model.schema;
export default model;
