import mongoose, { mongo } from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) return;
  const mongoUri='mongodb+srv://aguilbert18:OcKLUV8zfRRiEkME@mflix.91gkrpo.mongodb.net/sample_mflix?retryWrites=true&w=majority'

  mongoose.connect(mongoUri);
};

export default dbConnect;
