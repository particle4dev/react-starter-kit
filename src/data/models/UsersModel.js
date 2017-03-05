/*eslint-disable */
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import {
  connectPrimaryData,
} from '../mongo';
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
});

// indexes
// UserSchema.index({
//   'title': 1
// });

// plugins
UserSchema.plugin(timestamps);

// methods
// UserSchema.statics.createANewToken = function () {}

let model = null;

export default function (mongoose) {
  if (!model) {
    if (!mongoose) {
      mongoose = connectPrimaryData();
    }
    model = mongoose.model('User', UserSchema);
    // setTimeout(async () => {
    //   if (await model.count() < 1) {
    //     for (let i = 0; i < 1; i++) {
    //       await model.create({
    //         _id: new ObjectId('58bc301af30fc10b953fb094'),
    //         username: `particle4dev`
    //       });
    //     }
    //   }
    //   console.log(await model.find({}));
    // }, 0);
  }
  return model;
}

/*eslint-enable */
