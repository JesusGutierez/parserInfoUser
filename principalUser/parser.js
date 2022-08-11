const data = require('./user.json');

const parseData = (data) => {
  const user = data.body[0].user;
  const hometown = user.hometown;
  const residence = user.residence;
  /* let parsedData = {}; */
  return {
    userId: user.user_id,
    name: user.name,
    age: user.age,
    gender: user.gender,

    photos: user.albums[0].photos.map((photo, index) => {
      return { order: index+1, url: photo.large_url };
    }),
    employee: user.jobs.map(job =>  {return {profession: job.name}}),
    education: user.educations.map((education) => {
      return {
        place: education.organization_name,
        year: education.period_description,
      };
    }),
    instagram: [],
    spotify: [],
    profile_fields: user.profile_fields.map((field) => {
      return {name: field.name, value: field.display_value, id: field.id};
    }),
    hometown: {
      phone_prefix: hometown.country.phone_prefix,
      country_code: hometown.country.iso_code,
      region: { name: hometown.region.name, id: hometown.region.id },
      city: { name: hometown.city.name, id: hometown.city.id },
      context_info: hometown.context_info,
      is_in_private_mode: user.is_in_private_mode,
    },
    residence: {
      phone_prefix: residence.country.phone_prefix,
    country_code: residence.country.iso_code,
    region: { name: residence.region.name, id: residence.region.id },
    city: { name: residence.city.name, id: residence.city.id },
    context_info: residence.context_info,
    is_in_private_mode: user.is_in_private_mode,
    },
  }
};

console.log(parseData(data));
