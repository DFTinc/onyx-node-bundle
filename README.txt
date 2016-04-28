Install IDKit
dpkg -i idkit_2.72ubuntu1_amd64.deb

Install ONYX dependencies
./install-deps.sh

Run the following to get the IDKit HWID:
/usr/local/share/IDKit_PC_SDK/bin/gethwid

Send us the output of this, and we will send you a license to install.

Install the license with the following command:
sudo /usr/local/share/IDKit_PC_SDK/bin/linux_license_manager -d ~/path/to/your/iengine-license.lic 2

Now check the license is correctly installed with

sudo /usr/local/share/IDKit_PC_SDK/bin/linux_license_manager -l


Place onyx-node into your projects node_modules directory.

Once setup, please run the sample project to make sure everything is working.
Then use the Enroll Wizard to enroll a fingerprint and obtain an EnrollmentMetric object.
To get the fingerprint templates to your server you will need to extract them from the EnrollmentMetric.
Then post the EnrollmentMetric. 

em = LoadEnrolledEnrollmentMetric.loadEnrolledTemplateIfExists(mContext);
if (null != em) {
                            FingerprintTemplate[] fpta = em.getFingerprintTemplateArray();
                            ArrayList<String> fptList = new ArrayList<String>();
                            for (int i = 0; i < fpta.length; i++) {
                                FingerprintTemplate ft = fpta[i];
                                if (null != ft) {
                                    byte[] bytes = ft.getData();
                                    String bytesString = Base64.encodeToString(bytes, Base64.URL_SAFE | Base64.NO_WRAP).trim();
                                    fptList.add(bytesString);
                                }
                            }
                            String[] fptArray = new String[fptList.size()];
                            for (int i = 0; i < fptList.size(); i++) {
                                fptArray[i] = fptList.get(i);
                            }

                            JSONObject enrollmentJSON = new JSONObject();
                            try {
                                enrollmentJSON.put("templates", new JSONArray(fptArray));

                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }

// Then post the enrollmentJSON object to a RESTful endpoint for your server and save the templates to your MongoDB.
// Process fingerprint templates and save to database

var data = req.body;
var templates = [];
for (var i = 0; i < data.templates.length; i++) {
    var b64String = data.templates[i];
    templates.push(new Buffer(b64String, 'base64'));
}

// Then to match against the enrolled fingerprint you would run a verify activity and use the fingerprintTemplate provided by the FingerprintTemplateCallback and send that to a verification RESTful endpoint for your server.

private OnyxFragment.FingerprintTemplateCallback mFingerprintTemplateCallback = new OnyxFragment.FingerprintTemplateCallback() {

        @Override
        public void onFingerprintTemplateReady(FingerprintTemplate fingerprintTemplate) {
            if (null != fingerprintTemplate) {
                String bytesString = Base64.encodeToString(fingerprintTemplate.getData(), Base64.URL_SAFE | Base64.NO_WRAP).trim();

                JSONObject enrollmentJSON = new JSONObject();
                try {
                    enrollmentJSON.put("templates", bytesString);
                   
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
    };

// Finally, you will match that template against the enrolled templates.

    var reqTpl = new onyx.FingerprintTemplate(new Buffer(req.body.templates, 'base64'), 100);

// var fp = <fingerprint templates from your MongoDB>

            var ftv = new onyx.FingerprintTemplateVector();
            for (var i = 0; i < fp.templates.length; i++) {
                var data = fp.templates[i];
                var tpl = new onyx.FingerprintTemplate(data, 100);
                ftv.push_back(tpl);
            }

            // Do verification

            var result = onyx.identify(ftv, reqTpl);

            if (result.score >= 34) {
                console.log('Template Verified');

                res.json(200, {
                    success: true,
                    message: "Fingerprint Verified"
                });
            } else {
                console.log('Verification failed')
                res.json(200, {
                    success: false,
                    message: "Fingerprint did not match"
                })
            }
}
