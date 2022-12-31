const ngrok = require("ngrok");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const token = require("./token.js");

let t = 0;

let mode = argv.mode || "http";
let port = argv.port || 80;
let server = argv.server || "jp";

async function main() {
  try {
    let url = await ngrok.connect({
      proto: mode, // http|tcp|tls, defaults to http
      authtoken: token[t],
      addr: port,
      region: server, // one of ngrok regions (us, eu, au, ap, sa, jp, in), defaults to us
    });
    console.log(
      "ngrok mode " + mode + " port " + port + " server " + server + " 🚀🚀🚀"
    );
    console.log(url);
  } catch (error) {
    t++;
    main();
  }
}

main();
