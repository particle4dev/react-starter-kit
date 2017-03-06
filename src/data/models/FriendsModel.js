/*eslint-disable */
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import {
  connectPrimaryData,
} from '../mongo';
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const FriendsSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  friend: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
});

// indexes
// FriendsSchema.index({
//   'title': 1
// });

// plugins
FriendsSchema.plugin(timestamps);

// methods
// FriendsSchema.statics.createANewToken = function () {}

let model = null;

export default function (mongoose) {
  if (!model) {
    if (!mongoose) {
      mongoose = connectPrimaryData();
    }
    model = mongoose.model('Friend', FriendsSchema);

    // setTimeout(async () => {
    //   await model.remove({});
    //   if (await model.count() < 2) {
    //     await model.create({
    //       _id: '58bce22b7a4a7d31225a3800',
    //       user: '58bc301af30fc10b953fb094',
    //       friend: '58bcde603da2523004d06179',
    //     });
    //     await model.create({
    //       _id: '58bce22b7a4a7d31225a3801',
    //       user: '58bcde603da2523004d06179',
    //       friend: '58bc301af30fc10b953fb094',
    //     });
    //   }
    //   console.log(await model.find({}));
    // }, 0);
  }
  return model;
}

/*eslint-enable */
