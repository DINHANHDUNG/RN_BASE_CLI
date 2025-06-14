# Base React Native TypeScript Template
- Redux Toolkit, RTK Query, navigation, đa ngôn ngữ, theme, UI base, hooks...

## Cài đặt

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
```"# RN_BASE_CLI" 
