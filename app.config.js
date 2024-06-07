module.exports = {
  expo: {
    name: "Burdens",
    slug: "-Trade-Track-",
    privacy: "public",
    platforms: [
      "ios",
      "android"
    ],
    version: "1.5.6",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/64a079a5-3b38-4879-9bb1-ee6192444fff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    plugins: [
      [
        "expo-secure-store",
        "expo-font"
      ],
      [
          "expo-build-properties",
          {
            android: {
              usesCleartextTraffic: true,
              compileSdkVersion: 34,
              targetSdkVersion: 34,
              buildToolsVersion: "34.0.0"
            },
            ios: {
              deploymentTarget: "14.0"
            }
          }
      ]
    ],
    ios: {
      config: {
        usesNonExemptEncryption: false
      },
      supportsTablet: true,
      bundleIdentifier: "com.trade.Burdens",
      buildNumber: "10",
      googleServicesFile: "./GoogleAnalytics/GoogleService-Info.plist",
      userInterfaceStyle: "light",
      infoPlist: {
        NSCameraUsageDescription: "Allow Burdens to access your camera to take photos of the products for any requirement in your purchase",
        NSPhotoLibraryUsageDescription: "Allow Burdens to access your photos to select photos and then send a requirement of your  purchase",
        UIUserInterfaceStyle: "Light"
      }
    },
    android: {
      config: {
        networkSecurityConfig: "./NetworkSecurity/network_security_config.xml",
        googleMaps: {
          apiKey: "AIzaSyBo1S1NNk3JpmZaiPM_kZSq0yz0vVbf194"
        }
      },
      package: "com.tradetrak.Burdens",
      permissions: [
        {
          name: "android.permission.ACCESS_FINE_LOCATION",
          minSdkVersion: 34,
          reason: "This app collects location data to enable store finder, with the purpose of showing the store closest to your location, even when the app is closed or not in use. This data is also used to provide ads/support advertising/support ads."
        },
        {
          name: "android.permission.ACCESS_COARSE_LOCATION",
          minSdkVersion: 34,
          reason: "This app collects location data to enable store finder, with the purpose of showing the store closest to your location, even when the app is closed or not in use. This data is also used to provide ads/support advertising/support ads."
        },
        {
          name: "android.permission.ACCESS_BACKGROUND_LOCATION",
          minSdkVersion: 34,
          reason: "This app collects location data to enable store finder, with the purpose of showing the store closest to your location, even when the app is closed or not in use. This data is also used to provide ads/support advertising/support ads."
        }
      ],
      versionCode: 60,
      googleServicesFile: "./GoogleAnalytics/google-services.json"
    },
    description: "Coded by Digital Basis",
    extra: {
      eas: {
        projectId: "64a079a5-3b38-4879-9bb1-ee6192444fff"
      }
    },
    runtimeVersion: {
      policy: "sdkVersion"
    }
  }
}
