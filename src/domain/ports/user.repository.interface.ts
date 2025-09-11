import { User } from "../entities/user.entity"

export interface UserRepositoryInterface {
  create(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(identifyNumber: number): Promise<User | null>
  findAll(): Promise<User[]>
  update(identifyNumber: number, user: Partial<User>): Promise<User>
  delete(identifyNumber: number): Promise<void>
}