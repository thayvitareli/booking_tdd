import { CreateBookingDTO } from "../../application/dtos/create_booking_dto";
import { BookingService } from "../../application/services/booking_service";
import { Request, Response } from "express";
import { UserService } from "../../application/services/user_service";
import { User } from "../../domain/entities/user";
import { CreateUserDTO } from "../../application/dtos/create_user_dto";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
     
      if(!req.body.name) throw new Error('O campo nome é obrigatório.')

      const dto: CreateUserDTO = {
        name: req.body.name,
      };

       await this.userService.save(dto);

      return res.status(201).json({
        message: "User created successfully",
       });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "An unexpected error occurred" });
    }
  }

}
