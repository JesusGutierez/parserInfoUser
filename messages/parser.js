const data = require('./messages.json');

const getMessages = (data) => {
  const body = data?.body[0]?.client_open_chat;
  const infoChat = {
    userIdOpenChat: body?.chat_instance?.uid,
    messages: body?.chat_messages?.map((msg, index) => {
      return {
        message: msg?.mssg,
        userId: msg?.from_person_id,
        dateMessage: msg?.section_title,
        isDeleted: msg?.deleted,
        date_modified: msg?.date_modified,
        uid: msg?.uid,
        orderId: index+1
      };
    })
  }
  return infoChat;
};

console.log(getMessages(data));