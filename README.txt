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