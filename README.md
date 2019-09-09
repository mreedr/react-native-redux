Todo:


Setup:
  download node
  npm install -g yarn
  always npm install, not yarn install

**Common Issues:**
getting this error when trying to delete node_mudules:
node_modules\xdl\binaries\windows\adb\adb.exe - Access is denied.
node_modules\xdl\binaries\windows\adb\AdbWinApi.dll - Access is denied.
node_modules\xdl\binaries\windows\adb\AdbWinUsbApi.dll - Access is denied.
the only way I have solved this is to restart my comp. LAME

New page:
1. create folder and files
pages/<PAGE_NAME>/index.js,modules.js,test.js

2.


commenting out JSX does not work


Things I've learned:
- avoid global reducers as much as possible, it makes sense to require functionality
from other pages by the page itself. Global reducers muddy up a pages "personal" variables.
For example, the global reducer could have a 'isLoading' prop. Most pages also have their
own 'isLoading' prop. This could make it confusing as to which loading matters in the page

.... however

actually maybe not. the issue of having similar prop names doesn't actually get removed
when requiring it from another page. its actually very similar. that page's reducers might
as well be global from the perspective of the requiring component
