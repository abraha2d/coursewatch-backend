import mongoose, { Schema } from "mongoose";

const collegeSchema = new Schema(
  {
    code: {
      type: String
    },
    name: {
      type: String
    },
    url: {
      type: String
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
      url: this.url,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

const model = mongoose.model("College", collegeSchema);

export const schema = model.schema;
export default model;
