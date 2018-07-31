import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    term: {
      type: Schema.ObjectId,
      ref: "Term",
      required: true
    },
    crn: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    section: {
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

courseSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      term: this.term.view(full),
      crn: this.crn,
      subject: this.subject,
      number: this.number,
      section: this.section,
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

const model = mongoose.model("Course", courseSchema);

export const schema = model.schema;
export default model;
