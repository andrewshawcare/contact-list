// http://stackoverflow.com/a/28921801/492575
module.exports = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
  /[xy]/g,
  (match) => {
    const randomNibble = Math.random() * 16 | 0;
    const nibble = (match === 'y') ? (randomNibble & 0x3 | 0x8) : randomNibble;
    return nibble.toString(16);
  }
);
