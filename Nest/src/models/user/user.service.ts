import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { UserRegisterRequestDto } from "./DTOs/user-register.req.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{
    
    async doUserRegistration(userRegister: UserRegisterRequestDto): Promise<User> {
        
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(userRegister.password, salt);

        const user = new User();
        user.name = userRegister.name;
        user.surname = userRegister.surname;
        user.username = userRegister.username;
        user.email = userRegister.email;
        user.password = password;

        return await user.save();

    }

    async getUserByEmail(email: string) {
        return User.findOne({ where: {email} });
    }

    async updateUser(id:number, user:User) {
        return User.update(id, user);
    }

    async deleteUser(id:number) {
        return User.delete(id);
    }
    
    async getUserById(id: number) {
        return User.findOneBy({ id });
    }

    
}