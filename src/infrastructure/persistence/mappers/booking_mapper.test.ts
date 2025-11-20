import { Booking } from '../../../domain/entities/booking'
import { Property } from '../../../domain/entities/property'
import { User } from '../../../domain/entities/user'
import { DateRange } from '../../../domain/value_objects/date_range'
import { BookingEntity } from '../entities/booking_entity'
import {BookingMapper} from './booking_mapper'
import { PropertyMapper } from './property_mapper'
import { UserMapper } from './user_mapper'

describe('Booking Mapper', ()=> {
     it("deve converter BookingEntity em Booking corretamente", ()=>{

        const startDate = new Date('2025-20-11')
        const endDate = new Date('2025-25-11')
        const dateRange= new DateRange(startDate,endDate)

        const property = new Property('1','Casa de praia','Casa de praia em Santos',5,200)
  const propertyEntity =  PropertyMapper.toPersistence(property)
  const userEntity = UserMapper.toPersistence(new User('2','João da Silva'))

      const booking =  BookingMapper.toDomain({
        endDate: startDate,
        startDate:endDate,
        guest: userEntity,
        guestCount:5,
        id:'1',
        property:propertyEntity ,
        totalPrice: property.calculateTotalPrice(dateRange),
        status: 'CONFIRMED'
        })

        expect(booking.getId()).toBe('1')
        expect(booking).toBeInstanceOf(Booking)

    })

it("deve converter Booking para BookingEntity corretamente",()=>{
    const startDate = new Date('2025-20-11')
        const endDate = new Date('2025-25-11')
        const dateRange= new DateRange(startDate,endDate)

        const property = new Property('1','Casa de praia','Casa de praia em Santos',5,200)
  const user = new User('2','João da Silva')

  const booking = new Booking('1', property, user, dateRange,4)

 const bookingEntity= BookingMapper.toPersistence(booking)
          expect(bookingEntity).toBeInstanceOf(BookingEntity)
})
})