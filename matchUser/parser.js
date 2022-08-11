const data = require('./user.json');

const getInfoUser = (data) => {
  const userData = data.body[0].user;
  const getField = (fieldsArray, fieldName) =>
    fieldsArray.find((field) => field.id == fieldName);
  const hometown = userData.hometown;
  const residence = userData.residence;

  const getEducation = (fielddEducation) => {
    return {
      place: fielddEducation.display_value,
      year: null,
    };
  };
  return {
    userId: userData.user_id,
    name: userData.name,
    age: userData.age,
    gender: userData.gender,
    
    profilePhoto: userData.profile_photo.large_url,
    photos: userData.albums[0].photos.map((photo, index) => {
      return {
        order: index + 1,
        url: photo.large_url,
      };
    }),
    employee: [
      {
        profession: userData.profile_summary.primary_text,
      },
    ],
    education: [getEducation(getField(userData.profile_fields, 'education'))],
    instagram: [],
    spotify: [],
    profile_fields: userData.profile_fields.map((field) => {
      return {
        name: field.name,
        value: field.display_value,
      };
    }),
    hometown: {
      phone_prefix: hometown.country.phone_prefix,
      country_code: hometown.country.iso_code,
      region: { name: hometown.region.name, id: hometown.region.id },
      city: { name: hometown.city.name, id: hometown.city.id },
      context_info: hometown.context_info,
      is_in_private_mode: false,
    },
    residence: {
      phone_prefix: residence.country.phone_prefix,
      country_code: residence.country.iso_code,
      region: { name: residence.region.name, id: residence.region.id },
      city: { name: residence.city.name, id: residence.city.id },
      context_info: residence.context_info,
      is_in_private_mode: false,
    },
  };
};

console.log(getInfoUser(data));
