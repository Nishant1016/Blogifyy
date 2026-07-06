import ImageKit from '@imagekit/nodejs';;

const client = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], 
  publicKey: process.env['IMAGEKIT_PUBLIC_KEY'],
  urlEndpoint: process.env['IMAGEKIT_URL_ENDPOINT']
});

console.log(typeof client.upload);
console.log(typeof client.files);  

export default client;