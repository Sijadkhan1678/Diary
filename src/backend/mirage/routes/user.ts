import { Response, Request} from 'miragejs';
import {handleErrors} from '../server'
import {User} from '../../../interfaces/User';
import {randomBytes} from 'crypto';

const generateToken = () => randomBytes(8).toString('hex');

export interface AuthResponse {
  token: string,
  user: User
}

const login = (schema:any,req:Request): AuthResponse | Response => {
  const {username,password} = JSON.parse(req.requestBody);
  const user = schema.users.findBy({username})
  if(!user){
    return handleErrors(null,'A user with this username does not exist')
    
  }
  if(password !== user.password){
    handleErrors(null,'password incorrect');
  }
  const token = generateToken();
  return{
    user: user.attrs as User,
    token,
  };
}

const signup = (schema:any,req:Request) :AuthResponse | Response => {
  
  const data = JSON.parse(req.requestBody);
  
  const existUser = schema.findBy({username:data.username});
  if(existUser){
    handleErrors(null,'A user with username already exist')
  }
  const user = schema.users.create(data);
  const token = generateToken()
  return{
    user: user.attrs as User,
    token: token,
  };
  
};

export default {
  login,
  signup,
};