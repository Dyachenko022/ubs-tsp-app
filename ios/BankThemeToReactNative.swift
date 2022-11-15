import Foundation
import UIKit

// Этот класс импортирует настройки для банка в Реакт Натив.
// Параметры настраиваются для каждого банка отдельно в файле BankTheme.swift

@objc(BankTheme)
internal class BankThemeToReactNative: BankTheme {
  
  @objc static func requiresMainQueueSetup() -> Bool {
      return false
  }
  
  @objc
  func constantsToExport() -> [String: Any]! {
    return [
      "colors": self.colors.nsDictionary,
      "serverUrl": self.serverUrl,
      "appName": self.appName,
      "latitude": self.latitude,
      "longitude": self.longitude,
    ];
  }
  
  @objc(loadNativeThemeType:rejecter:)
  func loadNativeThemeType(_ resolve: RCTPromiseResolveBlock,
                           rejecter reject: RCTPromiseRejectBlock) {
    if let themeType = UserDefaults().string(forKey: "themeType") {
      resolve(themeType);
    } else {
      resolve("auto");
    }
  }
  
  @objc(setNativeThemeType:)
  func setNativeThemeType(_ themeType: String) -> Void {
      DispatchQueue.main.sync {
        let appDelegate = UIApplication.shared.delegate;
        var theme = UIUserInterfaceStyle.unspecified;
        switch (themeType) {
        case "dark":
          theme = .dark;
          UserDefaults().set(themeType, forKey: "themeType");
          break;
        case "light":
          theme = .light;
          UserDefaults().set(themeType, forKey: "themeType");
          break;
        default:
          UserDefaults().set("auto", forKey: "themeType");
        }
        if #available(iOS 13, *) {
          appDelegate?.window??.overrideUserInterfaceStyle = theme;
          appDelegate?.window??.rootViewController?.overrideUserInterfaceStyle = theme;
        }
      }
    }
}
