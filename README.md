# Base React Native TypeScript Template
- Redux Toolkit, RTK Query, navigation, đa ngôn ngữ, theme, UI base, hooks...

## Cài đặt

```bash
Sự dụng node 18
```


```bash
yarn install
cp .env.example .env
yarn android # hoặc yarn ios
```

## Đổi dự án base -> dự án thực tế (Ví dụ rnBaseProject -> rnMyApp)
## Loại bỏ git trước khi chạy lệnh hoặc thêm --skipGitStatusCheck
```bash
npx react-native-rename "rnMyApp" --bundleID "com.yourcompany.rnmyapp"

rnBaseProject -> rnMyApp
rnbaseproject -> rnmyapp

watchman watch-del-all
rm -rf node_modules
rm -rf android/.gradle
rm -rf ios/Pods ios/Podfile.lock

yarn install

yarn android

yarn ios
```

```bash
- Chưa thêm Splash  (react-native-bootsplash) hoặc Intro (react-native-app-intro-slider)
- Thông báo có thể dùng toast (react-native-toast-message) hoặc Alert
```

```bash
- Thêm font
- Copy file .ttf của font vào src/assets/fonts (ví dụ: Roboto-Regular.ttf)
- Mở (hoặc tạo mới) file react-native.config.js (module.exports = { assets: ['./src/assets/fonts/']})
- npx react-native-asset
- IOS Mở Xcode, chọn project > Info > Add font vào UIAppFonts nếu chưa tự động nhận.
```

```bash
- Thêm icon
- yarn add react-native-vector-icons
- android/app/build.gradle: apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
- npx react-native-asset
- IOS Mở Xcode, chọn project > Info > Add font vào UIAppFonts nếu chưa tự động nhận.
```

## Lỗi chạy trên IOS: command not found: gradlew
```bash
cd android
./gradlew assembleDebug
```