
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('consultation_records').del()
    .then(function () {
      // Inserts seed entries
      return knex('consultation_records').insert([
        {
            id: 1,
            clinic_name: 'test1 clinic',
            doctor_name: 'Test doctor',
            patient_name: 'Test patient one',
            diagnosis: 'Home sick.',
            medication: 'Stay home',
            consultation_fee: 100.5,
            created_at: new Date(),
            follow_up: true
        },
          {
              id: 2,
              clinic_name: 'test1 clinic',
              doctor_name: 'Test doctor',
              patient_name: 'Test patient two',
              diagnosis: 'Bed sick.',
              medication: 'Stay bed',
              consultation_fee: 100,
              created_at: new Date(),
              follow_up: false
          },
      ]);
    });
};
