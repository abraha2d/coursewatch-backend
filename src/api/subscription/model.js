import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true
    },
    course: {
      type: Schema.ObjectId,
      ref: "Course",
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

subscriptionSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      course: this.course.view(full),
      updatedAt: this.updatedAt
    };

    return full
      ? {
          ...view,
          // add properties for a full view
          createdAt: this.createdAt
        }
      : view;
  }
};

const model = mongoose.model("Subscription", subscriptionSchema);

export const schema = model.schema;
export default model;
