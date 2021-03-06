require("es6-shim");

var exec = require("child_process").exec;
var os = require("os");
var useMraa = (function() {
  var release = os.release();
  return release.includes("yocto") ||
    release.includes("edison");
})();

var safeBuild = "0.7.2";
var safeVersion = "0.7.2";

if (useMraa) {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log("  Do not quit the program until npm completes the installation process.  ");
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  exec("opkg info libmraa0", function(error, stdout, stderr) {
    if (error) {
      console.log("opkg info libmraa0 failed. Reason: "+ error);
      process.exit(error.code);
    } else {
      if (!stdout.includes(safeBuild)) {
        console.log("");
        console.log("  Galileo-IO needs to install a trusted version of libmraa0.");
        console.log("  This process takes approximately one minute.");
        console.log("  Thanks for your patience.");

        exec("npm install mraa@" + safeVersion, function(error) {
          if (error) {
            console.log("npm install mraa failed. Reason: " + error);
            process.exit(error.code);
          } else {
            console.log("  Completed!");
            console.log("");
            process.exit(0);
          }
        });
      } else {
        process.exit(0);
      }
    }
  });
}
