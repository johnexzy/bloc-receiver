import axios from "axios";
type trxResponse = {
  from: string;
  to: string;
  value: number;
  transactionHash: string;
  transactionType: string;
  network: string;
  chainId: number;
  text?: string;
  contractAddress: null | string;
};

async function sendWebHook(data: trxResponse, url: string) {
  try {
    const options = {
      url: url,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: JSON.stringify({
        blocks: [
          {
            type: "divider",
          },
          {
            "type": "header",
            "text": {
              "type": "plain_text",
              "text": data.text,
              "emoji": true
            }
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*From*\n${data.from}`,
              },
              {
                type: "mrkdwn",
                text: `*To*\n${data.to}`,
              },
            ],
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Amount*\n${data.value}`,
              },
              {
                type: "mrkdwn",
                text: `*Type*\n${data.text}`,
              },
            ],
          },
          {
            type: "divider",
          },
        ],
      }),
    };

    await axios(options);
  } catch (error) {
    console.log(error);
  }
}

export default sendWebHook;
