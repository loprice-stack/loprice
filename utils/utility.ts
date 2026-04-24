import { Platform } from "react-native";
import { LOPRICE_URL } from "utils/constants";




/**
 * An utility module containing helper methods.
 * @module utils
 * @private
 */

/**
 * Generate a random alpha-numeric string with a given length.
 *
 * @param {number} [len=12] - The length of the string
 * @returns {string} A random alpha-numeric string
 *
 */
export const randomString = (len = 12) => {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

/**
 * Return (and increment) the value of a counter, starting from a random seed.
 * The counter starts from 0 after reaching Number.MAX_SAFE_INTEGER.
 *
 * @returns {string} A numeric string
 */
export const getNumericID = (_ => {
  let now;
  let next = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());

  return _ => {
    now = next;
    next = next + 1;
    if (next >= Number.MAX_SAFE_INTEGER) next = 0;
    return '' + now;
  };
})();

export function validateRequiredFileType(file: File) {
  var validTypes = [
    "image/jpg",
    "image/png",
    "image/pdf",
    "audio/wav",
    "audio/webm",
    "audio/ogg",
    "audio/mp3",
    "video/mp4",
    "audio/mpeg",
    "audio/opus",
    "audio/aac",
  ];
  return validTypes.includes(file.type);
}


export function validateRequiredAudioAndVideoFileType(file: File) {
  var validTypes = [
    "audio/wav",
    "audio/webm",
    "audio/ogg",
    "audio/mp3",
    "video/mp4",
    "video/mpeg",
    "audio/mpeg",
    "audio/opus",
    "audio/aac",
  ];
  return validTypes.includes(file.type);
}


export function validateImageRequiredFileType(file: File) {
  var validTypes = ["image/jpeg", "image/jpg", "image/png"];
  return validTypes.includes(file.type);
}

export function validateImageNameRequiredFileType(filename: string) {

  const filenamee = formatFilename(filename);
  var validTypes = ["jpeg", "jpg", "png"];
  return validTypes.includes(filenamee.substring(filenamee.indexOf(".") + 1, filename.length));
}


export function getJidLocal(jid: any) {
  if (jid !== undefined){
  if (jid !== "" || jid !== undefined){
    if (jid.includes("@" )) {
      return jid.substring(0, jid.indexOf("@"));
    }else{
      return jid
    }
  }else{
    return ""
  }
}

}



export function jidAsStringOf(_username: string) {
  let username = _username.toLowerCase();
  
  if (username.includes("@" + LOPRICE_URL )) {
   
      return username;
  } else {
    if (username.includes("@") ) {
      let user = username.substring(0, username.indexOf("@"));
     
      return user + "@" + LOPRICE_URL ;
      }else{

      
        return username + "@" + LOPRICE_URL;
    }
  }
}


export function formatFilename(filename: any) {
  let blacklist = '$(\') +=,[]{}""';

  //if (filename.includes(" ")){
  console.log("Filename contain unwanted character: " + filename);
  console.log("Unwanted characters are: " + blacklist);
  let file = "";
  console.log("File name array: " + filename + "length = " + filename.length);
  for (let i = 0; i < filename.length; i++) {
    let c = filename.charAt(i);
    //console.log("Char at index: " + i + "=" + c);
    if (blacklist.includes(c)) {
      c = "_";
    //console.log("Char converted at index: " + i + "=" + c);
    }
    file = file + c;
  }
  console.log("Changed file name: " + file);
  filename = file;
  return filename;
  //}else{
  //  console.log("Filename doesnt have space: " + filename);
  //  return filename;

  //}
}

/* An example function to generate a random transaction reference */
export const generateResource = (length: number) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `${'Loprice_' + Platform.OS + '_' + result}`;
};

export function getUsage(byteusage: number) {
  //convert to mb usage
  let mbusage = byteusage * 0.000001;
  //how many mbs represent percentage
  //Storage limit is 5gb
  let pcntg = mbusage * 0.02;
  //round percentage to single digit
  //let pcntgrn = Math.round(pcntg)
  let number = pcntg.toString().substring(0, pcntg.toString().indexOf("."));
  return number;
}

export function getRawTxtFile(fileresponse: any, app: any) {
  //We did not use file-server on purpose
  const type = fileresponse.headers["content-type"];
  const blob = new Blob([fileresponse.data], { type: type });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  const filename = app.items.name;
  const requiredfile = getFilenameWithoutExtension(filename) + app.itemid;
  link.download = requiredfile;
  return link.click();
}


export function getFilenameWithoutExtension(filename: string) {
  return filename.substring(0, filename.indexOf(".")) + ".";
}

export function b64ToBlob() {}
