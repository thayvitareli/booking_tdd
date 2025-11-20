import { Request, Response } from "express";
import { PropertyService } from "../../application/services/property_service";
import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";

export class PropertyController {
  private propertyService: PropertyService;

  constructor(propertyService: PropertyService) {
    this.propertyService = propertyService;
  }

  async createProperty(req: Request, res: Response): Promise<Response> {
    try {
     
      const dto: CreatePropertyDTO = {
        name: req.body.name,
        description: req.body.description,
        maxGuests: req.body.maxGuests,
        basePricePerNight: req.body.basePricePerNight,
      };

      if(!dto.name) throw new Error('O nome da propriedade é obrigatório.')

      if(dto.maxGuests <= 0) throw new Error('A capacidade máxima deve ser maior que zero.')

      if(!dto.basePricePerNight) throw new Error('O preço base por noite é obrigatório')


      const property = await this.propertyService.createProperty(dto);

      return res.status(201).json({
        message: "Property created successfully",
        property: {
          id: property?.getId(),
          name: property?.getName(),
          maxGuests:property?.getMaxGuests(),
          basePricePerNight: property?.getBasePricePerNight(),
        },
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "An unexpected error occurred" });
    }
  }

}
