const fs = require('fs');
const path = require('path');

const handleScrollUsersListResult = (objToSetData, response) => {
  let newObj = { ...objToSetData };
  const users = response?.body[0]?.client_user_list?.section.find(
    (el) => 'users' in el
  )?.users;

  //CAMBIAR LA OBTENCION DE DATOS SEGUN LA TRAMA REAL
  const noDeletedChats = users?.filter((user) => user?.is_deleted == false);
  const activeUsers = noDeletedChats?.filter(
    (user) => user?.online_status == 1
  );

  const activeChatsCount = activeUsers?.length;
  const deactiveChatsCount = noDeletedChats?.length - activeChatsCount;
  const deletedChatsCount = users?.length - noDeletedChats?.length;

  if (typeof newObj['result'] !== 'object') {
    newObj['result'] = {};
    newObj['result']['httpsResponses'] = [];
  }
  if (typeof newObj['result']['preanalisis'] !== 'object') {
    newObj['result']['preanalisis'] = {
      cantActives: 0,
      actives: [],
      cantInactives: 0,
      cantDeletes: 0,
      canActivesButWaitingResponse: 0,
    };
  }

  const lastIndex = objToSetData?.actives?.at(-1)?.index | 0;
  const usersIds = users.map((user, index) => {
    return { userBumbleId: user.user_id, index: lastIndex + index + 1 };
  });

  newObj['result']['httpsResponses'].push(response);
  newObj['result']['preanalisis']['cantActives'] += activeChatsCount || 0;
  users ? newObj['result']['preanalisis']['actives'].push(...usersIds) : null;
  newObj['result']['preanalisis']['canActivesButWaitingResponse'] +=
    deactiveChatsCount || 0;
  newObj['result']['preanalisis']['cantInactives'] += deletedChatsCount || 0;

  return newObj;
};

const payload = {
  action: 'CHAT_ANALYSIS',
  processExecutionId: 'a2fc4620-02fa-4a78-b033-5e039fb77b5b',
  step: 1,
  stepDescription: 'GET_ALL_ACTIVE_CHATS',
};

const response = {
  $gpb: 'badoo.bma.BadooMessage',
  message_type: 246,
  version: 1,
  message_id: 14,
  object_type: 135,
  body: [
    {
      $gpb: 'badoo.bma.MessageBody',
      client_user_list: {
        $gpb: 'badoo.bma.ClientUserList',
        section: [
          {
            $gpb: 'badoo.bma.ListSection',
            section_id: '2',
            name: 'Conversaciones',
            total_count: 31,
            last_block: false,
            user_feature: {
              $gpb: 'badoo.bma.ApplicationFeature',
              feature: 145,
              enabled: true,
            },
            allowed_actions: [1],
            section_type: 4,
            users: [
              {
                $gpb: 'badoo.bma.User',
                user_id:
                  'zAhMACjE3ODk3MzU0NTUIXQ9hZQAAAAAgH9CqwJK0Rzzc8NDizKyiXtuWOtMHvIE3o7UboTkQm-Q',
                projection: [
                  200, 210, 340, 230, 640, 580, 300, 860, 590, 591, 250, 700,
                  762, 592, 880, 582, 930, 585, 583, 305, 330, 763, 1423, 584,
                  1262, 911, 912,
                ],
                access_level: 10,
                name: 'Luna',
                age: 25,
                gender: 2,
                is_deleted: false,
                is_extended_match: false,
                online_status: 3,
                profile_photo: {
                  $gpb: 'badoo.bma.Photo',
                  id: '1374314514',
                  preview_url:
                    '//pd2us.bumbcdn.com/p518/hidden?euri=8zBYwLTqElZoZsrHEoBVuwMP7n5h4cWxxcHd6RrVGccEZ1XDDYgIN3W8Z4fCxUnVhFCZ1HRa5S2-0PIlxO85J-iTsSH-yrTtUq-HHvC1NVtENVl3gGJgE42TAqPNPxc50rXcV5osBdmnbqni9ouuaw&size=_size&ck=57231ef66bb97df788c5dff2fe9d36e4&h=dwF&gs=n&t=42.1.0.0',
                  large_url:
                    '//pd2us.bumbcdn.com/p518/hidden?euri=zRZ0JffWGmxH2IkdNWTRkNDk7vLnBNT0SOCthCZXPUP8p.YGmicW5ggjt0hWuj9dbTDvU-tj1ymx4bZnIl7OzxDqKK8OVSTO7fbxZ-tAjwZnjbQEWOm5K18Zn-v1mJO2hpkRvAcHC5nXtQrUmFwpf42JhMpq2zJC3pJcck5wflY&size=size&ck=e6bbcb84776ad04b6fb603571f9c4cef&wm_size=72x72&wm_offs=-5x-5&h=dwF&gs=n&t=42.1.0.0',
                  large_photo_size: {
                    $gpb: 'badoo.bma.PhotoSize',
                    width: 0,
                    height: 0,
                  },
                  preview_url_expiration_ts: 1661874948,
                  large_url_expiration_ts: 1661874948,
                },
                is_match: false,
                match_mode: 0,
                is_crush: false,
                their_vote_mode: 0,
                rematch_action: 0,
                connection_expired_timestamp: 1659921773,
                unread_messages_count: 0,
                display_message: 'Expiró hace 2 semanas',
                is_inapp_promo_partner: false,
                is_locked: false,
                type: 0,
                connection_status_indicator: 0,
              },
              {
                $gpb: 'badoo.bma.User',
                user_id:
                  'zAhMACjE3NDU4Nzc0OTEIXQ9hZQAAAAAgkjecCob171YZnpASeXVa31zfrE8B2YCaHw2wDkzjGBM',
                projection: [
                  200, 210, 340, 230, 640, 580, 300, 860, 590, 591, 250, 700,
                  762, 592, 880, 582, 930, 585, 583, 305, 330, 763, 1423, 584,
                  1262, 911, 912,
                ],
                access_level: 10,
                name: 'Karla',
                age: 23,
                gender: 2,
                is_deleted: false,
                is_extended_match: false,
                online_status: 3,
                profile_photo: {
                  $gpb: 'badoo.bma.Photo',
                  id: '1374285436',
                  preview_url:
                    '//pd2us.bumbcdn.com/p517/hidden?euri=C9suiIzpqukLzPhp.pIcSddRlqO2VqM.j3YAquVjjFu.Ae1d5kPSLxs9o1Y5-dK.I3vYnDbD5IuxsY2AB7mEkRl1s3CTMWokIJqyoFKtcDsShgjDD9p60ho8UT1D6vRBeN.gxfhuCb-GqS5z5p4ySA&size=size&ck=475622887553365d2962b46630f90349&h=Lh-&gs=n&t=42.1.0.0',
                  large_url:
                    '//pd2us.bumbcdn.com/p517/hidden?euri=ANK95BIlRIrUjYSOI1QZiPwWeXHxzLco98rOttD.yquA1ha9uxy621KJEfQhwB9QY74IZHnQMceU..2SUPm19mED.uQfMyPKG3DtGz0fu4YxEe8NnQ3RqcyUlLyzd3XCUYL43Pw5IK7TKMKtieqgqss0Tfd2ybY9wkiQuAgwqYo&size=size&ck=5557d0dd08e3f7cca37ac0a937b572c4&wm_size=72x72&wm_offs=-5x-5&h=Lh-&gs=n&t=42.1.0.0',
                  large_photo_size: {
                    $gpb: 'badoo.bma.PhotoSize',
                    width: 0,
                    height: 0,
                  },
                  preview_url_expiration_ts: 1661874948,
                  large_url_expiration_ts: 1661874948,
                },
                is_match: true,
                match_mode: 0,
                is_crush: false,
                their_vote_mode: 0,
                unread_messages_count: 0,
                display_message: 'Pero pasa dms rápido :(',
                is_inapp_promo_partner: false,
                is_locked: false,
                type: 0,
                connection_status_indicator: 2,
              },
              {
                $gpb: 'badoo.bma.User',
                user_id:
                  'zAhMACjE3ODkzODkzNjUIXQ9hZQAAAAAge6CBxszI22d8JZ3xp_N-UO3N63XhjIYMRenl5ZPDZrg',
                projection: [
                  200, 210, 340, 230, 640, 580, 300, 860, 590, 591, 250, 700,
                  762, 592, 880, 582, 930, 585, 583, 305, 330, 763, 1423, 584,
                  1262, 911, 912,
                ],
                access_level: 10,
                name: 'Carito',
                age: 26,
                gender: 2,
                is_deleted: false,
                is_extended_match: false,
                online_status: 3,
                profile_photo: {
                  $gpb: 'badoo.bma.Photo',
                  id: '1374271611',
                  preview_url:
                    '//pd2us.bumbcdn.com/p538/hidden?euri=k3dALVZ-lFwmPkT5.ncCJ4elFfBpo-gi1Ch9MEAw6tM4-y-3ZyTN8VJ3FpK7WQanzEnCbgcCwLGP6DonwP4qcrS9tUKFEqHoYGPEvqgrCeDEipkwG4vITPlO881dyYTH0dwajxro7d1Av09oW9NAAQ&size=size&ck=1b30971c94418aca22ebe05bc48d4099&h=K6r&gs=n&t=42.1.0.0',
                  large_url:
                    '//pd2us.bumbcdn.com/p538/hidden?euri=3bRztRH9uDa6usYIrp4O4o4s1OYsoSnQwXDQ6Xrq-tMT9s72cLi8xF-hcyqR6riu36g-F-JFSWItRYgsqKwePcqOuO.DsmLJcnh6tIHbxk8.GHvSlNiXDLJJf2uaRmmQKIa.Z.OhyomYMfwVBbGQLg1PPy6vq31KNzpgaX8qI3s&size=size&ck=2c89acfaeaca96440392ba4cca82e94c&wm_size=72x72&wm_offs=-5x-5&h=K6r&gs=n&t=42.1.0.0',
                  large_photo_size: {
                    $gpb: 'badoo.bma.PhotoSize',
                    width: 0,
                    height: 0,
                  },
                  preview_url_expiration_ts: 1661874948,
                  large_url_expiration_ts: 1661874948,
                },
                is_match: false,
                match_mode: 0,
                is_crush: false,
                their_vote_mode: 0,
                rematch_action: 0,
                connection_expired_timestamp: 1659730274,
                unread_messages_count: 0,
                display_message: 'Expiró hace 2 semanas',
                is_inapp_promo_partner: false,
                is_locked: false,
                type: 0,
                connection_status_indicator: 0,
              },
              {
                $gpb: 'badoo.bma.User',
                user_id:
                  'zAhMACjE3NTA4NDcyOTAIXQ9hZQAAAAAgl-gUS0qzhJf1njQ48CgOA6BFTuauixWR7fVItZ-B9Fg',
                projection: [
                  200, 210, 340, 230, 640, 580, 300, 860, 590, 591, 250, 700,
                  762, 592, 880, 582, 930, 585, 583, 305, 330, 763, 1423, 584,
                  1262, 911, 912,
                ],
                access_level: 10,
                name: 'Valeria',
                age: 23,
                gender: 2,
                is_deleted: false,
                is_extended_match: false,
                online_status: 3,
                profile_photo: {
                  $gpb: 'badoo.bma.Photo',
                  id: '1374118311',
                  preview_url:
                    '//pd2us.bumbcdn.com/p536/hidden?euri=74qAQ73u2O0xJDZKo2n.XuwpDFjf7W14XfbhO7Au-tuHGYk9AGqnMQAoDDJ0n-KazScBeBhM0AU6WIU.H3QtrNwq78lvAasODwpu.udchmrvbRzBzuI65vZrOwrpBghm30FKEDyrrfiBbLz0yNdLOw&size=size&ck=43f82169c813bb4806825d3887fcc474&h=ua2&gs=n&t=42.1.0.0',
                  large_url:
                    '//pd2us.bumbcdn.com/p536/hidden?euri=Gh.HVrjttw8LX5UW2oDZLXCkyklKutrWXEbprKcmPOmYVmh13-d9PafLU5TliUJgfQa3WeMFJ-DiRA8ycbTec-ONxFDCY-eVy8x1JNqOatgOQwCGrw4QSxkRqjA.E38sVGou4gqBW5GOiEwa4lk13YKMJog-UhjfSocMgDssnDg&size=size&ck=7154b455c96a0d04cac1b454f7823137&wm_size=72x72&wm_offs=-5x-5&h=ua2&gs=n&t=42.1.0.0',
                  large_photo_size: {
                    $gpb: 'badoo.bma.PhotoSize',
                    width: 0,
                    height: 0,
                  },
                  preview_url_expiration_ts: 1661874948,
                  large_url_expiration_ts: 1661874948,
                },
                is_match: true,
                match_mode: 0,
                is_crush: false,
                their_vote_mode: 0,
                unread_messages_count: 0,
                display_message: '😢',
                is_inapp_promo_partner: false,
                is_locked: false,
                type: 0,
                connection_status_indicator: 2,
              },
              {
                $gpb: 'badoo.bma.User',
                user_id:
                  'zAhMACjE3Mjc0NDUyNzIIXQ9hZQAAAAAgtjEuG8DNHy55TUG5FM2BDdscE3EYamnFPMka4b1nVnE',
                projection: [
                  200, 210, 340, 230, 640, 580, 300, 860, 590, 591, 250, 700,
                  762, 592, 880, 582, 930, 585, 583, 305, 330, 763, 1423, 584,
                  1262, 911, 912,
                ],
                access_level: 10,
                name: 'Maritza',
                age: 26,
                gender: 2,
                is_deleted: false,
                is_extended_match: false,
                online_status: 3,
                profile_photo: {
                  $gpb: 'badoo.bma.Photo',
                  id: '1374314719',
                  preview_url:
                    '//pd2us.bumbcdn.com/p533/hidden?euri=E285-o.NhqtGFMqQVxvgCIHMqpXXcZJqtybdp3ljmrlUaZw9DH5nBmoUY73bX-AhrvYMCkIcau37PbhcEziJUIN12cixrr0pnQDtQg6U6MVG4.myPJbRvXYMzSHf3MkIqrtKz3mZQsC9ccaGs.mC0g&size=size&ck=d9a59bf558469ffb91f8253445e4efe9&h=zy0&gs=n&t=42.1.0.0',
                  large_url:
                    '//pd2us.bumbcdn.com/p533/hidden?euri=TuzQy6cOwmE1HgfocHZYamufcIJmlVUp19yICNbthDqNbUyty2Q4-oYZSkVv1gxlh.FsKLDTflLd2lnnruk7n75L3ULCFK50EDmrRTpoKeeZpsao.TJ-HKuVrK3F5V1yNLnsbtOLKhBYwMDYAaPb-BiePvpI4RD2tKpr6S46sFk&size=size&ck=a7cdf7488740c38a5518b94f4646c4dd&wm_size=72x72&wm_offs=-5x-5&h=zy0&gs=n&t=42.1.0.0',
                  large_photo_size: {
                    $gpb: 'badoo.bma.PhotoSize',
                    width: 0,
                    height: 0,
                  },
                  preview_url_expiration_ts: 1661874948,
                  large_url_expiration_ts: 1661874948,
                },
                is_match: true,
                match_mode: 0,
                is_crush: false,
                their_vote_mode: 0,
                unread_messages_count: 0,
                display_message: 'Pues aquí tranqui el día',
                is_inapp_promo_partner: false,
                is_locked: false,
                type: 0,
                connection_status_indicator: 2,
              },
              {
                $gpb: 'badoo.bma.User',
                user_id:
                  'zAhMACjE3ODkzNTkxMTAIXQ9hZQAAAAAg_Ab2QHOzHLsEInlHZmViwI4LmWW5T8u-FeBhVp7dQ1o',
                projection: [
                  200, 210, 340, 230, 640, 580, 300, 860, 590, 591, 250, 700,
                  762, 592, 880, 582, 930, 585, 583, 305, 330, 763, 1423, 584,
                  1262, 911, 912,
                ],
                access_level: 10,
                name: 'Nicole',
                age: 24,
                gender: 2,
                is_deleted: false,
                is_extended_match: false,
                online_status: 3,
                profile_photo: {
                  $gpb: 'badoo.bma.Photo',
                  id: '1374353008',
                  preview_url:
                    '//pd2us.bumbcdn.com/p557/hidden?euri=iL4bXrv5YoYmmqBGjWxEmg-rhKBlvyQxV4D7kD3OzwP7-ouqesSlWchsksnuEJnVlrFTkhR3Nl4kwVZjs1pU4j65R6Y0v3QoaoVFw-gxAtheQCjHNDU10LhkxcPiakbG284GhbFGLzT1CKzzm33-TA&size=size&ck=8c6a2468bdf1fe2b764072992207d186&h=pKF&gs=n&t=42.1.0.0',
                  large_url:
                    '//pd2us.bumbcdn.com/p557/hidden?euri=..EFU1zvZEtj4YgMndFurEjjNI8umZsAN8MPw8IHz1AnfEgbVuayU9GR1-cbDRGb7ViizuR4DD17OIfwVnscy2xqGkXWv0F23vv8O5nFUKh9M7GL7ql2.ppmxJVTl8w21F1c.uUxG8TYa-aZMqhgrIm0rSFSWuS-FlAVIF3fWv0&size=size&ck=0fecdf1057b5e48b322d756224605a3f&wm_size=72x72&wm_offs=-5x-5&h=pKF&gs=n&t=42.1.0.0',
                  large_photo_size: {
                    $gpb: 'badoo.bma.PhotoSize',
                    width: 0,
                    height: 0,
                  },
                  preview_url_expiration_ts: 1661874948,
                  large_url_expiration_ts: 1661874948,
                },
                is_match: true,
                match_mode: 0,
                is_crush: false,
                their_vote_mode: 0,
                unread_messages_count: 0,
                display_message: 'que tal , como pasastes el feriado',
                is_inapp_promo_partner: false,
                is_locked: false,
                type: 0,
                connection_status_indicator: 0,
              },
              {
                $gpb: 'badoo.bma.User',
                user_id:
                  'zAhMACjE3ODkxMzA5MTkIXQ9hZQAAAAAgi23FnqDVoiTD5oXO5RvVy6Hf9Cqipq58LQFbicqwNvI',
                projection: [
                  200, 210, 340, 230, 640, 580, 300, 860, 590, 591, 250, 700,
                  762, 592, 880, 582, 930, 585, 583, 305, 330, 763, 1423, 584,
                  1262, 911, 912,
                ],
                access_level: 10,
                name: 'Darkgirl',
                age: 21,
                gender: 2,
                is_deleted: false,
                is_extended_match: false,
                online_status: 3,
                profile_photo: {
                  $gpb: 'badoo.bma.Photo',
                  id: '1374285700',
                  preview_url:
                    '//pd2us.bumbcdn.com/p551/hidden?euri=8MoADCUbY-YLzhDR1pVMfL1N2F6GdKgni9F9.2RGlmGgRavdLnJeLizZJ7J3od6n5Mc2f3z8ZaJ2PKEi-S.FDwQqpiXrbcm8s9Pvu0JrjUTSLDsD0kE7p.wSWohKMHd2yioBYSnnehjDSQNN72IrlA&size=size&ck=1f59f9e5e67192ccf64e964999173391&h=x8K&gs=n&t=42.1.0.0',
                  large_url:
                    '//pd2us.bumbcdn.com/p551/hidden?euri=1id8d--1MuOVMcLkOp0LaCwtvvNtpJFRlf-cdaJyGNaYBnIoThHNYHwxKdmZfTKcB7QCLTGgEjo5G8j3vwXp0ILID3.LI0yIxcxxseQYDZMN0VIdN66pGABjPOTWmcW5sdX6GJloBCGM2kXidHquToaX.r-QNHXq.IXVWNjw7bE&size=size&ck=3c2244bf4cab28b68f7bfd6ac83f5254&wm_size=72x72&wm_offs=-5x-5&h=x8K&gs=n&t=42.1.0.0',
                  large_photo_size: {
                    $gpb: 'badoo.bma.PhotoSize',
                    width: 0,
                    height: 0,
                  },
                  preview_url_expiration_ts: 1661874948,
                  large_url_expiration_ts: 1661874948,
                },
                is_match: true,
                match_mode: 0,
                is_crush: false,
                their_vote_mode: 0,
                unread_messages_count: 0,
                display_message:
                  'Empecé con algunos trabajos y organizando cosas y tuu',
                is_inapp_promo_partner: false,
                is_locked: false,
                type: 0,
                connection_status_indicator: 2,
              },
              {
                $gpb: 'badoo.bma.User',
                user_id:
                  'zAhMACjE3OTIyNzY3MTIIXQ9hZQAAAAAgoV19erZHZZWytNtVkx1W7498x4n0E2Fl2RBSH_Hz7q4',
                projection: [
                  200, 210, 340, 230, 640, 580, 300, 860, 590, 591, 250, 700,
                  762, 592, 880, 582, 930, 585, 583, 305, 330, 763, 1423, 584,
                  1262, 911, 912,
                ],
                access_level: 10,
                name: 'Li',
                age: 22,
                gender: 2,
                is_deleted: false,
                is_extended_match: false,
                online_status: 3,
                profile_photo: {
                  $gpb: 'badoo.bma.Photo',
                  id: '1374242261',
                  preview_url:
                    '//pd2us.bumbcdn.com/p530/hidden?euri=X.NsNs-yxbNuSjt28EOZKCY9FD3B0BCeTNYgRsPuAcZZUfDgNOVgZxSbndnraaXPxKJPodNVw14tpwx67ubXsOd1SVBnyjJn9hdZqTcNpJdg.hkDX1WUYRqiv2ggGxStcww-POYtcp-dVRmhFk9jfQ&size=size&ck=35253e15c5c819612cf06ae80e8b205a&h=Lkk&gs=n&t=42.1.0.0',
                  large_url:
                    '//pd2us.bumbcdn.com/p530/hidden?euri=2pglRmyMpNrJh4sG-onnuomXFuSi5Gj5V3FaIpBsc-cHaGjSA3qdGf-hFn86J4aNlaX6xvX4TURb66PfyxyPBZyBnyUQ1RYFEUL9UcB6kjiaY-PHZMMaGJeEGBjRaqDCsU6ezCuhmvW3j0yOQWjDPa5eODVy8QlVZC2xiC-DrwU&size=size&ck=c42e801a40020d153babb1724f6b539f&wm_size=72x72&wm_offs=-5x-5&h=Lkk&gs=n&t=42.1.0.0',
                  large_photo_size: {
                    $gpb: 'badoo.bma.PhotoSize',
                    width: 0,
                    height: 0,
                  },
                  preview_url_expiration_ts: 1661874948,
                  large_url_expiration_ts: 1661874948,
                },
                is_match: false,
                match_mode: 0,
                is_crush: false,
                their_vote_mode: 0,
                rematch_action: 0,
                connection_expired_timestamp: 1659502883,
                unread_messages_count: 0,
                display_message: 'Expiró hace 2 semanas',
                is_inapp_promo_partner: false,
                is_locked: false,
                type: 0,
                connection_status_indicator: 0,
              },
              {
                $gpb: 'badoo.bma.User',
                user_id:
                  'zAhMACjE3OTMyOTAxNjAIXQ9hZQAAAAAgCeKY7l7UXtCvIVcvWALPHkcekJiGE2ztPemDxRpELKo',
                projection: [
                  200, 210, 340, 230, 640, 580, 300, 860, 590, 591, 250, 700,
                  762, 592, 880, 582, 930, 585, 583, 305, 330, 763, 1423, 584,
                  1262, 911, 912,
                ],
                access_level: 10,
                name: 'Solange',
                age: 29,
                gender: 2,
                is_deleted: false,
                is_extended_match: false,
                online_status: 1,
                profile_photo: {
                  $gpb: 'badoo.bma.Photo',
                  id: '1374149717',
                  preview_url:
                    '//pd2us.bumbcdn.com/p542/hidden?euri=drM.8.PM.JSfIy-ksxsauJ4zhnOKqI0SkE5bc.eJnD9uMmOhwOz-pf9fff-0pDIhVt3enpXzphv1edxqkj8bkrb8-0lzsjv5AaaOnugLKz-c1brtEoCWK4w6ADqYLyLeCmwcuPGHh8BMzULRIwKE0A&size=size&ck=247b58bd49732d5dafc5686a669f5473&h=luV&gs=n&t=42.1.0.0',
                  large_url:
                    '//pd2us.bumbcdn.com/p542/hidden?euri=xgUyLVVklqlyrpWWioScr9u3IB38C3UT7nSn8Fx7qOgr4PxCvT-SMnDVVG1IlmU8WPbsaZe2.y7Q-mkSss3LVGXtUO8GTdWivDTRAbdCrLPJFtUnQVFvvp1oBrV0LAMJpe2hoTOU4SWXVdNZ4McySAYVAwSBx-mGxTNgPLeQxOA&size=size&ck=195b8994eef417a9b4b304ec23ce3a7e&wm_size=72x72&wm_offs=-5x-5&h=luV&gs=n&t=42.1.0.0',
                  large_photo_size: {
                    $gpb: 'badoo.bma.PhotoSize',
                    width: 0,
                    height: 0,
                  },
                  preview_url_expiration_ts: 1661874948,
                  large_url_expiration_ts: 1661874948,
                },
                is_match: false,
                match_mode: 0,
                is_crush: false,
                their_vote_mode: 0,
                rematch_action: 0,
                connection_expired_timestamp: 1659498733,
                unread_messages_count: 0,
                display_message: 'Expiró hace 2 semanas',
                is_inapp_promo_partner: false,
                is_locked: false,
                type: 0,
                connection_status_indicator: 0,
              },
              {
                $gpb: 'badoo.bma.User',
                user_id:
                  'zAhMACjE3OTMwMDYzMTIIXQ9hZQAAAAAgf4ptRaNYKciqjIKOb_VQooL2g-KRIz3wZUJwAG1HEr4',
                projection: [
                  200, 210, 340, 230, 640, 580, 300, 860, 590, 591, 250, 700,
                  762, 592, 880, 582, 930, 585, 583, 305, 330, 763, 1423, 584,
                  1262, 911, 912,
                ],
                access_level: 10,
                name: 'Ana',
                age: 23,
                gender: 2,
                is_deleted: false,
                is_extended_match: false,
                online_status: 3,
                profile_photo: {
                  $gpb: 'badoo.bma.Photo',
                  id: '1374264040',
                  preview_url:
                    '//pd2us.bumbcdn.com/p516/hidden?euri=WyutYMD44sIfSc3BQZVD5m6fg9Y6.fVDZSV1rmDHM-92I9bNVJggXMkogl0anEItsgwlnt7WocahtBr6LZW6Wds4jBgva6sFKEjidMhoWhqRMjovLnsyIWni-Ldwi-rxvueCa-Pe1SqgHspQJsikFw&size=size&ck=b115c37a2aaecf0e0fb19245e1e09b96&h=Ale&gs=n&t=42.1.0.0',
                  large_url:
                    '//pd2us.bumbcdn.com/p516/hidden?euri=ob5TUCMVKF0OFiMn.x2lV9gQOZKGjpbMRVTL3aeeIUYIYpZt4m9AtENx1eLpSmWq5.OywPIFwsmnDalVVmZ4sYo11wjD6iSlPOJrYpIZ-95xuBdaG51AR-bV--nZWP0JYZb-9TEnEL.jfC7Wxcd5PeVuAV3-5pJ76oyBtYrwQ-E&size=size_&ck=309771c2e6027e44533c12fc5d8add4d&wm_size=72x72&wm_offs=-5x-5&h=Ale&gs=n&t=42.1.0.0',
                  large_photo_size: {
                    $gpb: 'badoo.bma.PhotoSize',
                    width: 0,
                    height: 0,
                  },
                  preview_url_expiration_ts: 1661874948,
                  large_url_expiration_ts: 1661874948,
                },
                is_match: true,
                match_mode: 0,
                is_crush: false,
                their_vote_mode: 0,
                unread_messages_count: 0,
                display_message: 'Hola anita que tal',
                is_inapp_promo_partner: false,
                is_locked: false,
                type: 0,
                connection_status_indicator: 0,
              },
            ],
          },
        ],
        total_sections: 1,
        total_count: 31,
        delay_sec: 10,
      },
      message_type: 246,
    },
  ],
  responses_count: 1,
  is_background: false,
  vhost: '',
};

const a = handleScrollUsersListResult(payload, response);

console.log('resultado', a);
fs.writeFileSync(path.resolve(__dirname, 'student.json'), JSON.stringify(a));
