const knex = require('./knex');

module.exports={
    auth:{
        login(){

        }
    },
    users:{
        getAll() {
            return knex('users');
        },
        getOne(id){
            return knex('users').where('id',id).first();
        },
        getOneByEmail(email){
            return knex('users').where('email',email).first();
        },
        getOneByClinicName(clinic_name){
            return knex('users').where('clinic_name',clinic_name).first();
        },
        getOneByPhoneNumber(phone_number){
            return knex('users').where('phone_number',phone_number).first();
        },
        create(user){
            return knex('users').insert(user, 'id');
        }
    },
    consultation_records:{
        getAll() {
            return knex('consultation_records');
        },
        getOneClinic(clinic_name){
            return knex('consultation_records').where('clinic_name',clinic_name);
        },
        create(record){
            return knex('consultation_records').insert(record,'*')
        }
    }
}
