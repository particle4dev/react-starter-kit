/*eslint-disable */
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import {
  connectPrimaryData,
} from '../mongo';
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const EmailSchema = new Schema({
  address: {
    type: String,
    required: true,
    sparse: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
}, {
  _id: false,
});

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  emails: EmailSchema,
  profile: Schema.Types.Mixed,

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
    //   await model.remove({})
    //   if (await model.count() < 1) {
    //     for (let i = 0; i < 2; i++) {
    //       if (i == 0) {
    //         await model.create({
    //           _id: '58bc301af30fc10b953fb094',
    //           username: `particle4dev${i}`,
    //           emails: {
    //             address: `particle4dev${i}@gmail.com`,
    //             verified: true
    //           }
    //         });
    //       }
    //       if (i == 1) {
    //         await model.create({
    //           _id: '58bcde603da2523004d06179',
    //           username: `particle4dev${i}`,
    //           emails: {
    //             address: `particle4dev${i}@gmail.com`,
    //             verified: true
    //           }
    //         });
    //       }
    //     }
    //   }
    //   console.log(await model.find({}));
    // }, 0);
  }
  return model;
}

/*eslint-enable */
