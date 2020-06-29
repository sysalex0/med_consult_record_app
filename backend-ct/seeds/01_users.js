exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    id: 1,
                    email: 'test1@gmail.com',
                    password: '1234',
                    clinic_name: 'test1 clinic',
                    phone_number: '22222222',
                    address:'5/F, APM, Kwun Tong',
                    created_at: new Date()
                },
            ]);
        });
};
