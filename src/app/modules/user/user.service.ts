import httpStatus from 'http-status';
import AppError from '../../errors/AppErrors';
import { TUser } from './user.interface';
import { User } from './user.model';


const checkIfUserExists = async (email: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError( httpStatus.BAD_REQUEST,'User with this email already exists');
  }
};

const createUser = async (payload: TUser): Promise<TUser> => {
  await checkIfUserExists(payload.email);

  payload.role = 'admin';
  const result = await User.create(payload)

  return result
}

const getAllUser = async () => {
  const result = await User.find()
  return result
}

const getSingleUser = async (id: string) => {

  const result = await User.findById(id)
  return result
}

const updateUser = async (id: string, data: TUser) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  })
  return result
}

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
} 

export const UserServices = {

  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};