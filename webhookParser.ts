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
        text: data.text,
        blocks: [
          {
            type: "section",
            text: {
              type: "plain_text",
              text: `${data.from} transferred ${data.value} to ${data.to}`,
              emoji: true,
            },
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
