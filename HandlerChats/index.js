const fs = require('fs');
const path = require('path');

const getUser = require('./getUser.json');
const openChat = require('./openChat.json');
const chatMessages = require('./chatMessages.json');

const handleExploreEveryChat = (objToSetData, response) => {
  let newObj = { ...objToSetData };
  const body = response?.body[0];

  if (!newObj['result'] || typeof newObj['result'] !== 'object') {
    newObj['result'] = {
      chatsHttpsResponses: [],
      profileHttpResponse: null,
    };
  }
  console.log('newObj linea 19', newObj);

  if (newObj?.chatToAnalize) {
    newObj['result']['chatToAnalize'] = newObj?.chatToAnalize;
    delete newObj?.chatToAnalize;
  }

  if ('user' in body) {
    newObj['result']['profileHttpResponse'] = response;
  }
  if ('client_open_chat' in body || 'client_chat_messages' in body) {
    if (newObj?.result?.chatsHttpsResponses) {
      newObj['result']['chatsHttpsResponses'].push(response);
    } else {
      newObj['result']['chatsHttpsResponses'] = [response];
    }
  }
  return newObj;
};

const a = {
  processExecutionId: 'd0b0f961-1d0c-4bf1-9e7b-8a9351bfb434',
  action: 'CHAT_ANALYSIS',
  step: 2,
  stepDescription: 'GET_CHAT_INFO_ONE_BY_ONE',
  chatToAnalize: {
    userBumbleId:
      'zAhMACjE3ODk3MzU0NTUIXQ9hZQAAAAAgH9CqwJK0Rzzc8NDizKyiXtuWOtMHvIE3o7UboTkQm-Q',
    index: 1,
  },
  count: 0,
};

let resultado = handleExploreEveryChat(a, chatMessages);
console.log('resultado 1', resultado);
resultado = handleExploreEveryChat(resultado, getUser);
console.log('resultado 2', resultado);
resultado = handleExploreEveryChat(resultado, openChat);
console.log('resultado 3', resultado);

console.log('resultado', resultado);
fs.writeFileSync(
  path.resolve(__dirname, 'resultado.json'),
  JSON.stringify(resultado)
);
