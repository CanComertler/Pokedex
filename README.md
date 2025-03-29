# Pokedex

Pokedex is a mobile application developed using React Native and Expo, designed to provide detailed information about Pokémon species. This project serves as a practical example of using various libraries and tools to enhance the functionality and user experience of a React Native application.

## Features

- **React Navigation Integration**: Implements native stack navigation with nested bottom tabs for seamless user experience.
- **Web Support**: Compatible with React Native for Web, allowing the application to run in web browsers.
- **TypeScript Support**: Utilizes TypeScript for type safety and improved developer experience.
- **Deep Linking and URL Handling**: Configured for automatic deep link and URL handling to enhance navigation capabilities.
- **Edge-to-Edge Display**: Configured for edge-to-edge display on Android devices using `react-native-edge-to-edge`.
- **Smooth Animations**: Uses `react-native-reanimated` to create fluid and performant animations.
- **API Requests**: Utilizes `axios` for making HTTP requests to external APIs.

## Third-Party Libraries

- **react-native-reanimated**: Provides a comprehensive animation API for creating smooth animations in React Native applications.
- **axios**: A promise-based HTTP client for making API requests.
- **react-native-gesture-handler**: Enables gesture handling capabilities in React Native.
- **react-native-safe-area-context**: Manages safe area boundaries in React Native applications.
- **react-native-screens**: Optimizes memory usage and performance by managing native navigation screens.

## Screenshots

<p align="center">
  <a href="https://github.com/user-attachments/assets/6a8b9f64-9442-48dd-a1bd-7bec5dbf0ed7">
    <img src="https://github.com/user-attachments/assets/6a8b9f64-9442-48dd-a1bd-7bec5dbf0ed7" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/cff847b7-5595-47e4-a31a-8e074bf62cdf">
    <img src="https://github.com/user-attachments/assets/cff847b7-5595-47e4-a31a-8e074bf62cdf" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/3b36ac02-12cd-4a2a-8d0d-e994735a7f8a">
    <img src="https://github.com/user-attachments/assets/3b36ac02-12cd-4a2a-8d0d-e994735a7f8a" width="300">
  </a>
</p>

<p align="center">
  <a href="https://github.com/user-attachments/assets/f4edc5bc-d1a8-45af-ab3d-474a4928a394">
    <img src="https://github.com/user-attachments/assets/f4edc5bc-d1a8-45af-ab3d-474a4928a394" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/ba822439-3fe2-4482-b0ba-09a1de64ec7d">
    <img src="https://github.com/user-attachments/assets/ba822439-3fe2-4482-b0ba-09a1de64ec7d" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/d2c940a8-6778-4a89-83da-be01dc118146">
    <img src="https://github.com/user-attachments/assets/d2c940a8-6778-4a89-83da-be01dc118146" width="300">
  </a>
</p>

<p align="center">
  <a href="https://github.com/user-attachments/assets/c082b0f9-3752-4dea-a2c7-247de6bd9b96">
    <img src="https://github.com/user-attachments/assets/c082b0f9-3752-4dea-a2c7-247de6bd9b96" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/07ba4288-939e-4a9e-9625-eda350fa48fd">
    <img src="https://github.com/user-attachments/assets/07ba4288-939e-4a9e-9625-eda350fa48fd" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/256b5944-239d-43a4-a782-43b77d6fd025">
    <img src="https://github.com/user-attachments/assets/256b5944-239d-43a4-a782-43b77d6fd025" width="300">
  </a>
</p>

<p align="center">
  <a href="https://github.com/user-attachments/assets/57a1fb67-d0b4-4e69-9a9a-741051a9228e">
    <img src="https://github.com/user-attachments/assets/57a1fb67-d0b4-4e69-9a9a-741051a9228e" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/46dc8c6e-a7fd-4892-a97a-571ee8f91ca6">
    <img src="https://github.com/user-attachments/assets/46dc8c6e-a7fd-4892-a97a-571ee8f91ca6" width="300">
  </a>
</p>





## Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/CanComertler/Pokedex.git
   cd Pokedex
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm start
   ```

4. **Run on Emulator or Device**:

   - For iOS:

     ```bash
     npm run ios
     ```

   - For Android:

     ```bash
     npm run android
     ```

   - For Web:

     ```bash
     npm run web
     ```

## Notes

- This project uses a development build and cannot be run with Expo Go. To run the app with Expo Go, edit the `package.json` file, remove the `expo-dev-client` package and the `--dev-client` flag from the start script. However, note that edge-to-edge display won't work on Expo Go.
- The `ios` and `android` folders are gitignored by default as they are automatically generated during the build process (Continuous Native Generation). If you need to edit these folders, you can remove them from the `.gitignore` file so that they are tracked by git.

## Resources

- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Reanimated Documentation](https://docs.swmansion.com/react-native-reanimated/)
- [Axios Documentation](https://axios-http.com/docs/intro)

---

# Pokédex

Pokédex, React Native ve Expo kullanılarak geliştirilmiş, Pokémon türleri hakkında detaylı bilgiler sunan bir mobil uygulamadır. Bu proje, React Native uygulamalarında çeşitli kütüphane ve araçları kullanarak işlevselliği ve kullanıcı deneyimini geliştirmeye yönelik pratik bir örnek sunmaktadır.

## Özellikler

- **React Navigation Entegrasyonu**: Kullanıcı deneyimini geliştirmek için yerel yığın navigasyonu ve iç içe geçmiş alt sekmeler uygular.
- **Web Desteği**: React Native for Web ile uyumlu olup, uygulamanın web tarayıcılarında çalışmasına olanak tanır.
- **TypeScript Desteği**: Tür güvenliği ve geliştirilmiş geliştirici deneyimi için TypeScript kullanır.
- **Derin Bağlantı ve URL İşleme**: Navigasyon yeteneklerini artırmak için otomatik derin bağlantı ve URL işleme yapılandırmasına sahiptir.
- **Kenardan Kenara Görüntüleme**: Android cihazlarda `react-native-edge-to-edge` kullanarak kenardan kenara görüntüleme için yapılandırılmıştır.
- **Akıcı Animasyonlar**: `react-native-reanimated` kullanarak akıcı ve performanslı animasyonlar oluşturur.
- **API İstekleri**: Harici API'lere HTTP istekleri yapmak için `axios` kullanır.

## Ücüncü Parti Kütüphaneler

- **react-native-reanimated**: React Native uygulamalarında akıcı animasyonlar oluşturmak için kapsamlı bir animasyon API'si sağlar.
- **axios**: API istekleri yapmak için kullanılan bir promise tabanlı HTTP istemcisidir.
- **react-native-gesture-handler**: React Native'de jest işleme yeteneklerini etkinleştirir.
- **react-native-safe-area-context**: React Native uygulamalarında güvenli alan sınırlarını yönetir.
- **react-native-screens**: Yerel navigasyon ekranlarını yöneterek bellek kullanımı ve performansı optimize eder.

## Uygulama Görselleri

<p align="center">
  <a href="https://github.com/user-attachments/assets/6a8b9f64-9442-48dd-a1bd-7bec5dbf0ed7">
    <img src="https://github.com/user-attachments/assets/6a8b9f64-9442-48dd-a1bd-7bec5dbf0ed7" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/cff847b7-5595-47e4-a31a-8e074bf62cdf">
    <img src="https://github.com/user-attachments/assets/cff847b7-5595-47e4-a31a-8e074bf62cdf" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/3b36ac02-12cd-4a2a-8d0d-e994735a7f8a">
    <img src="https://github.com/user-attachments/assets/3b36ac02-12cd-4a2a-8d0d-e994735a7f8a" width="300">
  </a>
</p>

<p align="center">
  <a href="https://github.com/user-attachments/assets/f4edc5bc-d1a8-45af-ab3d-474a4928a394">
    <img src="https://github.com/user-attachments/assets/f4edc5bc-d1a8-45af-ab3d-474a4928a394" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/ba822439-3fe2-4482-b0ba-09a1de64ec7d">
    <img src="https://github.com/user-attachments/assets/ba822439-3fe2-4482-b0ba-09a1de64ec7d" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/d2c940a8-6778-4a89-83da-be01dc118146">
    <img src="https://github.com/user-attachments/assets/d2c940a8-6778-4a89-83da-be01dc118146" width="300">
  </a>
</p>

<p align="center">
  <a href="https://github.com/user-attachments/assets/c082b0f9-3752-4dea-a2c7-247de6bd9b96">
    <img src="https://github.com/user-attachments/assets/c082b0f9-3752-4dea-a2c7-247de6bd9b96" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/07ba4288-939e-4a9e-9625-eda350fa48fd">
    <img src="https://github.com/user-attachments/assets/07ba4288-939e-4a9e-9625-eda350fa48fd" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/256b5944-239d-43a4-a782-43b77d6fd025">
    <img src="https://github.com/user-attachments/assets/256b5944-239d-43a4-a782-43b77d6fd025" width="300">
  </a>
</p>

<p align="center">
  <a href="https://github.com/user-attachments/assets/57a1fb67-d0b4-4e69-9a9a-741051a9228e">
    <img src="https://github.com/user-attachments/assets/57a1fb67-d0b4-4e69-9a9a-741051a9228e" width="300">
  </a>
  <a href="https://github.com/user-attachments/assets/46dc8c6e-a7fd-4892-a97a-571ee8f91ca6">
    <img src="https://github.com/user-attachments/assets/46dc8c6e-a7fd-4892-a97a-571ee8f91ca6" width="300">
  </a>
</p>

