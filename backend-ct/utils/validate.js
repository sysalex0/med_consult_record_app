const isString = require('lodash/isString');
const isNumber = require('lodash/isNumber');
const isBoolean = require('lodash/isBoolean');

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export function validatePhoneNumber(phone_number) {
    const re = /^[23569][0-9]{7}$/
    return re.test(phone_number)
}

export function validateUser(user) {
    const {email, password, clinic_name, phone_number, address} = user;
    const isValid_email = isString(email) && validateEmail(email);
    const isValid_pw = isString(password) && password.trim().length >= 4;
    const isValid_clinic_name = isString(clinic_name) && clinic_name.trim().length >= 1;
    const isValid_phone_number = isString(phone_number) && validatePhoneNumber(phone_number);
    const isValid_address = isString(address) && clinic_name.trim().length >= 1;
    return isValid_email &&
        isValid_pw &&
        isValid_clinic_name &&
        isValid_phone_number &&
        isValid_address;
}

export function isValidId(req, res, next) {
    if (!isNaN(req.params.userId)) return next();
    next(new Error('Invalid Id'))
}

export function validateRecord(record) {
    const {clinic_name, doctor_name, patient_name, diagnosis, medication, consultation_fee, follow_up} = record;
    const isValid_clinic_name = isString(clinic_name) && clinic_name.trim().length >= 1;
    const isValid_doctor_name = isString(doctor_name) && doctor_name.trim().length >= 1;
    const isValid_patient_name = isString(patient_name) && patient_name.trim().length >= 1;
    const isValid_diagnosis = isString(diagnosis) && diagnosis.trim().length >= 1;
    const isValid_medication = isString(medication) && medication.trim().length >= 1;
    const isValid_consultation_fee = isNumber(consultation_fee);
    const isValid_follow_up = isBoolean(follow_up);
    return  isValid_clinic_name &&
        isValid_consultation_fee &&
        isValid_diagnosis &&
        isValid_doctor_name &&
        isValid_follow_up &&
        isValid_medication &&
        isValid_patient_name
}

export function validateLoginUser(user) {
    const {email, password} = user;
    const isValid_email = isString(email) && validateEmail(email);
    const isValid_pw = isString(password) && password.trim().length >= 4;
    return isValid_email && isValid_pw;
}
