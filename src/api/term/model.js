import mongoose, { Schema } from "mongoose";

const termSchema = new Schema(
  {
    college: {
      type: Schema.ObjectId,
      ref: "College",
      required: true
    },
    yyyymm: {
      type: String,
      required: true
    },
    name: {
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

termSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      college: this.college.view(full),
      yyyymm: this.yyyymm,
      name: this.name
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

const model = mongoose.model("Term", termSchema);

export const schema = model.schema;
export default model;
