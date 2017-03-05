/*eslint-disable */
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import {
  connectPrimaryData,
} from '../mongo';
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  },
});

// indexes
// TodoSchema.index({
//   'title': 1
// });

// plugins
TodoSchema.plugin(timestamps);

// methods
// TodoSchema.statics.createANewToken = function () {}

let model = null;

export default function (mongoose) {
  if (!model) {
    if (!mongoose) {
      mongoose = connectPrimaryData();
    }
    model = mongoose.model('Todo', TodoSchema);

    /**
    setTimeout(async () => {
      if (await model.count() <= 5) {
        for (let i = 0; i <= 5; i++) {
          await model.create({
            title: `go to sleep ${i}`,
            done: false,
          });
        }
      }
      console.log(await model.find({}));
    }, 0);
    */
  }
  return model;
}

/*eslint-enable */
