const data = require('./example.json');

const parseData = (data) => {
  const user = data.body[0].user;
  let parsedData = {};
  parsedData['photos'] = user.albums[0].photos.map((photo, index) => {
    return { order: index, url: photo.large_url };
  });
  parsedData['employee'] = user.jobs.map(job =>  {return {profession: job.name}})

  parsedData['education'] = user.educations.map((education) => {
    return {
      place: education.organization_name,
      year: education.period_description,
    };
  });

  parsedData['instagram'] = [];
  parsedData['spotify'] = [];
  parsedData['profile_fields'] = user.profile_fields.map((field) => {
    return {name: field.name, value: field.display_value};
  });

  const hometown = user.hometown;
  parsedData['residence'] = {
    phone_prefix: hometown.country.phone_prefix,
    country_code: hometown.country.iso_code,
    region: { name: hometown.region.name, id: hometown.region.id },
    city: { name: hometown.city.name, id: hometown.city.id },
    context_info: hometown.context_info,
    is_in_private_mode: user.is_in_private_mode,
  };

  const residence = user.residence;
  parsedData['location'] = {
    phone_prefix: residence.country.phone_prefix,
    country_code: residence.country.iso_code,
    region: { name: residence.region.name, id: residence.region.id },
    city: { name: residence.city.name, id: residence.city.id },
    context_info: residence.context_info,
    is_in_private_mode: user.is_in_private_mode,
  };
  return parsedData;
};

console.log(parseData(data));
/* console.log(user); */
