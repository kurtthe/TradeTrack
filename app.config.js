module.exports = {
  "expo": {
    "name": "Burdens",
    "slug": "-Trade-Track-",
    "privacy": "public",
    "platforms": [
      "ios",
      "android"
    ],
    "version": "1.5.6",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/64a079a5-3b38-4879-9bb1-ee6192444fff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "plugins": [
      "@react-native-firebase/app",
      "expo-font",
      "expo-secure-store"
    ],
    "ios": {
      "config": {
        "usesNonExemptEncryption": false
      },
      "supportsTablet": true,
      "bundleIdentifier": "com.trade.Burdens",
      "buildNumber": "8",
      "googleServicesFile": "./GoogleAnalytics/GoogleService-Info.plist",
      "userInterfaceStyle": "light",
      "infoPlist": {
        "NSCameraUsageDescription": "Allow Burdens to access your camera to take photos of the products for any requirement in your purchase",
        "NSPhotoLibraryUsageDescription": "Allow Burdens to access your photos to select photos and then send a requirement of your  purchase",
        "UIUserInterfaceStyle": "Light"
      }
    },
    "android": {
      "config": {
        "networkSecurityConfig": "./NetworkSecurity/network_security_config.xml",
        "googleMaps": {
          "apiKey": "AIzaSyBo1S1NNk3JpmZaiPM_kZSq0yz0vVbf194"
        }
      },
      "package": "com.tradetrak.Burdens",
      "permissions": [
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.DOWNLOAD_WITHOUT_NOTIFICATION",
        "android.permission.ACCESS_NETWORK_STATE"
      ],
      "versionCode": 58,
      "googleServicesFile": "./GoogleAnalytics/google-services.json"
    },
    "description": "Coded by Digital Basis",
    "extra": {
      "eas": {
        "projectId": "64a079a5-3b38-4879-9bb1-ee6192444fff"
      }
    },
    "runtimeVersion": {
      "policy": "appVersion"
    }
  }
}