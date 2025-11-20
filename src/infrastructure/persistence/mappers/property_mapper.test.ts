import { Property } from '../../../domain/entities/property'
import {PropertyMapper} from './property_mapper'

describe('Property Mapper', ()=> {
     it("deve converter PropertyEntity em Property corretamente", ()=>{

      const property =  PropertyMapper.toDomain({
            basePricePerNight:200,
            description: 'Casa de praia em Santos',
            id:'1',
            maxGuests:5,
            name:'Casa de praia',
            bookings:[]
        })

        expect(property.getId()).toBe('1')
        expect(property.getName()).toBe('Casa de praia')
        expect(property.getMaxGuests()).toBe(5)
        expect(property.getDescription()).toBe('Casa de praia em Santos')
        expect(property.getBasePricePerNight()).toBe(200)

    })

it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", ()=>{
      const dto ={
            name:'',
            basePricePerNight:200,
            description: 'Casa de praia em Santos',
            id:'1',
            maxGuests:5,
            bookings:[]
        }

        expect(()=> PropertyMapper.toDomain(dto)).toThrow('O nome é obrigatório')
})

it("deve converter Property para PropertyEntity corretamente",()=>{
    const property =  new Property('1','Casa de praia','Casa de praia em Santos',5,200)

    const entity = PropertyMapper.toPersistence(property)

        expect(entity.id).toBe('1')
        expect(entity.name).toBe('Casa de praia')
        expect(entity.maxGuests).toBe(5)
        expect(entity.description).toBe('Casa de praia em Santos')
        expect(entity.basePricePerNight).toBe(200)
})
})