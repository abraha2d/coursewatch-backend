import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true
    },
    term: {
      type: String,
      required: true
    },
    crn: {
      type: String,
      required: true
    },
    title: {
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

subscriptionSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      term: this.term,
      crn: this.crn,
      title: this.title,
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

const model = mongoose.model("Subscription", subscriptionSchema);

export const schema = model.schema;
export default model;
