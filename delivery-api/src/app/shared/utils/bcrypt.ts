import * as bcrypt from 'bcrypt';
import environment from '@/environment';

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, environment.hashSalt);
}
