var onyx = require("onyx-node");
var fs = require("fs");

var buf1 = fs.readFileSync("ft1.bin");
ft1 = new onyx.FingerprintTemplate(
	buf1,
	100
);

var buf2 = fs.readFileSync("ft2.bin"); 
ft2 = new onyx.FingerprintTemplate(
	buf2,
	100
);

console.log("Verify score is " + onyx.verify(ft1, ft2));

var ftv = new onyx.FingerprintTemplateVector();
ftv.push_back(ft1);
ftv.push_back(ft2);

var matchResult = onyx.identify(ftv, ft1);
console.log("Identify index is " + matchResult.index);
console.log("Identify score is " + matchResult.score);

delete ft1;
delete ft2;
delete ftv;
