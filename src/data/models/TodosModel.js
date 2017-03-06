/*eslint-disable */
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import {
  connectPrimaryData,
} from '../mongo';
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

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
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
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

    // setTimeout(async () => {
    //   await model.remove({});
    //   if (await model.count() <= 10) {
    //     for (let i = 0; i <= 10; i++) {
    //       await model.create({
    //         title: `go to sleep ${i}`,
    //         done: false,
    //         owner: Math.random() * 100 > 50 ? '58bc301af30fc10b953fb094' : '58bcde603da2523004d06179',
    //       });
    //     }
    //   }
    //   console.log(await model.find({}));
    // }, 0);
  }
  return model;
}

/*eslint-enable */
