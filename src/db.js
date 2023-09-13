import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const { connection: { name } } = await connect('mongodb://localhost/mern-crud-auth');
    console.log(`>>> DB "${name}" is connected`);
  } catch (error) {
    console.log('error', error);
  }
};

connectDB();
