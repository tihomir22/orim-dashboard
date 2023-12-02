import CryptoJS from 'crypto-js';
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const esEmail = (input: string): boolean => {
  return emailRegex.test(input);
};

export const copyTextToClipboard = (val: string) => {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
};

export const sendEmailTo = (email: string, subject: string, body: string) => {
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink);
};

export const decrypt = (
  valueToDecrypt: string,
  valueOnError: any,
  dynamic_key: string
) => {
  let finalValue = '';
  try {
    var keysMD5 = CryptoJS.MD5(dynamic_key);
    var message = valueToDecrypt;
    finalValue = CryptoJS.TripleDES.decrypt(message, keysMD5, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    finalValue = valueOnError !== undefined ? valueOnError : finalValue;
  }
  return finalValue;
};

export const parseJSON = (unparsedJson: string, dynamic_key: string) => {
  let json = JSON.parse(unparsedJson);
  let version = json['VERSION'];
  let firstTime = json['FirstTime'];
  let shownInterstitials = json['SHOWN_INTERSTITIAL'];
  let shownRewarded = json['SHOWN_REWARDED'];
  let keysWithAmount = Object.keys(json.DynamicProperties).filter((entry) =>
    entry.toLowerCase().includes('amount')
  );

  json['FirstTime'] = decrypt(firstTime, undefined, dynamic_key);
  json['SHOWN_INTERSTITIAL'] = decrypt(shownInterstitials, 0, dynamic_key);
  json['SHOWN_REWARDED'] = decrypt(shownRewarded, 0, dynamic_key);
  keysWithAmount.forEach((keyWithAmount) => {
    json.DynamicProperties[keyWithAmount] = decrypt(
      json.DynamicProperties[keyWithAmount],
      0,
      dynamic_key
    );
  });
  return json;
};

export const getImgSrcBasedOnGameName = (gameName: string) => {
  if (gameName == 'Crypto Match - Puzzle Game') {
    return '/assets/cryptomatch.png';
  } else if (gameName == 'Rush For Cash - Play to Earn') {
    return '/assets/rushforcash.png';
  } else if (gameName == 'Need for Cash - Play to earn') {
    return '/assets/needforcash.png';
  } else if (gameName == 'Crypto Fit - Earn Cash') {
    return '/assets/cryptofit.png';
  }
  return '/assets/empty.png';
};

export const getNetworkSrcImgBasedOnSymbol = (symbol: string) => {
  switch (symbol) {
    case 'BTC':
      return '/assets/btc.png';
    case 'LTC':
      return '/assets/ltc.png';
    case 'ETH':
      return '/assets/eth.png';
    case 'XRP':
      return '/assets/xrp.png';
    case 'BNB':
      return '/assets/bnb.png';
    case 'DOGE':
      return '/assets/doge.png';
    case 'MATIC':
      return '/assets/matic.png';
    case 'MIOTA':
      return '/assets/miota.png';
    case 'SOL':
      return '/assets/sol.png';
    default:
      return '/assets/empty.png';
  }
};
