import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/task_mgnt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

export default db;
