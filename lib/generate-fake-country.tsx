import {faker} from "@faker-js/faker";


const GenerateFakeCountry = ()=>{

    return {
        name:faker.location.country(),
        code:faker.location.countryCode('alpha-2') 
    }

}